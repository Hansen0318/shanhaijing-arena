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
