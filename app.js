const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

$("#y").textContent = new Date().getFullYear();

// =====================
// Date hint sync: показываем выбранную дату в .dateHint
// =====================
(() => {
  const el = document.getElementById("date");
  if (!el) return;
  const hint = el.parentElement.querySelector(".dateHint");
  if (!hint) return;

  const fmt = (v) => {
    if (!v) return "Дата";
    const [y,m,d] = v.split("-");
    return `${d}.${m}.${y}`; // dd.mm.yyyy
  };

  const sync = () => { hint.textContent = fmt(el.value); };
  el.addEventListener("change", sync);
  el.addEventListener("input", sync);
  sync();
})();

// =====================
// Date: force open picker on click (clean version)
// =====================
(() => {
  const el = document.getElementById("date");
  if (!el) return;

  el.addEventListener("click", () => {
    if (typeof el.showPicker === "function") {
      el.showPicker();
    }
  });
})();

// =====================
// CONFIG
// =====================
const TELEGRAM_USERNAME = "safronovichpwnz"; // без @
const PHONE_TEL = "+79852280088";
const EMAIL = "ivan.ivanovichpwnz@gmail.com";

// =====================
// CONTACT SUBMIT -> TELEGRAM (primary) + MAILTO fallback
// =====================
window.kbSubmit = (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);

  const name = (fd.get("name") || "").toString().trim();
  const contact = (fd.get("contact") || "").toString().trim();
  const date = (fd.get("date") || "").toString().trim();
  const city = (fd.get("city") || "").toString().trim();
  const guests = (fd.get("guests") || "").toString().trim();
  const format = (fd.get("format") || "").toString().trim();
  const msg = (fd.get("msg") || "").toString().trim();

  const text =
`Private Chef Inquiry — chefsafronovich.com

Name: ${name}
Contact: ${contact}
Date: ${date || "-"}
City: ${city}
Guests: ${guests}
Format: ${format || "-"}

${msg || "-"}`;

  // Telegram deeplink (works on mobile + desktop with Telegram installed / web)
  const tgUrl = `https://t.me/${encodeURIComponent(TELEGRAM_USERNAME)}?text=${encodeURIComponent(text)}`;
  window.open(tgUrl, "_blank", "noopener");

  // Optional fallback mailto (uncomment if you want)
  // const subject = encodeURIComponent("Private Chef Request — chefbahnev.com");
  // const body = encodeURIComponent(text);
  // window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

  return false;
};

// =====================
// RU/EN i18n (простая версия)
// =====================
let lang = "ru";
const dict = {
  ru: {
    kicker: "Private Chef • Moscow • Europe",
    title: "Личный шеф-повар<br/> Русская кухня с европейской идентичностью",
    subtitle: "",
    signature: "Итальянская школа, французская точность и классическая Россия — в новом прочтении",
    cta: "Запросить дату",
    cta2: "Посмотреть работы",

    nav_about: "Обо мне",
    nav_career: "Карьера",
    nav_services: "Услуги",
    nav_gallery: "Галерея",
    nav_contact: "Запросить дату",

    about_h: "Обо мне",
    about_p1: "Я — частный шеф-повар. Создаю камерные ужины, семейные мероприятия и закрытые приёмы в формате fine dining дома — спокойно, точно и с вниманием к деталям.",
    about_p2: "Моя работа — это не только вкус, но и сервис: подбор продуктов, меню под запрос и сезон, аккуратная подача, чистота на кухне и комфорт гостей. Вы получаете ресторанный уровень у себя дома — без суеты и лишних действий с вашей стороны.",

    career_h: "Путь",
    career_p1: "Мой профессиональный путь начался с обучения в московском колледже «Царицыно», где я получил образование технолога и проходил практику в известных отелях Москвы, включая Marriott Aurora, Lotte Plaza и Metropol. В этот период я также прошёл стажировки в Италии и Германии, познакомившись с европейскими гастрономическими традициями и профессиональными стандартами кухни.",
    career_p2: "Дальнейший опыт я получил, работая в премиальных ресторанных проектах Москвы, включая ресторан Dante и 02 Lounge в The Ritz-Carlton Moscow, где прошёл путь до позиции су-шефа и руководил командой кухни. Позднее участвовал в запуске ресторанных проектов и гастрономических экспедициях по России, работая с локальными продуктами и региональными деликатесами.",

    srv_h: "Услуги",
    srv1h: "Private Dining",
    srv1p: "Камерные ужины дома, в апартаментах или загородной резиденции. Индивидуальное меню, закупка, подача, сервис.",
    srv1l1: "Меню под запрос", srv1l2: "Премиальные продукты", srv1l3: "Сервис “под ключ”",
    srv2h: "Family Chef",
    srv2p: "Регулярное сопровождение семьи: рацион, закупки, организация кухни и процессов.",
    srv2l1: "Weekly planning", srv2l2: "Организация кухни", srv2l3: "Предпочтения и ограничения",
    srv3h: "Catering",
    srv3p: "Премиальный выездной кейтеринг для частных мероприятий, ужинов и специальных событий. Полная организация кухни, подачи и сервиса.",
    srv3l1: "Индивидуальное меню",
    srv3l2: "Выездная кухня и подача",
    srv3l3: "Команда сервиса и координация",

    gal_h: "Галерея",
    gal_p: "Selected works — private dining, family chef, VIP events.",
    gal_tab_all: "Все",
    gal_tab_dining: "Private Dining",
    gal_tab_events: "Events",
    gal_tab_plating: "Plating",
    gal_tab_season: "Seasonal",

    // CONTACT — Concierge (Variant A)

    con_h: "Запросить дату",
    con_p: "Оставьте детали — отвечу с концепцией меню и форматом обслуживания.",
    con_tg: "Написать в Telegram",
    con_call: "Позвонить",
    con_mail: "Email",
    con_ig: "Instagram",

    con_m1k: "Ответ",     con_m1v: "обычно 1–2 часа",
    con_m2k: "География", con_m2v: "Москва / Европа",
    con_m3k: "Формат",    con_m3v: "Private Dining • Family Chef • Catering",

    con_trust_t: "Детали",
    con_trust_1: "Конфиденциальность",
    con_trust_2: "Меню под предпочтения и ограничения",
    con_trust_3: "Команда и сервис — при необходимости",

    con_form_h: "Запрос",
    con_form_p: "Коротко заполните — дальше продолжим в Telegram.",
    con_step1: "1) Дата / город / гости",
    con_step2: "2) Формат",
    con_step3: "3) Контакт и детали",

    chip1d: "Камерный ужин с подачей",
    chip2d: "Рацион и сопровождение",
    chip3d: "Событие с командой",

    // fields
    f1: "Имя",
    f2: "Телефон или email",
    f3: "Дата / город / гости",
    f4: "Комментарий",
    f_date: "Дата",
    f_city: "Город",
    f_guests: "Гости",
    send: "Отправить запрос в Telegram",
    fine: "Отправка откроет Telegram с уже заполненным сообщением (данные не сохраняются на сайте)."
  },

  en: {
    kicker: "Private Chef • Moscow • Europe",
    title: "Private Chef<br/> Russian Cuisine with a European Identity",
    subtitle: "",
    signature: "Italian culinary school, French precision, and the classics of Russian cuisine reinterpreted",
    cta: "Request a date",
    cta2: "View portfolio",

    nav_about: "About",
    nav_career: "Career",
    nav_services: "Services",
    nav_gallery: "Gallery",
    nav_contact: "Request a date",

    about_h: "About",
    about_p1: "I am a private chef creating intimate dinners, family gatherings, and exclusive receptions in a fine dining at home format — calm, precise, and with attention to every detail.",
    about_p2: "My work is not only about flavor, but also about service: selecting quality ingredients, creating seasonal menus tailored to each request, elegant presentation, a clean and organized kitchen, and a comfortable experience for guests. You receive a restaurant-level experience in your own home — without the stress or extra effort.",

    career_h: "Journey",
    career_p1: "My professional journey began at the Tsaritsyno Culinary College in Moscow, where I trained as a food technologist and completed internships at renowned Moscow hotels, including Marriott Aurora, Lotte Plaza, and Metropol. During this time, I also had the opportunity to undertake culinary internships in Italy and Germany, where I became familiar with European gastronomic traditions and professional kitchen standards.",
    career_p2: "I later gained experience working in premium restaurant projects in Moscow, including Dante and 02 Lounge at The Ritz-Carlton Moscow, where I progressed to the position of Sous Chef and led a kitchen team. I also participated in the launch of restaurant projects and culinary expeditions across Russia, working with local products and regional delicacies.",

    srv_h: "Services",
    srv1h: "Private Dining",
    srv1p: "Intimate dinners at home or in the countryside. Custom menu, sourcing, service.",
    srv1l1: "Custom menu", srv1l2: "Premium sourcing", srv1l3: "Turnkey service",
    srv2h: "Family Chef",
    srv2p: "Ongoing support for families: weekly planning, sourcing, kitchen setup.",
    srv2l1: "Weekly planning", srv2l2: "Kitchen setup", srv2l3: "Preferences & allergies",
    srv3h: "Catering",
    srv3p: "Premium catering for private events, celebrations and special occasions. Full organization of kitchen, service and presentation.",
    srv3l1: "Custom menu design",
    srv3l2: "On-site kitchen & service",
    srv3l3: "Professional service coordination",

    gal_h: "Gallery",
    gal_p: "Selected works — private dining, family chef, VIP events.",
    gal_tab_all: "All",
    gal_tab_dining: "Private Dining",
    gal_tab_events: "Events",
    gal_tab_plating: "Plating",
    gal_tab_season: "Seasonal",

    // CONTACT — Concierge (Variant A)
    con_kicker: "Reservation / Concierge",
    con_h: "Request a date",
    con_p: "Share the essentials — I’ll reply with a menu concept and service format.",
    con_tg: "Message on Telegram",
    con_call: "Call",
    con_mail: "Email",
    con_ig: "Instagram",

    con_m1k: "Reply",     con_m1v: "usually within 1–2 hours",
    con_m2k: "Location",  con_m2v: "Moscow / Europe",
    con_m3k: "Format",    con_m3v: "Private Dining • Family Chef • Private Events",

    con_trust_t: "Details",
    con_trust_1: "Confidentiality (NDA on request)",
    con_trust_2: "Menu tailored to preferences & dietary needs",
    con_trust_3: "Team & service — if required",

    con_form_h: "Request",
    con_form_p: "Share the essentials — we’ll continue in Telegram.",
    con_step1: "1) Date / city / guests",
    con_step2: "2) Format",
    con_step3: "3) Contact & details",

    chip1d: "Intimate dinner with service",
    chip2d: "Weekly planning & support",
    chip3d: "Event with a team",

    // fields
    f1: "Name",
    f2: "Phone or email",
    f3: "Date / city / guests",
    f4: "Message",
    f_date: "Date",
    f_city: "City",
    f_guests: "Guests",
    send: "Send request via Telegram",
    fine: "This opens Telegram with a pre-filled message (no data stored on the website)."
  }
};

function applyLang(next) {
  lang = next;

  // <html lang="ru|en">
  document.documentElement.lang = (lang === "ru") ? "ru" : "en";

  // text blocks (innerHTML)
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (dict[lang][k]) el.innerHTML = dict[lang][k];
  });

  // placeholders (inputs/textarea)
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const k = el.getAttribute("data-i18n-ph");
    if (dict[lang][k]) el.setAttribute("placeholder", dict[lang][k]);
  });

  // lang button label
  $("#langBtn").textContent = (lang === "ru") ? "EN" : "RU";
}

$("#langBtn").addEventListener("click", () => applyLang(lang === "ru" ? "en" : "ru"));
applyLang("ru");

// =====================
// Header scroll behavior (shrink-only)
// =====================
(() => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// =====================
// Subtle reveal animations (lux)
// =====================
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const els = $$("[data-reveal]");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  els.forEach((el, i) => {
    el.style.setProperty("--d", `${Math.min(i * 70, 420)}ms`);
    io.observe(el);
  });
})();

// =====================
// Subtle parallax (3–5px)
// =====================
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const items = $$("[data-parallax]");
  if (!items.length) return;

  const onScroll = () => {
    const y = window.scrollY || 0;
    items.forEach(el => {
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.02;
      const v = Math.max(-6, Math.min(6, y * speed));
      el.style.transform = `translate3d(0, ${v}px, 0)`;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// =====================
// Gallery Filmstrip (C)
// =====================
(() => {
  const cats = []; // категории отключены
  const thumbs = $$(".galThumb");
  const mainImg = document.querySelector(".galleryMain__img");
  const mainCap = document.querySelector(".galleryMain__cap");

  if (!thumbs.length || !mainImg) return;

  // Disable browser scroll restore + force top on first load
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("load", () => window.scrollTo(0, 0));

  let currentCat = "all";

  function setMain(src, cap) {
    mainImg.style.opacity = 0;

    setTimeout(() => {
      mainImg.src = src;
      if (mainCap) mainCap.textContent = cap || "";
      mainImg.style.opacity = 1;
    }, 180);
  }

  function filterByCat(key, { scroll = false } = {}) {
    currentCat = key;

    // active category button
    cats.forEach(c =>
      c.classList.toggle("is-active", c.dataset.key === key)
    );

    // show/hide thumbs
    thumbs.forEach((t, i) => {
      t.style.display = "";
      setTimeout(() => t.classList.add("is-visible"), i * 40);
    });

    // pick first visible thumb and set main
    const first = thumbs[0];
    if (first) {
      thumbs.forEach(t => t.classList.remove("is-active"));
      first.classList.add("is-active");
      setMain(first.dataset.full, first.dataset.cap);
    }

    // scroll ONLY when user clicked a category
    if (scroll) {
      const target = document.querySelector(".galleryViewer") || document.querySelector(".galleryMain");
      if (target) {
        const r = target.getBoundingClientRect();
        if (r.top > 120) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }



  // thumb click -> set main (no page scroll)
  thumbs.forEach(btn => {
    btn.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("is-active"));
      btn.classList.add("is-active");
      setMain(btn.dataset.full, btn.dataset.cap);
    });
  });

  // initial state (NO scroll)
  filterByCat("all", { scroll: false });
})();

// Contact format tiles (Variant 3)
(() => {
  const root = document.querySelector("#contact");
  if (!root) return;

  const hidden = root.querySelector('input[name="format"]');
  const tiles = Array.from(root.querySelectorAll(".tile"));
  if (!hidden || !tiles.length) return;

  const setActive = (btn) => {
    tiles.forEach(t => t.classList.remove("is-active"));
    btn.classList.add("is-active");
    hidden.value = btn.dataset.format || btn.textContent.trim();
  };

  tiles.forEach(btn => btn.addEventListener("click", () => setActive(btn)));

  const first = tiles.find(t => t.classList.contains("is-active")) || tiles[0];
  setActive(first);
})();
