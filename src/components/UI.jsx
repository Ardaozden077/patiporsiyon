import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button className={`button button--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function Badge({ children, tone = 'default' }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <div className="section-heading__eyebrow">{eyebrow}</div> : null}
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

export function Field({ label, error, hint, children }) {
  return (
    <label className="field">
      {label ? <span className="field__label">{label}</span> : null}
      {children}
      {hint ? <span className="field__hint">{hint}</span> : null}
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}

export function Stat({ label, value, helper }) {
  return (
    <Card className="stat-card">
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value}</strong>
      {helper ? <span className="stat-card__helper">{helper}</span> : null}
    </Card>
  );
}
