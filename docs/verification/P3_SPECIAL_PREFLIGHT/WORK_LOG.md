# Special 回瀾 first gate

2026-10-24: Heavy clarity PLAYER APPROVED. Special design already approved in docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md, receipt docs/verification/P3_CHARACTER_PREFLIGHT/spec-acceptance.json. Batch workflow superseded by sequential decision; do not reapprove existing numbers/spec.

First decode at this gate (Pillow Image.load, full decode):
- docs/art/candidates/chiru/whole-character/f3-batch-v1/special-f3.png: FAIL broken PNG file (invalid chunk).
- docs/art/candidates/chiru/whole-character/f3-batch-v1/originals/special-f3.png: FAIL broken data stream.
Preserve both unchanged. New Work rebuilds one Special F3 candidate from approved identity/Idle, original prompt and current Special contract; no regeneration of approved masters. Show candidate then stop for player F3 approval. No other poses/VFX/GIF/runtime/deploy in this gate.

Approved contract reference: heal lowest HP-ratio alive ally including self, legal range20, stable instanceId tie; reselect legal recipient at320ms. Amount recipient current maxHp×25/30/35/40% by Tier, missingHP capped, existing condition modifiers additive max15%; CD7/6.44/5.88/5.04s. AI threshold65%, full-health manual may spend CD but no positive-heal target VFX. F1/F2/F3/F4=200/120/200/240ms. Caster water ring inward then lifted, recipient spring ring at actual ground/hover edge, only positive actual heal shows recipient flower. Treat as support healing, not target damage explosion. These are design requirements, not claims implemented now. Re-read spec/code before planning.

## 2026-10-24 — Special 回瀾 F3 v2 已保存；唯一下一Gate＝玩家F3審核

已從最新remote `7c72f4c73f47df866b562c9167e7f110b22360e1` 恢復，同分支 feat/m0-combat-core-20260927、PR#1 open/unmerged。P1/P2 COMPLETE，Basic/Heavy及Heavy清晰版核准保持。完成本招必要spec/真Runtime差異與核准Idle/identity/Basic/Heavy實際影像核對；原始Special prompt含undefined前綴，本次補齊identity-preserve前文，保留舊prompt/損壞PNG/manifest未改、不反覆解碼。

使用built-in imagegen重建單張Special F3：直立懸浮、前肘深彎掌心向上托起畫面右側青色珠環，另一手收胸前；可見側耳飾/右canonical/原配色與懸浮形態保持，與Basic水平前射及Heavy雙手推環不同。新候選與原圖/prompt/manifest/hash/可重建QA：`docs/art/candidates/chiru/special/f3-v2/REVIEW.md`。原圖SHA256 ef464c46993491ebd913e65a90e4f7253c0f5dedd1912e758191f6acc64053b5；透明padding候選SHA256 f301c9a1e8ed67f6e3b481063d9f6841e826f608f4f523fc3d9d243bd8277290。

嚴格完整PNG解碼/RGBA/alpha/像素反貼/雙mirror/四reference hash通過；原圖淡alpha至左界，候選僅四邊128px透明padding保留全像素。深淺底、.13等尺度/chestX158/hoverY203及390px靜態48px主體高度已作者自審；不是動畫/Runtime/手機驗證。真Runtime仍為舊instant治療/基準maxHP與healing scale；核准320ms與新Tier百分比尚未實作，本次只記差異。

**唯一下一步：呈交Special F3 v2後停待玩家明確核准或修正。** 不生成其餘姿勢/VFX/GIF、不整合Runtime/部署、不存未獲核准的acceptance、不進Awakening/Passive。保護所有approved masters/收據/P1/P2/Basic/Heavy/尺度/anchor/懸浮下緣/左右鏡像。原生單人、不委派/新branch/worktree/TD/main merge；本次美術/文件checkpoint [skip ci]，產品未變，不重跑suite/Build/Browser/Pages。新Work先讀Special handoff及REVIEW，禁止重生已保存候選。下方舊「重建Special」待辦由本節覆蓋。

### Static source delta (read-only)
- abilities.js: P3.special windup0, lowest_hp_ally range20, fraction.25, CD7, AI threshold.65.
- effectTargeting.js: livingUnique/lowestHpAlly already stable instanceId; target selected before existing instant effect.
- battleSession.js applyAbilityEffects: recipient definition stats.maxHp × fraction × caster projection healing × existing modifier; no new320ms utility resolution at this gate.
- catalog.js: Chiru actionDescriptors basic/heavy only.
- Required later opt-in shared runtime work (not this gate): 320ms legal recipient reselect, current-maxHP Tier fractions, actual positive-heal VFX and cancellation/lifecycle. Approved spec not reopened.

Candidate remains PLAYER REVIEW PENDING. No player acceptance claimed. Verification Level A only.

## 2026-10-24 — Special F3 v2動作差異不足，玩家要求修正；v3候選待審

玩家指出Special動作與先前技能太像，並要求「確認硬規則有寫技能的動作要夠差異化和明顯大場面，繼續修改f3」。此為修改授權，不是v2或未看過v3的美術核准。已讀最新remote b240818132f5f1f39ed360e5b6dc0a98353f3a87，確認既有硬規則：無FX可辨四招，Basic<Heavy<Special<Awakening的同尺度視覺場面逐級加強；在AGENTS/動作workflow/M5C加上本次重申與修正指向，不變更玩法/數值。

built-in imagegen新候選 docs/art/candidates/chiru/special/f3-v3/REVIEW.md：單臂大幅高托至額頭以上、另一臂向下後展，S形軀幹/內捲尾鰭；保留右向、右側青珠環與可見側耳飾，與Basic水平前射、Heavy雙手推環及舊v2肩高托珠區分。原圖SHA256 47d456cef60db7515017734e7cacc3ba8ec61b65efcf5f1015c396c78bc60f41；padding候選SHA256 1ca80dc4237cb43c810d465cc6be9f67df1d12f293eab8a359cdb0d09c273ac8。原圖/prompt/manifest/可重建QA/hash齊備；舊v2/舊batch/approved masters與收據完全保留。

完整PNG verify/load、RGBA/透明安全邊界、原像素反貼/雙鏡像及五input reference hash通過；深淺底、與Idle/Basic/Heavy/v2的.13共同審核尺度、chestX158/hoverY203與390px靜態48px高度作者自審已完成。角色形象/姿勢仍待玩家判斷；這些不是Runtime或手機實測，也不等同完整場面已完成。完整治療施法/真受益者泉花大場面留在F3核准後的獨立FX/GIF Gate；不以額外半透明/放大角色代替。

唯一下一Gate：呈交Special F3 v3後停待玩家明確核准或修正；未存Special acceptance、不做其他姿勢/VFX/GIF/Runtime/Pages。P1/P2/Basic/Heavy保持已核准；全局逐招、同分支/PR#1open/unmerged、單人不委派/新branch/worktree/TD/main merge保持。僅美術/文件[skip ci]，產品未變，不重跑suite/Build/Browser/Pages。下方v2待審由本節覆蓋，v2不是approved。


## 2026-10-24 — 再確認：動作差異與大場面必須同時成立

玩家「special的嗎？動作和之前技能差別不大，是蓄力一樣，打出技能不同？」及「確認硬規則有寫技能的動作要夠差異化和明顯大場面，繼續修改f3」。既有全局硬規則明文要求四招在無獨立FX時也能立即辨認本體動作、輪廓、施力方向與節奏；不能共用相似持珠蓄力姿勢，再只換出手效果。Basic<Heavy<Special<Awakening同手機等尺度逐級擴大視覺場面，施法/真命中或真受益者效果須分別清楚、強烈且具招式特徵；治療/防禦用正確非傷害語言，不造假爆浪/受益事件、不放大角色/數值/判定。具體原條款：CHARACTER_ACTION_ART_WORKFLOW.md的Mandatory within-character attack motion differentiation與Mandatory action-power visual escalation；M5C_ART_ANIMATION_VFX.md的Large, unmistakable cast and impact VFX。規則已存在，本節是玩家再次強調與執行修正，非新玩法。

Special v2未獲美術核准、依玩家意見修正，原檔/manifest不改。v3單臂由下向上高托至額頭上方，另一臂向下後展至腹/髖側，形成上下對角輪廓；本體S曲線與尾鰭內捲，與Basic水平前射、Heavy雙手推環分開，亦保留Awakening雙臂高V的差異。v3仍是CANDIDATE，先審F3；完整治療泉花/施法大場面與同尺度FX比較是F3核准後的獨立VFX/GIF義務，不能用本張角色圖冒稱已完成。入口 docs/art/candidates/chiru/special/f3-v3/REVIEW.md；玩家核准前不做其餘姿勢/FX/GIF/Runtime/部署。

## 2026-10-24 — Special 回瀾 F3 v3 PLAYER APPROVED；新Work直接接其餘動作／獨立VFX／GIF

玩家原文：「我確認ok，紀錄，我會開新的work無縫接軌接續，確認紀錄規則流程進度後給我prompts給新的work接續後，直接往下進行」。明確核准已呈交checkpoint777eeda1ea66f06ef9fde26abd8ef3f232b86082的Special F3 v3高托/低展姿勢。精確收據 `docs/art/approved/chiru/special/f3-v3/acceptance.json`；候選SHA256 1ca80dc4237cb43c810d465cc6be9f67df1d12f293eab8a359cdb0d09c273ac8，imagegen原圖SHA256 47d456cef60db7515017734e7cacc3ba8ec61b65efcf5f1015c396c78bc60f41。F3 Gate CLOSED，保護原圖/透明padding圖/manifest/QA，不重畫、不重問核准；原manifest/REVIEW的PENDING是呈交歷史，由此收據覆蓋。v2與舊batch仍不採用、原封保留。

唯一下一工作：新Work沿已核准F3製作回瀾F1/F2/F4與兩類獨立VFX（caster內收抬升水環、真受益者腳下/懸浮下緣泉環/泉花），安全同尺度/共同anchor/懸浮下緣正規化，完成normal/slow/noFX/左右mirror/Idle-return/reduced及Heavy等尺度對照GIF。F1/F2/F3/F4=200/120/200/240ms，320ms是核准治療真結算設計；GIF以明示的正治療/零治療情境示範，真amount>0才有recipient泉花，不能冒稱已在Runtime實作。呈交單招GIF後停待玩家核准；本次F3核准不含未見姿勢/VFX/GIF/Runtime/部署，不開始Awakening/Passive。

既有無FX可辨動作及Basic<Heavy<Special<Awakening大場面硬規則維持；施法與受益者效果分別清楚，治療使用非傷害視覺語言，不能靠放大角色/假爆破/額外半透明。核准Special數值/Tier/320ms重選最低合法受益者契約不重審；Runtime差異已記錄於Special WORK_LOG，不重做前檢。

P1/P2 COMPLETE、Basic/Heavy及清晰版PLAYER VERIFIED保持，P3整角未完成。單人、原分支feat/m0-combat-core-20260927、PR#1open/unmerged；不委派/新branch/worktree/TD/main merge。全部approved masters/收據/scale/anchor/懸浮下緣/右canonical左mirror保持，普通Hit取消、無固定16MiB總門檻/逐檔安全/required就緒/所有權回收destroy保持，Collection只寫玩法。本次純收據/文件[skip ci]，未改產品，不重跑suite/Build/Browser/Pages。新Work入口 `docs/handoffs/P3_CHIRU_SPECIAL_NEXT_WORK.md`，直接開始下一未完Gate。下方F3待審與禁止其餘姿勢為歷史，由本節覆蓋。

## 2026-10-24 — Special 其餘動作原圖 checkpoint；獨立VFX與GIF ACTIVE

恢復remote8776d44，已核對F3 v3收據/候選與原圖hash。built-in imagegen製作F1低位單手內收、F2單臂抬升、F4單臂下收；原圖/prompts/嚴格PNG完整decode與alpha/hash保存 docs/art/candidates/chiru/special/composite-review-v1/。F2初版過於接近F3高托，保留F2-attempt1.png且不採用，修正版F2.png作下一步正規化來源。核准F3完全未改；新圖尚未玩家核准。下一步：製作caster水環與真recipient泉花獨立VFX，再按頭身地標/共同anchor/懸浮下緣做安全cell及全套單招GIF。原生單人、原分支PR#1open/unmerged；無產品來源修改、不跑suite/Build/Browser/Pages、不Runtime/部署/下一招。此checkpoint只確認原圖已保存，不冒稱GIF/最終尺度QA完成。

