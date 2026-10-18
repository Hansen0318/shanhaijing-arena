# P2 Basic completed engineering / scoped release authorization next

```text
【山海經聯盟 — P2 猼訑 Basic 工程完成，尚未部署】
所有後續 Chat／Work／Codex 接手指令都必須放在單一完整、自足、可一鍵複製的code block。
GitHub唯一權威。Repository Hansen0318/shanhaijing-arena；active branch feat/m0-combat-core-20260927；PR #1 open/unmerged。先fetch最新remote，確認branch/HEAD/PR/工作目錄與近期commits，保護既有修改，不建立取代分支。禁止merge main、TD玩法、Heavy/P3。
Packing checkpoint2f1de8669d183653dcf0ab4f75bc92489266a02c；最新integration/evidence checkpoint是包含本檔的feature commit，不得用checkpoint取代remoteHEAD。
讀AGENTS、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、WORK_PROGRESS與STATE頂部、ROADMAP、DEVELOPMENT_ACCELERATION、M5C_ART_ANIMATION_VFX、CHARACTER_ACTION_ART_WORKFLOW、M5C_P2_BOTUO_BASIC_ACTION，並讀docs/verification/M5C_P2_BOTUO_BASIC_RUNTIME.md/.json、M5C_P2_BOTUO_BASIC_RESIDENCY.json、P2_BASIC_RUNTIME_ASSETS.json。
P1 COMPLETE BY EXISTING ACCEPTANCE EVIDENCE，不重做或重開玩家驗收。普通Hit永久取消；普通受傷不中斷攻擊/施法/移動，合法control/KO保留。P2基礎形象、靜態Idle、Move、KO維持核准。
P2Basic四姿勢F1/F2v2/F3/F4、獨立source/contactVFX、normal/slowGIF已核准；250ms真實前搖T0–3已核准。Immutable receipts docs/art/approved/botuo/basic/composite-v1/acceptance.json及executable-v1/acceptance.json。不要重問相同美術/GIF/時序審核。
已完成保真包裝、共用資料管線runtime integration、220/220受影響測試、Build/asset guard。ENGINEERING PASS / NOT DEPLOYED / NOT PLAYER VERIFIED。低密度PLANNING包仍REJECTED，不得使用。
正式pack public/assets/botuo-basic-packing-v1/。七既有動畫僅逐格裁完全空白RGBA外列，一個P1 C-sourceFX同樣無損裁列並補償座標；原檔/receipt/GIF保留。RGBA還原/左右world位置已驗證，不重畫。完整required scene/cache16,630,060／16,777,216bytes，131,072reserve保留加16,084extra；39required keys不靜默卸載。
契約：250ms windup；F1/F2/F3/F4=160/90/160/160；真實resolve同時HP/damage-critical/contact；source160..resolve+200；actualhit contact200獨立於F3body160。Generic blade.startMs/contact.durationMs opt-in，P1預設不變。原target鎖定，resolve重查range；逃出miss不換目標、不耗miss RNG；普通damage不取消；合法control/source-targetKO/newskill取消、不退cadence；不加動畫移動鎖、不改係數/range/Tier/crit/頻率/無位移。
證據含實際automaticAI8cases、player skill API及Arena事件bridge；不是browser/手機/GPU/FPS驗收。220/220 PASS可重用，沒有新缺陷或直接變動不要重跑/重建，不重跑P1整套。既有發佈8e2f5e0是舊版證據，本次沒有新部署。
本次範圍完成並停止。NEXT ONLY：等玩家明確scoped release授權。若新訊息已授權release，沿用現有工程結果，只完成必要bounded browser/render gate、feature Pages deployment、public index/JS/CSS/本次runtime PNG指紋核對，然後給P2手機小範圍驗收；不得宣告手機PASS。
無release授權時不部署、不觸發Pages。Checkpoint用[skip ci]；每個coherent slice同步GitHub進度/剩餘Gate並commit+push。同一branch non-force更新。命令列push無認證可用已連接GitHub工具，逐blob/tree一致性校驗後更新，不建立取代分支。
```
