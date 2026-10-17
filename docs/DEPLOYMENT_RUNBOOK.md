# Bonjour Bangladesh Deployment Runbook

Status: pre-production deployment specification  
Goal: cPanel-compatible Laravel administration with safe repeatable releases and a full-featured Next.js frontend

## Hosting decision

The screenshot confirms cPanel, SSL, MySQL/phpMyAdmin, MultiPHP, cron, file manager, Git, email and SSH entry points. The client is now enabling Next.js/Node support on that host. The screenshot itself did not show a Node.js Application Manager, so the actual service still needs proof:

1. Make cPanel the primary target for both Next.js and Laravel.
2. Run a small Next.js standalone proof after the Node service is enabled: version, persistent process/Passenger mapping, restart, HTTPS, SSR and revalidation.
3. If that proof fails, host only Next.js on Vercel and keep Laravel, MySQL, email jobs and private files on cPanel.
4. Never reduce the website to a static export merely to fit the host; official Next.js documentation describes static export as limited, while a Node server supports all features.

Runtime baseline at implementation start:

- Next.js 16 current supported release, TypeScript and App Router; Node.js 20.9 or later
- Laravel 13 current supported release; PHP 8.3–8.5 and required extensions
- Current supported MySQL/MariaDB version verified against Laravel and the host
- Composer 2, cron and GD or Imagick with WebP; AVIF is optional after a real processing test

Pin exact patch versions in lockfiles after the hosting proof. Recheck security/support status immediately before production rather than assuming planning-date versions forever.

References: [Next.js deployment options](https://nextjs.org/docs/app/getting-started/deploying), [Next.js installation requirements](https://nextjs.org/docs/app/getting-started/installation), [Laravel 13 deployment requirements](https://laravel.com/framework/docs/deployment).

## Domain and webroot map

Preferred:

| Host | Application | Public/document root |
|---|---|---|
| `bonjourbangladesh.com` and `www` redirect | Next.js | Node app or Vercel project |
| `admin.bonjourbangladesh.com` | Laravel admin | API release `public/` directory |
| `api.bonjourbangladesh.com` | Laravel API | Same Laravel `public/` directory |

If cPanel cannot safely point two subdomains to the same Laravel public directory, serve the API under the admin host, for example `admin.bonjourbangladesh.com/api/v1`, and configure the frontend accordingly. Laravel's project root, `.env`, storage and private files must never be the public document root.

## Release packages

Build output contains two versioned artifacts and checksums:

```text
bonjour-web-{version}.zip
bonjour-api-{version}.zip
SHA256SUMS
release-notes.md
```

Laravel production ZIP includes application code, locked production dependencies or a verified Composer install path, compiled admin assets, migration files and a deployment manifest. It excludes `.env`, user uploads, logs, cached secrets and database dumps.

Next.js production ZIP is generated only for a verified cPanel Node target and contains the standalone server output, static assets, public assets, minimal production dependencies/manifest and start instructions. Vercel deployment instead uses a client-owned Git repository and project.

“ZIP ready” means the release is uploadable and extractable without rebuilding source assets on shared hosting. It does not mean a secure first installation can skip database credentials, environment configuration, domain mapping, cron and SSL.

## Persistent layout

Preferred when cPanel permits symlinks:

```text
bonjour/
  shared/
    .env
    public-media/
    private-techpacks/
    storage/
  releases/
    2026-10-12_001/
    2026-10-20_002/
  current -> releases/2026-10-20_002/
```

The admin/API document root targets `current/public`. Each release reconnects `shared/.env`, Laravel writable storage and public-media paths. Private tech packs stay outside every public document root.

If cPanel disallows symlinks, use a stable application directory and an allowlisted update package that replaces code/vendor/public build assets only. The updater must explicitly exclude `.env`, shared storage, public uploads, private uploads and logs. A full backup and maintenance mode are mandatory before this fallback update.

## First installation

One-time host setup:

1. Confirm PHP/Node/database versions, extensions, memory, process, disk and upload limits.
2. Create client-owned database and least-privilege database user.
3. Create admin/API subdomain mapping and SSL.
4. Upload the signed/checksummed Laravel release to a new release directory.
5. Create `.env` outside the release, generate the app key and configure database, app URLs, queue, mail and storage.
6. Install/verify production dependencies and writable-directory permissions.
7. Run migrations, seed system roles/settings only and create storage linkage.
8. Configure scheduler every minute and a cPanel-safe database-queue drain using `--stop-when-empty`.
9. Bootstrap `farooq@bonjourbangladesh.com` through a one-time expiring Owner invitation; never hardcode or email a password.
10. Run health, mail, queue, upload/processing, private-download and backup tests.
11. Deploy the Next.js target, configure API/CORS/revalidation secrets and verify apex/www redirects.
12. Protect staging, complete UAT, then enable production indexing.

## Routine Laravel ZIP update

1. Verify release checksum and read migration/rollback notes.
2. Confirm a fresh database and shared-media backup.
3. Upload/extract into a new release directory; never extract over shared data.
4. Run preflight checks and install/verify locked production dependencies.
5. Enter short maintenance mode only if the release needs it.
6. Run backward-compatible migrations with production confirmation.
7. Link persistent environment/storage, build configuration/routes/views caches and activate the new release.
8. Restart or naturally drain queues and verify scheduler heartbeat.
9. Smoke-test login, products, media, inquiry persistence/email, secure tech packs, content publish/revalidation and AI fallback.
10. Exit maintenance, monitor errors/jobs/mail, and retain the previous release for rollback.

Automated CI/Git deployment is preferred after launch, but the same artifacts and release boundaries preserve the ZIP fallback.

## Next.js update

On Vercel, deploy a pinned commit from the client-owned repository, run preview QA, then promote to production. Environment secrets and media remain external.

On verified cPanel Node hosting, upload the standalone version into a new release, preserve environment configuration, switch the app path/release and restart only the managed Node process. Smoke-test SSR, ISR/revalidation, filters, product pages and inquiry handoff.

## Database and rollback policy

- Take a database backup before every production migration.
- Prefer expand/contract migrations: add compatible structures first, deploy code, migrate data, remove old structures only in a later release.
- Code rollback switches to the previous release and restores compatible caches.
- Never assume a code rollback reverses a destructive schema migration.
- A migration needing irreversible data deletion requires a separate approved maintenance plan and tested restore.
- Keep at least the current and previous known-good release; remove older releases only after backup verification.

## Upload and attachment safety gate

Public product media may process only after MIME/signature validation. Tech-pack uploads require private storage, strict allowlist/size limit, quarantine and a working malware-scanning service. If reliable scanning cannot be provided on this cPanel plan, public file upload remains disabled at launch and the form asks the buyer to send files through an approved manual channel after initial contact.

## Backup and recovery

- Encrypted database backup daily, 30-day retention
- Public media/config weekly, eight-week retention
- Private attachments according to the approved retention policy
- Offsite copy outside the cPanel account
- Restore rehearsal before launch and quarterly afterwards
- Record recovery owner, last success and last restore-test date in admin system health

## Final production gate

- Runtime and storage proof passes on the actual host
- Apex/admin/API domain and SSL mapping verified
- `.env`, logs and private files cannot be fetched publicly
- Updating a release leaves database and every uploaded file intact
- Failed deployment can switch back to the previous code release
- Cron, queues, mail, media processing, AI fallback and backups are monitored
- Next.js/Laravel security support windows are current
- DNS, hosting, repository, Vercel if used, email and analytics remain client-owned
