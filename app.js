const SUPABASE_URL = window.FEEN_SUPABASE_URL;
const SUPABASE_ANON_KEY = window.FEEN_SUPABASE_ANON_KEY;

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const themeBtn = document.getElementById("themeBtn");
const statusBox = document.getElementById("statusBox");
const guestActions = document.getElementById("guestActions");
const userBox = document.getElementById("userBox");
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("nexora-theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("nexora-theme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (preferredDark ? "dark" : "light"));
}

async function loginWith(provider) {
  statusBox.textContent = "جارِ تحويلك لمزود تسجيل الدخول...";
  const { error } = await sb.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.href.split("#")[0],
      queryParams: { prompt: "select_account" }
    }
  });

  if (error) {
    statusBox.textContent = `تعذر تسجيل الدخول: ${error.message}`;
  }
}

function renderSession(session) {
  if (session?.user) {
    statusBox.textContent = "أنت مسجّل دخول حالياً.";
    guestActions.classList.add("hidden");
    userBox.classList.remove("hidden");
    userEmail.textContent = session.user.email || session.user.user_metadata?.full_name || "مستخدم";
  } else {
    statusBox.textContent = "سجّل دخولك للمتابعة.";
    guestActions.classList.remove("hidden");
    userBox.classList.add("hidden");
  }
}

initTheme();

document.getElementById("googleBtn").addEventListener("click", () => loginWith("google"));
document.getElementById("facebookBtn").addEventListener("click", () => loginWith("facebook"));

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

logoutBtn.addEventListener("click", async () => {
  await sb.auth.signOut();
  renderSession(null);
});

sb.auth.getSession().then(({ data }) => {
  renderSession(data.session);
});

sb.auth.onAuthStateChange((_event, session) => {
  renderSession(session);
});
