# Kaynak koda dayalı mimari özeti

## Bileşenler
1. Tek Cloudflare Worker, `/` yolunda gömülü HTML/CSS/JavaScript sayfasını döndürür.
2. `/api/*` istekleri PIN kontrolünden geçer ve D1 SQL sorguları ile işlenir.
3. İstemci QR/DataMatrix ve manuel Package ID doğrulaması; Excel içe aktarma; TOP/BOTTOM; proje/revizyon/iş emri ekranları sunar.
4. Tarayıcı kaynak kodunda oturum verileri `sessionStorage` içinde saklanır.

## Kaynak kodun kullandığı tablolar
- `projects`: projeler
- `feeder_plan_revisions`: proje feeder planı revizyonları
- `feeder_plan_items`: revizyon satırları
- `jobs`: üretim emirleri
- `feeders`: iş emrine bağlı fiziksel feeder durumları
- `scan_events`: işlem olayları ve geçmiş
- `reel_change_plans`: yedek/değişim planları

**Not:** Bu adlar kaynak kodun SQL sorgularından doğrulandı. Tam DDL ve kısıtlar bu pakette bulunmuyor; canlı D1 şema çıktısı gerekir.

## Örnek iş akışı
`Proje → taslak feeder planı → Excel ile TOP/BOTTOM satırlarını yükle → revizyonu onayla → iş emri oluştur → operatör reel'i QR/manuelle doğrula → feeder yüklemesini onayla → olay geçmişini tut`

Yedek makara işleminde planlı veya plansız reel tanımlanır, makara alma ve fiziksel değişim ayrı işlemler olarak ele alınır. Aynı fiziksel feeder'ın TOP/BOTTOM tarafında ortaklığı senkronize edilir.

## Kodun bilinen sınırları
- Tek dosyada arayüz + API + SQL olması bakım ve entegrasyonu zorlaştırır.
- Feeder listesinin periyodik yenileme aralığı kaynakta **5 saniye** olarak tanımlıdır.
- D1 ücretsiz plan satır okuma kotası aşımı daha önce görülmüştür; sorguların indeks ve yük açısından incelenmesi gerekir.
- `APP_PIN` tek başına kullanıcı bazlı yetkilendirme değildir.
