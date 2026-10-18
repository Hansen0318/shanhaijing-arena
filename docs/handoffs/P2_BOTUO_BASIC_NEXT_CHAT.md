# P2 Basic deployed / phone acceptance next

```text
【山海經聯盟 — P2 猼訑 Basic 已部署，等待玩家手機確認】
所有後續 Chat／Work／Codex 接手指令都必須單一完整、自足、可一鍵複製code block。
GitHub唯一權威。Repository Hansen0318/shanhaijing-arena；active branch feat/m0-combat-core-20260927；PR #1 open/unmerged。先fetch latest remote，確認HEAD/branch/PR/工作目錄及近期commits，保護既有修改。不建取代分支、不merge main、不引入TD、不開始Heavy/P3。
最新checkpoint是包含本檔的feature commit。已部署release db451cda0e396736b170d0196d32655649303a36；https://hansen0318.github.io/shanhaijing-arena/?v=db451cd 。docs HEAD較新不代表需要重部署。
讀最新AGENTS、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、WORK_PROGRESS/STATE頂部、ROADMAP、DEVELOPMENT_ACCELERATION、M5C_ART_ANIMATION_VFX、CHARACTER_ACTION_ART_WORKFLOW、M5C_P2_BOTUO_BASIC_ACTION、docs/verification/M5C_P2_BOTUO_BASIC_RUNTIME.md/.json、M5C_P2_BOTUO_BASIC_RELEASE.md/.json、M5C_P2_BOTUO_BASIC_PUBLIC_FINGERPRINT.json。
P1 COMPLETE BY EXISTING ACCEPTANCE EVIDENCE，不重做或重開驗收。普通Hit永久取消，普通受傷不中斷技能/移動；合法控制與KO保留。P2基礎形象/靜態Idle/Move/KO保護。
P2Basic F1/F2v2/F3/F4、獨立source/contactVFX、normal/slowGIF已核准；250ms實際前搖T0–T3已核准。Receipts docs/art/approved/botuo/basic/composite-v1/acceptance.json與executable-v1/acceptance.json不可修改，不重問。
Runtime已完成共用資料管線整合。固定250ms；160/90/160/160ms姿勢；HP/數字/contact同真實resolve；source160..resolve+200，actualhit contact200獨立於F3body160。目標鎖定、resolve重查range；miss不假命中/換目標/耗RNG；普通damage不取消，合法control/KO/newskill取消不退cadence。係數/射程/Tier/暴擊/頻率/無位移保留，無動畫操作鎖。Generic opt-in blade.startMs/contact.durationMs，P1預設不變。
保真pack public/assets/botuo-basic-packing-v1/。原圖/GIF/receipt保留；F2用v2，低密度PLANNING仍REJECTED。七既有動畫逐格裁零RGBA外列，一個P1 C-sourceFX無損裁列補償座標。RGBA重建/左右world位置有證據。39required textures16630060/16777216bytes，131072reserve加16084extra；不靜默卸載。
ENGINEERING PASS / DEPLOYED / NOT PLAYER VERIFIED。Actions39127557379，build117675784662/deploy117675979008成功；220/220限定檢查+Build/guard，真實Chromium4cases/24screenshots通過。完整artifact12137275017，P2_BASIC_BROWSER保留JSON/5PNG。公開15files exact SHA256匹配實際CI Pages artifact12137215339。
第一版release da03a3e/run39127303719只因fixture移位後仍在Move卻量成Idle而blocked；只修測試初始化，保留strictgeometry，未改production，Pages正確skip。不可把舊失敗狀態當最新。
NEXT ONLY：等玩家對上述已部署版本的小範圍手機驗收：動作/出招/contact夠明顯、HP/數字同步、左右/Idle返回、Pause/Restart。現有工程/部署證據重用，不重做測試或部署，除非新缺陷/實質變更。
若玩家明確確認ok，將原話綁定release SHA/URL與P2Basic範圍，新增immutable runtime acceptance receipt並更新相關進度/流程/規則為PASS / PLAYER VERIFIED；不要捏造未回報細項。再確認P2Heavy「震嶺」的下一個設計/美術Gate，不能把手機確認當成未看過Heavy美術核准。若有具體缺陷，只修對應delta。
證據/驗收紀錄commit用[skip ci]，不觸發Pages。每個coherent slice commit+push同一branch、non-force核對remote。命令列push無認證可用已連接GitHub逐blob/tree校驗更新。維持所有後續handoff單一完整code block。
```
