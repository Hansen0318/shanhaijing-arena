# 潤澤 Awakening — F3 已核准，接續動作／獨立VFX／GIF

```text
【山海經聯盟｜P3 赤鱬 Awakening「潤澤」接續動作／VFX／GIF】

[角色任務]
從GitHub最新權威狀態恢復，直接接續潤澤F1／F2／F4、獨立VFX與GIF。玩家已核准F3 v2；不重問是否開始，不重畫、不重審F3，不停在接手報告。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927；PR #1保持open／unmerged，禁止merge main。
F3呈交checkpoint：351cbe303f94a6a6a61611281be0cfdf9a2f2a81，僅供定位；必須先fetch最新remote，讀取其後新增的F3核准收據，不以舊SHA覆蓋最新進度。先恢復可用本機未push成果。
P1／P2 COMPLETE；P3 Basic／Heavy／清晰版／Special已獲遊戲核准，均不重做；P3整角未完成。
潤澤F3精確核准：docs/art/approved/chiru/awakening/f3-v2/acceptance.json。
核准候選：docs/art/candidates/chiru/awakening/f3-v2/awakening-f3.png
SHA256：7f23b33b22196ef59e0e996b4a901db5134280a0731f17f17d0e9ab511d3d340
原圖：同目錄originals/awakening-f3.png
SHA256：a822aa2e918472ade44d1432ff71f1d4d493df22c28a1455fd123ea0d47c561a
原manifest／REVIEW中的PENDING是呈交歷史，由核准收據覆蓋；舊損壞batch原封保留，不反覆解碼、不使用截斷載入。

[具體指令]
1. 核對最新HEAD／分支／PR，先讀AGENTS.md、WORK_PROGRESS.md／docs/STATE.md最新段落、docs/DEVELOPMENT_PLAYBOOK.md、docs/PROJECT_BOUNDARIES.md、docs/handoffs/P3_CHIRU_AWAKENING_NEXT_WORK.md、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md、docs/CHARACTER_ACTION_ART_WORKFLOW.md、docs/M5C_ART_ANIMATION_VFX.md、docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md、docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json、本招F3收據及候選manifest／prompt／prepare_qa.py，並沿用docs/verification/P3_AWAKENING_PREFLIGHT/WORK_LOG.md、runtime-readonly.json。整角數值規格仍有效，舊整包流程已撤銷，不重審原表／重做回瀾共用能力。
2. 實際查看核准identity.png、battleIdle.png及F3；使用內建imagegen，沿雙臂高V／托冠展鰭主動作製作F1／F2／F4，形成可辨的起勢、抬升、展開、回收節奏。保護臉型／物種／配件左右／耳飾／配色／體型，右canonical／左mirror。不得改核准F3；同尺度下無FX也須區別Basic水平前射、Heavy雙手前推及Special單高托／單低展。
3. 獨立製作caster完整水冠扇幕、真正正治療recipient泉花、真T3澤被保護水膜。Basic<Heavy<Special<Awakening場面同尺度遞增，治療／保護清楚且華麗，不靠放大角色、傷害爆炸、連線或額外半透明；水冠不要烘焙進角色本體。
4. 嚴守已核准契約：F1／F2／F3／F4=360／240／300／300ms；normal／tactical於600ms對當時全體存活同隊含自身各治療一次。當前recipient maxHp×16／20／24／30%，缺血封頂、不舊healing scale、不復活／暴擊。CD14／12.88／11.76／10.08秒；T2起距最近敵人2.0–4.2條件治療+5%；T1低血+10%僅回瀾，不套潤澤。T3於600ms對範圍20內存活同隊給10.8%減傷2.5秒，MAX／各自到期保持；AI至少兩位存活隊員HP≤80%才偏好施放。正治療amount>0才泉花；滿血者可只有真保護，不虛構治療花。施法前取消不得提前給治療／保護。此為後續Runtime契約，本次GIF以明示情境示範，不宣稱已在遊戲生效。
5. 保存原圖、完整prompts、來源hash、manifest及可重建script。依頭身解剖地標等比正規化，沿共同320×260／chestX158／hoverY203與F3 .13審核密度；不能按最高水冠／整張canvas fit。嚴格全解碼、RGBA透明安全padding、原像素／縮放反貼、無裁切或鄰幀污染、明暗底、左右配件／mirror、Idle返回核對。全部approved masters與收據bytes保持。
6. 製作本招normal／slow／noFX／左右mirror／Idle-return／reduced、正治療與滿血僅T3保護情境、與Special等尺度FX-on及off比較GIF；記錄真解碼幀時長、至少20ms安全hold及匹配時序，不把編碼總時長當實機播放證明。呈交可正常觀看的GIF與清楚審核入口，停待玩家明確GIF核准。
7. 長步驟前先保存coherent checkpoint；更新WORK_PROGRESS／STATE／本招WORK_LOG／handoff，同分支commit／push，純美術文件[skip ci]。產品未改不重跑已通過suite／Build／Browser／Pages；新素材只做必要QA。具體阻擋時保留成果與證據、寫唯一下一步，不反覆重生素材。

[約束條件]
原生單人，不委派、不新branch／worktree、不動TD、不merge main、不重置玩家存檔。
本次只做到潤澤動作／獨立VFX／GIF審核；F3核准不等於GIF核准。未獲GIF核准不得Runtime／部署，不做Passive，不建立未獲核准acceptance。
後續：GIF核准→Runtime／必要真驗證／正常Pages→玩家遊戲核准→Passive。
保護全部approved masters／收據、P1／P2／Basic／Heavy／Special、尺度／anchor／懸浮下緣／mirror；普通Hit永久取消。無固定16MiB總門檻；逐檔安全／兩下載／required就緒／所有權回收／destroy保持。共用機制資料opt-in，禁止角色ID特例。Collection只寫實際玩法。所有後續交接維持單一、自足、可一鍵複製code block。
```
