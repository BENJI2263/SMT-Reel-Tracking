# Ana Traceability Sistemine Entegrasyon Rehberi

Bu depo kod transferi için hazırlanmıştır; var olan şirket veritabanına erişim sağlamaz.

## Entegrasyonda eşleştirilecek varlıklar
| Reel Tracking | Ana sistemde beklenen karşılık |
|---|---|
| `projects` | ürün/PCB proje kartı |
| `jobs` | üretim iş emri |
| `feeder_plan_revisions`, `feeder_plan_items` | makine feeder planı ve versiyonu |
| `feeders` | iş emri bazlı feeder pozisyonu ve durum |
| `scan_events` | değiştirilemez operasyon/olay günlüğü |
| `reel_change_plans` | planlanan/plansız makara değişimleri |
| `package_id`, `ozcode` | fiziksel makara kimliği ve şirket içi komponent kodu |

## İş kuralları: aktarılırken korunmalı
1. Makara kimliği (`Package ID`) ve komponent kodu (`OZCODE`) farklı kavramlardır.
2. Bir iş emrindeki bir makaranın başka fiziksel feeder'a yanlış atanması engellenmelidir.
3. `PENDING → PICKED → LOADED` durumları, makara alma ve fiziksel feeder yüklemesini ayırır.
4. Ortak TOP/BOTTOM kayıtları, aynı fiziksel feeder (makine/yüz/slot) için tutarlı olmalıdır.
5. Yedek makaranın depodan alınması ve feeder'a aktif olarak takılması **iki ayrı olay** olarak ele alınmalıdır.
6. Planlı ve plansız değişim için operatör, zaman, eski/yeni Package ID ve doğrulama yöntemi tutulmalıdır.
7. Plansız manuel girişte sadece yazılan OZCODE'u fiziksel doğrulama saymayın; makaranın gerçek komponent eşleşmesini ayrıca güvenilir kaynakla doğrulayın.
8. Birden çok makara ardışık kullanılacaksa mevcut `reel_change_plans` yaklaşımı genişletilmelidir; kaynak sürüm tek değişim planına odaklanır.

## Arkadaşın için başlangıç önerisi
- Önce ana sistemin kullanıcı, iş emri, komponent, stok ve seri numarası modelleriyle alan eşleştirmesi yapın.
- Worker'daki SQL ve iş kurallarını birbirinden ayırarak uygulama servislerine taşıyın.
- Merkezi kimlik doğrulama, rol yetkisi, işlem günlükleri ve API erişim kontrolü kurun.
- Aynı fiziksel makaranın birden fazla üründe kullanımını seri numarasına bağlamak isteniyorsa zaman/lot bağlamında kullanım olayları oluşturun.
- Özel senaryoları test edin: yanlış QR, tekrar okutma, ortak TOP/BOTTOM slotu, planlı yedek, plansız yedek, eşzamanlı operatör, yanlış LOT/OZCODE.

## Canlı ortama dokunulmuyor
Bu paket mevcut Cloudflare Workers deployment'ını ve D1 kayıtlarını değiştirmez.
