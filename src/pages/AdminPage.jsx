import React, { useState } from 'react';
import { Button, Card, SectionHeading, Stat } from '../components/UI';
import { Container } from '../components/Layout';
import { formatDateTime, formatPrice } from '../lib/helpers';

export default function AdminPage({ db, onUpdateOrderStatus, onCreateCoupon, onToggleCoupon }) {
  const [couponCode, setCouponCode] = useState('');
  const [couponRate, setCouponRate] = useState('10');

  return (
    <section className="section section--page">
      <Container wide>
        <SectionHeading eyebrow="Yönetim" title="Admin paneli" subtitle="Bu panel demo operasyon hissi vermek için sipariş, kupon ve log akışını tek yerde toplar." />

        <div className="stats-grid">
          <Stat label="Kullanıcı" value={db.users.filter((user) => user.role !== 'admin').length} />
          <Stat label="Sipariş" value={db.orders.length} />
          <Stat label="Aktif kupon" value={db.coupons.filter((coupon) => coupon.active).length} />
          <Stat label="Ciro (demo)" value={formatPrice(db.orders.reduce((sum, order) => sum + Number(order.amount || 0), 0))} />
        </div>

        <div className="dashboard-grid">
          <Card className="feature-card">
            <h3>Sipariş yönetimi</h3>
            <div className="stack-md">
              {db.orders.length ? db.orders.slice().reverse().map((order) => (
                <div key={order.id} className="list-card list-card--admin">
                  <div>
                    <strong>{order.dogName}</strong>
                    <p>{order.planLabel} • {formatPrice(order.amount)}</p>
                    <small>{formatDateTime(order.createdAt)}</small>
                  </div>
                  <div className="list-card__actions">
                    <select value={order.status} onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}>
                      <option>Hazırlanıyor</option>
                      <option>Paketlendi</option>
                      <option>Yolda</option>
                      <option>Teslim edildi</option>
                    </select>
                  </div>
                </div>
              )) : <p className="empty-state">Henüz sipariş yok.</p>}
            </div>
          </Card>

          <div className="stack-lg">
            <Card className="feature-card">
              <h3>Kupon oluştur</h3>
              <div className="form-grid">
                <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Örn. BAHAR20" />
                <input value={couponRate} onChange={(e) => setCouponRate(e.target.value)} placeholder="20" />
              </div>
              <div className="action-row">
                <Button onClick={() => { onCreateCoupon(couponCode, couponRate); setCouponCode(''); setCouponRate('10'); }}>Kupon ekle</Button>
              </div>
            </Card>

            <Card className="feature-card">
              <h3>Kuponlar</h3>
              <div className="stack-md">
                {db.coupons.map((coupon) => (
                  <div key={coupon.code} className="list-card">
                    <div>
                      <strong>{coupon.code}</strong>
                      <p>%{coupon.discountRate} indirim</p>
                    </div>
                    <Button variant="ghost" onClick={() => onToggleCoupon(coupon.code)}>{coupon.active ? 'Pasifleştir' : 'Aktifleştir'}</Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="feature-card">
              <h3>Loglar</h3>
              <div className="stack-md compact-text">
                {db.auditLogs.length ? db.auditLogs.slice().reverse().map((log) => <div key={log.id}>• {log.message}</div>) : <p className="empty-state">Henüz log yok.</p>}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
