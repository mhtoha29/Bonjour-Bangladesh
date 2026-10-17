# Bonjour Bangladesh

Premium, dynamic garment buying-house and apparel-sourcing platform for Bonjour Bangladesh.

## Applications

- `apps/web` — Next.js public website and admin interface.
- `apps/api` — Laravel API, content management, products, inquiries and media.

## Local development

```bash
cd apps/api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

In another terminal:

```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev -- --hostname 127.0.0.1
```

The website runs at `http://127.0.0.1:3000` and the Laravel API at `http://127.0.0.1:8000`.

## Production architecture

- Deploy `apps/web` to Vercel with the project Root Directory set to `apps/web`.
- Deploy `apps/api` to the PHP/cPanel server, ideally at `api.bonjourbangladesh.com`.
- Keep Laravel's database and `storage/app` persistent between releases so uploaded products and files survive code updates.
- Configure the frontend variables from `apps/web/.env.example` with production URLs.
- Keep `SEO_INDEXABLE=false` until final content, media, legal copy and certification-display rights are approved.

## Quality gates

```bash
cd apps/web && npm run lint && npm run build
cd apps/api && php artisan test
```
