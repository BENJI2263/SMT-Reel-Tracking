# Gerçek D1 şeması henüz eklenmedi

Yüklenen Worker kodu SQL sorgularını içeriyor, ancak tabloların gerçek `CREATE TABLE` ifadelerini içermiyor. Bu yüzden burada **tahmini schema.sql oluşturulmadı**.

Cloudflare D1'in yalnızca şemasını dışa aktarmak için yetkili bir bilgisayarda Wrangler ile örnek komut:

```bash
npx wrangler d1 export smt-reel-control-db --remote --output=./schema.sql --no-data
```

Çıktı dosyasında şirket bilgileri, yorumlar ve hassas isimler bulunmadığını kontrol ettikten sonra `database/schema.sql` adıyla repoya ekleyin. Bu işlemle gerçek satır/üretim verilerinin dışa aktarılmaması amaçlanır.

D1 şemasını dışa aktaramıyorsanız Cloudflare D1 Console'da `sqlite_master` tablosundan yalnızca tablo tanımlarını alabilirsiniz. Veritabanının kendisini veya satır kayıtlarını public depoya yüklemeyin.
