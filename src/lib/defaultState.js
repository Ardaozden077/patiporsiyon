export const DEFAULT_FORM = {
  dogName: '',
  breed: '',
  age: '',
  weight: '',
  lifeStage: 'adult',
  size: 'medium',
  neutered: 'yes',
  activity: 'normal',
  goal: 'maintain',
  sensitivity: 'none',
  frequency: 'weekly',
  tier: 'better',
  email: '',
  deliveryDay: 'Cumartesi',
};

export const EMPTY_ADDRESS = {
  fullName: '',
  phone: '',
  city: 'İstanbul',
  district: '',
  addressLine: '',
  note: '',
};

export const EMPTY_PAYMENT = {
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  installment: '1',
  agreement: false,
};

export function initialDb() {
  return {
    currentView: 'home',
    users: [
      {
        id: 'user_admin_seed',
        name: 'PatiPorsiyon Admin',
        email: 'admin@patiporsiyon.com',
        passwordHash: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    ],
    sessionUserId: null,
    dogProfiles: [],
    subscriptions: [],
    orders: [],
    coupons: [
      { code: 'PATI10', discountRate: 10, active: true },
      { code: 'DENEME15', discountRate: 15, active: true },
    ],
    auditLogs: [],
  };
}
