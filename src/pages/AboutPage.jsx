import React from 'react';
import { Card, SectionHeading } from '../components/UI';
import { Container } from '../components/Layout';

export default function AboutPage() {
  return (
    <section className="section section--page">
      <Container>
        <SectionHeading eyebrow="Marka" title="PatiPorsiyon neyi çözmeye çalışıyor?" />
        <div className="two-col-grid">
          <Card className="feature-card">
            <h3>Karmaşığı sakinleştirmek</h3>
            <p>Çoğu pet food deneyimi ya fazla jenerik ya da fazla karışık. Bu tasarım, köpek sahibine kişiselleştirme hissini sade bir akışla vermek için kuruldu.</p>
          </Card>
          <Card className="feature-card">
            <h3>Şeffaf fiyat mantığı</h3>
            <p>Fiyat tek sayı olarak değil; gramaj, tarif primi, soğuk zincir ve operasyon maliyeti gibi parçalarla anlaşılır hale getirildi.</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
