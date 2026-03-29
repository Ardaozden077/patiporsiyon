import React from 'react';
import { Button } from './UI';

export function Shell({ children }) {
  return <div className="shell">{children}</div>;
}

export function Container({ children, wide = false }) {
  return <div className={`container ${wide ? 'container--wide' : ''}`}>{children}</div>;
}

export function Header({ user, currentView, navigate, onOpenAuth, onLogout }) {
  return (
    <header className="site-header">
      <Container wide>
        <div className="site-header__inner">
          <button className="brand" onClick={() => navigate('home')}>
            <span className="brand__mark">PP</span>
            <span>
              <strong>PatiPorsiyon</strong>
              <small>Pro Demo</small>
            </span>
          </button>

          <nav className="nav">
            {[
              ['home', 'Ana Sayfa'],
              ['catalog', 'Menüler'],
              ['planner', 'Plan Oluştur'],
              ['about', 'Marka'],
              ['faq', 'SSS'],
            ].map(([view, label]) => (
              <button key={view} className={`nav__link ${currentView === view ? 'is-active' : ''}`} onClick={() => navigate(view)}>
                {label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            {user ? (
              <>
                <button className="header-user" onClick={() => navigate(user.role === 'admin' ? 'admin' : 'dashboard')}>
                  <span>{user.name}</span>
                  <small>{user.role === 'admin' ? 'Yönetici' : 'Hesabım'}</small>
                </button>
                <Button variant="ghost" onClick={onLogout}>Çıkış</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => onOpenAuth('login')}>Giriş yap</Button>
                <Button onClick={() => navigate('planner')}>Planı başlat</Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Container wide>
        <div className="site-footer__inner">
          <div>
            <strong>PatiPorsiyon</strong>
            <p>Köpeğine özel taze mama deneyimi için tasarlanmış modern demo vitrin.</p>
          </div>
          <div>
            <strong>Not</strong>
            <p>Bu sürüm gerçek ödeme almayan, ürün hissi güçlü bir ön yüz demosudur.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
