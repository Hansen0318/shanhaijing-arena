# P2 Basic executable preflight / zero-context handoff

```text
【山海經聯盟 — P2 猼訑 Basic GIF及250ms實際契約均已核准】
所有後續 Chat／Work／Codex 接手指令必須是一個完整、自足、可一鍵複製 code block。
GitHub 唯一權威。先fetch最新remote，核對HEAD／branch／PR／工作目錄與近期commits。
Repository Hansen0318/shanhaijing-arena；既有分支feat/m0-combat-core-20260927；PR #1 open/unmerged。禁止merge main、新建取代分支、引入TD、開始Heavy/P3。
先讀AGENTS、WORK_PROGRESS、STATE頂部、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、DEVELOPMENT_ROADMAP、DEVELOPMENT_ACCELERATION、M5C_ART_ANIMATION_VFX、CHARACTER_ACTION_ART_WORKFLOW及docs/M5C_P2_BOTUO_BASIC_ACTION.md。
玩家19:23:19及19:23:43+08:00「我審核ok，紀錄github相關流程規則進度，然後繼續」已接受四姿勢、獨立出招／命中VFX及正常／慢速GIF。Receipt docs/art/approved/botuo/basic/composite-v1/acceptance.json，checkpoint b7c0df68d5a85de844d35d4892413ec4dc345bfd。最新HEAD以包含此檔的feature Git history／remote ref為準。
核准來源在docs/art/candidates/botuo/basic/composite-review-v1/，原candidate資料夾名是歷史，不能重生成／重開美術審核。正常GIF SHA55c70c31141da605ee16f558bc6c9629c1ceeab73acb3314a2b3066d1c98ae9d；慢速8f9fd7662e54565ff6fdfe5e709fd4862f0e3b819a85bfe7c777dec4829ab553。
P1 COMPLETE BY EXISTING ACCEPTANCE EVIDENCE，普通Hit CANCELLED；所有P1及P2基礎Idle/Move/KO素材、runtime及既有驗收證據保護，不重新跑P1整套測試／部署／玩家驗收。普通受傷不中斷，合法技能控制保留。
已完成新P2 preflight；先讀docs/verification/M5C_P2_BOTUO_BASIC_PREFLIGHT.md/.json。
重現python scripts/prepareBotuoBasicRuntimeProbe.py，再node scripts/inspectBotuoBasicPreflight.mjs；這不是P1重測或browser/phone驗收。
16 current direct-call cases +4Tiers +4misses證明Basic現為0ms即時HP，無phased action token。12 sandbox-only240/250ms提案測量中，normal50ms步長兩者都於250msresolve。
玩家2026-10-18T19:43:23+08:00「如果這樣是符合邏輯的話，我同意」接受已解釋的250ms契約，receipt docs/art/approved/botuo/basic/executable-v1/acceptance.json。P2 Basic固定250ms真實前搖(T0–T3)，F1/F2/F3/F4=160/90/160/160ms，總570；已核准GIF為240mscontact，差10ms，normal50ms步長兩者皆250msresolve。時序Gate已關閉，不重問。
同一real resolve才扣HP／damage-critical數字／目標特效，鎖原target並在resolve用現有projected range重查，逃出落空、不假命中、不延遲UI。原係數1／crit／Tier／range／cadence-at-start／無位移保留，普通受傷不取消，KO/合法control/new skill按現有規則取消、不退cadence，沒有新動畫鎖。
source效果160至resolve+200；contact效果actualhit至+200；F3body160、F4body160獨立。現有contact fade綁F3hold，後續若採此契約需generic opt-in contact lifetime，預設P1行為不變；實際cast-chain可見／miss／Pause／KO／destroy仍需工程證據。
目前required16,552,840／16,777,216bytes、optional reserve131,072，新增可用93,304。89,856byte低密度PNG試包雖fits但因模糊REJECTED，不可採用，資料在docs/verification/P2_BASIC_RUNTIME_PACK_PROBE/。更高品質packing仍待工程解決，不能提高上限、砍approved pixels或靜默drop required資產。
P2現有Idle/Move/KO只量測完全空白RGBA外列潛在45,056byte可無損節省，尚未變更；任何pack須保留原檔、逐RGBA/both-facing origin-scale/world位置證明後才可採。
目前NOT IMPLEMENTED／NOT ENGINEERING PASS／NOT DEPLOYED／PHONE PENDING。這次沒有build／Pages／public fingerprint或P1重驗收。舊部署沿用8e2f5e049095017d7350b1d0d61e96527ab21e44。
玩家接受時序後，完成高品質package與最小shared/data integration、直接影響測試、build/scoped release/public fingerprint，再玩家手機驗收。保持出招與命中都明顯、角色動作effects-OFF可辨、未來Basic<Heavy<Special<Awakening；不可重開已核准美術或自動開始下一技能。
Chat先完成可做的靜態／素材工作，Work只接不可替代工程。每個coherent slice [skip ci] commit+push並同步progress/state/workflow。NEXT是高品質保真packing，再最小整合與直接影響檢查；不是時序／美術重審。玩家前一則「接下來呢？先跟我說」要求先解釋，故這個decision-only slice未改production、不提前部署；release仍須依既有範圍授權與工程Gate，不把同意時序誤寫為已部署。
```
