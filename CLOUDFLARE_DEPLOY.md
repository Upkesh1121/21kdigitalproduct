# Cloudflare Pages Deployment

Use Cloudflare Pages for this project.

Build settings:

```text
Build command: npm run build
Build output directory: dist/client
Functions directory: functions
```

Required Cloudflare environment variables:

```text
SITE_URL=https://21k.in
PRODUCT_PRICE=199
CASHFREE_ENV=production
CASHFREE_API_VERSION=2023-08-01
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SECRET_KEY=your_supabase_service_role_key
ADMIN_ACCESS_KEY=your_long_random_admin_key
ADMIN_EMAILS=your-admin@gmail.com
```

Do not commit real secret values. Add them in Cloudflare Pages under Settings > Environment variables.

Cashfree webhook URL:

```text
https://21k.in/api/cashfree-webhook
```

Supabase setup:

Run `supabase-schema.sql` once in the Supabase SQL editor if the `orders` and `buyers` tables do not already exist.

Supabase Auth URL setup:

```text
Site URL: https://21k.in
Redirect URLs:
https://21k.in/login
https://21k.in/login?*
```

Google login setup:

Enable Google in Supabase Auth > Providers. In Google Cloud Console, add the Supabase callback URL shown in Supabase's Google provider settings. The site uses `/api/google-login` to start Google OAuth and redirects back to `/login`.

Supabase email template:

In Supabase, go to Authentication > Email Templates > Magic Link.

Use this subject:

```text
Your secure 21k login link
```

Paste the full HTML from `supabase-magic-link-email.html` into the Magic Link template. This avoids the default Supabase email and sends users to `https://21k.in/login`, not localhost.

If you still receive a plain email from `noreply@mail.app.supabase.io` that says only "Your sign-in link", Supabase is still using its default template. Paste the repo template into Supabase Auth > Email Templates > Magic Link and save it there.

For a more professional sender name, configure Authentication > SMTP Settings with your own sender, for example:

```text
Sender name: 21k
Sender email: support@21k.in
```
