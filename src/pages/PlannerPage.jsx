import React from 'react';
import { BREEDS } from '../data/breeds';
import { DELIVERY_DAYS } from '../data/locations';
import { Button, Card, Field, SectionHeading } from '../components/UI';
import { Container } from '../components/Layout';
import { formatPrice } from '../lib/helpers';

const optionGroups = [
  ['lifeStage', 'Yaşam evresi', [['puppy', 'Yavru'], ['adult', 'Yetişkin'], ['senior', 'Senior']]],
  ['size', 'Boyut', [['small', 'Küçük'], ['medium', 'Orta'], ['large', 'Büyük'], ['giant', 'Dev ırk']]],
  ['neutered', 'Kısırlaştırılmış mı?', [['yes', 'Evet'], ['no', 'Hayır']]],
  ['activity', 'Aktivite', [['low', 'Düşük'], ['normal', 'Normal'], ['high', 'Yüksek'], ['very_high', 'Çok yüksek']]],
  ['goal', 'Hedef', [['maintain', 'Kilo koruma'], ['lose', 'Kilo verme'], ['gain', 'Kilo alma']]],
  ['sensitivity', 'Hassasiyet', [['none', 'Yok'], ['digestion', 'Sindirim'], ['skin', 'Deri / tüy'], ['chicken', 'Tavuk'], ['grain', 'Tahıl']]],
  ['frequency', 'Teslimat', [['weekly', 'Haftalık'], ['monthly', 'Aylık']]],
  ['tier', 'Plan seviyesi', [['good', 'Good'], ['better', 'Better'], ['best', 'Best']]],
  ['deliveryDay', 'Teslimat günü', DELIVERY_DAYS.map((day) => [day, day])],
];

function Segments({ label, value, options, onChange }) {
  return (
    <div className="segment-group">
      <span className="field__label">{label}</span>
      <div className="segment-wrap">
        {options.map(([optionValue, optionLabel]) => (
          <button
            key={optionValue}
            type="button"
            className={`segment ${value === optionValue ? 'is-active' : ''}`}
            onClick={() => onChange(optionValue)}
          >
            {optionLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PlannerPage({ form, setField, errors, onProceed, navigate, plan }) {
  return (
    <section className="section section--page">
      <Container wide>
        <SectionHeading eyebrow="Plan oluşturucu" title="Köpeğinin ihtiyaçlarına göre planını 1 dakikada çıkar." subtitle="Önce temel bilgiler, sonra ihtiyaç profili, en sonunda teslimat ve plan seviyesi." />
        <div className="planner-layout">
          <aside>
            <Card className="summary-card sticky-card">
              <div className="summary-card__top">
                <span className="section-heading__eyebrow">Canlı önizleme</span>
                <h3>{form.dogName ? `${form.dogName} için plan` : 'Köpeğin için plan'}</h3>
                <p>Fiyat, gramaj ve tarif seçimi burada anlık güncellenir.</p>
                <strong className="summary-card__price">{formatPrice(plan.price)}</strong>
                <span className="summary-card__price-note">{form.frequency === 'weekly' ? 'Haftalık tahmini toplam' : 'Aylık tahmini toplam'}</span>
              </div>

              <div className="stats-grid">
                {[
                  ['Günlük porsiyon', `${plan.dailyGrams} g`],
                  ['Toplam üretim', `${plan.totalGrams} g`],
                  ['Tarif', plan.recipe.name],
                  ['Teslimat', plan.deliveryText],
                ].map(([label, value]) => (
                  <div key={label} className="mini-stat">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <div className="info-box">
                <strong>Bu fiyat neden böyle?</strong>
                <ul>
                  <li>Toplam gramaj: {plan.priceBreakdown.totalKg} kg</li>
                  <li>Efektif kg fiyatı: {formatPrice(plan.priceBreakdown.effectivePerKg)}</li>
                  <li>Paketleme ve soğuk zincir dahil</li>
                  {plan.priceBreakdown.subscriptionDiscount > 0 ? <li>Aylık plan indirimi aktif</li> : null}
                </ul>
              </div>

              <div className="chip-row">
                {plan.recipe.ingredients.map((item) => <span className="chip" key={item}>{item}</span>)}
              </div>
            </Card>
          </aside>

          <Card className="planner-card">
            <div className="stack-xl">
              <div>
                <span className="section-heading__eyebrow">1. Temel bilgiler</span>
                <h3>Köpeğini tanıtalım</h3>
              </div>
              <div className="form-grid form-grid--basic">
                <Field label="Köpeğinin adı" error={errors.dogName}>
                  <input value={form.dogName} onChange={(e) => setField('dogName', e.target.value)} placeholder="Örn. Luna" />
                </Field>
                <Field label="Irk" error={errors.breed}>
                  <input value={form.breed} onChange={(e) => setField('breed', e.target.value)} list="breed-list" placeholder="Örn. Labrador" />
                  <datalist id="breed-list">{BREEDS.map((breed) => <option key={breed} value={breed} />)}</datalist>
                </Field>
                <Field label="Yaş" error={errors.age}>
                  <input value={form.age} onChange={(e) => setField('age', e.target.value)} placeholder="3" inputMode="decimal" />
                </Field>
                <Field label="Kilo (kg)" error={errors.weight}>
                  <input value={form.weight} onChange={(e) => setField('weight', e.target.value)} placeholder="12" inputMode="decimal" />
                </Field>
                <Field label="E-posta" error={errors.email}>
                  <input value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="ornek@mail.com" />
                </Field>
              </div>

              <div className="divider" />

              <div>
                <span className="section-heading__eyebrow">2. İhtiyaç profili</span>
                <h3>Beslenme ihtiyaçlarını seç</h3>
              </div>
              <div className="segment-grid">
                {optionGroups.slice(0, 6).map(([key, label, options]) => (
                  <Segments key={key} label={label} value={form[key]} options={options} onChange={(next) => setField(key, next)} />
                ))}
              </div>

              <div className="divider" />

              <div>
                <span className="section-heading__eyebrow">3. Plan ve teslimat</span>
                <h3>Son seçimler</h3>
              </div>
              <div className="segment-grid">
                {optionGroups.slice(6).map(([key, label, options]) => (
                  <Segments key={key} label={label} value={form[key]} options={options} onChange={(next) => setField(key, next)} />
                ))}
              </div>

              <div className="action-row">
                <Button variant="ghost" onClick={() => navigate('home')}>Geri dön</Button>
                <Button onClick={onProceed}>Planı gör</Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
