# P2 Basic current review gate / zero-context handoff

```text
【山海經聯盟 — P2 猼訑 Basic F3 接手】
所有後續 Chat／Work／Codex 交接必須是一個完整、自足、可一鍵複製 code block。
GitHub 唯一權威；先 fetch，核對 remote HEAD／分支／PR／乾淨狀態，讀最新文件頂部。
Repository Hansen0318/shanhaijing-arena；分支 feat/m0-combat-core-20260927；PR #1 open/unmerged。
本次 recovery baseline 39f7d2b50202c93798ef7d3cf38a57ee8388fcaa；最新 checkpoint 以包含此檔的 feature Git history/remote ref 為準，禁止把 baseline 當永久 HEAD。
必讀 AGENTS.md、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、WORK_PROGRESS、STATE、DEVELOPMENT_ROADMAP、DEVELOPMENT_ACCELERATION、M5C_ART_ANIMATION_VFX、CHARACTER_ACTION_ART_WORKFLOW；P2 另讀 docs/M5C_P2_BOTUO_BASIC_ACTION.md 與其列出的基礎驗收證據。
P1 COMPLETE BY EXISTING ACCEPTANCE EVIDENCE，禁止重畫／重測／重部署／重驗收。一般 Hit Reaction 永久取消，不能中斷正常攻擊施法移動；保留真實傷害、數字、技能特效、合法控制及 KO。
P2 Concept／肖像／全身／靜態 Idle／Move／KO 已核准並完成既有驗收，原圖與 runtime packing 全保護。Idle breathing 已撤回。實際形象白羊面、金環棕捲角、深棕毛領、金獸面護臂、紅腰帶，不能套用舊未核准灰色護盾設計。
第一未完成 Gate：Basic「角擊」單張 F3 玩家審核。
候選 docs/art/candidates/botuo/basic/key-pose-v1/F3-contact-master.png；
SHA256 19a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36。
同目錄保存 generation-prompt.txt、inspect_candidate.py、verification.json、QA-light-dark.png。
此圖 ART CANDIDATE，非 PLAYER ART APPROVED；不要自建 acceptance receipt 或產生後續姿勢。
先提供這張既有候選，審核羊面／角／金護臂／低重心前頂／比例；等待玩家明確核准或修正。不可直接開始 Heavy。
Basic 現行 T0：近距單敵、range0/0.7/1.4、係數1.00、單次即時命中、windup0、無位移、attackSpeed0.85。禁止套 P1 180ms 前搖；任何時序變更另列明確契約核准，不假延遲 HP。高 Tier 的既有效果／控制與 scaling 保留。
已做 PNG decode／alpha／邊界／來源雜湊與光暗 QA；低 alpha1–8 雜訊保留，未宣稱清除；144px QA 不是遊戲實際尺寸或手機驗收。沒有新增 runtime／build／deploy／玩家 PASS。
玩家接受 F3 後，Chat 才逐張製作 F1/F2/F4，再獨立 VFX、正常／慢速／角色-only／鏡射／Idle-return GIF 審核；核准後 Work 才做最小工程整合、必要測試、Build/Pages/Public Fingerprint、玩家手機驗收。
最新已驗收部署來源沿用8e2f5e049095017d7350b1d0d61e96527ab21e44，不重部署。16MiB cache/scene 及 optional reserve 不提高。未核准候選不可進 public/src/manifest。
每個 coherent slice 使用 [skip ci] commit+push 保存候選與文件；同步 WORK_PROGRESS/STATE/roadmap/workflow。記錄實際狀態，不混同設計、美術、工程、部署及玩家驗收。
禁止 merge main、建立取代分支、引入 TD、開始 P3、重做已核准素材；本次停在玩家 F3 審核 Gate。
```
