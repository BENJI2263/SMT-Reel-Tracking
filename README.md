# SMT Reel Tracking – Entegrasyon Devir Paketi

Bu depo, SMT üretim hattında **makara toplama, feeder eşleştirme, QR/DataMatrix doğrulama, yedek makara değişimi ve işlem kaydı** için hazırlanmış Cloudflare Workers prototipinin kaynak kodunu içerir.

**Amaç:** Kodun başka bir kurumsal traceability uygulamasına taşınmasını ve iş kurallarının incelenmesini kolaylaştırmak. Bu depo canlı Cloudflare D1 veritabanını veya gerçek üretim kayıtlarını içermez.

## Dosyalar
- `src/worker.js`: Kullanıcının 5 Kasım 2026 tarihinde paylaştığı son çalışan Worker kaynak kodu; arayüz, API ve SQL sorguları aynı dosyadadır.
- `docs/ARCHITECTURE.md`: Genel mimari ve işlem akışı.
- `docs/API_ENDPOINTS.md`: Koddan tespit edilen HTTP uçları.
- `docs/INTEGRATION_GUIDE.md`: Mevcut traceability sistemine taşıma notları.
- `database/README.md`: Gerçek D1 veritabanı şemasının güvenli aktarımı.

## Önemli sınırlar
- Depo bir **entegrasyon referansıdır**; üretime hazır, bağımsız bir paket olarak değerlendirilmemelidir.
- İşlevlerin tamamı canlı ortamda yeniden doğrulanmadı.
- `APP_PIN` veya diğer gizli erişim değerleri repoya eklenmemelidir.
- Şirket onayı olmadan depoyu **Public** yapmayın.
- Bu kaynak **Rev.05 performans düzenlemesini içermez**; kullanıcı o sürümü deploy etmediğini belirtti.

## Çalışma ortamı (kaynağa göre)
- Sunucu: Cloudflare Workers
- Veritabanı: Cloudflare D1 (`env.DB` binding)
- Erişim sırrı: `env.APP_PIN`
- İstemci: Worker içindeki HTML/CSS/JavaScript arayüzü
- Excel: SheetJS; QR/DataMatrix: html5-qrcode (çalışma sırasında CDN'den yüklenir)

## İlk entegrasyon adımı
`docs/INTEGRATION_GUIDE.md` dosyasındaki veri eşleştirme ve iş kuralları maddelerini gözden geçirin. Gerçek şema için `database/README.md` yönergelerini izleyin.
