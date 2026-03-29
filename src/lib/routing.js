const VIEWS = new Set(['home', 'catalog', 'planner', 'result', 'checkout', 'dashboard', 'admin', 'faq', 'about']);

export function hashToView(hash) {
  const clean = String(hash || '').replace(/^#/, '');
  return VIEWS.has(clean) ? clean : 'home';
}

export function viewToHash(view) {
  return `#${VIEWS.has(view) ? view : 'home'}`;
}
