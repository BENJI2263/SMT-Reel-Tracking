# SMT Reel Control - Database Handover

This folder contains the uploaded Cloudflare D1 export and a schema-only representation.

- `smt-reel-control-backup.sql`: full database snapshot including table definitions, indexes, and actual records.
- `schema.sql`: DDL definitions generated from the uploaded snapshot; no INSERT records.

## Snapshot content

| Table | Records | Purpose |
|---|---:|---|
| projects | 2 | Projects / PCB models |
| feeder_plan_revisions | 3 | Project feeder-plan revisions |
| feeder_plan_items | 252 | Machine/side/slot plan entries |
| jobs | 3 | Production work orders |
| feeders | 252 | Job-specific feeder state and Package IDs |
| reel_change_plans | 1 | Planned replacement reel and status |
| scan_events | 411 | Historical scanning and action log |

Jobs in this snapshot: `PO-000001`, `PO-000005`, `PO-000007`. There is NO `PO-000008` record in the supplied snapshot.

One planned replacement: `PO-000005`, `SM411/FRONT/F41`, original `LEG-3B17F6983D53`, replacement `PKG-00000135`, location `B13`, status `PLANNED`.

## Import into a local SQLite database

`sqlite3 smt-reel-control-local.db < database/smt-reel-control-backup.sql`

This is a **snapshot**, not an ongoing synchronization. Data created later in Cloudflare is not included. The importing developer should map projects, jobs, feeder plan revisions, reels and event records to the host application's own data model and authentication system rather than treating this database as the canonical production system.

Be careful with duplicate physical feeders that appear under both TOP and BOTTOM, and distinguish reel picking from physical feeder loading and from reel replacement.
