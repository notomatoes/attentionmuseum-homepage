const zhBtn = document.getElementById("lang-zh");
const enBtn = document.getElementById("lang-en");
const sections = document.querySelectorAll("[data-lang]");
const yearEl = document.getElementById("year");
const i18nNodes = document.querySelectorAll("[data-i18n]");

const copy = {
  zh: {
    eyebrow: "AttentionMuseum · 隐私与支持",
    title: "隐私政策与技术支持",
    subtitle: "我们尽量在你的设备本地处理数据，不出售或共享你的个人信息。",
    updated: "最后更新：2026-03-17"
  },
  en: {
    eyebrow: "AttentionMuseum · Privacy & Support",
    title: "Privacy Policy & Support",
    subtitle: "We process data locally where possible and do not sell or share your personal information.",
    updated: "Last Updated: 2026-03-17"
  }
};

function setLanguage(lang) {
  for (const section of sections) {
    const visible = section.dataset.lang === lang;
    section.hidden = !visible;
  }

  zhBtn.classList.toggle("active", lang === "zh");
  enBtn.classList.toggle("active", lang === "en");
  zhBtn.setAttribute("aria-selected", String(lang === "zh"));
  enBtn.setAttribute("aria-selected", String(lang === "en"));

  for (const node of i18nNodes) {
    const key = node.dataset.i18n;
    if (copy[lang][key]) {
      node.textContent = copy[lang][key];
    }
  }

  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  localStorage.setItem("attentionmuseum_lang", lang);
}

zhBtn.addEventListener("click", () => setLanguage("zh"));
enBtn.addEventListener("click", () => setLanguage("en"));

const saved = localStorage.getItem("attentionmuseum_lang");
const browserLang = navigator.language.toLowerCase();
const initialLang = saved || (browserLang.startsWith("zh") ? "zh" : "en");

setLanguage(initialLang);
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
