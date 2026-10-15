# P1 Basic runtime execution evidence

Status: **IN PROGRESS / TASK1 ASSET GATE PASS / NOT DEPLOYED**.

Player approved implementation plan at2026-10-15T22:43:03+08:00 with「好繼續」. BASE4160621453626071e6ec2b13e282336794df549c, active feature/PR#1, no main merge. Canonical design/plan under docs/superpowers/{specs,plans}/2026-10-15-shared-basic-windup*.md. Native execution here, no new approval gate between tasks.

## Task1: approved-art derivatives and finite residency

Baseline npm test708/708 PASS. Asset TDD RED observed missing derivative/manifest assertions (4 expected failures, approved-master check already green). First green run caught test-only PNG decoder rejecting indexed-color Botuo Idle; verified ALL public character PNGs fully decode with Pillow, then used actual PNG IHDR dimensions at the external-browser transport boundary. No production failed image was ignored. New derivative RGBA tests still decode/unfilter actual pixels.

New4 files: Idle96x128/18033bytes, action512x128/51713bytes, blade97x81/5050bytes, contact85x57/2300bytes. Exact SHA256/alpha/geometry: docs/art/approved/lushu/basic/review-v1/runtime-manifest.json. Old Idle file and all accepted masters/GIF unchanged; new Idle RGBA equals old F1 pixel-for-pixel. All4action cells checked on light/dark backgrounds at computed display size, blade/antlers/hands/tail/feet complete. Measured shared action scale2.4731182795698925, origin[.5,.8369846715109296], same visible F4 height/foot offset as old Idle, no gameplay coordinate change.

Asset tests include20Restart/destroy cycles in alternating all-five load orders, real cache+residency with actual PNG dimensions, optional identity eviction, all required texture presence, each new key failing explicitly, and late completion after shutdown. Required cache/scene set16763144bytes, below unchanged16777216 hard guard;12MiB soft and separate16MiB cache remain unchanged. This is decoded-equivalent accounting, not total browser RAM/GPU measurement. No full runtime action/phone PASS claimed.

Asset guard65files3674128bytes PASS. Original production behavior remains unchanged at this intermediate checkpoint except exact-pixel static Idle source optimization; Basic timing/animation wiring still pending. Intermediate commits skip CI to avoid releasing a partial integration.
