## 2026-10-23 — Basic Runtime本機1096/1096／Build PASS；正常CI真Browser與發布ACTIVE

水矢已整合資料驅動180ms固定瞄準有限線／半寬.12、四姿勢與獨立凝水/水矢/真命中水花；共用程式不判角色ID。來源保真封裝、25個新機制/呈現案＋新發布guard負向測試，完整1096/1096、Build、95檔素材guard PASS。舊容量/瞬發fixture已按新來源更新；舊核准receipt/guard與所有masters不改。新ledger/packing/local-validation在docs/verification/P3_BASIC_RUNTIME/。

本機Chromium下載得到Site Unavailable HTML，未冒稱真Browser通過。正常M0 CI現在執行完整測試→Build→Chiru native32/built4真WebGL→新來源綁定guard→正常Pages；任一失敗阻止發布。P1/P2既有verification workflows保留。下一步核對CI及必要修正、下載CI證據與公開版本逐檔比較；玩家實際Basic驗收仍PENDING，不能Heavy。原分支PR#1open/unmerged、不新分支/TD、普通Hit取消、無16MiB上限及既有美術尺度/清理保護保持。

## 2026-10-23 — Basic整合GIF PLAYER APPROVED；Runtime ACTIVE

玩家「我確認 紀錄 繼續」核准2f37959之水矢動作/VFX/GIF。精確收據docs/art/approved/chiru/basic/composite-review-v1/acceptance.json綁定完整素材與預覽hash；不重畫/重審。執行ledger docs/verification/P3_BASIC_RUNTIME/WORK_LOG.md。下一步只做Basic共用資料驅動180ms有限線命中與來源保真Runtime包/實際驗證/正常Pages，未見Runtime不可假稱已驗收。Basic遊戲玩家核准前不進Heavy。

## 2026-10-23 — 水矢動作＋獨立VFX GIF完成；玩家單招GIF審核PENDING

F3 v2玩家核准已同步遠端4f12b837a58ff52edf284c4e4c3ed772c3abb972，讀回原圖完整解碼且SHA256與503eec8…完全一致，原收據保存。新增F1/F2/F4和凝水/短水矢/單點水花三個獨立來源，完整原檔與prompts、可重建script、正常/三倍慢速/無FX/落空/reduced五個GIF及明暗底QA在docs/art/candidates/chiru/basic/composite-review-v1/。

正常動作120/60/100/120ms=400ms，180ms F3同步短水矢與命中水花；落空無target水花，左向為整體mirror。原圖未裁切/刪像素；四張來源相同.13縮放，地標與safe-cell記錄於manifest。腳本已驗證完整解碼、量化後每幀像素/時間往返、透明邊界與F3/Idle hash；初次script ROOT多一層已修正並完整重跑PASS。作者檢視明暗底與接觸圖：外觀/配件側別保持、角色不因特效放大；新VFX有淡青光暈，樣式待玩家審核，不宣稱新圖已PLAYER APPROVED。

唯一下一Gate：呈交Basic整合GIF供玩家審核；核准後保存新姿勢/FX/GIF精確hash收據，才進Basic Runtime、必要來源驗證與正常Pages發布。不做Heavy、不部署。這是美術重建，非遊戲實錄/HP命中或Runtime手機/anchor證明，舊測試不替代新來源。全部approved/P1/P2/src/public保持。Git CLI無寫入憑證，使用GitHub連接器分段讀取後建立blob並逐一核對Git SHA，避免大輸出截斷導致二進位受損；遠端checkpoint以最新branch為準。

## 2026-10-23 — Basic 水矢 F3 v2 玩家核准；其餘姿勢與單招GIF ACTIVE

玩家原文「確認，紀錄，繼續」核准上次展示F3 v2；精確收據 docs/art/approved/chiru/basic/f3-v2/acceptance.json，source SHA256 503eec8bb7f959aa26b07a8076eeb8f686f4d4698bead83b28ed8392d109e4d5。F3 Gate CLOSED，不重問或重生此圖。接續F1/F2/F4與獨立起手凝水／短水矢／命中水花，再400ms動作GIF（120/60/100/120，180ms F3生效）供玩家審核；新姿勢/GIF/Runtime尚未核准。Basic未驗收不得Heavy。Git CLI push缺少憑證，改用GitHub連接器保存，待遠端讀回驗證才宣稱已同步。

## 2026-10-23 — Basic 水矢 F3 v2：受損候選重建，單招玩家審核待回覆

恢復982e21ab59bd1701c5796d55d9bda7e477f736a2，PR#1 open/unmerged。舊batch basic-f3.png及originals/basic-f3.png皆完整解碼失敗，Git object與checkout一致，且不符舊manifest hash；不能以舊自審當成合格素材。保留全部舊檔。使用核准Idle/identity經imagegen重建單招候選 docs/art/candidates/chiru/basic/f3-v2/basic-f3.png，manifest記錄錯誤、hash、RGBA/完整解碼與視覺自審。新圖可完整解碼，右向、畫面右側水環、單手前推；這是作者自審，非玩家核准。尚未runtime尺度/anchor正規化。

唯一下一Gate：玩家審核Basic F3 v2；核准才存精確收據並進Basic其餘姿勢/獨立VFX/GIF。不開始Heavy或其他技能，不改approved master/receipt/src/public，不部署。spec/proposal/baseline hash仍一致；舊流程decision被525d46e加歷史標記，原呈交commit的decision hash與規格收據一致，原收據保留不改。沿用最新逐招決策。

# 最新Checkpoint：五項候選已完成，玩家美術審核待回覆

## 2026-10-23 — 最新玩家指令：撤銷整包開發，恢復逐招完整流程（最高優先）

**權威最新決策：** `docs/decisions/2026-10-23-restore-sequential-skill-workflow.md`。玩家明確撤銷2026-10-23舊整角「同時四招F3＋被動樣式／整包GIF／整包Runtime／一次發布」要求，因Work容量與對話長度限制，恢復 **Basic → Heavy → Special → Awakening → Passive**；每一招各自完成F3審核→其他動作/獨立VFX→GIF審核→Runtime/真驗證→正常Pages部署→玩家實機核准→保存收據與GitHub checkpoint，**才繼續下一招**。可跨多個短Work，不能等五招才發布。過去同日整包計畫、handoff、decision為歷史，與本新決策衝突處以本節和新decision為準。

**現在的唯一未完成Gate：P3 赤鱬 Basic「水矢」現有F3候選的單招玩家審核。** GitHub `docs/art/candidates/chiru/whole-character/f3-batch-v1/basic-f3.png` 已存在（連同manifest/original/prompts/review），候選尚未PLAYER APPROVED；先讀來源並對比核准identity/Idle後**只展示水矢F3**，不得再要求四招與被動同批審核。Heavy/回瀾/潤澤/游息四項已生成候選保持不動，待該招輪到時再個別審核，不重生。P3完整spec數值/Tier/時序/Collection已由玩家核准，其原收據保持有效，不因流程改動要求重審；尚無P3 GIF/Runtime/新部署。P1/P2 COMPLETE／PLAYER VERIFIED，不重做。

同一分支 `feat/m0-combat-core-20260927`、PR#1 open/unmerged、不合main、不新分支/TD、GitHub latest HEAD優先；保護所有approved masters/收據/GIF/scale/anchor/ground/canonical右向、左向mirror、普通Hit永久取消，保持全局被動真效果/Tier/VFX/正確清理、Collection純玩法、P1/P2數值/MAX、無固定16MiB容量限額與逐檔安全/required/回收規則。每招結束寫入STATE/WORK_PROGRESS/ledger/handoff、同分支commit/push；純文件[skip ci]；交接指令一個完整自足可複製code block。此次僅改規則與進度，**沒有**新增核准、產品程式/素材變更、Runtime測試或Pages部署。


候選入口 docs/art/candidates/chiru/whole-character/f3-batch-v1/review.html；manifest/prompts/REVIEW及originals均已保存。不得重生現有候選。先確認最新玩家對五項候選的回覆；未核准停在集中審核，核准後記錄精確hash收據再Task2。下方歷史「未有候選」已由此狀態取代。

# P3 赤鱬 — 規格已核准／整包F3與被動樣式ACTIVE

```text
接續Hansen0318/shanhaijing-arena。GitHub唯一權威；先fetch最新feat/m0-combat-core-20260927，核對完整HEAD/tree/branch/PR#1open-unmerged/working tree/最近commits。保留無關untracked。原生單人，不委派、不main merge/另開分支/TD/角色ID特例。所有後續Chat/Work/Codex交接必須一個完整、自足、可一鍵複製code block。
先讀AGENTS/WORK_PROGRESS/docs/STATE/DEVELOPMENT_PLAYBOOK/PROJECT_BOUNDARIES/DEVELOPMENT_ROADMAP/CHARACTER_ACTION_ART_WORKFLOW，最新docs/decisions/2026-10-23-whole-character-batch-workflow.md、docs/verification/CHARACTER_BATCH_WORKFLOW/acceptance.json、docs/templates/CHARACTER_SPEC_TEMPLATE.md。玩家已核准「整角色規格一次審→整包四招F3/被動樣式→整包GIF→整包實作驗證→一次正常部署/整角驗收」適用P3及所有未來角色，並要求紀錄後繼續。流程Gate CLOSED，不重問是否P3/執行方式或退回逐招發布。
P1/P2 COMPLETE／PLAYER VERIFIED；docs/verification/P1_P2_PASSIVE_VFX_CLOSURE.json與P1/P2所有收據保留，新增疾行風痕/Collection亦已玩家確認。release32424075b5c91844187fc80a566a9140c7e955d6/treeab0a6733ff312d48fef3979e1e0697aaaf74a6de、1070/1070/Build/guard585、正常Pages39902216798與CI/local/public149PASS，來源未變沿用不重跑/重發/重下載。
已完成P3全角色前檢32個既有真headless Session（四Tier×instant/tactical×四招），結果docs/verification/P3_CHARACTER_PREFLIGHT/{REPORT.md,baseline.json,probe.mjs}。已檢視核准chiru identity/Idle、原Move/KO/尺度沿用。現有P3.passive=false；只有同名T2後排heal modifier，不等於獨立被動。來源guard585仍PASS，產品src/public/scripts/tests/依賴/workflow未變。
完整提案docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md與docs/verification/P3_CHARACTER_PREFLIGHT/proposal.json，DESIGN PROPOSAL/PLAYER REVIEW PENDING。涵蓋屬性/四招/獨立被動/四Tier/真時序/CD/對象/VFX/素材/清理/AI/Collection。明示提案變更：回瀾25/30/35/40%、潤澤16/20/24/30%按目標當前maxHp、不另乘舊healing scale；游息後排距敵≥2、4.2內HP≤60%最低隊員（含自己）即時heal8/12/16/20%、CD8；T2同名modifier改顯示清流但ID/加成不變；水矢180ms、回瀾320ms、潤澤600ms真生效；Heavy兩模式350/337.75/325.5/305.9ms蓄勢+350ms延遲；T3保護改600ms結算才10.8%/2.5秒。這些是尚未核准契約，不是假稱保留現況。素材規劃16本體pose+12FX組，不是全局容量/required數量門檻。
玩家最新已回覆整角規格「紀錄進度流程規則就繼續」。新收據docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json綁定原spec/proposal/baseline/流程4hash，設計Gate CLOSED；原提案舊PENDING字樣保留但由新收據取代，不重問規格或原生執行。原生單人計畫docs/superpowers/plans/2026-10-23-chiru-whole-character.md，ledger docs/verification/P3_CHARACTER_PREFLIGHT/WORK_LOG.md。現在第一未完成Task1=四招各自透明右向本體F3候選＋被動雙魚回流樣式，使用核准identity/Idle作reference、獨立source與原圖不可改，集中一包展示待審。先看最新ledger/候選manifest，不重做已完成生成/檢查。未展示素材不能冒稱PLAYER APPROVED，不先產其餘12姿勢/整包GIF或Runtime/Pages。素材Gate通過後按整包姿勢FX/GIF→共用整合/必要驗證→一次正常發布/整角驗收，內部Basic→Heavy→Special→Awakening→Passive，不逐招部署，不新增plan/execution確認。
被動與Collection須在同一實作版本完成；提案審閱期間產品保持P3尚未開放，不先寫成已生效。所有現有/未來被動須真效果、獨立Tier、相符真事件/recipient VFX、reduced-motion提示與KO/end/Pause/Restart/destroy清理，不用同名Tier/基礎HP DEF/文案冒充；不在戰場放被動文字/HUD數字/角色間連線或放大角色。玩家介面只寫玩法/必要數字/世界觀，工程規則放docs/測試。
保護全部核准masters/收據/GIF/scale/anchor/ground/canonical右向/左向mirror、P1疾行35/50/65/80%、3秒/CD6秒與95%顯式額度；普通movement/outgoing15%不動，不套移速額度到減傷或明確heal基礎比例。P2厚甲/守群/鎮岳真傷害/真狀態/instant/tactical/MAX與各自到期不變。普通Hit永久取消。素材無固定16MiB總量/required數量/reserve拒絕門檻，逐檔安全/兩下載/完整required/所有權/回收/真失敗/destroy保持。新類型須擴充共用schema/條件/效果、匿名角色可用，不能加P3分支。每切片更新進度規則報告handoff並同分支commit/push，純文件[skip ci]。
```
