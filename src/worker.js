const APP_HTML = String.raw`<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#102a43">
  <title>SMT Reel Control</title>
  <style>
    :root{font-family:Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;color:#172b4d;background:#f3f6fa;font-synthesis:none}
    *{box-sizing:border-box}body{margin:0}header{background:#102a43;color:white;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
    header .headright{display:flex;align-items:center;gap:12px;flex-wrap:wrap}header h1{font-size:20px;margin:0;font-weight:750}header p{margin:4px 0 0;color:#c9d7e4;font-size:12px}
    main{max-width:1400px;margin:22px auto;padding:0 16px}.bar,.card{background:#fff;border:1px solid #dbe4ee;border-radius:14px;box-shadow:0 2px 8px rgba(16,42,67,.04)}
    .bar{padding:14px;display:flex;gap:12px;align-items:end;flex-wrap:wrap;margin-bottom:16px}.field{display:flex;flex-direction:column;gap:5px;min-width:170px;flex:1}.field label{font-size:12px;color:#526579;font-weight:700}
    input,select,textarea{border:1px solid #cbd5e1;border-radius:8px;padding:11px 12px;font:inherit;min-width:0;background:#fff}textarea{width:100%;resize:vertical;min-height:82px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}.qr-output{margin:0;padding:12px;border:1px solid #dbe4ee;border-radius:10px;background:#f8fafc;color:#172b4d;font:13px/1.65 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;min-height:90px;max-height:240px;overflow:auto}button{border:0;border-radius:9px;padding:11px 15px;font:inherit;font-weight:700;cursor:pointer;background:#1769aa;color:#fff}button.secondary{background:#e8eef5;color:#17324d}button.success{background:#147d55}button.danger{background:#b42318}button:disabled{opacity:.45;cursor:not-allowed}
    .tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px}.tab{background:#e4ebf2;color:#23425f}.tab.active{background:#1769aa;color:white}.panel{display:none}.panel.active{display:block}
    .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.card{padding:16px}.card h2{font-size:16px;margin:0 0 12px}.muted{color:#64788b;font-size:13px}.kpis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:14px}.kpi{background:white;border:1px solid #dbe4ee;border-radius:12px;padding:12px;min-width:0}.kpi b{font-size:25px;display:block}.kpi span{font-size:11px;color:#64788b}
    #reader{width:100%;max-width:480px;margin:12px auto;border-radius:12px;overflow:hidden} .scan-layout{display:grid;grid-template-columns:minmax(0,480px) minmax(280px,1fr);gap:16px;align-items:start}
    .result{padding:14px;border-radius:10px;background:#f1f5f9;border:1px solid #dbe4ee;margin-top:12px;min-height:90px}.result.ok{background:#e9f7ef;border-color:#9dd5b1}.result.bad{background:#fff0ef;border-color:#f2aaa4}.result.warn{background:#fff7e6;border-color:#f2d08a}
    table{border-collapse:collapse;width:100%;font-size:12px;white-space:nowrap}th{background:#edf3f8;color:#34495e;text-align:left;position:sticky;top:0}th,td{padding:9px 10px;border-bottom:1px solid #e4ebf2}tr:hover td{background:#f8fafc}.table-wrap{overflow:auto;max-height:65vh;border:1px solid #e1e8f0;border-radius:10px}.pill{display:inline-block;border-radius:999px;padding:4px 8px;font-weight:800;font-size:10px}.pending{background:#eef2f6;color:#61758a}.picked{background:#fff1d6;color:#895500}.loaded{background:#ddf5e8;color:#176b42}.small{padding:7px 10px;font-size:11px}.notice{font-size:12px;color:#596e82;line-height:1.5}.statusline{font-size:12px;color:#64788b;margin-top:8px;min-height:18px}
    .job-meta-grid{display:grid;grid-template-columns:minmax(150px,.8fr) minmax(260px,2fr) minmax(150px,1fr);gap:12px;align-items:center}
    .job-meta-item{min-width:0;padding:4px 2px}
    .job-meta-label{display:block;font-size:11px;font-weight:800;color:#64788b;margin-bottom:5px;letter-spacing:.02em}
    .job-meta-value{display:block;font-size:15px;font-weight:750;color:#17324d;overflow-wrap:anywhere}
    .job-meta-sub{display:block;font-size:11px;color:#64788b;margin-top:4px;overflow-wrap:anywhere}
    .pending-manual-wrap{display:flex;align-items:center;gap:7px;flex-wrap:wrap;min-width:270px}
    .manual-pick-inline{display:inline-flex;align-items:center;gap:5px;flex-wrap:nowrap}
    .manual-pick-inline input{width:150px;min-width:130px;padding:7px 8px;font-size:11px}
    .manual-pick-inline button{padding:7px 9px;font-size:10px;white-space:nowrap}
    .manual-pick-msg{display:block;font-size:10px;margin-top:4px;white-space:normal;max-width:310px;color:#b42318}
    .replacement-controls{display:flex;flex-direction:column;gap:7px;margin-top:8px;max-width:340px}
    .replacement-controls input{padding:7px 8px;font-size:11px;width:180px;max-width:100%}
    .replacement-controls .replacement-buttons{display:flex;gap:6px;flex-wrap:wrap}
    .replacement-controls button{padding:7px 9px;font-size:11px}
    .feeder-search-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;padding:11px 12px;border-radius:10px;background:#f5f8fc;border:1px solid #dbe4ee}
    .feeder-search-bar input{flex:1;min-width:220px;max-width:540px;padding:10px 12px}
    .feeder-search-bar button{white-space:nowrap}
    .feeder-search-count{font-size:12px;color:#526579;font-weight:650}


    @media(max-width:700px){.job-meta-grid{grid-template-columns:1fr 1fr}.job-meta-project{grid-column:1/-1}}

    @media(max-width:900px){.grid{grid-template-columns:1fr}.scan-layout{grid-template-columns:1fr}.kpis{grid-template-columns:repeat(2,1fr)}}
  </style>
</head>
<body>
<header><div><h1>SMT REEL CONTROL</h1><p>QR / DataMatrix ile makara toplama ve feeder doğrulama prototipi</p></div><div class="headright"><div id="envLabel" style="font-size:12px;color:#c9d7e4">Ücretsiz prototip • Test ortamı</div><button id="langToggle" class="secondary" style="background:#fff;color:#17324d" onclick="toggleLanguage()">EN</button></div></header>
<main>
  <section class="bar">
    <div class="field" style="max-width:210px"><label>İŞ EMRİ / PO</label><select id="jobId" onfocus="loadJobOptions()" onchange="onJobSelected()"><option value="">Önce PIN girip iş emrini seç</option></select></div>
    <div class="field" style="max-width:230px"><label>OPERATÖR</label><input id="operator" placeholder="Operatör adı"></div>
    <div class="field" style="max-width:230px"><label>UYGULAMA PIN</label><input id="pin" type="password" placeholder="Cloudflare APP_PIN" onchange="loadJobOptions()" onkeydown="if(event.key==='Enter'){loadJobOptions()}"></div>
    <button onclick="connectApp()">Bağlan</button>
    <span id="connection" class="statusline">Bağlantı kurulmadı.</span>
  </section>
  <nav class="tabs">
    <button class="tab active" data-tab="scan" onclick="showTab('scan')">QR OKUTMA</button>
    <button class="tab" data-tab="dashboard" onclick="showTab('dashboard')">LAPTOP TAKİP EKRANI</button>
    <button class="tab" data-tab="projects" onclick="showTab('projects')">PROJE YÖNETİMİ</button>
    <button class="tab" data-tab="import" onclick="showTab('import')">ESKİ SETUP YÜKLEME</button>
  </nav>

  <section id="panel-scan" class="panel active">
    <div class="scan-layout">
      <div class="card">
        <h2>Makara etiketini okut</h2>
        <div class="field"><label>ÜRETİLECEK PCB YÜZÜ</label><select id="scanSide" onchange="setCurrentSide(this.value)"><option value="BOTTOM">BOTTOM</option><option value="TOP">TOP</option></select><span class="muted">Yalnızca seçilen yüzün makaraları kabul edilir.</span></div>
        <p class="muted">Telefonun arka kamerasını kullan. QR ve DataMatrix desteklenir.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button onclick="startScanner()">Kamerayı aç</button><button class="secondary" onclick="stopScanner()">Kamerayı kapat</button></div>
        <div id="reader"></div>
        <div class="field"><label>MANUEL PACKAGE ID / QR METNİ (yedek giriş)</label><textarea id="manualCode" rows="3" placeholder="PKG-00000111 veya QR içeriği" oninput="renderQrPreview(this.value)"></textarea></div>
        <div class="field" style="margin-top:10px"><label>OKUNAN QR VERİSİ (SATIR SATIR)</label><pre id="qrDecodedDisplay" class="qr-output">QR okutulduğunda alanlar burada satır satır gösterilir.</pre><span class="muted">Doğrulamada yalnızca Package ID kullanılır. Diğer satırlar bilgi amaçlıdır.</span></div>
        <button style="margin-top:9px" onclick="submitManual()">Kodu doğrula</button>
        <div id="scanResult" class="result">Henüz tarama yapılmadı.</div>
      </div>
      <div class="card">
        <h2>Doğrulama mantığı</h2>
        <ol class="notice" style="padding-left:18px;line-height:1.8">
          <li>QR içinden Package ID alınır.</li>
          <li>Seçili iş emrinin TOP/BOTTOM feeder setup kayıtlarında aranır.</li>
          <li>Tek bir feeder satırı bulunursa yalnızca Package ID eşleşmesi esas alınır; diğer etiket alanları doğrulama için kullanılmaz.</li>
          <li>Package ID tek bir feeder satırıyla eşleşirse o satırın durumu <b>MAKARA ALINDI</b> olur.</li>
          <li>Bilinmeyen veya birden fazla feeder satırında bulunan Package ID ile aynı iş emrinde daha önce kullanılmış makara reddedilir.</li>
        </ol>
        <div class="result warn"><b>Önemli:</b> Bu ilk sürümde yalnızca makara alma doğrulaması yapılır. Feeder'a fiziksel yükleme ayrı bir onaydır.</div>
        <h2 style="margin-top:20px">Son taramalar</h2><div id="recentScans" class="muted">Henüz kayıt yok.</div>
      </div>
    </div>
  </section>

  <section id="panel-dashboard" class="panel">
    <div class="card" id="jobMetaCard" style="margin-bottom:12px">
      <div class="job-meta-grid">
        <div class="job-meta-item"><span class="job-meta-label">İŞ EMRİ / PO</span><b class="job-meta-value" id="metaJobId">—</b></div>
        <div class="job-meta-item job-meta-project"><span class="job-meta-label">PROJE</span><b class="job-meta-value" id="metaProjectName">Bağlantı bekleniyor</b><span class="job-meta-sub" id="metaProjectId"></span></div>
        <div class="job-meta-item"><span class="job-meta-label">FEEDER PLANI REVİZYONU</span><b class="job-meta-value" id="metaRevision">—</b><span id="metaRevisionStatus" class="pill pending">—</span></div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px"><h2 style="margin-top:0">Üretim yüzü</h2><div style="display:flex;gap:8px;flex-wrap:wrap"><button id="sideBottom" class="success" onclick="setCurrentSide('BOTTOM')">BOTTOM</button><button id="sideTop" class="secondary" onclick="setCurrentSide('TOP')">TOP</button></div><p class="muted" id="sideHint">BOTTOM yüzü seçili. Sayaçlar ve liste yalnızca BOTTOM kayıtlarını gösterir.</p></div>
    <div class="kpis">
      <div class="kpi"><b id="kTotal">0</b><span>TOPLAM FEEDER</span></div>
      <div class="kpi"><b id="kCollected">0/0</b><span>DEPODAN ALINAN MAKARA</span></div>
      <div class="kpi"><b id="kLoaded">0/0</b><span>YÜKLENEN FEEDER</span></div>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px"><div><h2 style="margin:0">Canlı feeder durumu</h2><span class="muted">Ekran 5 saniyede bir yenilenir.</span></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="secondary" onclick="refreshDashboard()">Şimdi yenile</button><button class="success" onclick="bulkMarkLoaded()">Seçili yüzde alınanları toplu yükle</button><button onclick="downloadReport()">Raporu Excel indir</button><button class="danger" onclick="resetBottomSide()">BOTTOM tarafını sıfırla</button></div></div><div id="resetResult" class="statusline"></div>
      <div class="feeder-search-bar">
        <label for="feederSearch" style="font-size:12px;font-weight:800;color:#34495e">KOMPONENT ARA</label>
        <input id="feederSearch" type="search" autocomplete="off" spellcheck="false" placeholder="OZCODE, Package ID, makine, slot, LOT, depo lokasyonu..." oninput="applyFeederSearch()" onkeydown="if(event.key==='Enter'){event.preventDefault();applyFeederSearch()}">
        <button class="secondary" onclick="applyFeederSearch()">ARAMA YAP</button>
        <button class="secondary" onclick="clearFeederSearch()">TEMİZLE</button>
        <span id="feederSearchCount" class="feeder-search-count" aria-live="polite">0 eşleşen feeder</span>
      </div>
      <div class="table-wrap"><table><thead><tr><th>MAKİNE</th><th>ÖN/ARKA</th><th>SLOT</th><th>OZCODE</th><th>LOKASYON</th><th>PACKAGE ID</th><th>LOT</th><th>PLANLANAN YEDEK MAKARA</th><th>YEDEK MAKARA DURUMU</th><th>MAKARA DURUMU</th><th>YÜKLEME</th><th>AKSİYON</th></tr></thead><tbody id="dashboardBody"><tr><td colspan="12">Setup yüklenmedi.</td></tr></tbody></table></div>
    </div>
  </section>

  <section id="panel-projects" class="panel">
    <div class="card" style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><div><h2 style="margin:0">Projelerim</h2><p class="muted">Projeler, feeder planı revizyonları ve üretim emirleri burada yönetilir.</p></div><button class="secondary" onclick="refreshProjects()">Listeyi yenile</button></div>
      <div id="projectList" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-top:12px"><div class="muted">Projeler yüklenmedi.</div></div>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-bottom:14px">
      <div class="card">
        <h2>Yeni proje oluştur</h2>
        <div class="field"><label>PROJE ADI</label><input id="newProjectName" placeholder="Örn. 100W_V1.2_Panel2X2"></div>
        <div class="field" style="margin-top:9px"><label>AÇIKLAMA</label><input id="newProjectDescription" placeholder="Ürün / PCB panel açıklaması"></div>
        <button style="margin-top:12px" onclick="createProject()">Projeyi kaydet</button>
        <div id="projectCreateResult" class="statusline"></div>
      </div>
      <div class="card">
        <h2>Feeder planı revizyonu oluştur</h2>
        <div class="field"><label>PROJE</label><select id="projectSelect" onchange="refreshRevisionSelects()"><option value="">Proje seç</option></select></div>
        <div class="field" style="margin-top:9px"><label>REVİZYON ADI</label><input id="newRevisionName" value="Rev.02" placeholder="Rev.02"></div>
        <button style="margin-top:12px" onclick="createRevision()">Taslak revizyon oluştur</button>
        <div id="revisionCreateResult" class="statusline"></div>
      </div>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-bottom:14px">
      <div class="card">
        <h2>Feeder Excel dosyası yükle</h2>
        <p class="muted">Seçilen DRAFT revizyona TOP ve BOTTOM dosyalarını ayrı ayrı yükle.</p>
        <div class="field"><label>REVİZYON</label><select id="planRevisionSelect"><option value="">Önce proje ve revizyon seç</option></select></div>
        <div class="field" style="margin-top:9px"><label>PCB YÜZÜ</label><select id="planSide"><option value="BOTTOM">BOTTOM</option><option value="TOP">TOP</option></select></div>
        <div class="field" style="margin-top:9px"><label>EXCEL DOSYASI (.xlsx)</label><input id="planExcelFile" type="file" accept=".xlsx,.xls"></div>
        <button style="margin-top:12px" onclick="importPlanExcel()">Seçilen yüzü revizyona aktar</button>
        <div id="planImportResult" class="statusline"></div>
      </div>
      <div class="card">
        <h2>Feeder planını onayla</h2>
        <p class="muted">TOP ve BOTTOM kayıtları bulunan DRAFT revizyonlar onaylanabilir. Onaylanan revizyon uygulama üzerinden değiştirilemez.</p>
        <div class="field"><label>REVİZYON</label><select id="approveRevisionSelect"><option value="">Önce proje ve revizyon seç</option></select></div>
        <button class="success" style="margin-top:12px" onclick="approveRevision()">Revizyonu onayla</button>
        <div id="approveResult" class="statusline"></div>
      </div>
    </div>
    <div class="card">
      <h2>Yeni üretim emri oluştur</h2>
      <p class="muted">Yalnızca APPROVED feeder planlarından üretim emri açılır. Sistem seçilen planın 82 gibi tüm feeder satırlarını yeni üretim emrine ayrı durum kayıtları olarak kopyalar.</p>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));align-items:end">
        <div class="field"><label>PROJE</label><select id="jobProjectSelect" onchange="refreshJobRevisionSelect()"><option value="">Proje seç</option></select></div>
        <div class="field"><label>ONAYLI FEEDER PLANI</label><select id="jobRevisionSelect"><option value="">Onaylı revizyon seç</option></select></div>
        <div class="field"><label>YENİ İŞ EMRİ / PO</label><input id="newJobId" placeholder="PO-000008"></div>
        <button onclick="createProductionJob()">Üretim emrini oluştur</button>
      </div>
      <div id="jobCreateResult" class="statusline"></div>
    </div>
  </section>

  <section id="panel-import" class="panel">
    <div class="grid">
      <div class="card" style="grid-column:span 2">
        <h2>Eski tip iş emri için feeder setup yükleme</h2>
        <p class="muted">Uyarı: Proje bağlantısı bulunan iş emirleri bu ekrandan değiştirilemez. Yeni projeler ve revizyonlar için Proje Yönetimi ekranını kullanın. Bu alan yalnızca proje bağlantısı olmayan eski iş emirleri içindir.</p>
        <div class="field"><label>PCB YÜZÜ</label><select id="pcbSide"><option value="TOP">TOP</option><option value="BOTTOM">BOTTOM</option></select></div>
        <div class="field" style="margin-top:10px"><label>EXCEL DOSYASI (.xlsx)</label><input id="excelFile" type="file" accept=".xlsx,.xls"></div>
        <button style="margin-top:12px" onclick="importExcel()">Setup verilerini içe aktar</button>
        <div id="importResult" class="result">Henüz dosya seçilmedi.</div>
      </div>
      <div class="card">
        <h2>İçe aktarılan veriler</h2>
        <p class="notice">Desteklenen makine sekmeleri: SM471, SM411, SM482. Gerekli sütunlar: Slot, Feeder, OZCODE, Manufacturer P/N, Depo Lokasyonu, Package ID, Lot No, Date Code, Makara Stok, Planned Use.</p>
        <p class="notice"><b>İçe aktarma kuralı:</b> Aynı iş emri ve TOP/BOTTOM yüzü için daha önce makara alınmış kayıtlar varsa yeniden içe aktarma engellenir; böylece mevcut tarama kayıtları yanlışlıkla silinmez.</p>
      </div>
    </div>
  </section>
  <p class="statusline" style="text-align:center;margin:18px 0 8px">Prototip sürümü • Gerçek üretim verisiyle kullanmadan önce şirket IT / bilgi güvenliği onayı alınmalıdır.</p>
</main>
<script>
let scanner=null, refreshTimer=null, lastScans=[], sessionExpiryTimer=null, currentSide='BOTTOM', latestDashboardData=null;
const replacementManualValues=Object.create(null);
const unplannedPackageValues=Object.create(null);
const unplannedOzcodeValues=Object.create(null);
let replacementScanTarget=null;
const manualPickValues = Object.create(null);
const manualPickMessages = Object.create(null);

const SESSION_KEY='smt_reel_control_session_v1';
const SESSION_DURATION_MS=8*60*60*1000;
const LANGUAGE_KEY='smt_reel_control_language_v1';
let currentLang='tr', translating=false;
// Heavy optional libraries are loaded only when the operator uses their feature.
let xlsxLoadPromise=null, qrLoadPromise=null;
function loadOptionalLibrary(key, src, isReady){
  if(isReady()) return Promise.resolve();
  const existing=document.querySelector('script[data-smt-library="'+key+'"]');
  if(existing && existing.dataset.loaded==='true' && isReady()) return Promise.resolve();
  return new Promise((resolve,reject)=>{
    const script=existing || document.createElement('script');
    let settled=false;
    const finish=(error)=>{
      if(settled)return; settled=true; clearTimeout(timeout);
      if(error){if(!existing)script.remove();reject(error);}
      else{script.dataset.loaded='true';resolve();}
    };
    const timeout=setTimeout(()=>finish(new Error(key+' kütüphanesi zaman aşımına uğradı.')),20000);
    script.addEventListener('load',()=>finish(isReady()?null:new Error(key+' yüklendi ancak gerekli global bulunamadı.')),{once:true});
    script.addEventListener('error',()=>finish(new Error(key+' kütüphanesi indirilemedi. İnternet bağlantısını kontrol et.')),{once:true});
    if(!existing){script.src=src;script.async=true;script.dataset.smtLibrary=key;document.head.appendChild(script);}
  });
}
function ensureXLSX(){
  if(window.XLSX)return Promise.resolve();
  if(!xlsxLoadPromise) xlsxLoadPromise=loadOptionalLibrary('xlsx','https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js',()=>!!window.XLSX).catch(e=>{xlsxLoadPromise=null;throw e;});
  return xlsxLoadPromise;
}
function ensureQrLibrary(){
  if(window.Html5Qrcode && window.Html5QrcodeSupportedFormats)return Promise.resolve();
  if(!qrLoadPromise) qrLoadPromise=loadOptionalLibrary('html5-qrcode','https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',()=>!!(window.Html5Qrcode && window.Html5QrcodeSupportedFormats)).catch(e=>{qrLoadPromise=null;throw e;});
  return qrLoadPromise;
}
try { const savedLanguage=localStorage.getItem(LANGUAGE_KEY); if(savedLanguage==='en'||savedLanguage==='tr') currentLang=savedLanguage; } catch(e) {}
const translations={'KOMPONENT ARA':'SEARCH COMPONENT','OZCODE, Package ID, makine, slot, LOT, depo lokasyonu...':'OZCODE, Package ID, machine, slot, LOT, storage location...','ARAMA YAP':'SEARCH','TEMİZLE':'CLEAR','eşleşen feeder':'matching feeders','PLANLANAN YEDEK MAKARA':'PLANNED SPARE REEL','İş emri seçildi; Bağlan butonuna bas.':'Work order selected; press Connect.','İş emirleri yüklenemedi:':'Could not load work orders:','DEĞİŞİM BEKLİYOR':'REPLACEMENT PENDING','YEDEK MAKARA DURUMU':'SPARE REEL STATUS','Ana makara bitti':'Primary reel exhausted','YEDEK QR OKUT':'SCAN SPARE QR','MANUEL DOĞRULA':'VERIFY MANUALLY','PLANLANDI':'PLANNED','ALINDI':'PICKED','YEDEK AKTİF':'SPARE ACTIVE','YEDEK TAKMAYI ONAYLA':'CONFIRM SPARE INSTALLATION','PLANSIZ DEĞİŞİM':'UNPLANNED REPLACEMENT','PLANSIZ MAKARA AL':'PICK UNPLANNED REEL','Ana makara bitti / yedeği tak':'Primary reel exhausted / install spare','MAKARA DEĞİŞİMİ BEKLİYOR':'REEL REPLACEMENT PENDING','Henüz alınmadı':'NOT PICKED','Yedek makara alınmadı':'Spare reel not picked','İş emri seç':'Select work order','Önce PIN girip iş emrini seç':'Enter PIN then select work order','QR okunmazsa Package ID':'Package ID if QR cannot be read','Komponent OZCODE':'Component OZCODE','Yedek alındı':'Spare reel picked','Fiziksel değişimi onayla':'Confirm physical reel replacement','Plansız Package ID':'Unplanned Package ID','Aynı komponent kodunu gir':'Enter same component code','PLANSIZ YEDEK':'UNPLANNED SPARE','Makara değişimi tamamlandı':'Reel replacement completed','DEĞİŞİM BEKLİYOR • FEEDER DURDURULMALI':'REPLACEMENT PENDING • STOP FEEDER','ANA MAKARA BİTTİ':'PRIMARY REEL EMPTY','Yedek QR al':'Pick spare by QR',
'QR / DataMatrix ile makara toplama ve feeder doğrulama prototipi':'QR / DataMatrix reel picking and feeder verification prototype',
'Ücretsiz prototip • Test ortamı':'Free prototype • Test environment','ORTAK':'SHARED','ORTAK FEEDER':'SHARED FEEDER','TOP ve BOTTOM durumları aynı fiziksel feeder için birlikte güncellendi.':'TOP and BOTTOM statuses were synchronized for the same physical feeder.','İŞ EMRİ / PO':'WORK ORDER / PO','FEEDER PLANI REVİZYONU':'FEEDER PLAN REVISION','Bağlantı bekleniyor':'Waiting for connection','Proje bağlantısı yok (eski setup)':'No project link (legacy setup)','Proje ID: ':'Project ID: ','Revizyon yok':'No revision','PROJE YÖNETİMİ':'PROJECT MANAGEMENT','Projelerim':'My projects','Projeler, feeder planı revizyonları ve üretim emirleri burada yönetilir.':'Manage projects, feeder plan revisions and work orders here.','Listeyi yenile':'Refresh list','Yeni proje oluştur':'Create new project','PROJE ADI':'PROJECT NAME','AÇIKLAMA':'DESCRIPTION','Projeyi kaydet':'Save project','Feeder planı revizyonu oluştur':'Create feeder plan revision','PROJE':'PROJECT','Proje seç':'Select project','REVİZYON ADI':'REVISION NAME','Taslak revizyon oluştur':'Create draft revision','Feeder Excel dosyası yükle':'Upload feeder Excel file','REVİZYON':'REVISION','Önce proje ve revizyon seç':'Select project and revision first','PCB YÜZÜ':'PCB SIDE','EXCEL DOSYASI (.xlsx)':'EXCEL FILE (.xlsx)','Seçilen yüzü revizyona aktar':'Import selected side to revision','Feeder planını onayla':'Approve feeder plan','TOP ve BOTTOM kayıtları bulunan DRAFT revizyonlar onaylanabilir. Onaylanan revizyon uygulama üzerinden değiştirilemez.':'DRAFT revisions with both TOP and BOTTOM records can be approved. Approved revisions cannot be changed through the app.','Revizyonu onayla':'Approve revision','Yeni üretim emri oluştur':'Create new work order','Yalnızca APPROVED feeder planlarından üretim emri açılır. Sistem seçilen planın 82 gibi tüm feeder satırlarını yeni üretim emrine ayrı durum kayıtları olarak kopyalar.':'Work orders can only be created from APPROVED feeder plans. All feeder rows in the selected plan are copied as independent status records into the new work order.','ONAYLI FEEDER PLANI':'APPROVED FEEDER PLAN','Onaylı revizyon seç':'Select approved revision','YENİ İŞ EMRİ / PO':'NEW WORK ORDER / PO','Üretim emrini oluştur':'Create work order','Projeler yüklenmedi.':'Projects have not loaded.','DRAFT':'DRAFT','APPROVED':'APPROVED','ARCHIVED':'ARCHIVED','Aktif':'Active','Kayıtlı revizyon':'Saved revision','Üretim emri':'Work order','TOP feeder':'TOP feeders','BOTTOM feeder':'BOTTOM feeders','Feeder planı bulunamadı.':'Feeder plan not found.','Üretim emri açıldı.':'Work order created.','revizyon':'revisions','üretim emri':'work orders','Son revizyon':'Latest revision','Henüz feeder planı yok.':'No feeder plan yet.','Projeyi seç':'Select project','Revizyon seç':'Select revision','Bağlantı başarılı':'Connected successfully','OPERATÖR':'OPERATOR','Operatör adı':'Operator name','UYGULAMA PIN':'APPLICATION PIN','Cloudflare APP_PIN':'Cloudflare APP_PIN','Bağlan':'Connect','Bağlantı kurulmadı.':'Not connected.','QR OKUTMA':'QR SCANNING','LAPTOP TAKİP EKRANI':'FEEDER TRACKING','SETUP EXCEL YÜKLE':'IMPORT SETUP EXCEL','ESKİ SETUP YÜKLEME':'LEGACY SETUP IMPORT','Eski tip iş emri için feeder setup yükleme':'Import feeder setup for legacy work order','Uyarı: Proje bağlantısı bulunan iş emirleri bu ekrandan değiştirilemez. Yeni projeler ve revizyonlar için Proje Yönetimi ekranını kullanın. Bu alan yalnızca proje bağlantısı olmayan eski iş emirleri içindir.':'Warning: Work orders linked to a project cannot be changed here. Use Project Management for new projects and revisions. This area is only for legacy work orders without a project link.',
'Makara etiketini okut':'Scan reel label','Telefonun arka kamerasını kullan. QR ve DataMatrix desteklenir.':'Use your phone\'s rear camera. QR and DataMatrix are supported.','Kamerayı aç':'Open camera','Kamerayı kapat':'Close camera','MANUEL PACKAGE ID / QR METNİ (yedek giriş)':'MANUAL PACKAGE ID / QR TEXT (fallback)','PKG-00000111 veya QR içeriği':'PKG-00000111 or QR content','Kodu doğrula':'Validate code','Henüz tarama yapılmadı.':'No scans yet.','Doğrulama mantığı':'Verification logic','QR içinden Package ID alınır.':'The Package ID is extracted from the QR code.','Seçili iş emrinin TOP/BOTTOM feeder setup kayıtlarında aranır.':'It is searched in the TOP/BOTTOM feeder setup records of the selected work order.','Tek bir feeder satırı bulunursa yalnızca Package ID eşleşmesi esas alınır; diğer etiket alanları doğrulama için kullanılmaz.':'If exactly one feeder row is found, only the Package ID is used for validation; other label fields are not compared.','Veriler eşleşirse o satırın durumu':'If the data matches, that row is marked','olur.':' .','Birden fazla eşleşme, bilinmeyen Package ID veya veri uyuşmazlığında işlem durdurulur.':'The process is stopped if multiple matches, an unknown Package ID or a data mismatch is found.','Önemli:':'Important:','Bu ilk sürümde yalnızca makara alma doğrulaması yapılır. Feeder\'a fiziksel yükleme ayrı bir onaydır.':'This version verifies reel picking only. Physical loading into the feeder requires a separate confirmation.','Son taramalar':'Recent scans','Henüz kayıt yok.':'No records yet.',
'TOPLAM FEEDER':'TOTAL FEEDERS','DEPODAN ALINAN MAKARA':'REELS PICKED FROM WAREHOUSE','YÜKLENEN FEEDER':'FEEDERS LOADED','BEKLEYEN MAKARA':'PENDING REELS','MAKARA ALINDI':'REEL PICKED','FEEDER\'A YÜKLENDİ':'LOADED INTO FEEDER','Canlı feeder durumu':'Live feeder status','Ekran 5 saniyede bir yenilenir.':'This screen refreshes every 5 seconds.','Şimdi yenile':'Refresh now','Seçili yüzde alınanları toplu yükle':'Bulk mark picked reels as loaded on selected side','İş emrini sıfırla':'Reset work order',"BOTTOM tarafını sıfırla":"Reset BOTTOM side","Satırı sıfırla":"Reset row","OKUNAN QR VERİSİ (SATIR SATIR)":"DECODED QR DATA (LINE BY LINE)","QR okutulduğunda alanlar burada satır satır gösterilir.":"Decoded fields will appear here line by line after scanning.","ETİKET":"LABEL","MİKTAR":"QUANTITY","DEPO":"WAREHOUSE","LOKASYON":"LOCATION","OKUNAN METİN":"DECODED TEXT","Doğrulamada yalnızca Package ID kullanılır. Diğer alanlar bilgi amaçlı gösterilir.":"Only Package ID is used for validation. Other fields are displayed for information.","BOTTOM tarafında sıfırlanacak alınmış makara veya yüklenmiş feeder yok.":"There are no picked reels or loaded feeders to reset on the BOTTOM side.","Onay metni eşleşmedi. Sıfırlama yapılmadı.":"Confirmation text did not match. Nothing was reset.","BOTTOM sıfırlama başarısız:":"BOTTOM reset failed:","Satır sıfırlama başarısız:":"Row reset failed:",'PCB YÜZÜ':'PCB SIDE','MAKİNE':'MACHINE','ÖN/ARKA':'FRONT/REAR','SLOT':'SLOT','OZCODE':'OZCODE','LOKASYON':'LOCATION','PACKAGE ID':'PACKAGE ID','LOT':'LOT','MAKARA DURUMU':'REEL STATUS','YÜKLEME':'LOADING','AKSİYON':'ACTION','Setup yüklenmedi.':'Setup not loaded.','BEKLİYOR':'PENDING','ALINDI':'PICKED','YÜKLENDİ':'LOADED','YÜKLENMEDİ':'NOT LOADED','Package ID gir':'Enter Package ID','Manuel doğrula':'Validate manually','Manuel Package ID':'Manual Package ID','Manuel doğrulama başarılı:':'Manual validation successful:','Manuel Package ID bekleniyor.':'Manual Package ID is required.','Girilen Package ID bu feeder satırının beklediği Package ID ile eşleşmiyor. Makara alınmadı.':'The entered Package ID does not match the Package ID expected for this feeder row. The reel was not picked.','Geçerli bir Package ID gir (PKG-… veya LEG-…).':'Enter a valid Package ID (PKG-… or LEG-…).','Manuel doğrulama başarısız:':'Manual validation failed:','Fiziksel yüklemeyi onayla':'Confirm physical loading','Bu iş emri için setup kaydı bulunamadı. Önce Excel yükle.':'No setup records found for this work order. Import the Excel file first.',
'Feeder setup Excel dosyasını içe aktar':'Import feeder setup Excel file','Daha önce hazırladığımız operatör listesi Excel dosyasını seç. Makine sekmelerindeki FRONT ve REAR blokları otomatik okunur.':'Select the operator-list Excel file prepared earlier. FRONT and REAR blocks in machine sheets are read automatically.','PCB YÜZÜ':'PCB SIDE','EXCEL DOSYASI (.xlsx)':'EXCEL FILE (.xlsx)','Setup verilerini içe aktar':'Import setup data','Henüz dosya seçilmedi.':'No file selected.','İçe aktarılan veriler':'Imported data','Desteklenen makine sekmeleri: SM471, SM411, SM482. Gerekli sütunlar: Slot, Feeder, OZCODE, Manufacturer P/N, Depo Lokasyonu, Package ID, Lot No, Date Code, Makara Stok, Planned Use.':'Supported machine sheets: SM471, SM411, SM482. Required columns: Slot, Feeder, OZCODE, Manufacturer P/N, Warehouse Location, Package ID, Lot No, Date Code, Reel Stock, Planned Use.','İçe aktarma kuralı:':'Import rule:','Aynı iş emri ve TOP/BOTTOM yüzü için daha önce makara alınmış kayıtlar varsa yeniden içe aktarma engellenir; böylece mevcut tarama kayıtları yanlışlıkla silinmez.':'Re-import is blocked if reels have already been picked for the same work order and TOP/BOTTOM side. This prevents existing scan records from being accidentally deleted.','Prototip sürümü • Gerçek üretim verisiyle kullanmadan önce şirket IT / bilgi güvenliği onayı alınmalıdır.':'Prototype version • Obtain company IT / information security approval before using with real production data.',
'Önce iş emri, operatör ve PIN bilgilerini girip Bağlan düğmesine bas.':'Enter the work order, operator and PIN, then click Connect.','QR okuyucu kütüphanesi yüklenemedi. İnternet bağlantısını kontrol et.':'QR reader library could not be loaded. Check your internet connection.','QR okuyucu hazırlanıyor…':'Preparing QR reader…','Excel kütüphanesi yükleniyor…':'Loading Excel library…','Kamera açık. Etiketteki kodu çerçeveye al.':'Camera is on. Position the label code inside the frame.','Bir Package ID veya ham QR metni gir.':'Enter a Package ID or raw QR text.','Fiziksel yüklemeyi onayla':'Confirm physical loading','İş emri, operatör ve PIN alanlarını doldur.':'Fill in the work order, operator and PIN fields.','Bağlantı başarılı':'Connected successfully','Bağlantı hatası:':'Connection error:','İstek başarısız:':'Request failed:','Sıfırlama başarısız:':'Reset failed:','İş emri numarası eşleşmedi. Sıfırlama yapılmadı.':'Work order number does not match. Nothing was reset.',
'ÜRETİLECEK PCB YÜZÜ':'PCB SIDE TO BE PRODUCED',
'Yalnızca seçilen yüzün makaraları kabul edilir.':'Only reels for the selected side are accepted.',
'Üretim yüzü':'Production side',
'BOTTOM yüzü seçili. Sayaçlar ve liste yalnızca BOTTOM kayıtlarını gösterir.':'BOTTOM side selected. Counters and list show only BOTTOM records.',
'TOP yüzü seçili. Sayaçlar ve liste yalnızca TOP kayıtlarını gösterir.':'TOP side selected. Counters and list show only TOP records.',
'yüzü seçili. Sayaçlar ve liste yalnızca':'side selected. Counters and list show only',
'kayıtlarını gösterir.':'records.',
'Seçilen DRAFT revizyona TOP ve BOTTOM dosyalarını ayrı ayrı yükle.':'Upload TOP and BOTTOM files separately to the selected DRAFT revision.',
'Raporu Excel indir':'Download Excel report',
'Rapor hazırlanıyor…':'Preparing report…',
'Rapor indirildi':'Report downloaded',
'Oturum geri yükleniyor…':'Restoring session…',
'Oturum 8 saat geçerli':'Session valid for 8 hours',
'8 saatlik oturum süresi doldu. Yeniden PIN girip bağlanın.':'The 8-hour session has expired. Enter your PIN and connect again.',
'İş emri, operatör ve PIN alanlarını doldur.':'Enter the work order, operator, and PIN.',
'Önce Excel dosyası seç.':'Select an Excel file first.',
'Önce iş emri ve PIN ile bağlan.':'Connect with the work order and PIN first.',
'SM471 / SM411 / SM482 sekmelerinde beklenen tablo başlıkları bulunamadı.':'Required table headers were not found in the SM471 / SM411 / SM482 sheets.',
'Excel içinde desteklenen feeder satırı bulunamadı.':'No supported feeder rows were found in the Excel file.',
'İçe aktarma başarısız:':'Import failed:',
'aktarımı tamamlandı:':'import completed:',
'Aktarım başarısız:':'Import failed:',
'Projeleri görmek için önce PIN ile bağlan.':'Connect with your PIN to view projects.',
'Proje listesi alınamadı:':'Could not load project list:',
'Proje adı girin.':'Enter a project name.',
'Proje oluşturuldu:':'Project created:',
'Proje oluşturulamadı:':'Could not create project:',
'Proje ve revizyon adı seçin.':'Select a project and enter a revision name.',
'Taslak revizyon oluşturuldu:':'Draft revision created:',
'Revizyon oluşturulamadı:':'Could not create revision:',
'Revizyon ve Excel dosyası seçin.':'Select a revision and an Excel file.',
'Revizyon seçin.':'Select a revision.',
'Bu revizyonu APPROVED olarak onaylamak istiyor musunuz? Onaydan sonra uygulama üzerinden değiştirilemez.':'Do you want to approve this revision? It cannot be changed through the app after approval.',
'Revizyon onaylandı:':'Revision approved:',
'Onay başarısız:':'Approval failed:',
'Proje, onaylı revizyon ve yeni iş emrini girin.':'Enter the project, approved revision, and new work order.',
'Üretim emri oluşturuldu:':'Work order created:',
'Üretim emri oluşturulamadı:':'Could not create work order:',
'Henüz proje yok. İlk projenizi oluşturun.':'No projects yet. Create your first project.',
'Rapor oluşturulamadı:':'Could not create report:',
'Bağlantı başarılı • ':'Connected successfully • ',
'Kamera açılamadı:':'Could not open camera:',
' • Tarayıcı kamera iznini kontrol et.':' • Check the browser camera permission.',
'Toplu onay tamamlandı:':'Bulk confirmation completed:',
'makara YÜKLENDİ olarak işaretlendi.':'reels marked as LOADED.',
'kayıt atlandı.':'records were skipped.',
'Toplu onay başarısız:':'Bulk confirmation failed:',
' yüzünde toplu onaylanacak MAKARA ALINDI durumunda kayıt yok.':' side has no REEL PICKED records to confirm in bulk.',
'Package ID tek bir feeder satırıyla eşleşirse o satırın durumu':'If the Package ID matches exactly one feeder row, its status is set to',
'olur.':'.',
'Bilinmeyen veya birden fazla feeder satırında bulunan Package ID ile aynı iş emrinde daha önce kullanılmış makara reddedilir.':'The scan is rejected if the Package ID is unknown, appears on multiple feeder rows, or the reel has already been used in the same work order.',
'Üretim emri seçilen onaylı feeder planından oluşturulacak. Devam edilsin mi?':'The work order will be created from the selected approved feeder plan. Continue?',
'Lokasyon:':'Location:',
'D1 veritabanı DB binding tanımlı değil.':'D1 database DB binding is not configured.',
'JSON gövdesi okunamadı.':'Could not read the JSON body.',
'Uygulama PIN bilgisi hatalı.':'Application PIN is incorrect.',
'Proje adı boş olamaz ve 160 karakteri aşamaz.':'Project name is required and must not exceed 160 characters.',
'Bu proje adı zaten kayıtlı.':'This project name is already registered.',
'Proje ve geçerli revizyon adı gerekli.':'A project and a valid revision name are required.',
'Proje bulunamadı veya aktif değil.':'Project not found or inactive.',
'Bu proje için bu revizyon adı zaten kullanılmış veya kayıt oluşturulamadı.':'This revision name is already used for this project or the revision could not be created.',
'Revizyon, PCB yüzü veya feeder kayıtları eksik.':'Revision, PCB side, or feeder records are missing.',
'Tek seferde en fazla 250 feeder satırı aktarılabilir.':'A maximum of 250 feeder rows can be imported at once.',
'Feeder planı revizyonu bulunamadı.':'Feeder plan revision not found.',
'Yalnızca DRAFT revizyonlara Excel yüklenebilir. APPROVED planlar kilitlidir.':'Excel files can only be uploaded to DRAFT revisions. APPROVED plans are locked.',
'Bu revizyon bir üretim emrinde kullanılıyor; değiştirilemez.':'This revision is being used by a work order and cannot be changed.',
'Her feeder satırında Machine, FRONT/REAR, Slot ve Package ID bulunmalıdır.':'Each feeder row must contain Machine, FRONT/REAR, Slot, and Package ID.',
'Excel dosyasında aynı PCB yüzü, makine, taraf ve slot birden fazla kez bulunuyor:':'The Excel file contains a duplicate PCB side, machine, face, and slot combination:',
'Revizyon seçilmedi.':'No revision selected.',
'Revizyon bulunamadı.':'Revision not found.',
'Yalnızca DRAFT revizyon onaylanabilir.':'Only DRAFT revisions can be approved.',
'Onay için hem TOP hem BOTTOM feeder kayıtları yüklenmiş olmalı.':'Both TOP and BOTTOM feeder records must be uploaded before approval.',
'Package ID eksik feeder kaydı var; plan onaylanmadı.':'Some feeder records are missing Package IDs. The plan was not approved.',
'Revizyon durumu eşzamanlı değişmiş olabilir; listeyi yenileyin.':'The revision status may have changed concurrently. Refresh the list.',
'Geçerli iş emri, proje ve feeder planı seçilmelidir.':'A valid work order, project, and feeder plan must be selected.',
'Bu iş emri numarası zaten kullanılıyor.':'This work order number is already in use.',
'Üretim emri yalnızca APPROVED feeder planından oluşturulabilir.':'A work order can only be created from an APPROVED feeder plan.',
'Seçilen revizyonda TOP ve BOTTOM feeder kayıtları eksik.':'The selected revision is missing TOP or BOTTOM feeder records.',
'Feeder planında Package ID eksik; üretim emri oluşturulmadı.':'The feeder plan contains missing Package IDs. The work order was not created.',
'İş emri, TOP/BOTTOM seçimi veya feeder kayıtları eksik.':'Work order, TOP/BOTTOM selection, or feeder records are missing.',
'Tek seferde en fazla 250 feeder satırı içe aktarılabilir.':'A maximum of 250 feeder rows can be imported at once.',
'Bu iş emri proje bazlı bir feeder revizyonuna bağlı. Eski Excel yükleme ekranından değişiklik yapılamaz; proje yönetiminden yeni revizyon oluşturun.':'This work order is linked to a project feeder revision. It cannot be changed from the legacy Excel import screen. Create a new revision in Project Management.',
'Bu iş emrinde makara alınmış/yüklenmiş kayıtlar var. Mevcut kayıtları korumak için yeniden içe aktarma engellendi.':'This work order already contains picked or loaded reels. Re-import is blocked to protect existing records.',
'Önce TOP veya BOTTOM üretim yüzünü seçin.':'Select TOP or BOTTOM as the production side first.',
'İş emri, operatör veya Package ID eksik.':'Work order, operator, or Package ID is missing.',
'Package ID bu iş emrinin TOP/BOTTOM setup kayıtlarında bulunamadı.':'The Package ID was not found in this work order’s TOP/BOTTOM setup records.',
'Bu Package ID seçili iş emrinin feeder setup listesinde bulunamadı. Makara alınmadı.':'This Package ID was not found in the selected work order’s feeder setup. The reel was not picked.',
'Aynı Package ID birden fazla feeder satırında bulundu.':'The same Package ID was found in multiple feeder rows.',
'Bu Package ID birden fazla feeder satırında var. Otomatik makara alma yapılmadı; setup düzeltilmeli.':'This Package ID appears in multiple feeder rows. Automatic reel picking was not performed; the setup must be corrected.',
'Bu makara daha önce alındı veya feeder’a yüklendi.':'This reel was already picked or loaded into a feeder.',
'Bu makara daha önce okutulmuş. İkinci kez makara alma kaydı oluşturulmadı.':'This reel has already been scanned. A second reel-picking record was not created.',
'Bu Package ID aynı iş emrinde başka bir feeder için daha önce kullanılmış.':'This Package ID has already been used for another feeder in the same work order.',
'Bu Package ID aynı iş emrinde başka bir feeder için zaten kullanılmış. İkinci kullanım engellendi.':'This Package ID has already been used for another feeder in the same work order. Reuse was blocked.',
'Makara eşzamanlı başka bir işlemde zaten alınmış olarak işaretlendi.':'The reel was already marked as picked by another concurrent operation.',
'Bu Package ID aynı anda başka bir feeder için kullanılmış. İkinci kayıt oluşturulmadı.':'This Package ID was used for another feeder at the same time. A second record was not created.',
'Makara doğrulandı ve alındı olarak kaydedildi.':'The reel was verified and recorded as picked.',
'Makara doğrulandı ve alındı olarak işaretlendi.':'The reel was verified and marked as picked.',
'Sıfırlama onayı geçersiz. İş emri numarası eşleşmedi.':'Reset confirmation is invalid. The work order number does not match.',
'Bu iş emri için sıfırlanacak feeder kaydı bulunamadı.':'No feeder records were found to reset for this work order.',
'İş emrindeki tüm feeder durumları PENDING durumuna döndürüldü. Setup ve tarama geçmişi korundu.':'All feeder statuses in the work order were reset to PENDING. Setup and scan history were preserved.',
'İş emri sıfırlandı. Tüm feeder durumları BEKLİYOR olarak ayarlandı; setup ve geçmiş taramalar korundu.':'The work order was reset. All feeder statuses were set to PENDING; setup and scan history were preserved.',
'İş emri, operatör veya PCB yüzü bilgisi geçersiz.':'Work order, operator, or PCB side information is invalid.',
'Seçili PCB yüzü için toplu feeder yükleme onayı verildi.':'Bulk feeder loading was confirmed for the selected PCB side.',
' feeder kaydı YÜKLENDİ olarak işaretlendi.':' feeder records were marked as LOADED.',
'Feeder kaydı bulunamadı.':'Feeder record not found.',
'Önce makara QR kodu doğrulanıp alındı durumuna geçmeli.':'The reel QR code must be verified and marked as picked first.',
'Bu feeder kaydı daha önce yüklenmiş veya başka bir işlem tarafından güncellenmiş.':'This feeder record has already been loaded or was updated by another operation.',
'Feeder yükleme operatör tarafından onaylandı.':'Feeder loading was confirmed by the operator.',
'Feeder’a yüklendi olarak kaydedildi.':'Recorded as loaded into the feeder.',
'İş emri belirtilmedi.':'Work order was not specified.',
'İş emri bulunamadı.':'Work order not found.',
'İş emri veya PCB yüzü belirtilmedi.':'Work order or PCB side was not specified.',
'API endpoint bulunamadı.':'API endpoint not found.',
'Sunucu hatası:':'Server error:'
};
const $=id=>document.getElementById(id);
const translationEntries=Object.entries(translations).sort((a,b)=>b[0].length-a[0].length);
const originalTextNodes=new WeakMap();
const appliedTextNodes=new WeakMap();
const originalAttributes=new WeakMap();
const appliedAttributes=new WeakMap();
function translateTurkish(value){let out=String(value??'');for(const [source,target] of translationEntries){if(source)out=out.split(source).join(target);}return out;}
function tr(value){return currentLang==='en'?translateTurkish(value):String(value??'');}
function translateTextNode(node){
  const current=node.nodeValue;
  const previous=appliedTextNodes.get(node);
  if(previous===undefined||current!==previous)originalTextNodes.set(node,current);
  const original=originalTextNodes.get(node)??current;
  const next=currentLang==='en'?translateTurkish(original):original;
  if(current!==next){appliedTextNodes.set(node,next);node.nodeValue=next;}else appliedTextNodes.set(node,current);
}
function translateAttribute(el,attr){
  const current=el.getAttribute(attr);
  let originals=originalAttributes.get(el);if(!originals){originals=new Map();originalAttributes.set(el,originals);}
  let applied=appliedAttributes.get(el);if(!applied){applied=new Map();appliedAttributes.set(el,applied);}
  const previous=applied.get(attr);
  if(previous===undefined||current!==previous)originals.set(attr,current);
  const original=originals.get(attr)??current;
  const next=currentLang==='en'?translateTurkish(original):original;
  if(current!==next){applied.set(attr,next);el.setAttribute(attr,next);}else applied.set(attr,current);
}
const translationObserverConfig={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']};
let translationFrame=0;
const pendingTranslationRoots=new Set();
const pendingTranslationAttributes=new Set();
function translateSubtree(root){
  if(!root)return;
  if(root.nodeType===Node.TEXT_NODE){
    const tag=root.parentElement?.tagName;
    if(!tag||!['SCRIPT','STYLE','INPUT','TEXTAREA'].includes(tag))translateTextNode(root);
    return;
  }
  if(root.nodeType!==Node.ELEMENT_NODE && root.nodeType!==Node.DOCUMENT_FRAGMENT_NODE)return;
  if(root.nodeType===Node.ELEMENT_NODE){
    for(const attr of ['placeholder','title','aria-label'])if(root.hasAttribute(attr))translateAttribute(root,attr);
    if(['SCRIPT','STYLE','INPUT','TEXTAREA'].includes(root.tagName))return;
  }
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let node;while((node=walker.nextNode())){
    const tag=node.parentElement?.tagName;
    if(!tag||!['SCRIPT','STYLE','INPUT','TEXTAREA'].includes(tag))translateTextNode(node);
  }
  if(root.querySelectorAll)root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{
    for(const attr of ['placeholder','title','aria-label'])if(el.hasAttribute(attr))translateAttribute(el,attr);
  });
}
function translatePage(){
  if(translating||!document.body)return;
  translating=true;
  translationObserver.disconnect();
  try{
    translateSubtree(document.body);
    document.documentElement.lang=currentLang;
    const langButton=$('langToggle');if(langButton)langButton.textContent=currentLang==='tr'?'EN':'TR';
  }finally{
    translating=false;
    translationObserver.observe(document.body,translationObserverConfig);
  }
}
function processPendingTranslations(){
  translationFrame=0;
  if(currentLang!=='en'||!document.body){pendingTranslationRoots.clear();pendingTranslationAttributes.clear();return;}
  translating=true;
  translationObserver.disconnect();
  try{
    for(const root of pendingTranslationRoots)translateSubtree(root);
    for(const item of pendingTranslationAttributes){
      if(item?.el?.hasAttribute(item.attr))translateAttribute(item.el,item.attr);
    }
  }finally{
    pendingTranslationRoots.clear();pendingTranslationAttributes.clear();
    translating=false;
    translationObserver.observe(document.body,translationObserverConfig);
  }
}
function queueTranslation(records){
  if(currentLang!=='en'||translating)return;
  for(const record of records){
    if(record.type==='characterData')pendingTranslationRoots.add(record.target);
    else if(record.type==='childList')record.addedNodes.forEach(n=>pendingTranslationRoots.add(n));
    else if(record.type==='attributes')pendingTranslationAttributes.add({el:record.target,attr:record.attributeName});
  }
  if(!translationFrame && (pendingTranslationRoots.size||pendingTranslationAttributes.size))translationFrame=requestAnimationFrame(processPendingTranslations);
}
function toggleLanguage(){
  currentLang=currentLang==='tr'?'en':'tr';
  try{localStorage.setItem(LANGUAGE_KEY,currentLang);}catch(e){}
  pendingTranslationRoots.clear();pendingTranslationAttributes.clear();
  if(translationFrame){cancelAnimationFrame(translationFrame);translationFrame=0;}
  translatePage();
}
const translationObserver=new MutationObserver(queueTranslation);
window.addEventListener('DOMContentLoaded',()=>{
  translationObserver.observe(document.body,translationObserverConfig);
  translatePage();
  restoreSession();
});
function clearSavedSession(){try{sessionStorage.removeItem(SESSION_KEY);}catch(e){}}
function scheduleSessionExpiry(expiresAt){
  if(sessionExpiryTimer)clearTimeout(sessionExpiryTimer);
  const expire=()=>{clearSavedSession();if(refreshTimer)clearInterval(refreshTimer);$('pin').value='';$('connection').textContent='8 saatlik oturum süresi doldu. Yeniden PIN girip bağlanın.';};
  const remaining=expiresAt-Date.now();
  if(remaining<=0){expire();return;}
  sessionExpiryTimer=setTimeout(expire,remaining);
}
function saveSession(){
  const expiresAt=Date.now()+SESSION_DURATION_MS;
  try{sessionStorage.setItem(SESSION_KEY,JSON.stringify({jobId:cfg().jobId,operator:cfg().operator,pin:cfg().pin,expiresAt}));}catch(e){}
  scheduleSessionExpiry(expiresAt);
}
function restoreSession(){
  try{
    const raw=sessionStorage.getItem(SESSION_KEY);if(!raw)return;
    const saved=JSON.parse(raw);
    if(!saved.expiresAt||Date.now()>=saved.expiresAt){clearSavedSession();return;}
    setJobOption(saved.jobId||'');$('operator').value=saved.operator||'';$('pin').value=saved.pin||'';
    $('connection').textContent='Oturum geri yükleniyor…';
    connectApp(true);
    scheduleSessionExpiry(saved.expiresAt);
  }catch(e){clearSavedSession();}
}
function setJobOption(jobId){
  const sel=$('jobId');if(!sel||!jobId)return;
  let option=[...sel.options].find(o=>o.value===jobId);
  if(!option){option=document.createElement('option');option.value=jobId;option.textContent=jobId;sel.appendChild(option);}
  sel.value=jobId;
}
async function loadJobOptions(){
  const pin=$('pin')?.value||'';if(!pin)return;
  const sel=$('jobId'),existing=sel.value;
  try{
    const res=await fetch('/api/jobs/list',{headers:{'X-App-Pin':pin}});
    const data=await res.json();if(!res.ok)throw Error(data.message||'İş emirleri yüklenemedi.');
    sel.innerHTML='<option value="">'+escapeHtml(tr('İş emri seç'))+'</option>';
    for(const j of data.jobs||[]){
      const o=document.createElement('option');o.value=j.jobId;
      o.textContent=j.jobId+' • '+(j.projectName||'Legacy')+' • '+(j.revision||'—');sel.appendChild(o);
    }
    if(existing)setJobOption(existing);
  }catch(e){$('connection').textContent='İş emirleri yüklenemedi: '+e.message;}
}
function onJobSelected(){
  if(refreshTimer){clearInterval(refreshTimer);refreshTimer=null;}
  latestDashboardData=null;replacementScanTarget=null;
  for(const key of Object.keys(manualPickValues))delete manualPickValues[key];
  for(const key of Object.keys(replacementManualValues))delete replacementManualValues[key];
  for(const key of Object.keys(unplannedPackageValues))delete unplannedPackageValues[key];
  for(const key of Object.keys(unplannedOzcodeValues))delete unplannedOzcodeValues[key];
  $('connection').textContent=tr('İş emri seçildi; Bağlan butonuna bas.');
}
function cfg(){return {jobId:$('jobId').value.trim(),operator:$('operator').value.trim(),pin:$('pin').value.trim()};}
function headers(){return {'Content-Type':'application/json','X-App-Pin':cfg().pin};}
async function api(path,body){
  const opt={method:body?'POST':'GET',headers:headers()}; if(body) opt.body=JSON.stringify(body);
  const sep=path.includes('?')?'&':'?'; const res=await fetch(path+(body?'':sep+'jobId='+encodeURIComponent(cfg().jobId)),opt);
  const data=await res.json(); if(!res.ok) throw new Error(data.message||'Sunucu hatası: '+res.status); return data;
}
async function connectApp(isRestore=false){
  if(!cfg().jobId||!cfg().operator||!cfg().pin){$('connection').textContent='İş emri, operatör ve PIN alanlarını doldur.';return;}
  try{
    // Reconcile the TOP/BOTTOM duplicate rows that represent the same physical feeder.
    // This one-time-at-connect repair promotes the less advanced side to the existing physical state.
    await api('/api/shared-sync',{jobId:cfg().jobId,operator:cfg().operator});
    await refreshDashboard();
    if(!isRestore)saveSession();
    loadJobOptions().catch(()=>{});
    const jobMeta=latestDashboardData||{};
    const projectLabel=jobMeta.projectName||'Eski setup';
    const revisionLabel=jobMeta.revision||'Revizyon yok';
    $('connection').textContent='Bağlantı başarılı • '+cfg().jobId+' • '+projectLabel+' • '+revisionLabel+' • Oturum 8 saat geçerli';
    if(refreshTimer)clearInterval(refreshTimer);refreshTimer=setInterval(async()=>{
      if(!document.getElementById('panel-dashboard')?.classList.contains('active'))return;
      try{await refreshDashboard();}catch(e){$('connection').textContent='Bağlantı hatası: '+e.message;}
    },5000);
  }catch(e){if(isRestore)clearSavedSession();$('connection').textContent='Bağlantı hatası: '+e.message;}
}
function setCurrentSide(side){
  currentSide=side==='TOP'?'TOP':'BOTTOM';
  if(replacementScanTarget&&replacementScanTarget.side!==currentSide)replacementScanTarget=null;
  const scanSide=$('scanSide');if(scanSide)scanSide.value=currentSide;
  const b=$('sideBottom'),t=$('sideTop');
  if(b&&t){b.className=currentSide==='BOTTOM'?'success':'secondary';t.className=currentSide==='TOP'?'success':'secondary';}
  const hint=$('sideHint');if(hint)hint.textContent=currentSide+' yüzü seçili. Sayaçlar ve liste yalnızca '+currentSide+' kayıtlarını gösterir.';
  if(document.getElementById('panel-dashboard')?.classList.contains('active'))refreshDashboard();
}
function showTab(name){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id==='panel-'+name));if(name==='dashboard')refreshDashboard();if(name==='projects')refreshProjects();}
function parsePackageId(raw){
  const text=String(raw||'').trim();
  if(/^(?:PKG|LEG)-[A-Z0-9]+(?:-[A-Z0-9]+)*$/i.test(text))return text.toUpperCase();
  const marker=/(?:PACKAGE[\s_-]*ID|ID)\s*[:=]\s*/i.exec(text);
  if(marker){
    const tail=text.slice(marker.index+marker[0].length);
    const next=tail.search(/(?:PART(?:\s*NUMBER)?|PN|OZ|QTY|WH|LOC|LOT|DATE|PO)\s*[:=]/i);
    const segment=tail.slice(0,next<0?tail.length:next).trim().replace(/^[|;,\s]+|[|;,\s]+$/g,'');
    const found=segment.match(/(?:PKG|LEG)-[A-Z0-9]+(?:-[A-Z0-9]+)*/i);
    if(found)return found[0].toUpperCase();
  }
  const numeric=text.match(/(?:PKG|LEG)-\d+/i);
  return numeric?numeric[0].toUpperCase():'';
}
async function startScanner(){
  if(!cfg().jobId||!cfg().operator||!cfg().pin){showResult('scanResult','Önce iş emri, operatör ve PIN bilgilerini girip Bağlan düğmesine bas.','warn');return;}
  try{
    showResult('scanResult',tr('QR okuyucu hazırlanıyor…'),'warn');
    await ensureQrLibrary();
    if(scanner){try{await scanner.stop();}catch(e){}}
    scanner=new Html5Qrcode('reader',{formatsToSupport:[Html5QrcodeSupportedFormats.QR_CODE,Html5QrcodeSupportedFormats.DATA_MATRIX]});
    await scanner.start({facingMode:'environment'},{fps:10,qrbox:{width:260,height:220}},async(decoded)=>{await stopScanner();$('manualCode').value=decoded;renderQrPreview(decoded);await sendScan(decoded);},()=>{});
    showResult('scanResult','Kamera açık. Etiketteki kodu çerçeveye al.','');
  }catch(e){showResult('scanResult','Kamera açılamadı: '+e.message+' • Tarayıcı kamera iznini kontrol et.','bad');}
}
async function stopScanner(){if(scanner){try{if(scanner.isScanning)await scanner.stop();}catch(e){};}}
async function submitManual(){const v=$('manualCode').value.trim();if(!v){showResult('scanResult','Bir Package ID veya ham QR metni gir.','warn');return;}renderQrPreview(v);await sendScan(v);}
function renderQrPreview(raw){
  const el=$('qrDecodedDisplay');if(!el)return;
  const text=String(raw||'').trim();
  if(!text){el.textContent=tr('QR okutulduğunda alanlar burada satır satır gösterilir.');return;}
  const labels={ID:'PACKAGE ID',PN:'PART NUMBER',OZ:'OZCODE',QTY:'MİKTAR',WH:'DEPO',LOC:'LOKASYON',LOT:'LOT',DATE:'DATE CODE',PO:'PO'};
  const pattern=/(QTY|DATE|LOC|LOT|PN|OZ|WH|ID|PO)\s*=/gi;
  const matches=[...text.matchAll(pattern)];
  const lines=[];
  if(matches.length){
    const prefix=text.slice(0,matches[0].index).trim().replace(/^[|;,\s]+|[|;,\s]+$/g,'');
    if(prefix)lines.push(tr('ETİKET')+': '+prefix);
    for(let i=0;i<matches.length;i++){
      const m=matches[i];
      const start=m.index+m[0].length;
      const end=i+1<matches.length?matches[i+1].index:text.length;
      const value=text.slice(start,end).trim().replace(/^[|;,\s]+|[|;,\s]+$/g,'');
      if(value)lines.push(tr(labels[m[1].toUpperCase()]||m[1].toUpperCase())+': '+value);
    }
  }else{
    const pkg=parsePackageId(text);
    if(pkg)lines.push(tr('PACKAGE ID')+': '+pkg);
    else lines.push(tr('OKUNAN METİN')+': '+text);
  }
  lines.push('',tr('Doğrulamada yalnızca Package ID kullanılır. Diğer alanlar bilgi amaçlı gösterilir.'));
  el.textContent=lines.join('\n');
}
async function sendScan(raw){
  renderQrPreview(raw);
  try{
    const target=replacementScanTarget;
    if(target){
      const scannedPackage=parsePackageId(raw);
      if(target.side!==currentSide||target.jobId!==cfg().jobId){replacementScanTarget=null;showResult('scanResult','İş emri veya PCB yüzü değişti. Yedek makara doğrulaması iptal edildi.','bad');return;}
      if(scannedPackage!==target.expected){
        showResult('scanResult','<b>YANLIŞ YEDEK MAKARA</b><br>Okunan: '+escapeHtml(scannedPackage||'Geçerli Package ID yok')+'<br>Beklenen: '+escapeHtml(target.expected)+'<br>Doğru makarayı okut veya Laptop Takip ekranından manuel gir.','bad');
        return;
      }
      // The dedicated endpoint validates the feeder row, physical position, plan status and reel ID again.
      const out=await api('/api/reel-change',{jobId:cfg().jobId,operator:cfg().operator,id:target.id,pcbSide:target.side,action:'PICK',packageId:scannedPackage,rawQr:raw,entryMethod:'QR'});
      replacementScanTarget=null;
      showResult('scanResult','<b>YEDEK MAKARA QR İLE DOĞRULANDI</b><br>'+escapeHtml(out.message),'ok');
      lastScans.unshift({id:scannedPackage,result:'YEDEK ALINDI (QR)',message:out.message||'',time:new Date().toLocaleTimeString('tr-TR')});
      lastScans=lastScans.slice(0,5);
      $('recentScans').innerHTML=lastScans.map(x=>'<div style="padding:6px 0;border-bottom:1px solid #e4ebf2"><b>'+escapeHtml(x.id)+'</b> • '+escapeHtml(x.result)+' <span style="float:right">'+x.time+'</span><br><span class="muted">'+escapeHtml(x.message)+'</span></div>').join('');
      await refreshDashboard();
      return;
    }
    const out=await api('/api/scan',{jobId:cfg().jobId,operator:cfg().operator,rawQr:raw,pcbSide:currentSide});
    if(out.ok){
      const sharedNote=out.sharedFeeder?'<br><b>'+escapeHtml(tr('ORTAK FEEDER'))+'</b> • '+escapeHtml(tr('TOP ve BOTTOM durumları aynı fiziksel feeder için birlikte güncellendi.')):'';
      if(out.sparePicked)showResult('scanResult','<b>YEDEK MAKARA QR İLE DOĞRULANDI</b><br>'+escapeHtml(out.message),'ok');
      else showResult('scanResult','<b>MAKARA ALINDI</b><br>'+escapeHtml(out.packageId)+'<br>'+escapeHtml(out.machine)+' / '+escapeHtml(out.face)+' / '+escapeHtml(out.slot)+'<br>OZCODE: '+escapeHtml(out.ozcode)+' • Lokasyon: '+escapeHtml(out.location)+sharedNote,'ok');
    }
    else{showResult('scanResult','<b>'+escapeHtml(out.code||'İŞLEM DURDU')+'</b><br>'+escapeHtml(out.message||'Doğrulama başarısız.'),'bad');}
    lastScans.unshift({id:out.packageId||parsePackageId(raw),result:out.ok?'ALINDI':(out.code||'HATA'),message:out.message||'',time:new Date().toLocaleTimeString('tr-TR')});lastScans=lastScans.slice(0,5);$('recentScans').innerHTML=lastScans.map(x=>'<div style="padding:6px 0;border-bottom:1px solid #e4ebf2"><b>'+escapeHtml(x.id)+'</b> • '+escapeHtml(x.result)+' <span style="float:right">'+x.time+'</span><br><span class="muted">'+escapeHtml(x.message)+'</span></div>').join('');
    await refreshDashboard();
  }catch(e){showResult('scanResult','İstek başarısız: '+e.message,'bad');}
}
function showResult(id,html,cls){const el=$(id);el.className='result '+(cls||'');el.innerHTML=html;}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function refreshDashboard(){
  if(!cfg().jobId||!cfg().pin)return;
  const d=await api('/api/dashboard?pcbSide='+encodeURIComponent(currentSide));
  latestDashboardData=d;
  $('metaJobId').textContent=d.jobId||cfg().jobId;
  $('metaProjectName').textContent=d.projectName||tr('Proje bağlantısı yok (eski setup)');
  $('metaProjectId').textContent=d.projectId?(tr('Proje ID: ')+d.projectId):'';
  $('metaRevision').textContent=d.revision||'—';
  const revStatus=$('metaRevisionStatus');
  revStatus.textContent=d.revisionStatus?tr(d.revisionStatus):tr('Revizyon yok');
  revStatus.className='pill '+(d.revisionStatus==='APPROVED'?'loaded':'pending');
  const ratio = value => String(value) + '/' + String(d.total);
  const waitingReplacement=(d.rows||[]).filter(x=>x.replacement_status==='EMPTY');
  if(waitingReplacement.length){
    $('resetResult').textContent='DİKKAT: '+waitingReplacement.length+' feeder makara değişimi bekliyor. Yedek doğrulanana kadar ilgili feeder üretimde kullanılmamalı.';
    $('resetResult').style.color='#b42318';
  }
  $('kTotal').textContent=d.total;
  $('kCollected').textContent=ratio(d.collected); // PICKED + LOADED: depodan alınmış toplam makara
  $('kLoaded').textContent=ratio(d.loaded); // Fiziksel feeder yüklemesi onaylanmış kayıtlar
  const focusedUnplannedId=document.activeElement?.dataset?.unplannedId||'';
  const focusedUnplannedKind=document.activeElement?.dataset?.unplannedKind||'';
  const focusedManualId=document.activeElement?.dataset?.manualPkgId||'';
  const focusedReplacementId=document.activeElement?.dataset?.replacementManualId||'';
  const focusedReplacementStart=focusedReplacementId?document.activeElement.selectionStart:null;
  const focusedReplacementEnd=focusedReplacementId?document.activeElement.selectionEnd:null;
  const focusedManualStart=focusedManualId?document.activeElement.selectionStart:null;
  const focusedManualEnd=focusedManualId?document.activeElement.selectionEnd:null;
  $('dashboardBody').innerHTML=d.rows.map(r=>{
    if(r.status!=='PENDING'){
      delete manualPickValues[r.id];
      delete manualPickMessages[r.id];
    }
    // Makara durumu ile feeder yükleme durumu birbirinden ayrı gösterilir.
    const manualMessage=manualPickMessages[r.id]
      ? '<span class="manual-pick-msg">'+escapeHtml(manualPickMessages[r.id])+'</span>'
      : '';
    const st=r.status==='PENDING'
      ? '<div class="pending-manual-wrap"><span class="pill pending">BEKLİYOR</span><div><div class="manual-pick-inline"><input type="text" id="manualPkg-'+escapeHtml(r.id)+'" data-manual-pkg-id="'+escapeHtml(r.id)+'" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="'+escapeHtml(tr('Package ID gir'))+'" value="'+escapeHtml(manualPickValues[r.id]||'')+'" oninput="updateManualPickInput(\''+r.id+'\',this.value)" onkeydown="if(event.key===\'Enter\'){event.preventDefault();manualPick(\''+r.id+'\',\''+escapeHtml(r.machine)+'\',\''+escapeHtml(r.face)+'\',\''+escapeHtml(r.slot)+'\','+(r.is_shared?'true':'false')+')}"><button class="secondary small" onclick="manualPick(\''+r.id+'\',\''+escapeHtml(r.machine)+'\',\''+escapeHtml(r.face)+'\',\''+escapeHtml(r.slot)+'\','+(r.is_shared?'true':'false')+')">'+escapeHtml(tr('Manuel doğrula'))+'</button></div>'+manualMessage+'</div></div>'
      : '<span class="pill picked">ALINDI</span>';
    const load=r.status==='LOADED'
      ? '<span class="pill loaded">'+'YÜKLENDİ'+'</span>'
      : r.status==='PICKED'
        ? '<span class="pill picked">'+'YÜKLENMEDİ'+'</span>'
        : '<span class="pill pending">—</span>';
    const plannedCell=r.replacement_package_id
      ? '<div style="min-width:165px;white-space:normal"><b>'+escapeHtml(r.replacement_package_id)+'</b>'+(Number(r.replacement_unplanned)?'<div><span class="pill pending">PLANSIZ YEDEK</span></div>':'')+'<div class="muted">'+escapeHtml(r.replacement_location||'')+'</div></div>'
      : '<span class="muted">—</span>';
    const picked=Number(r.replacement_picked)===1;
    const spareState=r.replacement_package_id
      ? '<div style="min-width:235px;white-space:normal">'+
        (r.replacement_status==='ACTIVE'
          ? '<span class="pill picked">ALINDI</span> <span class="pill loaded">YEDEK AKTİF</span>'
          : '<span class="pill '+(picked?'picked':'pending')+'">'+(picked?'ALINDI':'Henüz alınmadı')+'</span>')+
        (r.replacement_status==='EMPTY'?'<div><span class="pill pending" style="background:#fee2e2;color:#9f1239">DEĞİŞİM BEKLİYOR • FEEDER DURDURULMALI</span></div>':'')+
        (['PLANNED','EMPTY'].includes(r.replacement_status)&&!picked
          ? '<div class="replacement-controls"><button class="success small" onclick="scanReplacementReel(\''+r.id+'\')">YEDEK QR OKUT</button><div class="manual-pick-inline"><input id="replacementManual-'+escapeHtml(r.id)+'" type="text" data-replacement-manual-id="'+escapeHtml(r.id)+'" placeholder="QR okunmazsa Package ID" value="'+escapeHtml(replacementManualValues[r.id]||'')+'" oninput="replacementManualValues[\''+r.id+'\']=this.value" onkeydown="if(event.key===\'Enter\'){event.preventDefault();confirmReelChange(\''+r.id+'\')}"><button class="secondary small" onclick="confirmReelChange(\''+r.id+'\')">MANUEL DOĞRULA</button></div></div>' : '')+
        (r.replacement_status==='PLANNED'&&r.status==='LOADED' ? '<div><button class="danger small" onclick="beginReelChange(\''+r.id+'\')">ANA MAKARA BİTTİ</button></div>':'')+
        (r.replacement_status==='EMPTY'&&picked ? '<div><button class="success small" onclick="installPickedSpare(\''+r.id+'\')">YEDEK TAKMAYI ONAYLA</button></div>':'')+
        '</div>'
      : r.status==='LOADED'
        ? '<div style="min-width:220px;white-space:normal"><span class="muted">PLANSIZ DEĞİŞİM</span><div class="replacement-controls"><input id="unplannedPkg-'+escapeHtml(r.id)+'" data-unplanned-id="'+escapeHtml(r.id)+'" data-unplanned-kind="pkg" placeholder="Plansız Package ID" autocomplete="off" value="'+escapeHtml(unplannedPackageValues[r.id]||'')+'" oninput="unplannedPackageValues[\''+r.id+'\']=this.value"><input id="unplannedOz-'+escapeHtml(r.id)+'" data-unplanned-id="'+escapeHtml(r.id)+'" data-unplanned-kind="oz" placeholder="Komponent OZCODE" autocomplete="off" style="width:125px" value="'+escapeHtml(unplannedOzcodeValues[r.id]||'')+'" oninput="unplannedOzcodeValues[\''+r.id+'\']=this.value"><button class="danger small" onclick="unplannedReplacement(\''+r.id+'\')">PLANSIZ MAKARA AL</button></div></div>'
        : '<span class="muted">—</span>';
    const sharedBadge=r.is_shared?'<span class="pill loaded" style="margin-left:5px">'+escapeHtml(tr('ORTAK'))+'</span>':'';
    const loadAction=r.status==='PICKED'
      ? '<button class="success small" onclick="markLoaded(\''+r.id+'\',\''+escapeHtml(r.machine)+'\',\''+escapeHtml(r.face)+'\',\''+escapeHtml(r.slot)+'\','+(r.is_shared?'true':'false')+')">'+'Fiziksel yüklemeyi onayla'+'</button>'
      : '';
    const resetAction=r.status!=='PENDING'
      ? '<button class="danger small" style="margin-left:5px" onclick="resetFeeder(\''+r.id+'\',\''+escapeHtml(r.machine)+'\',\''+escapeHtml(r.face)+'\',\''+escapeHtml(r.slot)+'\','+(r.is_shared?'true':'false')+')">'+'Satırı sıfırla'+'</button>'
      : '';
    const action=loadAction+resetAction;
    const searchIndex=[r.machine,r.face,r.slot,r.ozcode,r.location,r.package_id,r.lot_number,
      r.replacement_package_id,r.replacement_location,r.replacement_status,r.status,
      r.control_package_id].filter(x=>x!==undefined&&x!==null).join(' ');
    return '<tr data-feeder-search="'+escapeHtml(searchIndex)+'"><td><b>'+escapeHtml(r.machine)+'</b></td><td>'+escapeHtml(r.face)+'</td><td><b>'+escapeHtml(r.slot)+'</b>'+sharedBadge+'</td><td>'+escapeHtml(r.ozcode)+'</td><td>'+escapeHtml(r.location)+'</td><td>'+escapeHtml(r.package_id)+'</td><td>'+escapeHtml(r.lot_number)+'</td><td>'+plannedCell+'</td><td>'+spareState+'</td><td>'+st+'</td><td>'+load+'</td><td>'+action+'</td></tr>';
  }).join('')||'<tr><td colspan="12">Bu yüz için setup kaydı bulunamadı. Önce ilgili TOP/BOTTOM Excel dosyasını yükle.</td></tr>';
  applyFeederSearch();
  if(focusedUnplannedId){
    const el=$(focusedUnplannedKind==='oz'?'unplannedOz-'+focusedUnplannedId:'unplannedPkg-'+focusedUnplannedId);
    if(el)el.focus();
  }
  if(focusedReplacementId){
    const restoredReplacement=$('replacementManual-'+focusedReplacementId);
    if(restoredReplacement){restoredReplacement.focus();try{restoredReplacement.setSelectionRange(focusedReplacementStart,focusedReplacementEnd);}catch(e){}}
  }
  if(focusedManualId){
    const restoredInput=$('manualPkg-'+focusedManualId);
    if(restoredInput){
      restoredInput.focus();
      if(focusedManualStart!==null&&focusedManualEnd!==null){
        try{restoredInput.setSelectionRange(focusedManualStart,focusedManualEnd);}catch(e){}
      }
    }
  }
}
function normalizeFeederSearch(value){
  return String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').toLowerCase();
}
function applyFeederSearch(){
  const q=normalizeFeederSearch($('feederSearch')?.value||'').trim();
  const words=q.split(/\s+/).filter(Boolean);
  let visible=0;
  const rows=$('dashboardBody')?.querySelectorAll('tr[data-feeder-search]')||[];
  rows.forEach(row=>{
    const haystack=normalizeFeederSearch(row.getAttribute('data-feeder-search'));
    const match=words.every(word=>haystack.includes(word));
    row.hidden=!match;
    row.style.display=match?'':'none';
    if(match)visible++;
  });
  const counter=$('feederSearchCount');
  if(counter)counter.textContent=visible+' / '+rows.length+' '+tr('eşleşen feeder');
}
function clearFeederSearch(){
  const input=$('feederSearch');
  if(input){input.value='';input.focus();}
  applyFeederSearch();
}
function updateManualPickInput(id,value){
  manualPickValues[id]=String(value||'').toUpperCase().trim();
  if(manualPickMessages[id]){
    delete manualPickMessages[id];
  }
}
async function manualPick(id,machine,face,slot,isShared=false){
  if(!cfg().jobId||!cfg().operator||!cfg().pin){
    alert(currentLang==='en'?'Connect first using the work order, operator and PIN.':'Önce iş emri, operatör ve PIN ile bağlan.');
    return;
  }
  const input=$('manualPkg-'+id);
  const entered=String(input?.value??manualPickValues[id]??'').trim().toUpperCase();
  if(!entered){
    manualPickMessages[id]=tr('Manuel Package ID bekleniyor.');
    await refreshDashboard();
    return;
  }
  manualPickValues[id]=entered;
  if(input)input.disabled=true;
  try{
    const out=await api('/api/manual-pick',{
      jobId:cfg().jobId,operator:cfg().operator,id,pcbSide:currentSide,packageId:entered
    });
    delete manualPickValues[id];
    delete manualPickMessages[id];
    $('resetResult').textContent=tr('Manuel doğrulama başarılı:')+' '+entered+' • '+machine+' / '+face+' / '+slot+(out.sharedFeeder?' • '+tr('ORTAK FEEDER'):'');
    $('resetResult').style.color='#147d55';
    await refreshDashboard();
  }catch(e){
    manualPickValues[id]=entered;
    manualPickMessages[id]=e.message||tr('Manuel doğrulama başarısız:');
    await refreshDashboard();
  }
}
async function beginReelChange(id){
  if(!cfg().jobId||!cfg().operator||!cfg().pin)return alert('Önce sisteme bağlan.');
  const r=latestDashboardData?.rows?.find(x=>x.id===id);
  if(!r||r.replacement_status!=='PLANNED'||r.status!=='LOADED')return alert('Feeder yükleme durumu ve yedek makara planını kontrol et.');
  const question='Ana makaranın gerçekten tükendiğini onaylıyor musun?\n'+r.machine+' / '+r.face+' / '+r.slot+'\nAna: '+r.package_id+'\nYedek: '+r.replacement_package_id+'\nDepo: '+r.replacement_location+'\n\nOnaylandıktan sonra yedek doğrulanana kadar bu feeder için değişim bekleniyor uyarısı görünür.';
  if(!confirm(question))return;
  try{const out=await api('/api/reel-change',{jobId:cfg().jobId,operator:cfg().operator,id,pcbSide:currentSide,action:'EMPTY'});await refreshDashboard();alert(out.message);}
  catch(e){alert(e.message);}
}
async function scanReplacementReel(id){
  if(!cfg().jobId||!cfg().operator||!cfg().pin)return alert('Önce sisteme bağlan.');
  const r=latestDashboardData?.rows?.find(x=>x.id===id);
  if(!r||!['PLANNED','EMPTY'].includes(r.replacement_status))return alert('Yedek makara plan durumunu kontrol et.');
  replacementScanTarget={id,side:currentSide,jobId:cfg().jobId,expected:r.replacement_package_id,machine:r.machine,face:r.face,slot:r.slot};
  showTab('scan');
  showResult('scanResult','YEDEK MAKARA QR DOĞRULAMA\n'+escapeHtml(r.machine+' / '+r.face+' / '+r.slot)+'<br>Depo: '+escapeHtml(r.replacement_location||'')+'<br>Depodan aldığın yedek makaranın QR kodunu okut. Fiziksel değişim daha sonra ayrı onaylanır. Kamera çalışmazsa Laptop Takip ekranında manuel doğrula.','warn');
  await startScanner();
}
async function confirmReelChange(id){
  if(!cfg().jobId||!cfg().operator||!cfg().pin)return alert('Önce sisteme bağlan.');
  const r=latestDashboardData?.rows?.find(x=>x.id===id);
  if(!r||!['PLANNED','EMPTY'].includes(r.replacement_status))return alert('Yedek makara plan durumunu kontrol et.');
  const input=$('replacementManual-'+id);
  const rawQr=String(input?.value??replacementManualValues[id]??'').trim();
  const packageId=parsePackageId(rawQr);
  if(!packageId)return alert('Yedek makaranın geçerli Package ID bilgisini gir.');
  if(packageId.toUpperCase()!==String(r.replacement_package_id||'').toUpperCase()){
    return alert('Yanlış Package ID! Beklenen yedek makara: '+r.replacement_package_id+'. İşlem yapılmadı.');
  }
  if(!confirm('Bu yedek makarayı depodan ALINDI olarak kaydetmek istiyor musun?\n'+r.machine+' / '+r.face+' / '+r.slot+'\nID: '+packageId))return;
  try{
    const out=await api('/api/reel-change',{jobId:cfg().jobId,operator:cfg().operator,id,pcbSide:currentSide,action:'PICK',packageId,rawQr,entryMethod:'MANUAL'});
    delete replacementManualValues[id];
    await refreshDashboard();
    alert(out.message);
  }catch(e){alert(e.message);}
}
async function installPickedSpare(id){
  const r=latestDashboardData?.rows?.find(x=>x.id===id);
  if(!r||r.replacement_status!=='EMPTY'||!Number(r.replacement_picked))return alert('Önce ana makarayı BİTTİ, yedek makarayı ALINDI olarak kaydet.');
  if(!confirm('Yedek makaranın feeder pozisyonuna fiziksel olarak takıldığını onaylıyor musun?\n'+r.machine+' / '+r.face+' / '+r.slot+'\n'+r.replacement_package_id))return;
  try{
    const out=await api('/api/reel-change',{jobId:cfg().jobId,operator:cfg().operator,id,pcbSide:currentSide,action:'ACTIVATE',packageId:r.replacement_package_id,entryMethod:'MANUAL'});
    await refreshDashboard();alert(out.message);
  }catch(e){alert(e.message);}
}
async function unplannedReplacement(id){
  const r=latestDashboardData?.rows?.find(x=>x.id===id);
  if(!r||r.status!=='LOADED'||r.replacement_package_id)return alert('Bu feeder için plansız değişim yapılamaz.');
  const input=$('unplannedPkg-'+id);
  const ozInput=$('unplannedOz-'+id);
  const newPkg=parsePackageId(input?.value||'');
  const ozcode=String(ozInput?.value||'').trim().toUpperCase();
  if(!newPkg)return alert('Yeni makaranın Package ID bilgisi gerekli.');
  if(!ozcode||ozcode!==String(r.ozcode||'').toUpperCase())return alert('OZCODE feeder kaydıyla eşleşmiyor. Aynı komponent olduğundan emin ol.');
  if(!confirm('PLANSIZ yedek makarayı depodan ALINDI olarak kaydetmek istiyor musun?\nFeeder: '+r.machine+' / '+r.face+' / '+r.slot+'\nEski: '+r.package_id+'\nYeni: '+newPkg+'\nOZCODE: '+ozcode+'\nBu işlem makaranın fiziksel ve elektriksel eşdeğerliğini otomatik olarak doğrulamaz.'))return;
  try{
    const out=await api('/api/reel-change',{jobId:cfg().jobId,operator:cfg().operator,id,pcbSide:currentSide,action:'UNPLANNED',packageId:newPkg,confirmedOzcode:ozcode,entryMethod:'MANUAL',location:r.location});
    delete unplannedPackageValues[id];delete unplannedOzcodeValues[id];
    await refreshDashboard();alert(out.message);
  }catch(e){alert(e.message);}
}
async function downloadReport(){
  if(!cfg().jobId||!cfg().pin){alert(tr('Önce iş emri ve PIN ile bağlan.'));return;}
  const btn=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Raporu Excel indir');
  const old=btn?.textContent;if(btn){btn.disabled=true;btn.textContent='Rapor hazırlanıyor…';}
  try{
    if(btn)btn.textContent=tr('Excel kütüphanesi yükleniyor…');
    await ensureXLSX();
    const d=await api('/api/report');
    const wb=XLSX.utils.book_new();
    const generated=new Date(d.generatedAt);
    const fmt=x=>x?new Date(x).toLocaleString('tr-TR'):'-';
    const reelStatusLabel=x=>x==='PENDING'?'MAKARA BEKLİYOR':'MAKARA ALINDI';
    const loadingStatusLabel=x=>x==='LOADED'?'YÜKLENDİ':x==='PICKED'?'YÜKLEME BEKLİYOR':'-';
    const summary=[
      ['SMT REEL CONTROL - ÜRETİM HAZIRLIK DURUM RAPORU'],
      ['Rapor oluşturma zamanı',fmt(d.generatedAt)],
      ['Proje',d.projectName||'-'],['İş emri',d.jobId],['Feeder plan revizyonu',d.revision||'-'],['Revizyon durumu',d.revisionStatus||'-'],
      [],['PCB YÜZÜ','TOP','BOTTOM','TOPLAM'],
      ['Toplam feeder',d.summary.TOP.total,d.summary.BOTTOM.total,d.summary.TOP.total+d.summary.BOTTOM.total],
      ['Depodan alınacak makara',d.summary.TOP.pending,d.summary.BOTTOM.pending,d.summary.TOP.pending+d.summary.BOTTOM.pending],
      ['Depodan alınan toplam makara',d.summary.TOP.collected,d.summary.BOTTOM.collected,d.summary.TOP.collected+d.summary.BOTTOM.collected],
      ['Feeder yüklemesi bekleyen',d.summary.TOP.toLoad,d.summary.BOTTOM.toLoad,d.summary.TOP.toLoad+d.summary.BOTTOM.toLoad],
      ['Feeder’a yüklenen',d.summary.TOP.loaded,d.summary.BOTTOM.loaded,d.summary.TOP.loaded+d.summary.BOTTOM.loaded],
      [],['Not','Depodan alınan toplam makara = PICKED + LOADED. Feeder yüklemesi bekleyen = PICKED. Rapor indirme anındaki durumun anlık görüntüsüdür. Fiziksel yükleme, operatörün uygulamadaki onay kaydıdır.']
    ];
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(summary),'Özet');
    const detail=[['İş Emri','Proje','Revizyon','PCB Yüzü','Ortak Feeder','Makine','Ön/Arka','Slot','Feeder','OZCODE','Part Number','Lokasyon','Package ID','LOT','Date Code','Makara Durumu','Feeder Yükleme Durumu','Operatör','Makara Alınma Zamanı','Yükleme Onay Zamanı']];
    for(const r of d.rows){detail.push([d.jobId,d.projectName||'',d.revision||'',r.pcb_side,r.is_shared?'EVET':'HAYIR',r.machine,r.face,r.slot,r.feeder,r.ozcode,r.part_number,r.location,r.package_id,r.lot_number,r.date_code,reelStatusLabel(r.status),loadingStatusLabel(r.status),r.operator||'',fmt(r.scanned_at),fmt(r.loaded_at)]);}
    const ws=XLSX.utils.aoa_to_sheet(detail);ws['!autofilter']={ref:XLSX.utils.encode_range({s:{r:0,c:0},e:{r:Math.max(0,detail.length-1),c:detail[0].length-1}})};XLSX.utils.book_append_sheet(wb,ws,'Feeder Durumları');
    const ev=[['Zaman','İş Emri','Package ID','Sonuç','Açıklama','PCB Yüzü','Makine','Ön/Arka','Slot','Operatör']];
    for(const e of d.events){ev.push([fmt(e.scanned_at),e.job_id,e.package_id,e.result,e.message,e.pcb_side,e.machine,e.face,e.slot,e.operator]);}
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(ev),'İşlem Geçmişi');
    const rp=[['İş Emri','Makine','Taraf','Slot','Ana Package ID','Yedek Package ID','Yedek Depo','Durum','Yedek Alındı','Yedek Alınma Zamanı','Alan Operatör','Alım Yöntemi','Tükendi Zamanı','Tükendi Operatör','Değiştirildi Zamanı','Değiştiren Operatör']];
    for(const r of d.reelPlans||[]){rp.push([r.job_id,r.machine,r.face,r.slot,r.original_package_id,r.replacement_package_id,r.replacement_location,r.status,r.picked_at?'EVET':(r.status==='ACTIVE'?'EVET (ÖNCEKİ SÜRÜM)':'HAYIR'),fmt(r.picked_at),r.picked_by||'',r.picked_method||'',fmt(r.emptied_at),r.emptied_by||'',fmt(r.activated_at),r.activated_by||'']);}
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(rp),'Makara Değişimleri');
    const safe=(d.jobId||'is_emri').replace(/[^A-Z0-9_-]/gi,'_');
    XLSX.writeFile(wb,'SMT_Reel_Control_Rapor_'+safe+'_'+generated.toISOString().replace(/[:.]/g,'-')+'.xlsx');
    if(btn)btn.textContent='Rapor indirildi';
  }catch(e){alert(tr('Rapor oluşturulamadı: '+e.message));}
  finally{if(btn){btn.disabled=false;setTimeout(()=>{btn.textContent=old||'Raporu Excel indir';},1800);}}
}
async function bulkMarkLoaded(){
  if(!cfg().jobId||!cfg().operator||!cfg().pin){alert(currentLang==='en'?'Connect first using the work order, operator and PIN.':'Önce iş emri, operatör ve PIN ile bağlan.');return;}
  const side=currentSide;
  const count=Number(latestDashboardData?.toLoad || 0);
  if(count===0){alert(tr('Seçili '+side+' yüzünde toplu onaylanacak MAKARA ALINDI durumunda kayıt yok.'));return;}
  const question=currentLang==='en'
    ? 'This will mark '+count+' already-picked reels on '+side+' as LOADED. PENDING reels will not change.\n\nConfirm only after physically installing all these reels in their feeder slots. Continue?'
    : 'Bu işlem, seçili '+side+' yüzündeki '+count+' adet MAKARA ALINDI durumundaki kaydı YÜKLENDİ yapacak. BEKLİYOR durumundaki makaralar değişmeyecek.\n\nYalnızca bu yüzün tüm alınmış makaralarını fiziksel olarak feeder slotlarına yerleştirdiysen onayla. Devam edilsin mi?';
  if(!confirm(question))return;
  try{
    const out=await api('/api/loaded-bulk',{jobId:cfg().jobId,operator:cfg().operator,pcbSide:side});
    await refreshDashboard();
    alert((currentLang==='en'?'Bulk confirmation completed: ':'Toplu onay tamamlandı: ')+out.loadedCount+' '+side+' '+(currentLang==='en'?'reels marked as loaded.':'makara YÜKLENDİ olarak işaretlendi.')+(out.skippedCount?' '+out.skippedCount+' '+(currentLang==='en'?'records were skipped.':'kayıt atlandı.'):''));
  }catch(e){alert(tr('Toplu onay başarısız: '+e.message));}
}
async function markLoaded(id,machine,face,slot,isShared=false){
  const sharedNote=isShared?(currentLang==='en'?' This is a shared TOP/BOTTOM physical feeder; both side records will be updated.':' Bu TOP/BOTTOM ortak fiziksel feeder; iki yüzün kaydı birlikte güncellenecek.') : '';
  const ok=confirm(currentLang==='en'?'Did you physically install this reel in feeder slot '+machine+' / '+face+' / '+slot+'?'+sharedNote+'\n\nConfirm only after physical installation is complete.':'Bu makarayı gerçekten '+machine+' / '+face+' / '+slot+' feeder slotuna fiziksel olarak taktın mı?'+sharedNote+'\n\nYalnızca fiziksel montaj tamamlandıysa onayla.');
  if(!ok)return;
  try{await api('/api/loaded',{jobId:cfg().jobId,operator:cfg().operator,id});await refreshDashboard();}
  catch(e){alert(tr(e.message));}
}
async function resetBottomSide(){
  if(!cfg().jobId||!cfg().operator||!cfg().pin){alert(currentLang==='en'?'Connect first using the work order, operator and PIN.':'Önce iş emri, operatör ve PIN ile bağlan.');return;}
  try{
    const bottomData=(currentSide==='BOTTOM'&&latestDashboardData)?latestDashboardData:await api('/api/dashboard?pcbSide=BOTTOM');
    const count=Number(bottomData.resettable||0);
    if(count===0){$('resetResult').textContent=tr('BOTTOM tarafında sıfırlanacak alınmış makara veya yüklenmiş feeder yok.');$('resetResult').style.color='#64788b';return;}
    const confirmation=cfg().jobId+' BOTTOM';
    const typed=prompt(currentLang==='en'
      ? 'WARNING: This resets only BOTTOM-only feeder records in work order '+cfg().jobId+'. It resets '+count+' picked/loaded records to PENDING. Shared TOP/BOTTOM physical feeders are retained, as are TOP-only records, setup data and scan history.\n\nType exactly: '+confirmation
      : 'DİKKAT: Bu işlem yalnızca BOTTOM tarafına özel feeder kayıtlarını sıfırlar. '+count+' adet kayıt BEKLİYOR durumuna döner. TOP/BOTTOM ortak fiziksel feeder kayıtları, TOP kayıtları, setup ve işlem geçmişi korunur.\n\nOnay için aynen yaz: '+confirmation);
    if(typed===null)return;
    if(typed.trim().toUpperCase()!==confirmation.toUpperCase()){alert(tr('Onay metni eşleşmedi. Sıfırlama yapılmadı.'));return;}
    const out=await api('/api/reset-bottom',{jobId:cfg().jobId,operator:cfg().operator,confirmText:typed.trim()});
    $('resetResult').textContent=out.message+' ('+out.resetCount+' feeder)';
    $('resetResult').style.color='#147d55';
    if(currentSide==='BOTTOM')await refreshDashboard();
  }catch(e){$('resetResult').textContent='BOTTOM sıfırlama başarısız: '+e.message;$('resetResult').style.color='#b42318';}
}
async function resetFeeder(id,machine,face,slot,isShared=false){
  if(!cfg().jobId||!cfg().operator||!cfg().pin){alert(currentLang==='en'?'Connect first using the work order, operator and PIN.':'Önce iş emri, operatör ve PIN ile bağlan.');return;}
  const location=machine+' / '+face+' / '+slot;
  const sharedNote=isShared?(currentLang==='en'?' This is a shared physical feeder; TOP and BOTTOM records will both reset.':' Bu ortak fiziksel feeder; TOP ve BOTTOM kayıtları birlikte sıfırlanacak.') : '';
  const question=currentLang==='en'
    ? 'Reset feeder '+location+' to PENDING? Its reel-pick and loading status will be cleared.'+sharedNote+' The history will be preserved.'
    : location+' feeder satırını sıfırlamak istiyor musun? Makara alma ve yükleme durumu BEKLİYOR yapılacak.'+sharedNote+' İşlem geçmişi korunacak.';
  if(!confirm(question))return;
  try{
    const out=await api('/api/reset-feeder',{jobId:cfg().jobId,operator:cfg().operator,id});
    $('resetResult').textContent=out.message;
    $('resetResult').style.color='#147d55';
    await refreshDashboard();
  }catch(e){$('resetResult').textContent='Satır sıfırlama başarısız: '+e.message;$('resetResult').style.color='#b42318';}
}
function norm(s){return String(s??'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');}
function findCol(headers,keys){for(let i=0;i<headers.length;i++){const h=norm(headers[i]);if(keys.some(k=>h===norm(k)||h.includes(norm(k))))return i;}return -1;}
function parseSetupWorkbook(wb){
  const machines=['SM471','SM411','SM482'];const out=[];
  for(const machine of machines){const ws=wb.Sheets[machine];if(!ws)continue;const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});let face='';
    for(let i=0;i<rows.length;i++){
      const row=rows[i].map(x=>String(x??''));const n=row.map(norm);
      if(row.join(' ').toUpperCase().includes('FRONT'))face='FRONT';if(row.join(' ').toUpperCase().includes('REAR'))face='REAR';
      const slotI=findCol(row,['Slot']);const pkgI=findCol(row,['Package ID']);const ozI=findCol(row,['OZCODE']);
      if(slotI<0||pkgI<0||ozI<0)continue;
      const idx={slot:slotI,feeder:findCol(row,['Feeder']),oz:ozI,part:findCol(row,['Manufacturer P/N','Part Number']),loc:findCol(row,['Depo Lokasyonu']),pkg:pkgI,lot:findCol(row,['Lot No','Lot Number']),date:findCol(row,['Date Code']),stock:findCol(row,['Makara Stok']),planned:findCol(row,['Planned Use']),fuji:findCol(row,['Fuji Program Qty']),desc:findCol(row,['Description','Açıklama'])};
      if(!face){continue;}
      for(let j=i+1;j<rows.length;j++){
        const r=rows[j];const first=String(r[slotI]??'').trim();if(!first)continue;
        if(norm(first)==='slot')break;
        if(!/^[FR]\d{1,3}$/i.test(first))continue;
        const val=k=>idx[k]>=0?r[idx[k]]:'';
        const pkg=String(val('pkg')??'').trim();if(!pkg)continue;
        out.push({machine,face,slot:first.toUpperCase(),feeder:String(val('feeder')??''),ozcode:String(val('oz')??''),partNumber:String(val('part')??''),location:String(val('loc')??''),packageId:pkg,lotNumber:String(val('lot')??''),dateCode:String(val('date')??''),reelStock:Number(val('stock'))||0,plannedUse:Number(val('planned'))||0,fujiQty:String(val('fuji')??''),description:String(val('desc')??'')});
      }
    }
  }
  return out;
}
async function importExcel(){
  const f=$('excelFile').files[0];if(!f){showResult('importResult','Önce Excel dosyası seç.','warn');return;}if(!cfg().jobId||!cfg().pin){showResult('importResult','Önce iş emri ve PIN ile bağlan.','warn');return;}
  try{await ensureXLSX();const bytes=await f.arrayBuffer();const wb=XLSX.read(bytes,{type:'array'});const rows=parseSetupWorkbook(wb);if(!rows.length){showResult('importResult','SM471 / SM411 / SM482 sekmelerinde beklenen tablo başlıkları bulunamadı.','bad');return;}
    const result=await api('/api/import',{jobId:cfg().jobId,pcbSide:$('pcbSide').value,operator:cfg().operator,records:rows});
    showResult('importResult','<b>Setup içe aktarıldı.</b><br>'+rows.length+' feeder satırı • '+escapeHtml($('pcbSide').value)+' • '+escapeHtml(cfg().jobId),'ok');await refreshDashboard();
  }catch(e){showResult('importResult','İçe aktarma başarısız: '+e.message,'bad');}
}

let projectCache=[];
function selectedProject(){return projectCache.find(p=>p.project_id===$('projectSelect').value)||null;}
function refreshRevisionSelects(){
  const p=selectedProject();
  const revisions=p?.revisions||[];
  const revisionOptions='<option value="">'+'Revizyon seç'+'</option>'+revisions.map(r=>'<option value="'+escapeHtml(r.revision_id)+'">'+escapeHtml(r.revision)+' • '+escapeHtml(r.status)+' • TOP '+Number(r.top_count||0)+' / BOTTOM '+Number(r.bottom_count||0)+'</option>').join('');
  $('planRevisionSelect').innerHTML=revisionOptions;
  $('approveRevisionSelect').innerHTML=revisionOptions;
  refreshJobRevisionSelect();
}
function refreshJobRevisionSelect(){
  const pid=$('jobProjectSelect')?.value||$('projectSelect')?.value||'';
  const p=projectCache.find(x=>x.project_id===pid);
  const revisions=(p?.revisions||[]).filter(r=>r.status==='APPROVED');
  $('jobRevisionSelect').innerHTML='<option value="">'+'Onaylı revizyon seç'+'</option>'+revisions.map(r=>'<option value="'+escapeHtml(r.revision_id)+'">'+escapeHtml(r.revision)+' • TOP '+Number(r.top_count||0)+' / BOTTOM '+Number(r.bottom_count||0)+'</option>').join('');
}
function renderProjects(){
  const list=$('projectList');
  if(!projectCache.length){list.innerHTML='<div class="muted">Henüz proje yok. İlk projenizi oluşturun.</div>';return;}
  list.innerHTML=projectCache.map(p=>{
    const revs=p.revisions||[];const jobs=p.jobs||[];
    const latest=revs.length?revs[0]:null;
    return '<div class="card" style="padding:13px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:start"><b style="overflow-wrap:anywhere">'+escapeHtml(p.project_name)+'</b><span class="pill '+(p.status==='ACTIVE'?'loaded':'pending')+'">'+escapeHtml(p.status)+'</span></div><div class="muted" style="margin-top:8px">'+revs.length+' '+'revizyon'+' • '+jobs.length+' '+'üretim emri'+'</div>'+(latest?'<div class="muted">'+'Son revizyon'+': '+escapeHtml(latest.revision)+' ('+escapeHtml(latest.status)+') • TOP '+Number(latest.top_count||0)+' / BOTTOM '+Number(latest.bottom_count||0)+'</div>':'<div class="muted">'+'Henüz feeder planı yok.'+'</div>')+'<button class="secondary small" style="margin-top:10px" onclick="selectProject(\''+escapeHtml(p.project_id)+'\')">'+'Projeyi seç'+'</button></div>';
  }).join('');
}
function selectProject(projectId){
  $('projectSelect').value=projectId;
  $('jobProjectSelect').value=projectId;
  refreshRevisionSelects();
  refreshJobRevisionSelect();
}
async function refreshProjects(){
  if(!cfg().pin){$('projectList').innerHTML='<div class="muted">Projeleri görmek için önce PIN ile bağlan.</div>';return;}
  try{
    const out=await api('/api/projects');projectCache=out.projects||[];
    const opts='<option value="">'+'Proje seç'+'</option>'+projectCache.map(p=>'<option value="'+escapeHtml(p.project_id)+'">'+escapeHtml(p.project_name)+'</option>').join('');
    const old=$('projectSelect').value;const oldJob=$('jobProjectSelect').value;
    $('projectSelect').innerHTML=opts;$('jobProjectSelect').innerHTML=opts;
    if(projectCache.some(p=>p.project_id===old))$('projectSelect').value=old;else if(projectCache.length)$('projectSelect').value=projectCache[0].project_id;
    if(projectCache.some(p=>p.project_id===oldJob))$('jobProjectSelect').value=oldJob;else $('jobProjectSelect').value=$('projectSelect').value;
    renderProjects();refreshRevisionSelects();refreshJobRevisionSelect();
  }catch(e){$('projectList').innerHTML='<div class="muted">Proje listesi alınamadı: '+escapeHtml(e.message)+'</div>'; }
}
async function createProject(){
  const projectName=$('newProjectName').value.trim();const description=$('newProjectDescription').value.trim();
  if(!projectName){$('projectCreateResult').textContent='Proje adı girin.';return;}
  try{const out=await api('/api/projects/create',{projectName,description});$('projectCreateResult').textContent='Proje oluşturuldu: '+out.projectId;$('newProjectName').value='';$('newProjectDescription').value='';await refreshProjects();selectProject(out.projectId);}
  catch(e){$('projectCreateResult').textContent='Proje oluşturulamadı: '+e.message;}
}
async function createRevision(){
  const projectId=$('projectSelect').value;const revision=$('newRevisionName').value.trim();
  if(!projectId||!revision){$('revisionCreateResult').textContent='Proje ve revizyon adı seçin.';return;}
  try{const out=await api('/api/revisions/create',{projectId,revision});$('revisionCreateResult').textContent='Taslak revizyon oluşturuldu: '+out.revision;$('newRevisionName').value='';await refreshProjects();$('planRevisionSelect').value=out.revisionId;}
  catch(e){$('revisionCreateResult').textContent='Revizyon oluşturulamadı: '+e.message;}
}
async function importPlanExcel(){
  const file=$('planExcelFile').files[0];const revisionId=$('planRevisionSelect').value;const pcbSide=$('planSide').value;
  if(!file||!revisionId){$('planImportResult').textContent='Revizyon ve Excel dosyası seçin.';return;}
  try{await ensureXLSX();const wb=XLSX.read(await file.arrayBuffer(),{type:'array'});const records=parseSetupWorkbook(wb);if(!records.length)throw new Error('Excel içinde desteklenen feeder satırı bulunamadı.');
    const out=await api('/api/revisions/import',{revisionId,pcbSide,records});$('planImportResult').textContent=pcbSide+' aktarımı tamamlandı: '+out.imported+' feeder.';$('planExcelFile').value='';await refreshProjects();$('planRevisionSelect').value=revisionId;
  }catch(e){$('planImportResult').textContent='Aktarım başarısız: '+e.message;}
}
async function approveRevision(){
  const revisionId=$('planRevisionSelect').value||$('approveRevisionSelect').value;
  if(!revisionId){$('approveResult').textContent='Revizyon seçin.';return;}
  const r=projectCache.flatMap(p=>p.revisions||[]).find(x=>x.revision_id===revisionId);
  if(!confirm(tr('Bu revizyonu APPROVED olarak onaylamak istiyor musunuz? Onaydan sonra uygulama üzerinden değiştirilemez.')))return;
  try{const out=await api('/api/revisions/approve',{revisionId});$('approveResult').textContent='Revizyon onaylandı: '+out.revision;await refreshProjects();$('planRevisionSelect').value=revisionId;}
  catch(e){$('approveResult').textContent='Onay başarısız: '+e.message;}
}
async function createProductionJob(){
  const projectId=$('jobProjectSelect').value;const revisionId=$('jobRevisionSelect').value;const jobId=$('newJobId').value.trim().toUpperCase();
  if(!projectId||!revisionId||!jobId){$('jobCreateResult').textContent='Proje, onaylı revizyon ve yeni iş emrini girin.';return;}
  if(!confirm(tr(jobId+' üretim emri seçilen onaylı feeder planından oluşturulacak. Devam edilsin mi?')))return;
  try{const out=await api('/api/jobs/create',{jobId,projectId,revisionId});$('jobCreateResult').textContent='Üretim emri oluşturuldu: '+out.jobId+' • '+out.feederCount+' feeder.';setJobOption(out.jobId);$('newJobId').value='';await loadJobOptions();saveSession();await connectApp();}
  catch(e){$('jobCreateResult').textContent='Üretim emri oluşturulamadı: '+e.message;}
}
</script>
</body>
</html>`;

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
const now = () => new Date().toISOString();

function getPackageId(raw) {
  const text = String(raw || '').trim();
  if (/^(?:PKG|LEG)-[A-Z0-9]+(?:-[A-Z0-9]+)*$/i.test(text)) return text.toUpperCase();
  // Labels can concatenate ID and PN fields without a delimiter (e.g. ...ID=LEG-ABC123PN=...).
  const marker = /(?:PACKAGE[\s_-]*ID|ID)\s*[:=]\s*/i.exec(text);
  if (marker) {
    const tail = text.slice(marker.index + marker[0].length);
    const next = tail.search(/(?:PART(?:\s*NUMBER)?|PN|OZ|QTY|WH|LOC|LOT|DATE|PO)\s*[:=]/i);
    const segment = tail.slice(0, next < 0 ? tail.length : next).trim().replace(/^[|;,\s]+|[|;,\s]+$/g, '');
    const match = segment.match(/(?:PKG|LEG)-[A-Z0-9]+(?:-[A-Z0-9]+)*/i);
    if (match) return match[0].toUpperCase();
  }
  const numeric = text.match(/(?:PKG|LEG)-\d+/i);
  return numeric ? numeric[0].toUpperCase() : '';
}
async function pickPlannedSpare(db,{jobId,operator,row,plan,packageId,rawQr,entryMethod,pcbSide}){
  if(!['PLANNED','EMPTY'].includes(plan.status))return {ok:false,status:409,message:'Bu yedek makara zaten aktive edildi.'};
  if(packageId!==String(plan.replacement_package_id||'').toUpperCase()){
    await logEvent(db,{jobId,operator,packageId,result:'SPARE_WRONG_ID',message:'Planlanan yedek makara ile eşleşmiyor.',machine:row.machine,face:row.face,slot:row.slot,pcbSide,rawQr});
    return {ok:false,status:409,message:'Yanlış yedek Package ID; makara alınmadı.'};
  }
  const previous=await db.prepare(`SELECT id FROM scan_events WHERE job_id=? AND machine=? AND face=? AND slot=?
    AND package_id=? AND result IN ('SPARE_PICKED_QR','SPARE_PICKED_MANUAL','SPARE_PICKED_UNPLANNED') LIMIT 1`)
    .bind(jobId,row.machine,row.face,row.slot,packageId).first();
  if(previous)return {ok:false,status:409,message:'Bu yedek makara daha önce ALINDI olarak kaydedilmiş.'};
  const other=await db.prepare(`SELECT machine,face,slot FROM feeders WHERE job_id=? AND (package_id=? OR control_package_id=?)
    AND NOT (machine=? AND face=? AND slot=?) LIMIT 1`).bind(jobId,packageId,packageId,row.machine,row.face,row.slot).first();
  if(other)return {ok:false,status:409,message:'Package ID başka bir feeder pozisyonunda kullanılıyor.'};
  await logEvent(db,{jobId,operator,packageId,result:entryMethod==='QR'?'SPARE_PICKED_QR':'SPARE_PICKED_MANUAL',
    message:'Planlı yedek makara depodan ALINDI; fiziksel feeder değişimi ayrıca onaylanmalıdır.',machine:row.machine,face:row.face,slot:row.slot,pcbSide,
    rawQr:entryMethod==='QR'?rawQr:'MANUAL_SPARE_PICK='+packageId});
  return {ok:true,packageId,sparePicked:true,message:'Yedek makara ALINDI: '+packageId+'. Feeder değişimi ayrıca onaylanmalı.'};
}

async function activateReplacementReel(db,{jobId,operator,row,plan,packageId,rawQr,entryMethod,pcbSide}){
  if(row.status!=='LOADED')return {ok:false,status:409,message:'Yedek makara değişimi için feeder YÜKLENDİ durumunda olmalı.'};
  if(plan.status!=='EMPTY')return {ok:false,status:409,message:'Önce ana makaranın tükendiği kaydedilmeli. Aktif makara ikinci kez değiştirilemez.'};
  const picked=await db.prepare(`SELECT id FROM scan_events WHERE job_id=? AND machine=? AND face=? AND slot=? AND package_id=? AND result IN ('SPARE_PICKED_QR','SPARE_PICKED_MANUAL','SPARE_PICKED_UNPLANNED') LIMIT 1`).bind(jobId,row.machine,row.face,row.slot,packageId).first();
  if(!picked)return {ok:false,status:409,message:'Önce yedek makarayı QR veya manuel Package ID ile ALINDI olarak kaydet.'};
  if(packageId!==String(plan.replacement_package_id||'').toUpperCase()){
    await logEvent(db,{jobId,packageId,result:'REEL_REPLACEMENT_MISMATCH',message:'Yedek Package ID onaylı planla eşleşmiyor. Makara değişimi reddedildi.',machine:row.machine,pcbSide,face:row.face,slot:row.slot,operator,rawQr});
    return {ok:false,status:409,message:'Yanlış yedek Package ID. Planlanan makara dışında değişim yapılamaz.'};
  }
  const assigned=await db.prepare(`SELECT machine,face,slot FROM feeders WHERE job_id=?
    AND (package_id=? OR control_package_id=?)
    AND NOT (machine=? AND face=? AND slot=?) LIMIT 1`)
    .bind(jobId,packageId,packageId,row.machine,row.face,row.slot).first();
  if(assigned)return {ok:false,status:409,message:'Yedek makara başka fiziksel feeder pozisyonuna atanmış veya kullanılmış.'};
  const another=await db.prepare(`SELECT machine,face,slot FROM reel_change_plans WHERE job_id=?
    AND replacement_package_id=? AND NOT (machine=? AND face=? AND slot=?) LIMIT 1`)
    .bind(jobId,packageId,row.machine,row.face,row.slot).first();
  if(another)return {ok:false,status:409,message:'Yedek Package ID başka bir fiziksel feeder için planlanmış.'};
  const update=await db.prepare(`UPDATE reel_change_plans SET status='ACTIVE',activated_at=?,activated_by=?
    WHERE id=? AND status='EMPTY' AND replacement_package_id=?`)
    .bind(now(),operator,plan.id,packageId).run();
  if(Number(update.meta?.changes||0)!==1)return {ok:false,status:409,message:'Makara değişimi zaten tamamlanmış veya eşzamanlı güncellenmiş.'};
  await logEvent(db,{jobId,packageId,result:entryMethod==='QR'?'REEL_REPLACED_QR':'REEL_REPLACED_MANUAL',
    message:'Yedek makara '+(entryMethod==='QR'?'QR':'manuel Package ID')+' ile doğrulandı. Eski: '+row.package_id+'; Yeni: '+packageId+'; Depo: '+plan.replacement_location,
    machine:row.machine,pcbSide,face:row.face,slot:row.slot,operator,rawQr:entryMethod==='QR'?rawQr:'MANUAL_REPLACEMENT='+packageId});
  return {ok:true,packageId,replacementActivated:true,machine:row.machine,pcbSide,face:row.face,slot:row.slot,
    message:'Yedek makara '+(entryMethod==='QR'?'QR ile':'manuel olarak')+' doğrulandı: '+row.package_id+' → '+packageId+' ('+row.machine+' / '+row.face+' / '+row.slot+').'};
}

async function logEvent(db, x) {
  await db.prepare(`INSERT INTO scan_events (job_id,package_id,result,message,machine,pcb_side,face,slot,operator,raw_qr,scanned_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`).bind(x.jobId || '', x.packageId || '', x.result, x.message || '', x.machine || '', x.pcbSide || '', x.face || '', x.slot || '', x.operator || '', String(x.rawQr || '').slice(0, 2000), now()).run();
}



function validateFeederPlanIntegrity(rows) {
  const positionBySide = new Map();
  const packagePositionBySide = new Map();
  const packagePositionAcrossSides = new Map();
  const packageByPhysicalPosition = new Map();

  for (const row of rows || []) {
    const side = String(row.pcb_side ?? row.pcbSide ?? '').trim().toUpperCase();
    const machine = String(row.machine ?? '').trim().toUpperCase();
    const face = String(row.face ?? '').trim().toUpperCase();
    const slot = String(row.slot ?? '').trim().toUpperCase();
    const packageId = String(row.package_id ?? row.packageId ?? '').trim().toUpperCase();
    if (!['TOP', 'BOTTOM'].includes(side) || !machine || !['FRONT', 'REAR'].includes(face) || !slot || !packageId) {
      return 'Feeder planında PCB yüzü, makine, FRONT/REAR, slot veya Package ID eksik/geçersiz.';
    }

    const physicalKey = [machine, face, slot].join('|');
    const sidePositionKey = side + '|' + physicalKey;
    if (positionBySide.has(sidePositionKey)) {
      return side + ' tarafında aynı fiziksel feeder pozisyonu birden fazla kez tanımlanmış: ' + physicalKey + '.';
    }
    positionBySide.set(sidePositionKey, packageId);

    const sidePackageKey = side + '|' + packageId;
    const previousSidePosition = packagePositionBySide.get(sidePackageKey);
    if (previousSidePosition && previousSidePosition !== physicalKey) {
      return side + ' tarafında aynı Package ID birden fazla fiziksel slota atanmış: ' + packageId + ' (' + previousSidePosition + ' / ' + physicalKey + ').';
    }
    packagePositionBySide.set(sidePackageKey, physicalKey);

    const previousPackagePosition = packagePositionAcrossSides.get(packageId);
    if (previousPackagePosition && previousPackagePosition !== physicalKey) {
      return 'Aynı Package ID TOP/BOTTOM taraflarında farklı fiziksel slotlara atanmış: ' + packageId + ' (' + previousPackagePosition + ' / ' + physicalKey + ').';
    }
    packagePositionAcrossSides.set(packageId, physicalKey);

    const previousPackageAtPosition = packageByPhysicalPosition.get(physicalKey);
    if (previousPackageAtPosition && previousPackageAtPosition !== packageId) {
      return 'Aynı fiziksel feeder pozisyonunda TOP/BOTTOM için farklı Package ID tanımlanmış: ' + physicalKey + ' (' + previousPackageAtPosition + ' / ' + packageId + '). Ortak feeder sayılması için Package ID de aynı olmalıdır.';
    }
    packageByPhysicalPosition.set(physicalKey, packageId);
  }
  return '';
}

async function syncSharedFeederStates(db, jobId, operator = 'SYSTEM') {
  const result = await db.prepare('SELECT * FROM feeders WHERE job_id=? ORDER BY machine,face,slot,pcb_side').bind(jobId).all();
  const rows = result.results || [];
  const groups = new Map();
  for (const row of rows) {
    const key = [row.machine, row.face, row.slot].map(v => String(v || '').trim().toUpperCase()).join('|');
    if (!groups.has(key)) groups.set(key, { TOP: [], BOTTOM: [] });
    const group = groups.get(key);
    if (group[row.pcb_side]) group[row.pcb_side].push(row);
  }
  const rank = status => status === 'LOADED' ? 2 : status === 'PICKED' ? 1 : 0;
  let pairCount = 0, syncedRows = 0;
  for (const group of groups.values()) {
    // Shared means the exact same physical machine + FRONT/REAR + slot AND the same Package ID.
    // A matching position with different Package IDs is a setup conflict and is never synchronized.
    if (group.TOP.length !== 1 || group.BOTTOM.length !== 1) continue;
    if (String(group.TOP[0].package_id || '').trim().toUpperCase() !== String(group.BOTTOM[0].package_id || '').trim().toUpperCase()) continue;
    pairCount++;
    const pair = [group.TOP[0], group.BOTTOM[0]];
    const source = [...pair].sort((a, b) => rank(b.status) - rank(a.status))[0];
    for (const target of pair) {
      if (rank(target.status) >= rank(source.status)) continue;
      const upd = await db.prepare(`UPDATE feeders SET status=?,control_package_id=?,operator=?,scanned_at=?,loaded_at=?
        WHERE id=? AND job_id=? AND status=?`)
        .bind(source.status, source.control_package_id || source.package_id, source.operator || operator,
          source.scanned_at || null, source.loaded_at || null, target.id, jobId, target.status).run();
      if (Number(upd.meta?.changes || 0) !== 1) continue;
      syncedRows++;
      await logEvent(db, {
        jobId, packageId:source.control_package_id || source.package_id, result:'SHARED_SYNC',
        message:'Ortak fiziksel feeder durumu diğer PCB yüzündeki eş kayıtla senkronize edildi.',
        machine:target.machine, pcbSide:target.pcb_side, face:target.face, slot:target.slot,
        operator:operator || source.operator || 'SYSTEM', rawQr:''
      });
    }
  }
  return { pairCount, syncedRows };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/') {
      return new Response(APP_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
    }
    if (!url.pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
    if (!env.DB) return json({ ok: false, message: 'D1 veritabanı DB binding tanımlı değil.' }, 503);

    let body = {};
    if (request.method === 'POST') {
      try { body = await request.json(); } catch (e) { return json({ ok: false, message: 'JSON gövdesi okunamadı.' }, 400); }
    }
    const pin = request.headers.get('X-App-Pin') || body.pin || url.searchParams.get('pin') || '';
    if (!env.APP_PIN || pin !== env.APP_PIN) return json({ ok: false, message: 'Uygulama PIN bilgisi hatalı.' }, 401);

    try {
      if (request.method === 'GET' && url.pathname === '/api/health') {
        return json({ ok: true, service: 'SMT Reel Control', time: now() });
      }

      if (request.method === 'POST' && url.pathname === '/api/shared-sync') {
        const jobId = String(body.jobId || '').trim().toUpperCase();
        const operator = String(body.operator || '').trim() || 'SYSTEM';
        if (!jobId) return json({ok:false,message:'İş emri belirtilmedi.'},400);
        const sync = await syncSharedFeederStates(env.DB, jobId, operator);
        return json({ok:true,sharedPairs:sync.pairCount,syncedRows:sync.syncedRows,
          message:sync.syncedRows+' ortak feeder kaydı eşitlendi.'});
      }

      if(request.method==='GET'&&url.pathname==='/api/jobs/list'){
        const q=await env.DB.prepare(`SELECT j.job_id,p.project_name,r.revision FROM jobs j
          LEFT JOIN projects p ON p.project_id=j.project_id
          LEFT JOIN feeder_plan_revisions r ON r.revision_id=j.feeder_plan_revision_id
          ORDER BY j.created_at DESC,j.job_id DESC LIMIT 500`).all();
        return json({ok:true,jobs:(q.results||[]).map(x=>({jobId:x.job_id,projectName:x.project_name||'',revision:x.revision||''}))});
      }

      if (request.method === 'GET' && url.pathname === '/api/projects') {
        const projectRows = await env.DB.prepare('SELECT * FROM projects ORDER BY project_name').all();
        const revisionRows = await env.DB.prepare(`SELECT r.revision_id,r.project_id,r.revision,r.status,r.created_at,
          SUM(CASE WHEN i.pcb_side='TOP' THEN 1 ELSE 0 END) AS top_count,
          SUM(CASE WHEN i.pcb_side='BOTTOM' THEN 1 ELSE 0 END) AS bottom_count
          FROM feeder_plan_revisions r LEFT JOIN feeder_plan_items i ON i.revision_id=r.revision_id
          GROUP BY r.revision_id ORDER BY r.created_at DESC`).all();
        const jobRows = await env.DB.prepare('SELECT job_id,project_id,feeder_plan_revision_id,created_at FROM jobs WHERE project_id IS NOT NULL ORDER BY created_at DESC').all();
        const revisions = revisionRows.results || []; const jobs = jobRows.results || [];
        const projects = (projectRows.results || []).map(p => ({
          ...p, revisions: revisions.filter(r => r.project_id === p.project_id),
          jobs: jobs.filter(j => j.project_id === p.project_id)
        }));
        return json({ ok:true, projects });
      }

      if (request.method === 'POST' && url.pathname === '/api/projects/create') {
        const projectName = String(body.projectName || '').trim();
        const description = String(body.description || '').trim();
        if (!projectName || projectName.length > 160) return json({ ok:false, message:'Proje adı boş olamaz ve 160 karakteri aşamaz.' },400);
        const exists = await env.DB.prepare('SELECT project_id FROM projects WHERE project_name=?').bind(projectName).first();
        if (exists) return json({ ok:false, message:'Bu proje adı zaten kayıtlı.' },409);
        const projectId = 'PRJ-' + crypto.randomUUID().slice(0,8).toUpperCase();
        await env.DB.prepare('INSERT INTO projects(project_id,project_name,description,status,created_at) VALUES(?,?,?,?,?)')
          .bind(projectId,projectName,description,'ACTIVE',now()).run();
        return json({ ok:true, projectId, projectName });
      }

      if (request.method === 'POST' && url.pathname === '/api/revisions/create') {
        const projectId = String(body.projectId || '').trim();
        const revision = String(body.revision || '').trim();
        if (!projectId || !revision || revision.length > 40) return json({ ok:false, message:'Proje ve geçerli revizyon adı gerekli.' },400);
        const project = await env.DB.prepare('SELECT project_id,status FROM projects WHERE project_id=?').bind(projectId).first();
        if (!project || project.status !== 'ACTIVE') return json({ ok:false, message:'Proje bulunamadı veya aktif değil.' },404);
        const revisionId = 'REV-' + crypto.randomUUID().slice(0,8).toUpperCase();
        try {
          await env.DB.prepare('INSERT INTO feeder_plan_revisions(revision_id,project_id,revision,status,created_at) VALUES(?,?,?,?,?)')
            .bind(revisionId,projectId,revision,'DRAFT',now()).run();
        } catch (e) { return json({ ok:false, message:'Bu proje için bu revizyon adı zaten kullanılmış veya kayıt oluşturulamadı.' },409); }
        return json({ ok:true, revisionId, revision, status:'DRAFT' });
      }

      if (request.method === 'POST' && url.pathname === '/api/revisions/import') {
        const revisionId = String(body.revisionId || '').trim();
        const pcbSide = String(body.pcbSide || '').trim().toUpperCase();
        const records = Array.isArray(body.records) ? body.records : [];
        if (!revisionId || !['TOP','BOTTOM'].includes(pcbSide) || !records.length) return json({ ok:false, message:'Revizyon, PCB yüzü veya feeder kayıtları eksik.' },400);
        if (records.length > 250) return json({ ok:false, message:'Tek seferde en fazla 250 feeder satırı aktarılabilir.' },400);
        const revision = await env.DB.prepare('SELECT revision_id,status FROM feeder_plan_revisions WHERE revision_id=?').bind(revisionId).first();
        if (!revision) return json({ ok:false, message:'Feeder planı revizyonu bulunamadı.' },404);
        if (revision.status !== 'DRAFT') return json({ ok:false, message:'Yalnızca DRAFT revizyonlara Excel yüklenebilir. APPROVED planlar kilitlidir.' },409);
        const jobUse = await env.DB.prepare('SELECT COUNT(*) AS n FROM jobs WHERE feeder_plan_revision_id=?').bind(revisionId).first();
        if (Number(jobUse?.n || 0) > 0) return json({ ok:false, message:'Bu revizyon bir üretim emrinde kullanılıyor; değiştirilemez.' },409);
        for (const r of records) {
          const machine=String(r.machine||'').trim().toUpperCase(), face=String(r.face||'').trim().toUpperCase(), slot=String(r.slot||'').trim().toUpperCase(), pkg=String(r.packageId||'').trim().toUpperCase();
          if (!machine || !['FRONT','REAR'].includes(face) || !slot || !pkg) return json({ ok:false, message:'Her feeder satırında Machine, FRONT/REAR, Slot ve Package ID bulunmalıdır.' },400);
        }
        const otherSideRows = await env.DB.prepare('SELECT pcb_side,machine,face,slot,package_id FROM feeder_plan_items WHERE revision_id=? AND pcb_side<>?')
          .bind(revisionId,pcbSide).all();
        const integrityError = validateFeederPlanIntegrity([...(otherSideRows.results||[]), ...records.map(r=>({...r,pcb_side:pcbSide}))]);
        if (integrityError) return json({ok:false,message:integrityError},409);
        const stamp=now();
        const statements=[env.DB.prepare('DELETE FROM feeder_plan_items WHERE revision_id=? AND pcb_side=?').bind(revisionId,pcbSide)];
        for (const r of records) statements.push(env.DB.prepare(`INSERT INTO feeder_plan_items
          (item_id,revision_id,pcb_side,machine,face,slot,feeder,ozcode,part_number,location,package_id,lot_number,date_code,reel_stock,planned_use,fuji_qty,description,created_at)
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(
            crypto.randomUUID(),revisionId,pcbSide,String(r.machine||'').trim().toUpperCase(),String(r.face||'').trim().toUpperCase(),String(r.slot||'').trim().toUpperCase(),
            String(r.feeder||''),String(r.ozcode||'').trim(),String(r.partNumber||'').trim(),String(r.location||'').trim().toUpperCase(),String(r.packageId||'').trim().toUpperCase(),
            String(r.lotNumber||'').trim(),String(r.dateCode||'').trim(),Number(r.reelStock||0),Number(r.plannedUse||0),String(r.fujiQty||''),String(r.description||''),stamp
          ));
        await env.DB.batch(statements);
        return json({ ok:true, imported:records.length, revisionId, pcbSide });
      }

      if (request.method === 'POST' && url.pathname === '/api/revisions/approve') {
        const revisionId=String(body.revisionId||'').trim();
        if(!revisionId) return json({ok:false,message:'Revizyon seçilmedi.'},400);
        const revision=await env.DB.prepare('SELECT revision_id,revision,status FROM feeder_plan_revisions WHERE revision_id=?').bind(revisionId).first();
        if(!revision) return json({ok:false,message:'Revizyon bulunamadı.'},404);
        if(revision.status!=='DRAFT') return json({ok:false,message:'Yalnızca DRAFT revizyon onaylanabilir.'},409);
        const stats=await env.DB.prepare(`SELECT
          SUM(CASE WHEN pcb_side='TOP' THEN 1 ELSE 0 END) AS top_count,
          SUM(CASE WHEN pcb_side='BOTTOM' THEN 1 ELSE 0 END) AS bottom_count,
          SUM(CASE WHEN package_id IS NULL OR TRIM(package_id)='' THEN 1 ELSE 0 END) AS missing_package
          FROM feeder_plan_items WHERE revision_id=?`).bind(revisionId).first();
        if(Number(stats?.top_count||0)<1 || Number(stats?.bottom_count||0)<1) return json({ok:false,message:'Onay için hem TOP hem BOTTOM feeder kayıtları yüklenmiş olmalı.'},409);
        if(Number(stats?.missing_package||0)>0) return json({ok:false,message:'Package ID eksik feeder kaydı var; plan onaylanmadı.'},409);
        const planRows = await env.DB.prepare('SELECT pcb_side,machine,face,slot,package_id FROM feeder_plan_items WHERE revision_id=?').bind(revisionId).all();
        const integrityError = validateFeederPlanIntegrity(planRows.results||[]);
        if (integrityError) return json({ok:false,message:'Feeder planı bütünlük kontrolü başarısız: '+integrityError},409);
        const upd=await env.DB.prepare("UPDATE feeder_plan_revisions SET status='APPROVED' WHERE revision_id=? AND status='DRAFT'").bind(revisionId).run();
        if(Number(upd.meta?.changes||0)!==1) return json({ok:false,message:'Revizyon durumu eşzamanlı değişmiş olabilir; listeyi yenileyin.'},409);
        return json({ok:true,revision:revision.revision,status:'APPROVED',topCount:Number(stats.top_count||0),bottomCount:Number(stats.bottom_count||0)});
      }

      if (request.method === 'POST' && url.pathname === '/api/jobs/create') {
        const jobId=String(body.jobId||'').trim().toUpperCase();
        const projectId=String(body.projectId||'').trim();
        const revisionId=String(body.revisionId||'').trim();
        if(!/^[A-Z0-9_-]{3,50}$/.test(jobId) || !projectId || !revisionId) return json({ok:false,message:'Geçerli iş emri, proje ve feeder planı seçilmelidir.'},400);
        const existing=await env.DB.prepare('SELECT job_id FROM jobs WHERE job_id=?').bind(jobId).first();
        if(existing) return json({ok:false,message:'Bu iş emri numarası zaten kullanılıyor.'},409);
        const selected=await env.DB.prepare(`SELECT p.project_id,p.status AS project_status,r.revision_id,r.status AS revision_status,r.revision
          FROM projects p JOIN feeder_plan_revisions r ON r.project_id=p.project_id
          WHERE p.project_id=? AND r.revision_id=?`).bind(projectId,revisionId).first();
        if(!selected || selected.project_status!=='ACTIVE') return json({ok:false,message:'Proje bulunamadı veya aktif değil.'},404);
        if(selected.revision_status!=='APPROVED') return json({ok:false,message:'Üretim emri yalnızca APPROVED feeder planından oluşturulabilir.'},409);
        const stats=await env.DB.prepare(`SELECT COUNT(*) AS total,
          SUM(CASE WHEN pcb_side='TOP' THEN 1 ELSE 0 END) AS top_count,
          SUM(CASE WHEN pcb_side='BOTTOM' THEN 1 ELSE 0 END) AS bottom_count,
          SUM(CASE WHEN package_id IS NULL OR TRIM(package_id)='' THEN 1 ELSE 0 END) AS missing_package
          FROM feeder_plan_items WHERE revision_id=?`).bind(revisionId).first();
        if(Number(stats?.total||0)<1 || Number(stats?.top_count||0)<1 || Number(stats?.bottom_count||0)<1) return json({ok:false,message:'Seçilen revizyonda TOP ve BOTTOM feeder kayıtları eksik.'},409);
        if(Number(stats?.missing_package||0)>0) return json({ok:false,message:'Feeder planında Package ID eksik; üretim emri oluşturulmadı.'},409);
        const planRows = await env.DB.prepare('SELECT pcb_side,machine,face,slot,package_id FROM feeder_plan_items WHERE revision_id=?').bind(revisionId).all();
        const integrityError = validateFeederPlanIntegrity(planRows.results||[]);
        if (integrityError) return json({ok:false,message:'Üretim emri oluşturulmadı. Feeder planı bütünlük kontrolü başarısız: '+integrityError},409);
        const stamp=now();
        await env.DB.batch([
          env.DB.prepare('INSERT INTO jobs(job_id,created_at,project_id,feeder_plan_revision_id) VALUES(?,?,?,?)').bind(jobId,stamp,projectId,revisionId),
          env.DB.prepare(`INSERT INTO feeders
            (id,job_id,pcb_side,machine,face,slot,feeder,ozcode,part_number,location,package_id,lot_number,date_code,reel_stock,planned_use,fuji_qty,status,created_at)
            SELECT lower(hex(randomblob(16))),?,pcb_side,machine,face,slot,feeder,ozcode,part_number,location,package_id,lot_number,date_code,reel_stock,planned_use,fuji_qty,'PENDING',?
            FROM feeder_plan_items WHERE revision_id=?`).bind(jobId,stamp,revisionId)
        ]);
        const copied=await env.DB.prepare('SELECT COUNT(*) AS n FROM feeders WHERE job_id=?').bind(jobId).first();
        return json({ok:true,jobId,projectId,revisionId,feederCount:Number(copied?.n||0)});
      }

      if (request.method === 'POST' && url.pathname === '/api/import') {
        const jobId = String(body.jobId || '').trim().toUpperCase();
        const pcbSide = String(body.pcbSide || '').toUpperCase();
        const records = Array.isArray(body.records) ? body.records : [];
        if (!jobId || !['TOP', 'BOTTOM'].includes(pcbSide) || !records.length) return json({ ok: false, message: 'İş emri, TOP/BOTTOM seçimi veya feeder kayıtları eksik.' }, 400);
        if (records.length > 250) return json({ ok: false, message: 'Tek seferde en fazla 250 feeder satırı içe aktarılabilir.' }, 400);
        const linkedJob = await env.DB.prepare('SELECT project_id FROM jobs WHERE job_id=?').bind(jobId).first();
        if (linkedJob?.project_id) return json({ ok:false, message:'Bu iş emri proje bazlı bir feeder revizyonuna bağlı. Eski Excel yükleme ekranından değişiklik yapılamaz; proje yönetiminden yeni revizyon oluşturun.' },409);
        const active = await env.DB.prepare("SELECT COUNT(*) AS n FROM feeders WHERE job_id=? AND pcb_side=? AND status!='PENDING'").bind(jobId, pcbSide).first();
        if (Number(active?.n || 0) > 0) return json({ ok: false, message: 'Bu iş emrinde makara alınmış/yüklenmiş kayıtlar var. Mevcut kayıtları korumak için yeniden içe aktarma engellendi.' }, 409);
        const otherSideRows = await env.DB.prepare('SELECT pcb_side,machine,face,slot,package_id FROM feeders WHERE job_id=? AND pcb_side<>?').bind(jobId,pcbSide).all();
        const integrityError = validateFeederPlanIntegrity([...(otherSideRows.results||[]), ...records.map(r=>({...r,pcb_side:pcbSide}))]);
        if (integrityError) return json({ok:false,message:integrityError},409);
        await env.DB.prepare('DELETE FROM feeders WHERE job_id=? AND pcb_side=?').bind(jobId, pcbSide).run();
        await env.DB.prepare('INSERT INTO jobs(job_id,created_at) VALUES(?,?) ON CONFLICT(job_id) DO NOTHING').bind(jobId, now()).run();
        const stmts = records.map(r => env.DB.prepare(`INSERT INTO feeders
          (id,job_id,pcb_side,machine,face,slot,feeder,ozcode,part_number,location,package_id,lot_number,date_code,reel_stock,planned_use,fuji_qty,status,created_at)
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(
            crypto.randomUUID(), jobId, pcbSide, String(r.machine || '').toUpperCase(), String(r.face || '').toUpperCase(), String(r.slot || '').toUpperCase(),
            String(r.feeder || ''), String(r.ozcode || '').trim(), String(r.partNumber || '').trim(), String(r.location || '').trim().toUpperCase(),
            String(r.packageId || '').trim().toUpperCase(), String(r.lotNumber || '').trim(), String(r.dateCode || '').trim(),
            Number(r.reelStock || 0), Number(r.plannedUse || 0), String(r.fujiQty || ''), 'PENDING', now()
          ));
        await env.DB.batch(stmts);
        return json({ ok: true, imported: records.length, jobId, pcbSide });
      }

      if (request.method === 'POST' && url.pathname === '/api/reel-change') {
        const jobId=String(body.jobId||'').trim().toUpperCase();
        const operator=String(body.operator||'').trim();
        const id=String(body.id||'').trim();
        const pcbSide=String(body.pcbSide||'').trim().toUpperCase();
        const action=String(body.action||'').trim().toUpperCase();
        const rawQr=String(body.rawQr||'').trim();
        const entryMethod=String(body.entryMethod||'MANUAL').trim().toUpperCase();
        const packageId=getPackageId(rawQr||body.packageId);
        if(!['QR','MANUAL'].includes(entryMethod))return json({ok:false,message:'Geçersiz doğrulama yöntemi.'},400);
        if(!jobId||!operator||!id||!['TOP','BOTTOM'].includes(pcbSide)||!['EMPTY','ACTIVATE','PICK','UNPLANNED'].includes(action))
          return json({ok:false,message:'Makara değişim talebinde gerekli bilgiler eksik.'},400);
        const row=await env.DB.prepare('SELECT * FROM feeders WHERE id=? AND job_id=? AND pcb_side=?')
          .bind(id,jobId,pcbSide).first();
        if(!row)return json({ok:false,message:'Feeder kaydı bulunamadı.'},404);
        const plan=await env.DB.prepare(`SELECT * FROM reel_change_plans
          WHERE job_id=? AND machine=? AND face=? AND slot=? AND original_package_id=?`)
          .bind(jobId,row.machine,row.face,row.slot,row.package_id).first();
        if(action==='UNPLANNED'){
          if(plan)return json({ok:false,message:'Bu feeder için zaten bir makara değişim planı/kaydı var.'},409);
          if(row.status!=='LOADED')return json({ok:false,message:'Plansız değişim için feeder YÜKLENDİ durumunda olmalı.'},409);
          const confirmedOzcode=String(body.confirmedOzcode||'').trim().toUpperCase();
          if(!packageId||!confirmedOzcode||confirmedOzcode!==String(row.ozcode||'').trim().toUpperCase())
            return json({ok:false,message:'Yeni Package ID ve feeder OZCODE bilgisi eksik veya eşleşmiyor.'},409);
          if(packageId===String(row.package_id||'').toUpperCase())return json({ok:false,message:'Yeni makara eski makaradan farklı olmalı.'},409);
          const occupied=await env.DB.prepare(`SELECT id FROM feeders WHERE job_id=? AND (package_id=? OR control_package_id=?) LIMIT 1`).bind(jobId,packageId,packageId).first();
          if(occupied)return json({ok:false,message:'Girilen yeni Package ID başka feeder üzerinde zaten kayıtlı.'},409);
          const reserved=await env.DB.prepare(`SELECT id FROM reel_change_plans WHERE job_id=? AND replacement_package_id=? LIMIT 1`).bind(jobId,packageId).first();
          if(reserved)return json({ok:false,message:'Bu Package ID başka bir feeder için yedek olarak ayrılmış.'},409);
          const location=String(body.location||'').trim().slice(0,100);
          // A surprise reel is registered as PICKED, not silently installed.
          // Existing unique-per-slot D1 plan enforces one replacement per physical feeder.
          try{
            await env.DB.prepare(`INSERT INTO reel_change_plans(job_id,machine,face,slot,original_package_id,replacement_package_id,replacement_location,status)
              VALUES(?,?,?,?,?,?,?,'PLANNED')`).bind(jobId,row.machine,row.face,row.slot,row.package_id,packageId,location).run();
          }catch(e){return json({ok:false,message:'Plansız makara kaydı çakışma nedeniyle oluşturulamadı.'},409);}
          await logEvent(env.DB,{jobId,packageId,result:'SPARE_PICKED_UNPLANNED',message:'PLANSIZ MAKARA DEPODAN ALINDI. İlk: '+row.package_id+'; Yedek: '+packageId+'; operatör beyanı OZCODE: '+confirmedOzcode+'; konum: '+location+'; aynı komponent olduğu bağımsız stok kayıtlarından doğrulanmadı.',machine:row.machine,face:row.face,slot:row.slot,pcbSide,operator,rawQr:'MANUAL_UNPLANNED_PICK='+packageId});
          return json({ok:true,sparePicked:true,message:'Plansız yedek makara ALINDI: '+packageId+'. Ana makara bittiğinde fiziksel değişimi ayrıca onayla.'});
        }
        if(!plan)return json({ok:false,message:'Bu feeder için onaylı yedek makara planı bulunmuyor.'},404);
        if(action!=='PICK'&&row.status!=='LOADED')return json({ok:false,message:'Makara değişimi için feeder önce fiziksel olarak YÜKLENDİ durumunda olmalı.'},409);
        if(action==='EMPTY'){
          const update=await env.DB.prepare(`UPDATE reel_change_plans SET status='EMPTY',emptied_at=?,emptied_by=?
            WHERE id=? AND status='PLANNED'`).bind(now(),operator,plan.id).run();
          if(Number(update.meta?.changes||0)!==1)return json({ok:false,message:'Makara zaten tükenmiş olarak kaydedilmiş veya değişim yapılmış.'},409);
          await logEvent(env.DB,{jobId,packageId:row.package_id,result:'REEL_EXHAUSTED',
            message:'Ana makara tükendi; yedek makara bekleniyor. Planlı yedek: '+plan.replacement_package_id+' / '+plan.replacement_location,
            machine:row.machine,pcbSide,face:row.face,slot:row.slot,operator,rawQr:''});
          return json({ok:true,message:'Ana makara TÜKENDİ olarak kaydedildi. Yedek '+plan.replacement_package_id+' ('+plan.replacement_location+') depodan alınmalı.'});
        }
        if(!packageId)return json({ok:false,message:'QR veya manuel girişte geçerli Package ID bulunamadı.'},400);
        if(action==='PICK'){
          const picked=await pickPlannedSpare(env.DB,{jobId,operator,row,plan,packageId,rawQr,entryMethod,pcbSide});
          return json(picked,picked.ok?200:picked.status);
        }
        const activation=await activateReplacementReel(env.DB,{jobId,operator,row,plan,packageId,rawQr,entryMethod,pcbSide});
        return json(activation,activation.ok?200:activation.status);
      }

      if (request.method === 'POST' && url.pathname === '/api/manual-pick') {
        const jobId = String(body.jobId || '').trim().toUpperCase();
        const operator = String(body.operator || '').trim();
        const id = String(body.id || '').trim();
        const pcbSide = String(body.pcbSide || '').trim().toUpperCase();
        const packageId = String(body.packageId || '').trim().toUpperCase();

        if (!jobId || !operator || !id || !['TOP','BOTTOM'].includes(pcbSide) || !packageId) {
          return json({ok:false,message:'İş emri, operatör, feeder satırı, PCB yüzü veya Package ID eksik.'},400);
        }
        if (!/^(?:PKG|LEG)-[A-Z0-9]+(?:-[A-Z0-9]+)*$/i.test(packageId)) {
          return json({ok:false,message:'Geçerli bir Package ID gir (PKG-… veya LEG-…).'},400);
        }

        // Keep shared TOP/BOTTOM physical feeder states aligned before validating this row.
        await syncSharedFeederStates(env.DB, jobId, operator);
        const row = await env.DB.prepare('SELECT * FROM feeders WHERE id=? AND job_id=? AND pcb_side=?')
          .bind(id,jobId,pcbSide).first();
        if (!row) return json({ok:false,message:'Seçilen feeder satırı bu iş emrinde bulunamadı.'},404);

        if (row.status !== 'PENDING') {
          await logEvent(env.DB,{jobId,packageId,result:'MANUAL_ALREADY_PROCESSED',
            message:'Manuel Package ID girişi denendi ancak feeder satırı zaten alınmış veya yüklenmiş.',
            machine:row.machine,pcbSide:row.pcb_side,face:row.face,slot:row.slot,operator,rawQr:'MANUAL_PACKAGE_ID='+packageId});
          return json({ok:false,message:'Bu feeder satırı artık BEKLİYOR durumunda değil. Listeyi yenileyip mevcut durumu kontrol et.'},409);
        }

        const expectedPackageId = String(row.package_id || '').trim().toUpperCase();
        if (packageId !== expectedPackageId) {
          await logEvent(env.DB,{jobId,packageId,result:'MANUAL_ID_MISMATCH',
            message:'Manuel girilen Package ID seçilen feeder satırının Package ID değeriyle eşleşmedi. Beklenen Package ID: '+expectedPackageId,
            machine:row.machine,pcbSide:row.pcb_side,face:row.face,slot:row.slot,operator,rawQr:'MANUAL_PACKAGE_ID='+packageId});
          return json({ok:false,message:'Girilen Package ID bu feeder satırının beklediği Package ID ile eşleşmiyor. Makara alınmadı.'},409);
        }

        const assignedElsewhere = await env.DB.prepare(`SELECT id,machine,pcb_side,face,slot FROM feeders
          WHERE job_id=? AND package_id=? AND NOT (machine=? AND face=? AND slot=?) LIMIT 1`)
          .bind(jobId,packageId,row.machine,row.face,row.slot).first();
        if (assignedElsewhere) {
          await logEvent(env.DB,{jobId,packageId,result:'MANUAL_PACKAGE_OTHER_SLOT',
            message:'Manuel doğrulama reddedildi: Package ID başka bir fiziksel slota da atanmış.',
            machine:assignedElsewhere.machine,pcbSide:assignedElsewhere.pcb_side,face:assignedElsewhere.face,slot:assignedElsewhere.slot,
            operator,rawQr:'MANUAL_PACKAGE_ID='+packageId});
          return json({ok:false,message:'Bu Package ID başka bir fiziksel slota da atanmış ('+assignedElsewhere.machine+' / '+assignedElsewhere.face+' / '+assignedElsewhere.slot+'). Setup kontrol edilmeden işlem yapılamaz.'},409);
        }

        const usedElsewhere = await env.DB.prepare(`SELECT id,machine,pcb_side,face,slot FROM feeders
          WHERE job_id=? AND control_package_id=? AND NOT (machine=? AND face=? AND slot=?) LIMIT 1`)
          .bind(jobId,packageId,row.machine,row.face,row.slot).first();
        if (usedElsewhere) {
          await logEvent(env.DB,{jobId,packageId,result:'MANUAL_PACKAGE_ALREADY_USED',
            message:'Manuel doğrulama reddedildi: Package ID başka bir fiziksel feeder için daha önce kullanılmış.',
            machine:usedElsewhere.machine,pcbSide:usedElsewhere.pcb_side,face:usedElsewhere.face,slot:usedElsewhere.slot,
            operator,rawQr:'MANUAL_PACKAGE_ID='+packageId});
          return json({ok:false,message:'Bu Package ID aynı iş emrinde başka bir fiziksel feeder için zaten kullanılmış.'},409);
        }

        const pickedUpdate = await env.DB.prepare(`UPDATE feeders SET status='PICKED',control_package_id=?,operator=?,scanned_at=?
          WHERE job_id=? AND package_id=? AND machine=? AND face=? AND slot=? AND status='PENDING'`)
          .bind(packageId,operator,now(),jobId,expectedPackageId,row.machine,row.face,row.slot).run();
        if (Number(pickedUpdate.meta?.changes || 0) < 1) {
          await logEvent(env.DB,{jobId,packageId,result:'MANUAL_CONCURRENT_DUPLICATE',
            message:'Manuel giriş sırasında feeder satırı başka bir işlem tarafından güncellenmiş.',
            machine:row.machine,pcbSide:row.pcb_side,face:row.face,slot:row.slot,operator,rawQr:'MANUAL_PACKAGE_ID='+packageId});
          return json({ok:false,message:'Bu feeder satırı eşzamanlı başka bir işlemde güncellenmiş. Listeyi yenile.'},409);
        }

        const physicalRowsResult = await env.DB.prepare(`SELECT * FROM feeders
          WHERE job_id=? AND package_id=? AND machine=? AND face=? AND slot=? ORDER BY pcb_side`)
          .bind(jobId,packageId,row.machine,row.face,row.slot).all();
        const physicalRows = physicalRowsResult.results || [];
        for (const x of physicalRows) {
          await logEvent(env.DB,{jobId,packageId,
            result:x.pcb_side===pcbSide?'MANUAL_PICKED':'SHARED_PICKED_MANUAL',
            message:x.pcb_side===pcbSide
              ? 'Package ID operatör tarafından manuel girildi, doğrulandı ve makara ALINDI olarak kaydedildi.'
              : 'Ortak fiziksel feeder manuel Package ID doğrulamasıyla diğer PCB yüzünde de ALINDI olarak eşitlendi.',
            machine:x.machine,pcbSide:x.pcb_side,face:x.face,slot:x.slot,operator,
            rawQr:x.pcb_side===pcbSide?'MANUAL_PACKAGE_ID='+packageId:''});
        }
        return json({ok:true,packageId,machine:row.machine,pcbSide,face:row.face,slot:row.slot,
          sharedFeeder:physicalRows.some(x=>x.pcb_side!==pcbSide),
          message:'Manuel Package ID doğrulandı ve makara ALINDI olarak kaydedildi.'});
      }

      if (request.method === 'POST' && url.pathname === '/api/scan') {
        const jobId = String(body.jobId || '').trim().toUpperCase();
        const operator = String(body.operator || '').trim();
        const rawQr = String(body.rawQr || '').trim();
        const pcbSide = String(body.pcbSide || '').trim().toUpperCase();
        if (!['TOP','BOTTOM'].includes(pcbSide)) return json({ ok:false, code:'SIDE_REQUIRED', message:'Önce TOP veya BOTTOM üretim yüzünü seçin.' },400);
        const packageId = getPackageId(rawQr);
        if (!jobId || !operator || !packageId) return json({ ok: false, code: 'MISSING_DATA', message: 'İş emri, operatör veya Package ID eksik.' }, 400);

        // Bring any legacy TOP/BOTTOM paired rows to the same physical status before handling a scan.
        await syncSharedFeederStates(env.DB, jobId, operator);
        const hits = await env.DB.prepare('SELECT * FROM feeders WHERE job_id=? AND package_id=? AND pcb_side=? ORDER BY machine,face,slot').bind(jobId, packageId, pcbSide).all();
        const found = hits.results || [];
        if (found.length === 0) {
          const planned=await env.DB.prepare(`SELECT rp.*,f.id AS feeder_id,f.status AS feeder_status,f.package_id AS feeder_original
            FROM reel_change_plans rp JOIN feeders f ON f.job_id=rp.job_id AND f.machine=rp.machine
              AND f.face=rp.face AND f.slot=rp.slot AND f.package_id=rp.original_package_id
            WHERE rp.job_id=? AND rp.replacement_package_id=? AND f.pcb_side=?`)
            .bind(jobId,packageId,pcbSide).all();
          const candidates=planned.results||[];
          if(candidates.length>1)return json({ok:false,code:'MULTIPLE_REPLACEMENTS',message:'Yedek Package ID birden çok feeder için tanımlı. Setup kontrol edilmeli.'},409);
          if(candidates.length===1){
            const p=candidates[0];
            const original=await env.DB.prepare('SELECT * FROM feeders WHERE id=? AND job_id=? AND pcb_side=?')
              .bind(p.feeder_id,jobId,pcbSide).first();
            const out=await pickPlannedSpare(env.DB,{jobId,operator,row:original,plan:p,packageId,rawQr,entryMethod:'QR',pcbSide});
            return json(out,out.ok?200:out.status);
          }
          await logEvent(env.DB, { jobId, packageId, result: 'NOT_FOUND', message: 'Package ID bu iş emrinin seçili TOP/BOTTOM feeder setup kayıtlarında veya planlı yedek makaralarda bulunamadı.', operator, rawQr });
          return json({ ok: false, code: 'NOT_IN_SETUP', packageId, message: 'Bu Package ID seçili iş emrinin '+pcbSide+' feeder setup veya planlı yedek makara listesinde bulunamadı. İşlem yapılmadı.' }, 404);
        }
        if (found.length > 1) {
          const slots = found.map(x => x.machine+' / '+x.face+' / '+x.slot).join(', ');
          await logEvent(env.DB, { jobId, packageId, result: 'AMBIGUOUS', message: 'Aynı Package ID seçili PCB yüzünde birden fazla feeder pozisyonuna atanmış: '+slots, operator, rawQr });
          return json({ ok: false, code: 'MULTIPLE_MATCH', packageId, message: 'Bu Package ID '+found.length+' farklı feeder pozisyonunda tanımlı: '+slots+'. Tek bir makara hangi slota ait olduğu Package ID ile ayırt edilemediği için işlem durduruldu; Excel setup kontrol edilmeli.' }, 409);
        }
        const r = found[0];
        if (r.status !== 'PENDING') {
          const isShared = await env.DB.prepare(`SELECT COUNT(*) AS n FROM feeders WHERE job_id=? AND machine=? AND face=? AND slot=? AND package_id=? AND pcb_side<>?`)
            .bind(jobId,r.machine,r.face,r.slot,r.package_id,pcbSide).first();
          await logEvent(env.DB, { jobId, packageId, result: 'DUPLICATE', message: 'Bu makara fiziksel feeder konumunda daha önce alınmış veya yüklenmiş.', machine: r.machine, pcbSide: r.pcb_side, face: r.face, slot: r.slot, operator, rawQr });
          return json({ ok: false, code: 'ALREADY_PICKED', packageId,
            message: Number(isShared?.n||0)>0 ? 'Bu ortak makara TOP/BOTTOM taraflarından biri için zaten alınmış veya yüklenmiş. Aynı fiziksel feeder tekrar okutulmadı.' : 'Bu makara daha önce okutulmuş. İkinci kez makara alma kaydı oluşturulmadı.',
            machine: r.machine, face: r.face, slot: r.slot, sharedFeeder:Number(isShared?.n||0)>0, status:r.status }, 409);
        }

        // A Package ID may appear in both sides only when it is the same physical position.
        // The same reel must never be assigned to a different physical slot in this work order.
        const assignedElsewhere = await env.DB.prepare(`SELECT id,machine,pcb_side,face,slot FROM feeders
          WHERE job_id=? AND package_id=? AND NOT (machine=? AND face=? AND slot=?) LIMIT 1`)
          .bind(jobId,packageId,r.machine,r.face,r.slot).first();
        if (assignedElsewhere) {
          await logEvent(env.DB, { jobId, packageId, result:'AMBIGUOUS', message:'Package ID aynı iş emrinde farklı fiziksel feeder pozisyonlarına atanmış.', machine:assignedElsewhere.machine, pcbSide:assignedElsewhere.pcb_side, face:assignedElsewhere.face, slot:assignedElsewhere.slot, operator, rawQr });
          return json({ok:false,code:'PACKAGE_ASSIGNED_TO_OTHER_SLOT',packageId,
            message:'Bu Package ID başka bir fiziksel slota da atanmış ('+assignedElsewhere.machine+' / '+assignedElsewhere.face+' / '+assignedElsewhere.slot+'). Tek makaranın iki farklı slota atanması engellendi; setup kontrol edilmeli.'},409);
        }
        const usedElsewhere = await env.DB.prepare(`SELECT id,machine,pcb_side,face,slot FROM feeders
          WHERE job_id=? AND control_package_id=? AND NOT (machine=? AND face=? AND slot=?) LIMIT 1`)
          .bind(jobId,packageId,r.machine,r.face,r.slot).first();
        if (usedElsewhere) {
          await logEvent(env.DB, { jobId, packageId, result:'DUPLICATE', message:'Bu Package ID aynı iş emrinde başka fiziksel feeder pozisyonunda kullanılmış.', machine:usedElsewhere.machine, pcbSide:usedElsewhere.pcb_side, face:usedElsewhere.face, slot:usedElsewhere.slot, operator, rawQr });
          return json({ok:false,code:'ALREADY_USED',packageId,message:'Bu Package ID başka bir fiziksel feeder pozisyonu için zaten kullanılmış. İkinci kullanım engellendi.',machine:usedElsewhere.machine,face:usedElsewhere.face,slot:usedElsewhere.slot},409);
        }

        const pickedUpdate = await env.DB.prepare(`UPDATE feeders SET status='PICKED',control_package_id=?,operator=?,scanned_at=?
          WHERE job_id=? AND package_id=? AND machine=? AND face=? AND slot=? AND status='PENDING'`)
          .bind(packageId,operator,now(),jobId,packageId,r.machine,r.face,r.slot).run();
        if (Number(pickedUpdate.meta?.changes || 0) < 1) {
          await logEvent(env.DB, { jobId, packageId, result:'DUPLICATE', message:'Makara eşzamanlı başka bir işlemde zaten alınmış olarak işaretlendi.', machine:r.machine, pcbSide:r.pcb_side, face:r.face, slot:r.slot, operator, rawQr });
          return json({ok:false,code:'ALREADY_PICKED',packageId,message:'Bu Package ID eşzamanlı başka bir işlemde kullanılmış. Listeyi yenileyin.'},409);
        }
        const physicalRowsResult = await env.DB.prepare(`SELECT * FROM feeders WHERE job_id=? AND package_id=? AND machine=? AND face=? AND slot=? ORDER BY pcb_side`)
          .bind(jobId,packageId,r.machine,r.face,r.slot).all();
        const physicalRows = physicalRowsResult.results || [];
        for (const x of physicalRows) {
          await logEvent(env.DB, { jobId, packageId, result:x.pcb_side===pcbSide?'PICKED':'SHARED_PICKED',
            message:x.pcb_side===pcbSide?'Makara doğrulandı ve alındı olarak kaydedildi.':'Ortak fiziksel feeder makara alma durumu diğer PCB yüzüne eşitlendi.',
            machine:x.machine, pcbSide:x.pcb_side, face:x.face, slot:x.slot, operator, rawQr:x.pcb_side===pcbSide?rawQr:'' });
        }
        return json({ ok: true, packageId, machine: r.machine, pcbSide, face: r.face, slot: r.slot,
          ozcode: r.ozcode, location: r.location, sharedFeeder:physicalRows.some(x=>x.pcb_side!==pcbSide),
          sharedSides:physicalRows.map(x=>x.pcb_side), message:'Makara doğrulandı ve fiziksel feeder durumu kaydedildi.' });
      }

      if (request.method === 'POST' && url.pathname === '/api/reset-bottom') {
        const jobId = String(body.jobId || '').trim().toUpperCase();
        const operator = String(body.operator || '').trim();
        const confirmText = String(body.confirmText || '').trim().toUpperCase();
        if (!jobId || !operator || confirmText !== jobId + ' BOTTOM') {
          return json({ ok:false, message:'BOTTOM sıfırlama onayı geçersiz. İş emri ve BOTTOM doğrulaması eşleşmedi.' },400);
        }
        const selected = await env.DB.prepare(`SELECT b.* FROM feeders AS b
          WHERE b.job_id=? AND b.pcb_side='BOTTOM' AND b.status IN ('PICKED','LOADED')
            AND NOT EXISTS (
              SELECT 1 FROM feeders AS t WHERE t.job_id=b.job_id AND t.pcb_side='TOP'
                AND t.machine=b.machine AND t.face=b.face AND t.slot=b.slot AND t.package_id=b.package_id
            )
          ORDER BY b.machine,b.face,b.slot`).bind(jobId).all();
        const rows = selected.results || [];
        let resetCount = 0;
        for (const row of rows) {
          const upd = await env.DB.prepare(`UPDATE feeders SET status='PENDING',control_package_id=NULL,operator=NULL,scanned_at=NULL,loaded_at=NULL
            WHERE id=? AND job_id=? AND pcb_side='BOTTOM' AND status IN ('PICKED','LOADED')`).bind(row.id,jobId).run();
          if (Number(upd.meta?.changes || 0) !== 1) continue;
          resetCount++;
          await logEvent(env.DB, { jobId, packageId:row.control_package_id || row.package_id, result:'FEEDER_RESET',
            message:'BOTTOM tarafına özel feeder satırı toplu sıfırlandı. Ortak TOP/BOTTOM fiziksel feeder kayıtları korundu.',
            machine:row.machine, pcbSide:'BOTTOM', face:row.face, slot:row.slot, operator, rawQr:'' });
        }
        const sharedCountRow = await env.DB.prepare(`SELECT COUNT(*) AS n FROM feeders AS b
          WHERE b.job_id=? AND b.pcb_side='BOTTOM' AND EXISTS (
            SELECT 1 FROM feeders AS t WHERE t.job_id=b.job_id AND t.pcb_side='TOP'
              AND t.machine=b.machine AND t.face=b.face AND t.slot=b.slot AND t.package_id=b.package_id
          )`).bind(jobId).first();
        return json({ok:true,pcbSide:'BOTTOM',resetCount,retainedSharedCount:Number(sharedCountRow?.n||0),
          message:resetCount ? 'BOTTOM tarafına özel '+resetCount+' feeder satırı sıfırlandı. Ortak fiziksel feeder kayıtları korunarak TOP/BOTTOM durumları aynı bırakıldı; setup ve işlem geçmişi korundu.' : 'BOTTOM tarafına özel sıfırlanacak kayıt yok. Ortak fiziksel feeder kayıtları korunur.'});
      }

      if (request.method === 'POST' && url.pathname === '/api/reset-feeder') {
        const jobId = String(body.jobId || '').trim().toUpperCase();
        const id = String(body.id || '').trim();
        const operator = String(body.operator || '').trim();
        if (!jobId || !id || !operator) return json({ok:false,message:'İş emri, feeder kimliği veya operatör bilgisi eksik.'},400);
        const row = await env.DB.prepare('SELECT * FROM feeders WHERE id=? AND job_id=?').bind(id,jobId).first();
        if (!row) return json({ok:false,message:'Feeder kaydı bulunamadı.'},404);
        const openReelChange = await env.DB.prepare(`SELECT status FROM reel_change_plans
          WHERE job_id=? AND machine=? AND face=? AND slot=? AND original_package_id=? AND status IN ('EMPTY','ACTIVE')`)
          .bind(jobId,row.machine,row.face,row.slot,row.package_id).first();
        if(openReelChange)return json({ok:false,message:'Bu feeder için makara değişim kaydı var. Geçmiş kaydı korunması için feeder sıfırlama engellendi.'},409);
        if (!['PICKED','LOADED'].includes(row.status)) return json({ok:false,message:'Bu feeder zaten BEKLİYOR durumunda; sıfırlanacak işlem yok.'},409);
        const upd = await env.DB.prepare(`UPDATE feeders SET status='PENDING',control_package_id=NULL,operator=NULL,scanned_at=NULL,loaded_at=NULL
          WHERE job_id=? AND machine=? AND face=? AND slot=? AND package_id=? AND status IN ('PICKED','LOADED')`)
          .bind(jobId,row.machine,row.face,row.slot,row.package_id).run();
        const resetRows = await env.DB.prepare(`SELECT pcb_side FROM feeders WHERE job_id=? AND machine=? AND face=? AND slot=? AND package_id=?`)
          .bind(jobId,row.machine,row.face,row.slot,row.package_id).all();
        const sides = (resetRows.results||[]).map(x=>x.pcb_side);
        const shared = sides.includes('TOP') && sides.includes('BOTTOM');
        for (const side of sides) {
          await logEvent(env.DB, { jobId, packageId:row.control_package_id || row.package_id,
            result:shared?'SHARED_FEEDER_RESET':'FEEDER_RESET',
            message:shared?'Ortak fiziksel feeder sıfırlandı; TOP ve BOTTOM kayıtları birlikte BEKLİYOR durumuna alındı.':'Tek feeder satırı operatör tarafından sıfırlandı; makara alma ve yükleme durumu temizlendi.',
            machine:row.machine, pcbSide:side, face:row.face, slot:row.slot, operator, rawQr:'' });
        }
        const changed=Number(upd.meta?.changes||0);
        if (changed < 1) return json({ok:false,message:'Feeder durumu başka bir işlemde değişmiş. Listeyi yenileyin.'},409);
        return json({ok:true,resetCount:changed,shared,message:shared
          ? row.machine+' / '+row.face+' / '+row.slot+' ortak feeder kaydı TOP ve BOTTOM için birlikte sıfırlandı.'
          : row.pcb_side+' / '+row.machine+' / '+row.face+' / '+row.slot+' feeder satırı sıfırlandı.'});
      }

      if (request.method === 'POST' && url.pathname === '/api/loaded-bulk') {
        const jobId = String(body.jobId || '').trim().toUpperCase();
        const pcbSide = String(body.pcbSide || '').trim().toUpperCase();
        const operator = String(body.operator || '').trim();
        if (!jobId || !operator || !['TOP','BOTTOM'].includes(pcbSide)) return json({ ok:false, message:'İş emri, operatör veya PCB yüzü bilgisi geçersiz.' },400);
        const pendingRows = await env.DB.prepare("SELECT * FROM feeders WHERE job_id=? AND pcb_side=? AND status='PICKED' ORDER BY machine,face,slot")
          .bind(jobId,pcbSide).all();
        const rowsToLoad = pendingRows.results || [];
        let loadedCount = 0;
        for (const row of rowsToLoad) {
          const update = await env.DB.prepare(`UPDATE feeders SET status='LOADED',loaded_at=?,operator=?
            WHERE job_id=? AND machine=? AND face=? AND slot=? AND package_id=? AND status='PICKED'`)
            .bind(now(),operator,jobId,row.machine,row.face,row.slot,row.package_id).run();
          if (Number(update.meta?.changes || 0) < 1) continue;
          loadedCount++;
          const peers = await env.DB.prepare(`SELECT pcb_side FROM feeders WHERE job_id=? AND machine=? AND face=? AND slot=? AND package_id=?`)
            .bind(jobId,row.machine,row.face,row.slot,row.package_id).all();
          for (const peer of (peers.results||[])) {
            await logEvent(env.DB, { jobId, packageId:row.package_id,
              result:peer.pcb_side===pcbSide?'LOADED':'SHARED_LOADED',
              message:peer.pcb_side===pcbSide?'Seçili PCB yüzü için toplu feeder yükleme onayı verildi.':'Ortak fiziksel feeder yükleme durumu diğer PCB yüzüne eşitlendi.',
              machine:row.machine, pcbSide:peer.pcb_side, face:row.face, slot:row.slot, operator, rawQr:'' });
          }
        }
        return json({ok:true,pcbSide,loadedCount,skippedCount:rowsToLoad.length-loadedCount,
          message:loadedCount+' fiziksel feeder yüklemesi '+pcbSide+' tarafı için kaydedildi; ortak feeder kayıtları diğer PCB yüzüne de işlendi.'});
      }

      if (request.method === 'POST' && url.pathname === '/api/loaded') {
        const jobId = String(body.jobId || '').trim().toUpperCase();
        const id = String(body.id || '');
        const operator = String(body.operator || '').trim();
        const row = await env.DB.prepare('SELECT * FROM feeders WHERE id=? AND job_id=?').bind(id,jobId).first();
        if (!row) return json({ok:false,message:'Feeder kaydı bulunamadı.'},404);
        if (row.status !== 'PICKED') return json({ok:false,message:'Önce makara QR kodu doğrulanıp alındı durumuna geçmeli.'},409);
        const loadedUpdate = await env.DB.prepare(`UPDATE feeders SET status='LOADED',loaded_at=?,operator=?
          WHERE job_id=? AND machine=? AND face=? AND slot=? AND package_id=? AND status='PICKED'`)
          .bind(now(),operator,jobId,row.machine,row.face,row.slot,row.package_id).run();
        if (Number(loadedUpdate.meta?.changes || 0) < 1) return json({ok:false,message:'Bu feeder kaydı daha önce yüklenmiş veya başka bir işlem tarafından güncellenmiş.'},409);
        const peers = await env.DB.prepare(`SELECT pcb_side FROM feeders WHERE job_id=? AND machine=? AND face=? AND slot=? AND package_id=?`)
          .bind(jobId,row.machine,row.face,row.slot,row.package_id).all();
        const sides=(peers.results||[]).map(x=>x.pcb_side);
        const shared=sides.includes('TOP')&&sides.includes('BOTTOM');
        for (const side of sides) await logEvent(env.DB,{jobId,packageId:row.package_id,
          result:shared?(side===row.pcb_side?'LOADED':'SHARED_LOADED'):'LOADED',
          message:shared?'Ortak fiziksel feeder yükleme durumu TOP/BOTTOM kayıtlarına birlikte işlendi.':'Feeder yükleme operatör tarafından onaylandı.',
          machine:row.machine,pcbSide:side,face:row.face,slot:row.slot,operator,rawQr:''});
        return json({ok:true,shared,message:shared?'Ortak fiziksel feeder yüklendi; TOP ve BOTTOM kayıtları birlikte güncellendi.':'Feeder’a yüklendi olarak kaydedildi.'});
      }

      if (request.method === 'GET' && url.pathname === '/api/report') {
        const jobId = String(url.searchParams.get('jobId') || '').trim().toUpperCase();
        if (!jobId) return json({ ok:false, message:'İş emri belirtilmedi.' },400);
        await syncSharedFeederStates(env.DB, jobId, 'REPORT_SYNC');
        const job = await env.DB.prepare(`SELECT j.job_id,j.created_at,j.project_id,j.feeder_plan_revision_id,
          p.project_name,r.revision,r.status AS revision_status
          FROM jobs j LEFT JOIN projects p ON p.project_id=j.project_id
          LEFT JOIN feeder_plan_revisions r ON r.revision_id=j.feeder_plan_revision_id
          WHERE j.job_id=?`).bind(jobId).first();
        if (!job) return json({ ok:false,message:'İş emri bulunamadı.' },404);
        const rowsResult = await env.DB.prepare(`SELECT f.*,
          CASE WHEN EXISTS (SELECT 1 FROM feeders o WHERE o.job_id=f.job_id AND o.pcb_side<>f.pcb_side
            AND o.machine=f.machine AND o.face=f.face AND o.slot=f.slot AND o.package_id=f.package_id)
          THEN 1 ELSE 0 END AS is_shared
          FROM feeders f WHERE f.job_id=?
          ORDER BY CASE f.pcb_side WHEN 'TOP' THEN 0 ELSE 1 END,f.machine,
          CASE f.face WHEN 'FRONT' THEN 0 ELSE 1 END,f.slot`).bind(jobId).all();
        const rows = rowsResult.results || [];
        const eventsResult = await env.DB.prepare(`SELECT job_id,package_id,result,message,machine,pcb_side,face,slot,operator,scanned_at
          FROM scan_events WHERE job_id=? ORDER BY id ASC`).bind(jobId).all();
        const reelPlans=await env.DB.prepare(`SELECT rp.job_id,rp.machine,rp.face,rp.slot,rp.original_package_id,
          rp.replacement_package_id,rp.replacement_location,rp.status,rp.emptied_at,rp.emptied_by,rp.activated_at,rp.activated_by,
          (SELECT e.scanned_at FROM scan_events e WHERE e.job_id=rp.job_id AND e.machine=rp.machine AND e.face=rp.face AND e.slot=rp.slot
            AND e.package_id=rp.replacement_package_id AND e.result IN ('SPARE_PICKED_QR','SPARE_PICKED_MANUAL','SPARE_PICKED_UNPLANNED')
            ORDER BY e.id ASC LIMIT 1) AS picked_at,
          (SELECT e.operator FROM scan_events e WHERE e.job_id=rp.job_id AND e.machine=rp.machine AND e.face=rp.face AND e.slot=rp.slot
            AND e.package_id=rp.replacement_package_id AND e.result IN ('SPARE_PICKED_QR','SPARE_PICKED_MANUAL','SPARE_PICKED_UNPLANNED')
            ORDER BY e.id ASC LIMIT 1) AS picked_by,
          (SELECT e.result FROM scan_events e WHERE e.job_id=rp.job_id AND e.machine=rp.machine AND e.face=rp.face AND e.slot=rp.slot
            AND e.package_id=rp.replacement_package_id AND e.result IN ('SPARE_PICKED_QR','SPARE_PICKED_MANUAL','SPARE_PICKED_UNPLANNED')
            ORDER BY e.id ASC LIMIT 1) AS picked_method
          FROM reel_change_plans rp WHERE rp.job_id=? ORDER BY rp.machine,rp.face,rp.slot`).bind(jobId).all();
        const summary = { TOP:{total:0,pending:0,picked:0,loaded:0,collected:0,toLoad:0}, BOTTOM:{total:0,pending:0,picked:0,loaded:0,collected:0,toLoad:0} };
        for (const r of rows) {
          const x=summary[r.pcb_side];
          if(!x)continue;
          x.total++;
          if(r.status==='PENDING')x.pending++;
          else if(r.status==='PICKED')x.picked++;
          else if(r.status==='LOADED')x.loaded++;
        }
        for (const side of ['TOP','BOTTOM']) {
          summary[side].collected = summary[side].picked + summary[side].loaded;
          summary[side].toLoad = summary[side].picked;
        }
        return json({ok:true,generatedAt:now(),jobId,projectName:job.project_name||'',revision:job.revision||'',revisionStatus:job.revision_status||'',summary,rows,events:eventsResult.results||[],reelPlans:reelPlans.results||[]});
      }

      if (request.method === 'GET' && url.pathname === '/api/dashboard') {
        const jobId = String(url.searchParams.get('jobId') || '').trim().toUpperCase();
        const pcbSide = String(url.searchParams.get('pcbSide') || '').trim().toUpperCase();
        if (!jobId || !['TOP','BOTTOM'].includes(pcbSide)) return json({ ok: false, message: 'İş emri veya PCB yüzü belirtilmedi.' }, 400);
        const jobMeta = await env.DB.prepare(`SELECT j.job_id,j.project_id,j.feeder_plan_revision_id,
          p.project_name,r.revision,r.status AS revision_status
          FROM jobs j
          LEFT JOIN projects p ON p.project_id=j.project_id
          LEFT JOIN feeder_plan_revisions r ON r.revision_id=j.feeder_plan_revision_id
          WHERE j.job_id=?`).bind(jobId).first();
        if (!jobMeta) return json({ ok:false, message:'İş emri bulunamadı.' },404);
        const rowsResult = await env.DB.prepare(`SELECT f.*,
          CASE WHEN EXISTS (SELECT 1 FROM feeders o WHERE o.job_id=f.job_id AND o.pcb_side<>f.pcb_side
            AND o.machine=f.machine AND o.face=f.face AND o.slot=f.slot AND o.package_id=f.package_id)
          THEN 1 ELSE 0 END AS is_shared
          , rp.replacement_package_id,rp.replacement_location,rp.status AS replacement_status,
          rp.emptied_at AS replacement_emptied_at,rp.activated_at AS replacement_activated_at,
          CASE WHEN rp.status='ACTIVE' OR EXISTS(
            SELECT 1 FROM scan_events e WHERE e.job_id=f.job_id AND e.machine=f.machine
              AND e.face=f.face AND e.slot=f.slot AND e.package_id=rp.replacement_package_id
              AND e.result IN ('SPARE_PICKED_QR','SPARE_PICKED_MANUAL','SPARE_PICKED_UNPLANNED','REEL_REPLACED_QR','REEL_REPLACED_MANUAL','UNPLANNED_REEL_REPLACED'))
          THEN 1 ELSE 0 END AS replacement_picked,
          CASE WHEN EXISTS(SELECT 1 FROM scan_events e WHERE e.job_id=f.job_id AND e.machine=f.machine AND e.face=f.face AND e.slot=f.slot AND e.package_id=rp.replacement_package_id AND e.result='SPARE_PICKED_UNPLANNED') THEN 1 ELSE 0 END AS replacement_unplanned
          FROM feeders f LEFT JOIN reel_change_plans rp
            ON rp.job_id=f.job_id AND rp.machine=f.machine AND rp.face=f.face AND rp.slot=f.slot
            AND rp.original_package_id=f.package_id
          WHERE f.job_id=? AND f.pcb_side=?
          ORDER BY f.machine,CASE f.face WHEN 'FRONT' THEN 0 ELSE 1 END,f.slot`).bind(jobId, pcbSide).all();
        const rows = rowsResult.results || [];
        const total = rows.length;
        const pending = rows.filter(x => x.status === 'PENDING').length; // Depodan henüz alınmayan
        const toLoad = rows.filter(x => x.status === 'PICKED').length; // Alınmış, feeder yüklemesi bekleyen
        const loaded = rows.filter(x => x.status === 'LOADED').length;
        const collected = toLoad + loaded; // Depodan alınan toplam; yükleme arttıkça azalmaz
        const resettable = rows.filter(x => !Number(x.is_shared) && ['PICKED','LOADED'].includes(x.status)).length;
        const sharedCount = rows.filter(x => Number(x.is_shared)).length;
        const scans = await env.DB.prepare('SELECT package_id,result,message,scanned_at FROM scan_events WHERE job_id=? ORDER BY id DESC LIMIT 8').bind(jobId).all();
        return json({
          ok:true,jobId:jobMeta.job_id,projectId:jobMeta.project_id||'',
          projectName:jobMeta.project_name||'',revision:jobMeta.revision||'',
          revisionStatus:jobMeta.revision_status||'',
          total,pending,collected,toLoad,loaded,resettable,sharedCount,rows,scans:scans.results||[]
        });
      }

      return json({ ok: false, message: 'API endpoint bulunamadı.' }, 404);
    } catch (err) {
      return json({ ok: false, message: 'Sunucu hatası: ' + String(err.message || err) }, 500);
    }
  }
};
