import React from 'react';
import { HERO_METRICS, HIGHLIGHTS, TESTIMONIALS } from '../data/catalog';
import { Button, Card, SectionHeading, Stat } from '../components/UI';
import { Container } from '../components/Layout';

export default function HomePage({ navigate }) {
  return (
    <>
      <section className="hero">
        <Container wide>
          <div className="hero__grid">
            <div className="stack-xl">
              <span className="hero__eyebrow">Köpeğine özel premium beslenme deneyimi</span>
              <div className="stack-md">
                <h1>Taze, sakin ve güven veren bir mama sistemi.</h1>
                <p>
                  Köpeğinin yaşı, kilosu, aktivitesi ve hassasiyetlerine göre oluşturulan doğal öğünler.
                  Haftalık ya da aylık abonelikle, premium paketleme ve soğuk zincir teslimatla kapına gelir.
                </p>
              </div>
              <div className="hero__actions">
                <Button onClick={() => navigate('planner')}>Köpeğim için plan hesapla</Button>
                <Button variant="ghost" onClick={() => navigate('catalog')}>Menüleri incele</Button>
              </div>
              <div className="stats-grid stats-grid--hero">
                {HERO_METRICS.map((item) => (
                  <Stat key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>

            <Card className="hero-card">
              <img
                className="hero-card__image"
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80"
                alt="Premium köpek beslenme görseli"
              />
              <div className="hero-card__content">
                <div className="hero-card__topline">
                  <span>Örnek plan</span>
                  <strong>Luna • orta aktif</strong>
                </div>
                <div className="hero-card__metrics">
                  <div><span>Günlük</span><strong>420 g</strong></div>
                  <div><span>Tarif</span><strong>Somon Skin</strong></div>
                  <div><span>Teslimat</span><strong>Haftalık</strong></div>
                </div>
                <div className="hero-card__note">Sistem yalnızca sonuç vermiyor; neden o planın seçildiğini de açıklıyor.</div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading eyebrow="Neden iyi hissettiriyor" title="Ürünü değil, sistemi güvenilir kılan şey açıklanabilirlik." align="center" />
          <div className="feature-grid">
            {HIGHLIGHTS.map((item) => (
              <Card key={item.title} className="feature-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--muted">
        <Container>
          <SectionHeading eyebrow="Akış" title="Petshop alışverişinden daha akıllı bir düzen" align="center" />
          <div className="feature-grid feature-grid--steps">
            {[
              ['01', 'Köpeğini tanıt', 'Yaş, kilo, aktivite, hassasiyet ve hedef bilgilerini gir.'],
              ['02', 'Planını gör', 'Sistem sana özel porsiyon, tarif ve fiyat önerisini anlatsın.'],
              ['03', 'Aboneliği başlat', 'Teslimat, indirim ve ödemeyi sakin bir akışla tamamla.'],
            ].map(([no, title, text]) => (
              <Card key={no} className="step-card">
                <span className="step-card__no">{no}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading eyebrow="Yorumlar" title="Kullanıcı deneyimi ne hissettiriyor?" align="center" />
          <div className="feature-grid">
            {TESTIMONIALS.map((item) => (
              <Card key={item.name} className="testimonial-card">
                <strong>{item.name}</strong>
                <span>{item.city}</span>
                <p>{item.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--tight-top">
        <Container>
          <Card className="cta-card">
            <div>
              <span className="section-heading__eyebrow">Hemen başla</span>
              <h3>Köpeğin için kişisel planı birkaç adımda çıkar.</h3>
              <p>Bu projenin en güçlü kısmı plan oluşturucu. En doğru ilk temas da oradan başlıyor.</p>
            </div>
            <Button onClick={() => navigate('planner')}>Plan oluşturucuya git</Button>
          </Card>
        </Container>
      </section>
    </>
  );
}
