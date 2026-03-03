const ADMIN_PASSWORD = "123456";
const STORAGE_KEY = "elite-company-content-v1";

const i18n = {
  ar: {
    brand: "شركة النخبة",
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "الخدمات",
    "nav.contact": "تواصل معنا",
    "nav.admin": "لوحة التحكم",
    "hero.eyebrow": "حلول أعمال حديثة",
    "hero.title": "نصنع حضورًا رقميًا قويًا لشركتك",
    "hero.text": "نساعدك في بناء الهوية، تطوير الحلول، وتسويق خدماتك بشكل عصري وشفاف.",
    "hero.cta1": "اكتشف خدماتنا",
    "hero.cta2": "ابدأ مشروعك",
    "about.title": "من نحن",
    "services.title": "الخدمات",
    "contact.title": "تواصل معنا",
    "contact.phone": "الهاتف:",
    "contact.email": "البريد:",
    "contact.address": "العنوان:",
    "form.name": "الاسم",
    "form.email": "البريد الإلكتروني",
    "form.message": "رسالتك",
    "form.send": "إرسال",
    "admin.title": "لوحة التحكم",
    "admin.note": "عدّل المحتوى ثم اضغط حفظ. التغييرات تُحفظ محليًا على نفس المتصفح.",
    "admin.password": "كلمة المرور",
    "admin.unlock": "فتح اللوحة",
    "admin.aboutLabel": "نبذة الشركة",
    "admin.phoneLabel": "الهاتف",
    "admin.emailLabel": "البريد",
    "admin.addressLabel": "العنوان",
    "admin.servicesLabel": "الخدمات (كل خدمة في سطر)",
    "admin.save": "حفظ التعديلات",
    "auth.notSignedIn": "غير مسجّل",
    "auth.googleSignIn": "تسجيل عبر Google",
    "auth.signOut": "تسجيل خروج",
    "auth.configMissing": "Google Auth غير مفعّل (راجع إعدادات Supabase)",
    footer: "© {{year}} شركة النخبة - جميع الحقوق محفوظة",
    sent: "تم إرسال رسالتك بنجاح ✅",
    badPass: "كلمة المرور غير صحيحة",
    saved: "تم حفظ التعديلات بنجاح"
  },
  en: {
    brand: "Elite Company",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    "hero.eyebrow": "Modern Business Solutions",
    "hero.title": "We build a powerful digital presence for your company",
    "hero.text": "We help you build your brand, develop solutions, and market your services with a modern transparent style.",
    "hero.cta1": "Explore Services",
    "hero.cta2": "Start Your Project",
    "about.title": "About Us",
    "services.title": "Services",
    "contact.title": "Contact Us",
    "contact.phone": "Phone:",
    "contact.email": "Email:",
    "contact.address": "Address:",
    "form.name": "Name",
    "form.email": "Email",
    "form.message": "Your message",
    "form.send": "Send",
    "admin.title": "Admin Panel",
    "admin.note": "Edit the content then click save. Changes are stored locally in this browser.",
    "admin.password": "Password",
    "admin.unlock": "Unlock",
    "admin.aboutLabel": "Company summary",
    "admin.phoneLabel": "Phone",
    "admin.emailLabel": "Email",
    "admin.addressLabel": "Address",
    "admin.servicesLabel": "Services (one per line)",
    "admin.save": "Save Changes",
    "auth.notSignedIn": "Not signed in",
    "auth.googleSignIn": "Sign in with Google",
    "auth.signOut": "Sign out",
    "auth.configMissing": "Google Auth is not configured (check Supabase settings)",
    footer: "© {{year}} Elite Company - All rights reserved",
    sent: "Your message has been sent ✅",
    badPass: "Incorrect password",
    saved: "Changes saved successfully"
  }
};

const defaultContent = {
  aboutText: "نحن شركة متخصصة في الحلول الرقمية، نؤمن أن الجمع بين الإبداع والتقنية هو الطريق الأسرع لنمو الأعمال.",
  phone: "+20 100 000 0000",
  email: "hello@elite-company.com",
  address: "القاهرة، مصر",
  services: [
    "تصميم وتطوير المواقع",
    "الهوية البصرية والعلامة التجارية",
    "التسويق الرقمي وإدارة الحملات",
    "الاستشارات التقنية للشركات"
  ]
};

let lang = localStorage.getItem("site-lang") || "ar";
let content = loadContent();
let supabaseClient = null;
let currentUser = null;

function loadContent() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return parsed ? { ...defaultContent, ...parsed } : { ...defaultContent };
  } catch {
    return { ...defaultContent };
  }
}

function saveContent(nextContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
}

function t(key) {
  return i18n[lang][key] || key;
}

function renderTexts() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = t(key).replace("{{year}}", new Date().getFullYear());
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    node.setAttribute("placeholder", t(key));
  });

  document.getElementById("langToggle").textContent = lang === "ar" ? "EN" : "AR";
  updateAuthUi();
}

function renderContent() {
  document.querySelector('[data-content="aboutText"]').textContent = content.aboutText;
  document.querySelector('[data-content="phone"]').textContent = content.phone;
  document.querySelector('[data-content="email"]').textContent = content.email;
  document.querySelector('[data-content="address"]').textContent = content.address;

  const servicesList = document.getElementById("servicesList");
  servicesList.innerHTML = "";
  content.services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "card";
    card.textContent = service;
    servicesList.appendChild(card);
  });
}

function initAdmin() {
  const adminAuth = document.getElementById("adminAuth");
  const unlockBtn = document.getElementById("unlockAdmin");
  const adminForm = document.getElementById("adminForm");

  unlockBtn.addEventListener("click", () => {
    const pass = document.getElementById("adminPassword").value;
    if (pass !== ADMIN_PASSWORD) {
      alert(t("badPass"));
      return;
    }

    adminAuth.classList.add("hidden");
    adminForm.classList.remove("hidden");

    adminForm.aboutText.value = content.aboutText;
    adminForm.phone.value = content.phone;
    adminForm.email.value = content.email;
    adminForm.address.value = content.address;
    adminForm.services.value = content.services.join("\n");
  });

  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    content = {
      aboutText: adminForm.aboutText.value.trim(),
      phone: adminForm.phone.value.trim(),
      email: adminForm.email.value.trim(),
      address: adminForm.address.value.trim(),
      services: adminForm.services.value.split("\n").map((item) => item.trim()).filter(Boolean)
    };
    saveContent(content);
    renderContent();
    alert(t("saved"));
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const result = document.getElementById("formResult");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    result.textContent = t("sent");
  });
}

function initLangSwitch() {
  document.getElementById("langToggle").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    localStorage.setItem("site-lang", lang);
    renderTexts();
  });
}

function initYear() {
  const yearNode = document.getElementById("year");
  yearNode.textContent = new Date().getFullYear();
}

function initSupabaseClient() {
  const url = window.FEEN_SUPABASE_URL;
  const key = window.FEEN_SUPABASE_ANON_KEY;
  if (!window.supabase || !url || !key) return null;
  return window.supabase.createClient(url, key);
}

function updateAuthUi() {
  const authStatus = document.getElementById("authStatus");
  const authBtn = document.getElementById("googleAuthBtn");
  if (!authStatus || !authBtn) return;

  if (!supabaseClient) {
    authStatus.textContent = t("auth.configMissing");
    authBtn.disabled = true;
    authBtn.classList.add("btn-soft");
    return;
  }

  authBtn.disabled = false;
  if (currentUser) {
    authStatus.textContent = currentUser.email || currentUser.user_metadata?.full_name || t("auth.notSignedIn");
    authBtn.textContent = t("auth.signOut");
    authBtn.classList.add("btn-danger");
    authBtn.classList.remove("btn-soft");
  } else {
    authStatus.textContent = t("auth.notSignedIn");
    authBtn.textContent = t("auth.googleSignIn");
    authBtn.classList.remove("btn-danger");
    authBtn.classList.add("btn-soft");
  }
}

async function initGoogleAuth() {
  supabaseClient = initSupabaseClient();
  updateAuthUi();

  const authBtn = document.getElementById("googleAuthBtn");
  if (!authBtn || !supabaseClient) return;

  const { data } = await supabaseClient.auth.getUser();
  currentUser = data?.user || null;
  updateAuthUi();

  authBtn.addEventListener("click", async () => {
    if (currentUser) {
      await supabaseClient.auth.signOut();
      currentUser = null;
      updateAuthUi();
      return;
    }

    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    });
  });

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    updateAuthUi();
  });
}

initYear();
renderTexts();
renderContent();
initLangSwitch();
initAdmin();
initContactForm();
initGoogleAuth();
