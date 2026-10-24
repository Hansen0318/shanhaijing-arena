## Current checkpoint — remaining poses generated, VFX/GIF ACTIVE

Originals/prompts/source QA in `docs/art/candidates/chiru/special/composite-review-v1/`; F2-attempt1 retained but excluded. F3 v3 remains immutable and approved. Continue separate caster/recipient VFX, landmark normalization and requested single-skill GIFs. No runtime/deploy. Lower original launch instructions remain context; do not regenerate saved poses.

# P3 Special F3 approved — remaining poses / VFX / GIF next

```text
【山海經聯盟｜P3 赤鱬 Special「回瀾」F3已核准，接續動作／VFX／GIF】

[角色任務]
從GitHub最新權威狀態恢復，直接製作回瀾其餘動作、獨立VFX與GIF，不重問是否開始。
所有後續交接指令維持單一、自足、可一鍵複製code block。

[背景資訊]
Repository：Hansen0318/shanhaijing-arena
唯一分支：feat/m0-combat-core-20260927
PR #1保持open／unmerged，禁止merge main。
F3呈交checkpoint：777eeda1ea66f06ef9fde26abd8ef3f232b86082，僅供定位；必須先fetch最新remote，不得用舊SHA覆蓋。
玩家已明確核准Special F3 v3；核准收據：
docs/art/approved/chiru/special/f3-v3/acceptance.json
核准圖：docs/art/candidates/chiru/special/f3-v3/special-f3.png
SHA256：1ca80dc4237cb43c810d465cc6be9f67df1d12f293eab8a359cdb0d09c273ac8
同目錄originals/special-f3.png是原始生成圖，含透明padding的候選與原圖關係見manifest；全部保留。
P1/P2 COMPLETE；P3 Basic、Heavy及清晰版均PLAYER VERIFIED；P3整角尚未完成。

[先讀]
AGENTS.md；WORK_PROGRESS.md與docs/STATE.md最新段落。
docs/DEVELOPMENT_PLAYBOOK.md；docs/PROJECT_BOUNDARIES.md。
docs/handoffs/P3_CHIRU_SPECIAL_NEXT_WORK.md。
docs/decisions/2026-10-23-restore-sequential-skill-workflow.md。
docs/CHARACTER_ACTION_ART_WORKFLOW.md；docs/M5C_ART_ANIMATION_VFX.md。
docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md。
docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json。
docs/verification/P3_SPECIAL_PREFLIGHT/WORK_LOG.md。
Special f3-v3的acceptance.json、REVIEW.md、manifest.json、prompt.txt與prepare_qa.py。
實際檢視核准Idle/identity、Basic/Heavy與本招F3；既有核對/驗證來源未變則沿用，不重做前檢。

[具體指令]
1. F3 Gate已CLOSED：不得重畫F3或重問核准。manifest/REVIEW舊PENDING是呈交歷史，以最新收據為準；v2/舊batch保留且不採用。
2. 沿核准「單臂高托、另一臂低展、S形身體與尾鰭內捲」製作F1/F2/F4。必須呈現內收→大幅向上托舉→收勢，不回到Basic水平前射或Heavy雙手推環的相似蓄力。
3. 另製兩類獨立VFX：caster內收抬升水環；實際受益者下緣泉環／泉花。施法與受益效果都要清楚且有明顯場面，Special相對Heavy更具視覺存在感；治療不可套傷害爆浪。禁止把完整VFX烘入角色本體。
4. 保留原圖/prompts/manifest/hash，使用固定RGBA安全cell、共同尺度/anchor/懸浮下緣；F3本體像素不重繪。參考既有.13 review尺度、chestX158/hoverY203與量測地標，正式正規化仍以本體比例/地標判斷，不按整張畫布或最高水環改變角色大小。核對配件側別、完整邊界、明暗底、mirror與Idle返回。
5. 製作normal/slow/noFX/左右mirror/Idle-return/reduced預覽，以及Heavy同角色等尺度對照；正治療與滿血零治療分開展示。只跑本招新美術必要解碼/透明/尺度/幀時序/hash QA，不重跑產品suite/Build/Browser/Pages。GIF是美術模擬，不可宣稱真Runtime事件已通過。
6. 保存WORK_PROGRESS/STATE/本招WORK_LOG/handoff與原圖/重建腳本，使用[skip ci] commit並push原分支。呈交單招GIF後停待玩家明確核准；此Work不整合Runtime、不部署、不開始下一招。

[核准治療契約，保留數值不重審]
F1/F2/F3/F4＝200/120/200/240ms；320ms重新選範圍20內、含自身的存活隊友，最低HP比例優先，同值穩定instanceId。
按受益者當前maxHp恢復25/30/35/40%（T0–T3），封頂缺血；CD7/6.44/5.88/5.04秒。既有低血量+10%、後排+5%加算上限15%，不自行更動。AI門檻65%。
僅真正amount>0在受益者腳下/懸浮下緣呈現治療泉花；滿血手動可耗CD，但無假受益者治療。caster可有施法嘗試水環。Runtime仍為舊instant/基準maxHp×caster healing scale，後續Runtime Gate才改，不冒稱已實作。

[約束條件]
Basic→Heavy→Special→Awakening→Passive；每招F3核准→其餘動作/獨立VFX→GIF核准→Runtime/必要真驗證→正常Pages→玩家核准→hash收據/checkpoint→下一招。舊整包流程由逐招decision取代。
全角色無FX可辨動作；同手機等尺度Basic＜Heavy＜Special＜Awakening場面逐級明顯。不得只換特效/顏色；不得靠放大角色、修改判定或額外半透明犧牲辨識。
原生單人，不委派、不新branch/worktree、不動TD、不merge main。保護全部approved masters/收據/P1/P2/Basic/Heavy、右向canonical/左向mirror、尺度/anchor/懸浮下緣。
普通Hit永久取消；無固定16MiB總容量門檻，逐檔安全/required就緒/所有權/回收/destroy保持。Collection只寫玩法效果。
```
