# P2 Basic GIF review / zero-context handoff

```text
【山海經聯盟 — P2 猼訑 Basic GIF 接手】
所有後續 Chat／Work／Codex 接手指令必須是一個完整、自足、可一鍵複製 code block。
GitHub 唯一權威。先 fetch 最新 remote，核對 branch／HEAD／PR／工作目錄與近期 commits。
Repository Hansen0318/shanhaijing-arena；分支 feat/m0-combat-core-20260927；PR #1 open/unmerged。
本輪 recovery dec02b2786b8d3829a5b4cb0b01350e62023a9bd；最新 checkpoint 是包含此檔的 feature commit，重新查 remote，不把 baseline 當永久 HEAD。
必讀 AGENTS、WORK_PROGRESS、STATE 頂部、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、DEVELOPMENT_ROADMAP、DEVELOPMENT_ACCELERATION、M5C_ART_ANIMATION_VFX、CHARACTER_ACTION_ART_WORKFLOW、docs/M5C_P2_BOTUO_BASIC_ACTION.md。
P1 COMPLETE，普通 Hit CANCELLED。禁止重畫／重測／重部署／重新驗收 P1；保留真正扣血、數字、技能 VFX、合法控制及 KO。P2 核准 identity／Idle／Move／KO／runtime packing 全保護。
F3 PLAYER ART APPROVED，receipt docs/art/approved/botuo/basic/f3-v1/acceptance.json；原圖19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36，不重生成。
玩家17:22:42+08:00「好接下來是做gif給我確認嗎，是的話就給我連結看」授權使用已展示姿勢進 GIF 預覽，覆蓋前次停在姿勢階段的指標。不要捏造獨立 F1/F2/F4 核准原文；最終可視範圍待整組 GIF 審核。
當前第一未完成 Gate：玩家審核 Basic「角擊」正常／慢速 composite GIF。
檔案與 README/manifest/checksums：
docs/art/candidates/botuo/basic/composite-review-v1/
botuo-basic-composite-normal.gif：SHA25655c70c31141da605ee16f558bc6c9629c1ceeab73acb3314a2b3066d1c98ae9d
botuo-basic-composite-slow.gif：SHA2568f9fd7662e54565ff6fdfe5e709fd4862f0e3b819a85bfe7c777dec4829ab553
另有 character-only normal/slow、reduced static cue、獨立 source-force/target-impact PNG、exact prompts、全透明 safe cells、QA。
重現 python scripts/prepareBotuoBasicReview.py；不得改 P1 或直接重生成 accepted pixels。
正常2800ms／慢速8400ms含雙方向與 Idle；decoded最短40/120ms、完整 pixel/timeline roundtrip PASS。
完整 source canvas 依人工標記 skull height 等密度縮放，統一 XY 比例與蹄底，原始 pixels 未刪、resized pixels 完整保留，safe cell 外圍至少35px透明。原圖低alpha雜訊保留。
獨立出招角形金褐壓力弧＋碎岩真實命中風格；body effects-OFF可辨，特效出招與命中分開明顯，未來Basic<Heavy<Special<Awakening逐級增強。正常速度、手機尺度實感仍由玩家審核。
這是示意預覽，不是真實碰撞／HP／遊戲錄影。F1/F2/F3/F4=160/80/160/160ms、preview contact240ms後，不是授權 real timing；現行Basic windup0ms、單敵係數1.00、range1.4、無位移、attackSpeed0.85保護。不可直接套P1 windup或假延遲HP。
沒有 GIF/VFX PASS、runtime integration、ENGINEERING PASS、Build/deploy/手機 PASS。若玩家明確接受，記錄精確 statement/hash/scope，再做最小 runtime preflight與另需的時序契約決策；先前圖與F3不重開審核。
保留16MiB cache/scene、reserve、shared data-driven架構。Chat先完成素材／靜態工作，Work只負責核准後不可替代工程；[skip ci] checkpoint同步規則進度。
禁止 merge main、新增取代分支、TD、Heavy/P3或提前部署。現在停在 GIF 玩家審核。
```
