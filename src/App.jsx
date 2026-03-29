import React, { useEffect, useMemo, useState } from 'react';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import PlannerPage from './pages/PlannerPage';
import ResultPage from './pages/ResultPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import { AuthModal } from './components/AuthModal';
import { Container, Footer, Header, Shell } from './components/Layout';
import { calculatePlan } from './lib/planEngine';
import { DEFAULT_FORM, EMPTY_ADDRESS, EMPTY_PAYMENT } from './lib/defaultState';
import { readDb, writeDb } from './lib/storage';
import { addDays, sha256, uid } from './lib/helpers';
import { hashToView, viewToHash } from './lib/routing';
import { formatCardNumber, formatCvc, formatExpiry, isCardNumberValid, isCvcValid, isEmailValid, isExpiryValid, isPhoneValid, isReasonableDogAge, isReasonableDogWeight } from './lib/validators';

function useDatabase() {
  const [db, setDb] = useState(() => readDb());
  useEffect(() => { writeDb(db); }, [db]);
  return [db, setDb];
}

export default function App() {
  const [db, setDb] = useDatabase();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [payment, setPayment] = useState(EMPTY_PAYMENT);
  const [plannerErrors, setPlannerErrors] = useState({});
  const [checkoutError, setCheckoutError] = useState('');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  const user = db.users.find((item) => item.id === db.sessionUserId) || null;
  const currentView = db.currentView || 'home';
  const plan = useMemo(() => calculatePlan(form), [form]);
  const discountedPrice = useMemo(() => {
    if (!appliedCoupon || appliedCoupon.invalid) return plan.price;
    return Math.round(plan.price * (1 - appliedCoupon.discountRate / 100));
  }, [appliedCoupon, plan.price]);

  const subscriptions = user ? db.subscriptions.filter((item) => item.userId === user.id) : [];
  const dogs = user ? db.dogProfiles.filter((item) => item.userId === user.id) : [];
  const orders = user ? db.orders.filter((item) => item.userId === user.id).slice().reverse() : [];

  useEffect(() => {
    const syncFromHash = () => setDb((prev) => ({ ...prev, currentView: hashToView(window.location.hash) }));
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [setDb]);

  const navigate = (view) => {
    window.location.hash = viewToHash(view);
  };

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const setAddressField = (key, value) => setAddress((prev) => ({ ...prev, [key]: value }));
  const setPaymentField = (key, value) => {
    let next = value;
    if (key === 'cardNumber') next = formatCardNumber(value);
    if (key === 'expiry') next = formatExpiry(value);
    if (key === 'cvc') next = formatCvc(value);
    setPayment((prev) => ({ ...prev, [key]: next }));
  };

  const validatePlanner = () => {
    const errors = {};
    if (!form.dogName.trim()) errors.dogName = 'Köpeğinin adını gir.';
    if (!form.breed.trim()) errors.breed = 'Irk bilgisini gir.';
    if (!isReasonableDogAge(form.age)) errors.age = 'Geçerli bir yaş gir.';
    if (!isReasonableDogWeight(form.weight)) errors.weight = 'Geçerli bir kilo gir.';
    if (!isEmailValid(form.email)) errors.email = 'Geçerli bir e-posta gir.';
    setPlannerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlannerProceed = () => {
    if (!validatePlanner()) return;
    navigate('result');
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthError('');
    setAuthOpen(true);
    setAuthForm((prev) => ({ ...prev, email: prev.email || form.email || '' }));
  };

  const closeAuth = () => {
    setAuthOpen(false);
    setAuthError('');
    setAuthForm({ name: '', email: '', password: '' });
  };

  const submitAuth = async (event) => {
    event.preventDefault();
    const email = authForm.email.trim().toLowerCase();
    const name = authForm.name.trim();
    const password = authForm.password.trim();

    if (!isEmailValid(email)) return setAuthError('Geçerli bir e-posta adresi gir.');
    if (password.length < 4) return setAuthError('Şifre en az 4 karakter olmalı.');

    const passwordHash = await sha256(password);
    const existing = db.users.find((item) => item.email === email);

    if (authMode === 'register') {
      if (!name) return setAuthError('Ad soyad gir.');
      if (existing) return setAuthError('Bu e-posta zaten kayıtlı.');
      const role = email === 'admin@patiporsiyon.com' ? 'admin' : 'user';
      const nextUser = { id: uid('user'), name, email, passwordHash, role, createdAt: new Date().toISOString() };
      setDb((prev) => ({ ...prev, users: [...prev.users, nextUser], sessionUserId: nextUser.id }));
      closeAuth();
      navigate(role === 'admin' ? 'admin' : 'dashboard');
      return;
    }

    if (!existing || existing.passwordHash !== passwordHash) return setAuthError('E-posta veya şifre hatalı.');
    setDb((prev) => ({ ...prev, sessionUserId: existing.id }));
    closeAuth();
    navigate(existing.role === 'admin' ? 'admin' : 'dashboard');
  };

  const logout = () => {
    setDb((prev) => ({ ...prev, sessionUserId: null }));
    navigate('home');
  };

  const startSubscription = () => {
    if (!validatePlanner()) return navigate('planner');
    if (!user) return openAuth('register');
    setAddress((prev) => ({ ...prev, fullName: prev.fullName || user.name || '' }));
    navigate('checkout');
  };

  const applyCoupon = () => {
    const found = db.coupons.find((item) => item.active && item.code.toLowerCase() === coupon.trim().toLowerCase());
    if (!found) return setAppliedCoupon({ invalid: true, code: coupon.trim() });
    setAppliedCoupon(found);
  };

  const validateCheckout = () => {
    if (!user) return 'Devam etmek için giriş yapmalısın.';
    if (!address.fullName.trim()) return 'Teslimat adı boş olamaz.';
    if (!isPhoneValid(address.phone)) return 'Geçerli bir telefon gir.';
    if (!address.city.trim()) return 'Şehir seç.';
    if (!address.district.trim()) return 'İlçe seç.';
    if (!address.addressLine.trim() || address.addressLine.trim().length < 10) return 'Adres bilgisini daha detaylı gir.';
    if (!payment.cardName.trim()) return 'Kart üzerindeki adı gir.';
    if (!isCardNumberValid(payment.cardNumber)) return 'Geçerli bir kart numarası gir.';
    if (!isExpiryValid(payment.expiry)) return 'Geçerli bir son kullanma tarihi gir.';
    if (!isCvcValid(payment.cvc)) return 'Geçerli bir CVC gir.';
    if (!payment.agreement) return 'Koşulları kabul etmeden devam edemezsin.';
    return '';
  };

  const submitCheckout = (event) => {
    event.preventDefault();
    const message = validateCheckout();
    setCheckoutError(message);
    if (message) return;

    const dogId = uid('dog');
    const subscriptionId = uid('sub');
    const orderId = uid('ord');
    const dogProfile = { id: dogId, userId: user.id, ...form, createdAt: new Date().toISOString() };
    const subscription = {
      id: subscriptionId,
      userId: user.id,
      dogId,
      dogName: form.dogName,
      planLabel: plan.recipe.name,
      frequency: form.frequency,
      deliveryDay: form.deliveryDay,
      price: discountedPrice,
      status: 'active',
      nextDeliveryDate: addDays(form.frequency === 'weekly' ? 7 : 30),
      createdAt: new Date().toISOString(),
    };
    const order = {
      id: orderId,
      userId: user.id,
      subscriptionId,
      dogName: form.dogName,
      planLabel: plan.recipe.name,
      amount: discountedPrice,
      status: 'Hazırlanıyor',
      address,
      paymentMeta: { last4: payment.cardNumber.replace(/\D/g, '').slice(-4), cardName: payment.cardName, installment: payment.installment },
      createdAt: new Date().toISOString(),
    };

    setDb((prev) => ({
      ...prev,
      dogProfiles: [...prev.dogProfiles, dogProfile],
      subscriptions: [...prev.subscriptions, subscription],
      orders: [...prev.orders, order],
      auditLogs: [...prev.auditLogs, { id: uid('audit'), message: `${form.dogName} için yeni sipariş oluşturuldu.`, createdAt: new Date().toISOString() }],
    }));

    setAddress(EMPTY_ADDRESS);
    setPayment(EMPTY_PAYMENT);
    setCoupon('');
    setAppliedCoupon(null);
    navigate('dashboard');
  };

  const togglePause = (id) => setDb((prev) => ({ ...prev, subscriptions: prev.subscriptions.map((item) => item.id === id ? { ...item, status: item.status === 'active' ? 'paused' : 'active' } : item) }));
  const cancelSubscription = (id) => setDb((prev) => ({ ...prev, subscriptions: prev.subscriptions.map((item) => item.id === id ? { ...item, status: 'cancelled' } : item) }));
  const updateOrderStatus = (orderId, status) => setDb((prev) => ({ ...prev, orders: prev.orders.map((item) => item.id === orderId ? { ...item, status } : item) }));
  const createCoupon = (code, rate) => {
    const normalized = String(code || '').trim().toUpperCase();
    const discountRate = Number(rate);
    if (!normalized || !Number.isFinite(discountRate) || discountRate <= 0 || discountRate > 90) return;
    setDb((prev) => prev.coupons.some((item) => item.code === normalized) ? prev : { ...prev, coupons: [...prev.coupons, { code: normalized, discountRate, active: true }] });
  };
  const toggleCoupon = (code) => setDb((prev) => ({ ...prev, coupons: prev.coupons.map((item) => item.code === code ? { ...item, active: !item.active } : item) }));

  const guardedView = currentView === 'dashboard' && !user ? 'home' : currentView === 'admin' && user?.role !== 'admin' ? 'home' : currentView === 'checkout' && !user ? 'home' : currentView;

  useEffect(() => {
    if (guardedView !== currentView) navigate(guardedView);
  }, [guardedView, currentView]);

  return (
    <Shell>
      <Header user={user} currentView={guardedView} navigate={navigate} onOpenAuth={openAuth} onLogout={logout} />
      <main>
        {guardedView === 'home' ? <HomePage navigate={navigate} /> : null}
        {guardedView === 'catalog' ? <CatalogPage /> : null}
        {guardedView === 'about' ? <AboutPage /> : null}
        {guardedView === 'faq' ? <FaqPage /> : null}
        {guardedView === 'planner' ? <PlannerPage form={form} setField={setField} errors={plannerErrors} onProceed={handlePlannerProceed} navigate={navigate} plan={plan} /> : null}
        {guardedView === 'result' ? <ResultPage form={form} plan={plan} navigate={navigate} onStart={startSubscription} /> : null}
        {guardedView === 'checkout' ? <CheckoutPage address={address} payment={payment} setAddressField={setAddressField} setPaymentField={setPaymentField} coupon={coupon} setCoupon={setCoupon} appliedCoupon={appliedCoupon} onApplyCoupon={applyCoupon} onSubmit={submitCheckout} error={checkoutError} plan={plan} discountedPrice={discountedPrice} /> : null}
        {guardedView === 'dashboard' ? <DashboardPage user={user} subscriptions={subscriptions} dogs={dogs} orders={orders} onTogglePause={togglePause} onCancel={cancelSubscription} navigate={navigate} /> : null}
        {guardedView === 'admin' ? <AdminPage db={db} onUpdateOrderStatus={updateOrderStatus} onCreateCoupon={createCoupon} onToggleCoupon={toggleCoupon} /> : null}
      </main>
      <Footer />
      <AuthModal open={authOpen} mode={authMode} form={authForm} error={authError} setMode={setAuthMode} setForm={setAuthForm} onClose={closeAuth} onSubmit={submitAuth} />
    </Shell>
  );
}
