import React from 'react';
import { Badge, Button, Card, SectionHeading, Stat } from '../components/UI';
import { Container } from '../components/Layout';
import { formatPrice } from '../lib/helpers';

export default function ResultPage({ form, plan, navigate, onStart }) {
  return (
    <section className="section section--page">
      <Container wide>
        <SectionHeading eyebrow="Sonuç" title={plan.title} subtitle="Bu ekran yalnızca sonuç vermiyor; planın neden böyle oluştuğunu da anlatıyor." />

        <div className="result-grid">
          <Card className="result-hero-card">
            <div className="result-hero-card__header">
              <div>
                <Badge tone="accent">{plan.recipe.badge}</Badge>
                <h3>{plan.recipe.name}</h3>
                <p>{plan.recipe.description}</p>
              </div>
              <div className="result-hero-card__price">
                <span>{form.frequency === 'weekly' ? 'Haftalık' : 'Aylık'} plan</span>
                <strong>{formatPrice(plan.price)}</strong>
              </div>
            </div>

            <div className="stats-grid">
              <Stat label="Günlük porsiyon" value={`${plan.dailyGrams} g`} />
              <Stat label="Kalori" value={`${plan.calories} kcal`} />
              <Stat label="Su önerisi" value={`${plan.hydrationMl} ml`} />
              <Stat label="Kalite skoru" value={`${plan.qualityScore}/99`} />
            </div>

            <div className="two-col-grid">
              <div className="info-box">
                <strong>Makro dağılımı</strong>
                <ul>
                  <li>Protein: {plan.macros.protein} g</li>
                  <li>Yağ: {plan.macros.fat} g</li>
                  <li>Karbonhidrat: {plan.macros.carbs} g</li>
                  <li>Lif: {plan.macros.fiber} g</li>
                </ul>
              </div>
              <div className="info-box">
                <strong>Besleme rehberi</strong>
                <ul>
                  {plan.feedingGuide.map((entry) => <li key={entry.time}>{entry.time}: {entry.grams} g</li>)}
                </ul>
              </div>
            </div>
          </Card>

          <div className="stack-lg">
            <Card className="feature-card">
              <h3>Neden bu tarif?</h3>
              <ul className="list-clean">
                {plan.reasoning.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Card>
            <Card className="feature-card">
              <h3>Fiyat kırılımı</h3>
              <ul className="price-list">
                <li><span>Yemek alt toplamı</span><strong>{formatPrice(plan.priceBreakdown.foodSubtotal)}</strong></li>
                <li><span>Paketleme</span><strong>{formatPrice(plan.priceBreakdown.packagingFee)}</strong></li>
                <li><span>Soğuk zincir</span><strong>{formatPrice(plan.priceBreakdown.coldChainFee)}</strong></li>
                <li><span>Beslenme desteği</span><strong>{formatPrice(plan.priceBreakdown.nutritionSupportFee)}</strong></li>
                <li><span>Operasyon</span><strong>{formatPrice(plan.priceBreakdown.baseOperationalFee + plan.priceBreakdown.sizeHandlingFee)}</strong></li>
                {plan.priceBreakdown.subscriptionDiscount > 0 ? <li><span>Aylık indirim</span><strong>-{formatPrice(plan.priceBreakdown.subscriptionDiscount)}</strong></li> : null}
              </ul>
            </Card>
            <div className="action-row action-row--vertical-mobile">
              <Button variant="ghost" onClick={() => navigate('planner')}>Planı düzenle</Button>
              <Button onClick={onStart}>Aboneliği başlat</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
