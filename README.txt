Nexora Auth (Standalone Project)

واجهة ويب حديثة بالكامل لتسجيل الدخول عبر Supabase OAuth.

## المميزات
- تصميم Glassmorphism شبه شفاف.
- Light mode بخلفية بيضاء.
- Dark mode بخلفية سوداء.
- تسجيل دخول عبر Google و Facebook.

## الإعداد
1) أنشئ مشروع Supabase.
2) فعّل OAuth providers (Google و Facebook) من Authentication -> Providers.
3) ضع Project URL و anon key في ملف config.js.
4) شغّل الموقع محلياً:
   python3 -m http.server 4173

## ملاحظة
لو OAuth مش شغال، تأكد من إضافة نفس رابط الموقع ضمن Redirect URLs في Supabase.
