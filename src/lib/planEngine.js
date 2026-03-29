import { RECIPES } from '../data/catalog';
import { clamp } from './helpers';

function getRecipeById(id, fallback) {
  return RECIPES.find((item) => item.id === id) || fallback;
}

function getTierBasePerKg(tier) {
  if (tier === 'good') return 365;
  if (tier === 'best') return 565;
  return 455;
}

function getRecipeSurchargePerKg(recipe) {
  const boost = Number(recipe?.priceBoost || 0);
  return Math.round(boost / 3.2);
}

function selectRecipe(form) {
  let recipe = RECIPES[0];
  if (form.activity === 'very_high') recipe = getRecipeById('beef-performance', recipe);
  if (form.goal === 'lose') recipe = getRecipeById('light-control', recipe);
  if (form.lifeStage === 'puppy') recipe = getRecipeById('puppy-growth', recipe);
  if (form.lifeStage === 'senior') recipe = getRecipeById('senior-balance', recipe);
  if (form.sensitivity === 'digestion') recipe = getRecipeById('lamb-sensitive', recipe);
  if (form.sensitivity === 'skin') recipe = getRecipeById('salmon-skin', recipe);
  if (form.sensitivity === 'grain') recipe = getRecipeById('grain-free', recipe);
  if (form.sensitivity === 'chicken') recipe = getRecipeById('turkey-balance', recipe);
  return recipe;
}

function buildPricing({ form, recipe, totalGrams, dailyGrams }) {
  const totalKg = totalGrams / 1000;
  const basePerKg = getTierBasePerKg(form.tier);
  const recipeSurchargePerKg = getRecipeSurchargePerKg(recipe);
  const freshnessMultiplier = form.frequency === 'monthly' ? 0.96 : 1;
  const effectivePerKg = Math.round((basePerKg + recipeSurchargePerKg) * freshnessMultiplier);

  const foodSubtotal = Math.round(totalKg * effectivePerKg);
  const packagingFee = form.frequency === 'weekly' ? 155 : 420;
  const coldChainFee = form.frequency === 'weekly' ? 119 : 219;

  let nutritionSupportFee = 0;
  if (form.activity === 'high') nutritionSupportFee += 45;
  if (form.activity === 'very_high') nutritionSupportFee += 95;
  if (form.goal === 'gain') nutritionSupportFee += 55;
  if (form.goal === 'lose') nutritionSupportFee += 35;
  if (form.lifeStage === 'puppy' || form.lifeStage === 'senior') nutritionSupportFee += 45;
  if (form.sensitivity !== 'none') nutritionSupportFee += 40;

  let sizeHandlingFee = 0;
  if (form.size === 'large') sizeHandlingFee = 55;
  if (form.size === 'giant') sizeHandlingFee = 110;

  const baseOperationalFee = form.frequency === 'weekly' ? 89 : 149;
  const preDiscountTotal = foodSubtotal + packagingFee + coldChainFee + nutritionSupportFee + sizeHandlingFee + baseOperationalFee;
  const subscriptionDiscount = form.frequency === 'monthly' ? Math.round(preDiscountTotal * 0.06) : 0;
  const finalPrice = Math.max(990, preDiscountTotal - subscriptionDiscount);

  return {
    totalKg: Number(totalKg.toFixed(2)),
    basePerKg,
    recipeSurchargePerKg,
    effectivePerKg,
    foodSubtotal,
    packagingFee,
    coldChainFee,
    nutritionSupportFee,
    sizeHandlingFee,
    baseOperationalFee,
    subscriptionDiscount,
    finalPrice,
    notes: [
      `Toplam gramaj ${Math.round(totalGrams)} g üzerinden hesaplandı.`,
      `Günlük ${dailyGrams} g hedef porsiyon kullanıldı.`,
      `Plan seviyesi ${form.tier === 'good' ? 'Good' : form.tier === 'better' ? 'Better' : 'Best'} olarak alındı.`,
      recipeSurchargePerKg > 0 ? `${recipe.name} için premium içerik farkı eklendi.` : 'Standart tarif olduğu için ekstra içerik primi eklenmedi.',
      form.frequency === 'monthly' ? 'Aylık planda hacim indirimi uygulandı.' : 'Haftalık planda tazelik odaklı standart maliyet korundu.',
    ],
  };
}

function buildReasoning(form) {
  const reasons = [];
  if (form.lifeStage === 'puppy') reasons.push('Büyüme dönemine uygun enerji ve protein dengesi öne çıkarıldı.');
  if (form.lifeStage === 'senior') reasons.push('Senior döneme göre daha dengeli ve destekleyici yapı önerildi.');
  if (form.goal === 'lose') reasons.push('Kilo kontrolü hedefi için enerji yoğunluğu daha kontrollü tutuldu.');
  if (form.goal === 'gain') reasons.push('Kilo alma hedefi için daha destekleyici enerji planı oluşturuldu.');
  if (form.activity === 'very_high') reasons.push('Çok yüksek aktivite düzeyi nedeniyle daha yoğun bir tarif tercih edildi.');
  if (form.sensitivity === 'digestion') reasons.push('Sindirim hassasiyeti için daha sade içerikli seçenek öne çıktı.');
  if (form.sensitivity === 'skin') reasons.push('Deri ve tüy hassasiyeti nedeniyle omega desteği vurgulandı.');
  if (form.sensitivity === 'grain') reasons.push('Tahıl hassasiyeti için tahılsız içerik önerildi.');
  if (form.sensitivity === 'chicken') reasons.push('Tavuk hassasiyeti nedeniyle tavuk dışı protein ağırlığı korundu.');
  if (!reasons.length) reasons.push('Standart bakım için dengeli ve premium bir tarif seçildi.');
  return reasons;
}

export function calculatePlan(form) {
  const weight = Number(form.weight) || 12;
  const age = Number(form.age) || (form.lifeStage === 'puppy' ? 0.7 : form.lifeStage === 'senior' ? 9 : 3);
  const rer = 70 * Math.pow(Math.max(weight, 1), 0.75);

  let factor = 1.6;
  if (form.goal === 'lose') factor = 1.08;
  else if (form.goal === 'gain') factor = 2.12;
  else if (form.lifeStage === 'puppy') factor = 2.5;
  else if (form.lifeStage === 'senior') factor = 1.34;
  else if (form.activity === 'low') factor = 1.42;
  else if (form.activity === 'high') factor = 2.02;
  else if (form.activity === 'very_high') factor = 2.42;

  if (form.neutered === 'yes' && form.goal === 'maintain') factor -= 0.08;

  const mer = rer * factor;
  const dailyGrams = Math.max(145, Math.round(mer / 1.22));
  const days = form.frequency === 'weekly' ? 7 : 30;
  const totalGrams = dailyGrams * days;
  const recipe = selectRecipe(form);

  const proteinRatio = form.goal === 'lose' ? 0.115 : form.lifeStage === 'puppy' ? 0.125 : 0.102;
  const fatRatio = form.goal === 'lose' ? 0.04 : 0.052;
  const carbsRatio = form.sensitivity === 'grain' ? 0.16 : 0.19;
  const fiberRatio = form.goal === 'lose' ? 0.04 : 0.03;

  const pricing = buildPricing({ form, recipe, totalGrams, dailyGrams });
  const qualityScore = clamp(
    84 + (form.tier === 'best' ? 8 : form.tier === 'better' ? 4 : 0) + (form.sensitivity !== 'none' ? 3 : 0) + (form.activity === 'very_high' ? 2 : 0),
    72,
    99,
  );

  const mealTimes = age < 1 ? 3 : weight > 35 ? 3 : 2;

  return {
    title: `${form.dogName || 'Köpeğin'} için özel plan`,
    recipe,
    dailyGrams,
    calories: Math.round(mer),
    days,
    totalGrams,
    hydrationMl: Math.round(dailyGrams * 2),
    mealTimes,
    qualityScore,
    price: pricing.finalPrice,
    priceBreakdown: pricing,
    tierLabel: form.tier === 'good' ? 'Good' : form.tier === 'better' ? 'Better' : 'Best',
    deliveryText: form.frequency === 'weekly' ? `Her hafta ${form.deliveryDay}` : `Her ay ${form.deliveryDay}`,
    macros: {
      protein: Math.round(dailyGrams * proteinRatio),
      fat: Math.round(dailyGrams * fatRatio),
      carbs: Math.round(dailyGrams * carbsRatio),
      fiber: Math.round(dailyGrams * fiberRatio),
    },
    feedingGuide: Array.from({ length: mealTimes }, (_, index) => ({
      time: index === 0 ? 'Sabah' : index === 1 ? 'Akşam' : 'Öğlen',
      grams: Math.round(dailyGrams / mealTimes),
    })),
    reasoning: buildReasoning(form),
  };
}
