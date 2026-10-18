# Current priority override — 2026-10-19

Heavy F3 PLAYER APPROVED; receipt docs/art/approved/botuo/heavy/f3-v1/acceptance.json. Player reports Basic size shrink and explicitly requests GitHub record → fix → record. Do not repeat F3 review or continue Heavy poses before Basic scale fix. Existing handoff below is history for completed review, preserve references.

# P2 Heavy — F3 design / art review pending

```text
【山海經聯盟 — P2 猼訑 Heavy 震嶺 F3 審核接手】
所有後續 Chat／Work／Codex 接手指令必須放在單一完整、自足、可一鍵複製 code block。
GitHub唯一權威。Hansen0318/shanhaijing-arena；feat/m0-combat-core-20260927；PR1 open/unmerged；不建取代分支、不merge main、不引入TD。先fetch最新remote/確認branch、HEAD、PR、工作目錄與近期commits。最新checkpoint為包含本檔的feature commit，不當作永遠最新。
先讀AGENTS.md、docs/DEVELOPMENT_PLAYBOOK.md、PROJECT_BOUNDARIES.md、WORK_PROGRESS.md/STATE.md頂部、DEVELOPMENT_ROADMAP.md、DEVELOPMENT_ACCELERATION.md、M5C_ART_ANIMATION_VFX.md、CHARACTER_ACTION_ART_WORKFLOW.md、M5C_P2_BOTUO_HEAVY_ACTION.md，及docs/art/candidates/botuo/heavy/key-pose-v1/的prompt.txt、verification.json、mechanics-snapshot.json與原圖。
P1 COMPLETE；P2基礎形象/Idle/Move/KO/Basic PASS PLAYER VERIFIED，禁止重驗、重畫或重部署。Basic驗收receipt docs/art/approved/botuo/basic/runtime-v1/acceptance.json不動；原部署db451cd不因文件較新而重發。一般Hit永久取消，普通傷害不中斷，合法控制/KO保留。
玩家「好繼續」後已完成Heavy機制/四技能動作區別設計與一張F3候選：抬身、旋腰、獸面護臂向前重擊，與Basic低頭角擊不同。F3-contact-master.png SHA2560049d9610e46b0d3ad5cffff6e54a94190786992999b282eef2253c8c019b206，尚未核准。原圖左邊alpha1噪點保留；另40px留邊F3-contact-padded.png完整RGBA還原通過。淺深底與144px高度QA是靜態研究，不是實際手機比例/動畫/工程證據。
NEXT只審核這一張F3的設計/形象/護臂/重擊姿勢，等明確核准後才做F1/F2/F4，再獨立出招/命中特效、正常/慢速/無特效/左右/Idle返回GIF審核。沒有Heavy候選核准receipt，禁止捏造已核准或生成其他姿勢。
現有Heavy單目標單次、係數1.30、無位移，T0射程1.8/CD4/crit20%x1.75；windupMs0，戰術telegraph650ms隨Tier調整。實際T0-T3投影與T2+控制見mechanics-snapshot.json。tactical有目標延後、非tactical及空放目前立即recordCast，未具有Heavy action token；後續工程preflight需確認真實事件，不套用Basic250ms、不把650ms說成通用前搖。任何變更需另外確切契約核准。空放要保留未來動作與出招FX，沒命中不產生contact/HP/數字，現階段尚未整合這套正式Heavy動畫。
工程預算仍16MiB，131072 reserve；既有required16630060bytes只剩16084額外空間，不代表Heavy已fit。不升預算、不靜默卸載、不犧牲核准清晰度；完整residency與保真包裝是後續工程Gate。
本slice只有候選/文件/PNG/alpha/hash/淺深底檢查，沒有新runtime、tests/build/browser、部署或玩家驗收。保護所有src/public/舊receipt與核准原圖；checkpoint[skip ci]，commit+push同一分支並核對remote，禁止art-only意外Pages。不要開始Special/Awakening/P3。除非玩家明確核准或要求修正F3，停於目前F3審核Gate。
```
