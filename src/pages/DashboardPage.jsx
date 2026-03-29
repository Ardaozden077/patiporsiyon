import React from 'react';
import { Button, Card, SectionHeading, Stat } from '../components/UI';
import { Container } from '../components/Layout';
import { formatDate, formatPrice } from '../lib/helpers';

export default function DashboardPage({ user, subscriptions, dogs, orders, onTogglePause, onCancel, navigate }) {
  return (
    <section className="section section--page">
      <Container wide>
        <SectionHeading eyebrow="Hesabım" title={`${user.name}, paneline hoş geldin`} subtitle="Aboneliklerini, siparişlerini ve köpek profillerini tek yerden yönetebilirsin." />
        <div className="stats-grid">
          <Stat label="Aktif abonelik" value={subscriptions.filter((item) => item.status === 'active').length} />
          <Stat label="Toplam sipariş" value={orders.length} />
          <Stat label="Köpek profili" value={dogs.length} />
          <Stat label="Sonraki teslimat" value={subscriptions[0] ? formatDate(subscriptions[0].nextDeliveryDate) : '-'} />
        </div>

        <div className="dashboard-grid">
          <Card className="feature-card">
            <div className="card-headline">
              <h3>Abonelikler</h3>
              <Button variant="ghost" onClick={() => navigate('planner')}>Yeni plan</Button>
            </div>
            <div className="stack-md">
              {subscriptions.length ? subscriptions.map((sub) => (
                <div className="list-card" key={sub.id}>
                  <div>
                    <strong>{sub.dogName}</strong>
                    <p>{sub.planLabel} • {sub.frequency === 'weekly' ? 'Haftalık' : 'Aylık'}</p>
                    <small>Sonraki teslimat: {formatDate(sub.nextDeliveryDate)}</small>
                  </div>
                  <div className="list-card__actions">
                    <span className={`status-pill status-pill--${sub.status}`}>{sub.status}</span>
                    {sub.status !== 'cancelled' ? <Button variant="ghost" onClick={() => onTogglePause(sub.id)}>{sub.status === 'active' ? 'Durdur' : 'Yeniden başlat'}</Button> : null}
                    {sub.status !== 'cancelled' ? <Button variant="ghost" onClick={() => onCancel(sub.id)}>İptal et</Button> : null}
                  </div>
                </div>
              )) : <p className="empty-state">Henüz abonelik yok.</p>}
            </div>
          </Card>

          <Card className="feature-card">
            <h3>Siparişler</h3>
            <div className="stack-md">
              {orders.length ? orders.map((order) => (
                <div className="list-card" key={order.id}>
                  <div>
                    <strong>{order.dogName}</strong>
                    <p>{order.planLabel}</p>
                    <small>{formatDate(order.createdAt)}</small>
                  </div>
                  <div className="list-card__actions">
                    <strong>{formatPrice(order.amount)}</strong>
                    <span className="status-pill status-pill--info">{order.status}</span>
                  </div>
                </div>
              )) : <p className="empty-state">Henüz sipariş yok.</p>}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
