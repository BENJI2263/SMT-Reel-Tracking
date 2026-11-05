-- SMT Reel Control D1 schema only (generated from the uploaded SQL export)
-- Contains no production row data.
PRAGMA foreign_keys=OFF;

CREATE TABLE feeder_plan_items (     item_id TEXT PRIMARY KEY,     revision_id TEXT NOT NULL,     pcb_side TEXT NOT NULL         CHECK (pcb_side IN ('TOP', 'BOTTOM')),     machine TEXT NOT NULL,     face TEXT NOT NULL         CHECK (face IN ('FRONT', 'REAR')),     slot TEXT NOT NULL,     feeder TEXT,     ozcode TEXT,     part_number TEXT,     location TEXT,     package_id TEXT,     lot_number TEXT,     date_code TEXT,     reel_stock REAL,     planned_use REAL,     fuji_qty TEXT,     description TEXT,     created_at TEXT NOT NULL,     FOREIGN KEY (revision_id)         REFERENCES feeder_plan_revisions(revision_id),     UNIQUE (revision_id, pcb_side, machine, face, slot) );

CREATE TABLE feeder_plan_revisions (     revision_id TEXT PRIMARY KEY,     project_id TEXT NOT NULL,     revision TEXT NOT NULL,     status TEXT NOT NULL DEFAULT 'DRAFT'         CHECK (status IN ('DRAFT', 'APPROVED', 'ARCHIVED')),     created_at TEXT NOT NULL,     FOREIGN KEY (project_id) REFERENCES projects(project_id),     UNIQUE (project_id, revision) );

CREATE TABLE feeders ( id TEXT PRIMARY KEY, job_id TEXT NOT NULL, pcb_side TEXT NOT NULL CHECK (pcb_side IN ('TOP','BOTTOM')), machine TEXT NOT NULL, face TEXT NOT NULL CHECK (face IN ('FRONT','REAR')), slot TEXT NOT NULL, feeder TEXT, ozcode TEXT, part_number TEXT, location TEXT, package_id TEXT NOT NULL, lot_number TEXT, date_code TEXT, reel_stock REAL, planned_use REAL, fuji_qty TEXT, status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','PICKED','LOADED')), control_package_id TEXT, operator TEXT, scanned_at TEXT, loaded_at TEXT, created_at TEXT NOT NULL, UNIQUE(job_id, pcb_side, machine, face, slot) );

CREATE TABLE jobs ( job_id TEXT PRIMARY KEY, created_at TEXT NOT NULL , project_id TEXT, feeder_plan_revision_id TEXT);

CREATE TABLE projects (     project_id TEXT PRIMARY KEY,     project_name TEXT NOT NULL UNIQUE,     description TEXT,     status TEXT NOT NULL DEFAULT 'ACTIVE'         CHECK (status IN ('ACTIVE', 'ARCHIVED')),     created_at TEXT NOT NULL );

CREATE TABLE reel_change_plans (   id INTEGER PRIMARY KEY AUTOINCREMENT,   job_id TEXT NOT NULL,   machine TEXT NOT NULL,   face TEXT NOT NULL,   slot TEXT NOT NULL,   original_package_id TEXT NOT NULL,   replacement_package_id TEXT NOT NULL,   replacement_location TEXT NOT NULL,   status TEXT NOT NULL DEFAULT 'PLANNED' CHECK (status IN ('PLANNED','EMPTY','ACTIVE')),   emptied_at TEXT,   emptied_by TEXT,   activated_at TEXT,   activated_by TEXT,   created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,   UNIQUE(job_id,machine,face,slot,original_package_id,replacement_package_id) );

CREATE TABLE scan_events ( id INTEGER PRIMARY KEY AUTOINCREMENT, job_id TEXT NOT NULL, package_id TEXT, result TEXT NOT NULL, message TEXT, machine TEXT, pcb_side TEXT, face TEXT, slot TEXT, operator TEXT, raw_qr TEXT, scanned_at TEXT NOT NULL );

CREATE INDEX idx_feeders_job_package ON feeders(job_id, package_id);

CREATE INDEX idx_feeders_job_status ON feeders(job_id, pcb_side, status);

CREATE INDEX idx_feeders_location ON feeders(job_id, location);

CREATE INDEX idx_reel_change_job ON reel_change_plans(job_id,machine,face,slot);

CREATE UNIQUE INDEX idx_reel_change_one_slot  ON reel_change_plans(job_id,machine,face,slot);

CREATE UNIQUE INDEX idx_reel_change_package  ON reel_change_plans(job_id,replacement_package_id);

CREATE INDEX idx_scan_events_job_time ON scan_events(job_id, scanned_at);
