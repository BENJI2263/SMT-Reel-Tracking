# API endpoint envanteri

Bu liste kullanıcı tarafından iletilen son Worker kaynak kodundan otomatik çıkarılmıştır.
İstek/yanıt alanları, yetkilendirme ve hata durumları için `src/worker.js` kaynak kodu esas alınmalıdır.

Tüm `/api/` uçları mevcut kodda `APP_PIN` kontrolü altındadır. İstemci genellikle `X-App-Pin` başlığını gönderir. Bu mekanizma kurumsal kimlik doğrulama yerine geçmez.

| Metot | Yol |
|---|---|
| `GET` | `/` |
| `GET` | `/api/dashboard` |
| `GET` | `/api/health` |
| `GET` | `/api/jobs/list` |
| `GET` | `/api/projects` |
| `GET` | `/api/report` |
| `POST` | `/api/import` |
| `POST` | `/api/jobs/create` |
| `POST` | `/api/loaded` |
| `POST` | `/api/loaded-bulk` |
| `POST` | `/api/manual-pick` |
| `POST` | `/api/projects/create` |
| `POST` | `/api/reel-change` |
| `POST` | `/api/reset-bottom` |
| `POST` | `/api/reset-feeder` |
| `POST` | `/api/revisions/approve` |
| `POST` | `/api/revisions/create` |
| `POST` | `/api/revisions/import` |
| `POST` | `/api/scan` |
| `POST` | `/api/shared-sync` |
