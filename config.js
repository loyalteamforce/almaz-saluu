// ============================================================
//  №1_Shop_KGZ — ЖӨНДӨӨЛӨР (баалар, банктар, номер)
//  Бааны же банкты өзгөртүү үчүн ушул файлды гана оңдоңуз.
// ============================================================

window.SHOP = {
  name: "№1_Shop_KGZ",
  phone: "0777050908",          // көрсөтүлүүчү номер
  whatsapp: "996777050908",     // WhatsApp үчүн (996 + номер, 0сүз)
  currency: "сом",

  // ---------- АЛМАЗДАР ----------
  diamonds: [
    { id: "d100",  amount: 100,  bonus: 10,  price: 85 },
    { id: "d210",  amount: 210,  bonus: 21,  price: 170 },
    { id: "d530",  amount: 530,  bonus: 53,  price: 420, hit: true },
    { id: "d1080", amount: 1080, bonus: 108, price: 830 },
    { id: "d2200", amount: 2200, bonus: 220, price: 1650 },
    { id: "d5600", amount: 5600, bonus: 560, price: 4100 }
  ],

  // ---------- ВАУЧЕРЛЕР / ПРОПУСК / ПРОКАЧКА ----------
  extras: [
    { id: "week",  title: "Апталык ваучер",  desc: "7 күн ичинде күн сайын алмаз", price: 160, icon: "🎟️" },
    { id: "month", title: "Айлык ваучер",    desc: "30 күн ичинде күн сайын алмаз", price: 750, icon: "📅", hit: true },
    { id: "pass",  title: "Пропуск (Booyah Pass)", desc: "Сезондук пропуск, сыйлыктар", price: 350, icon: "🏆" },
    { id: "level", title: "Прокачка",        desc: "Аккаунтту көтөрүү — баасы келишим боюнча", price: 0, icon: "⚡" }
  ],

  // ---------- БАНКТАР ----------
  // qr: банктын тиркемесинен алынган QR сүрөтүнүн жолу (assets/qr/ папкасына салыңыз).
  // Сүрөт жок болсо, сайт номерди жана WhatsApp QR'ын көрсөтөт.
  banks: [
    { id: "mbank",  name: "MBank",       color: "#00a651", account: "0777050908", holder: "", qr: "assets/qr/mbank.png" },
    { id: "obank",  name: "O! Банк",     color: "#e4007c", account: "0777050908", holder: "", qr: "assets/qr/obank.png" },
    { id: "eldik",  name: "Элдик Банк",  color: "#0067b1", account: "0777050908", holder: "", qr: "assets/qr/eldik.png" },
    { id: "elcart", name: "Элкарт",      color: "#d4a017", account: "0777050908", holder: "", qr: "assets/qr/elcart.png" },
    { id: "abank",  name: "Abank",       color: "#e30613", account: "0777050908", holder: "", qr: "assets/qr/abank.png" }
  ]
};
