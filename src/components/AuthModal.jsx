import React from 'react';
import { Button, Field } from './UI';

export function AuthModal({ open, mode, form, error, setMode, setForm, onClose, onSubmit }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-card__header">
          <div>
            <span className="section-heading__eyebrow">Hesap</span>
            <h3>{mode === 'login' ? 'Tekrar hoş geldin' : 'Yeni hesap oluştur'}</h3>
          </div>
          <button className="icon-button" onClick={onClose}>✕</button>
        </div>

        <form className="stack-lg" onSubmit={onSubmit}>
          {mode === 'register' ? (
            <Field label="Ad soyad">
              <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Adın Soyadın" />
            </Field>
          ) : null}

          <Field label="E-posta">
            <input value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="ornek@mail.com" />
          </Field>

          <Field label="Şifre" hint={mode === 'register' ? 'Demo sürümünde şifre SHA-256 hash ile saklanır.' : ''}>
            <input type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} placeholder="••••••••" />
          </Field>

          {error ? <div className="form-error-banner">{error}</div> : null}

          <div className="modal-card__actions">
            <Button type="button" variant="ghost" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Hesap oluştur' : 'Girişe dön'}
            </Button>
            <Button type="submit">{mode === 'login' ? 'Giriş yap' : 'Kaydı tamamla'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
