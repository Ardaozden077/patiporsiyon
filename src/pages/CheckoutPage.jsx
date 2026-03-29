import React from 'react';
import { CITIES } from '../data/locations';
import { Button, Card, Field, SectionHeading } from '../components/UI';
import { Container } from '../components/Layout';
import { formatPrice } from '../lib/helpers';

export default function CheckoutPage({ address, payment, setAddressField, setPaymentField, coupon, setCoupon, appliedCoupon, onApplyCoupon, onSubmit, error, plan, discountedPrice }) {
  const districts = CITIES[address.city] || [];

  return (
    <section className="section section--page">
      <Container wide>
        <SectionHeading eyebrow="Ödeme" title="Teslimat ve ödeme bilgilerini tamamla" subtitle="Bu sürümde gerçek tahsilat yok; ancak kullanıcı akışı olabildiğince gerçekçi tutuldu." />
        <form className="checkout-layout" onSubmit={onSubmit}>
          <div className="stack-lg">
            <Card className="feature-card">
              <h3>Teslimat</h3>
              <div className="form-grid">
                <Field label="Ad soyad"><input value={address.fullName} onChange={(e) => setAddressField('fullName', e.target.value)} /></Field>
                <Field label="Telefon"><input value={address.phone} onChange={(e) => setAddressField('phone', e.target.value)} placeholder="05xx xxx xx xx" /></Field>
                <Field label="Şehir">
                  <select value={address.city} onChange={(e) => { setAddressField('city', e.target.value); setAddressField('district', ''); }}>
                    {Object.keys(CITIES).map((city) => <option key={city}>{city}</option>)}
                  </select>
                </Field>
                <Field label="İlçe">
                  <select value={address.district} onChange={(e) => setAddressField('district', e.target.value)}>
                    <option value="">Seç</option>
                    {districts.map((district) => <option key={district}>{district}</option>)}
                  </select>
                </Field>
                <Field label="Adres" ><textarea rows="4" value={address.addressLine} onChange={(e) => setAddressField('addressLine', e.target.value)} /></Field>
                <Field label="Teslimat notu"><textarea rows="4" value={address.note} onChange={(e) => setAddressField('note', e.target.value)} /></Field>
              </div>
            </Card>

            <Card className="feature-card">
              <h3>Ödeme</h3>
              <div className="form-grid">
                <Field label="Kart üzerindeki ad"><input value={payment.cardName} onChange={(e) => setPaymentField('cardName', e.target.value)} /></Field>
                <Field label="Kart numarası"><input value={payment.cardNumber} onChange={(e) => setPaymentField('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" /></Field>
                <Field label="Son kullanma"><input value={payment.expiry} onChange={(e) => setPaymentField('expiry', e.target.value)} placeholder="AA/YY" /></Field>
                <Field label="CVC"><input value={payment.cvc} onChange={(e) => setPaymentField('cvc', e.target.value)} placeholder="123" /></Field>
                <Field label="Taksit">
                  <select value={payment.installment} onChange={(e) => setPaymentField('installment', e.target.value)}>
                    <option value="1">Tek çekim</option>
                    <option value="2">2 taksit</option>
                    <option value="3">3 taksit</option>
                  </select>
                </Field>
              </div>

              <label className="checkbox-row">
                <input type="checkbox" checked={payment.agreement} onChange={(e) => setPaymentField('agreement', e.target.checked)} />
                <span>Mesafeli satış ve abonelik koşullarını kabul ediyorum.</span>
              </label>
            </Card>
          </div>

          <aside>
            <Card className="summary-card sticky-card">
              <h3>Sipariş özeti</h3>
              <ul className="price-list">
                <li><span>Tarif</span><strong>{plan.recipe.name}</strong></li>
                <li><span>Günlük porsiyon</span><strong>{plan.dailyGrams} g</strong></li>
                <li><span>Teslimat</span><strong>{plan.deliveryText}</strong></li>
                <li><span>Ara toplam</span><strong>{formatPrice(plan.price)}</strong></li>
              </ul>
              <div className="coupon-row">
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="İndirim kodu" />
                <Button type="button" variant="ghost" onClick={onApplyCoupon}>Uygula</Button>
              </div>
              {appliedCoupon ? <div className={`coupon-note ${appliedCoupon.invalid ? 'is-invalid' : ''}`}>{appliedCoupon.invalid ? 'Kod geçersiz.' : `%${appliedCoupon.discountRate} indirim uygulandı.`}</div> : null}
              <div className="summary-total">
                <span>Ödenecek tutar</span>
                <strong>{formatPrice(discountedPrice)}</strong>
              </div>
              {error ? <div className="form-error-banner">{error}</div> : null}
              <Button type="submit" className="button--wide">Siparişi oluştur</Button>
            </Card>
          </aside>
        </form>
      </Container>
    </section>
  );
}
