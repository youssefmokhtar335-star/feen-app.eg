Elite Company Website

Simple modern glass-style company website with:
- Home
- About
- Services
- Contact
- Admin panel (local content editor)
- Arabic/English language toggle
- Google sign-in (via Supabase OAuth)

How to use:
1) Open index.html in browser (or run any static server).
2) Visit "لوحة التحكم / Admin" section.
3) Enter password: 123456
4) Edit content and save.

Google login setup:
1) In Supabase Dashboard > Authentication > Providers, enable Google.
2) Add your Site URL and Redirect URL in Supabase Auth settings.
3) Set `FEEN_SUPABASE_URL` and `FEEN_SUPABASE_ANON_KEY` in `config.js`.

Notes:
- Content is saved in browser localStorage.
- Change ADMIN_PASSWORD in app.js before production deployment.
