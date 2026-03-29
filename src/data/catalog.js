export const RECIPES = [
  {
    id: 'turkey-balance',
    name: 'Hindi & Sebze Balance',
    badge: 'Günlük bakım',
    description: 'Günlük bakım için dengeli, gerçek et odaklı ve hafif bir reçete.',
    ingredients: ['Hindi', 'Kabak', 'Havuç', 'Pirinç', 'Balık yağı'],
    protein: 'single',
    priceBoost: 0,
  },
  {
    id: 'lamb-sensitive',
    name: 'Kuzu & Pirinç Sensitive',
    badge: 'Hassas sindirim',
    description: 'Sindirim hassasiyeti için daha sade içerikli ve yumuşak geçişli reçete.',
    ingredients: ['Kuzu', 'Pirinç', 'Kabak', 'Rezene', 'Hindistancevizi yağı'],
    protein: 'single',
    priceBoost: 220,
  },
  {
    id: 'salmon-skin',
    name: 'Somon & Sebze Skin Support',
    badge: 'Deri & tüy desteği',
    description: 'Omega-3 desteği yüksek, deri ve tüy hassasiyetine göre kurgulanmış premium reçete.',
    ingredients: ['Somon', 'Tatlı patates', 'Ispanak', 'Kabak', 'Keten tohumu'],
    protein: 'single',
    priceBoost: 260,
  },
  {
    id: 'grain-free',
    name: 'Grain-Free Balance',
    badge: 'Tahılsız',
    description: 'Tahıl hassasiyeti yaşayan köpekler için tahılsız içerik yapısı.',
    ingredients: ['Hindi', 'Tatlı patates', 'Kabak', 'Ispanak', 'Balık yağı'],
    protein: 'single',
    priceBoost: 240,
  },
  {
    id: 'light-control',
    name: 'Hindi Light Control',
    badge: 'Kilo kontrol',
    description: 'Enerji yoğunluğu kontrollü, kilo vermek isteyen köpekler için optimize reçete.',
    ingredients: ['Hindi', 'Brokoli', 'Kabak', 'Pirinç', 'L-Carnitine'],
    protein: 'single',
    priceBoost: 140,
  },
  {
    id: 'puppy-growth',
    name: 'Puppy Growth Recipe',
    badge: 'Yavru gelişim',
    description: 'Büyüme dönemindeki köpekler için enerji ve protein odağı güçlendirilmiş plan.',
    ingredients: ['Tavuk', 'Pirinç', 'Yumurta', 'Havuç', 'Somon yağı'],
    protein: 'mixed',
    priceBoost: 160,
  },
  {
    id: 'senior-balance',
    name: 'Senior Balance Recipe',
    badge: 'Senior bakım',
    description: 'Yaş alan köpeklerde eklem ve sindirim dengesini önceleyen reçete.',
    ingredients: ['Hindi', 'Balkabağı', 'Ispanak', 'Pirinç', 'Glukozamin'],
    protein: 'single',
    priceBoost: 110,
  },
  {
    id: 'beef-performance',
    name: 'Dana Performance',
    badge: 'Yüksek aktivite',
    description: 'Yüksek enerji harcayan köpekler için performans odaklı, yoğun içerikli menü.',
    ingredients: ['Dana', 'Patates', 'Pancar', 'Havuç', 'Balık yağı'],
    protein: 'single',
    priceBoost: 280,
  },
];

export const FAQS = [
  ['Mamalar nasıl saklanır?', 'Teslim edilen paketler soğuk zincir ile gelir. Buzdolabında saklanır ve paket üstündeki önerilen tüketim süresi içinde kullanılır.'],
  ['Aboneliği durdurabilir miyim?', 'Evet. Panel içinde aboneliği durdurabilir, yeniden başlatabilir veya tamamen iptal edebilirsin.'],
  ['Kaç günlük ürün geliyor?', 'Haftalık plan 7 günlük, aylık plan ise 30 günlük üretim mantığıyla hesaplanır.'],
  ['Her köpek için uygun mu?', 'Yaş, kilo, aktivite ve hassasiyet bilgilerine göre öneri üretilir. Klinik durumlarda veteriner onayı gerekir.'],
  ['Gerçek ödeme var mı?', 'Bu sürüm ürün hissi veren bir demo + MVP katmanıdır. Kart formu doğrulanır ama gerçek tahsilat yapılmaz.'],
  ['Fiyatlar neye göre değişiyor?', 'Kilo, hedef, aktivite, seçilen tarif, plan seviyesi ve teslimat sıklığı fiyatı etkiler.'],
];

export const TESTIMONIALS = [
  { name: 'Selin & Tarçın', city: 'İstanbul', text: 'Tarçın’ın sindirim problemi yüzünden çok mama değiştirdik. Bu yapı ilk kez gerçekten kişiselleştirilmiş hissettirdi.' },
  { name: 'Mert & Badem', city: 'İzmir', text: 'Plan oluşturucu, fiyat mantığı ve teslimat akışı demo için beklediğimden çok daha düzenli.' },
  { name: 'Ece & Luna', city: 'Ankara', text: 'Sonuç ekranında neden o tarifin seçildiğini açıklaması bana güven verdi.' },
  { name: 'Bora & Paşa', city: 'Antalya', text: 'Yönetim panelini görünce bu işin sadece vitrin değil operasyon tarafı da düşünülmüş hissi oluştu.' },
];

export const HERO_METRICS = [
  { label: 'Köpeğe özel', value: 'planlama motoru' },
  { label: 'Soğuk zincir', value: 'korumalı teslimat' },
  { label: 'Haftalık / aylık', value: 'esnek abonelik' },
  { label: 'Şeffaf fiyat', value: 'açıklanabilir hesap' },
];

export const HIGHLIGHTS = [
  { title: 'Veteriner mantığında formül', text: 'Enerji, hedef ve hassasiyet bilgisine göre plan omurgası kurulur.' },
  { title: 'Açıklanabilir fiyat', text: 'Fiyat tek sayı olarak değil; gramaj, paketleme ve teslimat etkisiyle gösterilir.' },
  { title: 'Sakin kullanıcı akışı', text: 'Ana sayfa → plan → sonuç → ödeme → panel yapısı anlaşılır tutulur.' },
  { title: 'Premium his', text: 'Aşırı karmaşık değil, rafine ve güven veren bir arayüz dili kullanılır.' },
];
