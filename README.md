This is my personal portfolio, where I share my skills, the projects I’ve worked on, and my contact information. It serves as a quick overview of what I can do and the work I’ve completed.

## Vercel deployment

This repo is ready for Vercel deployment.

Deploy steps:

1. Import this GitHub repo into Vercel.
2. Keep the default build command as `npm run build`.
3. Use `build` as the output folder if Vercel asks for one.
4. Add your custom domain `anashakimidev.my` in the Vercel project settings.

For Exabytes DNS, use these records:

1. A record for `@` pointing to `76.76.21.21`.
2. CNAME record for `www` pointing to `cname.vercel-dns.com`.

If Exabytes lets you choose a primary domain, set `anashakimidev.my` as the root domain and let Vercel manage HTTPS after DNS propagates.
