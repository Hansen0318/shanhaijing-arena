# Heavy runtime preparation v1 — not integrated

## Current result

Player accepted the recovered Heavy four-pose/effects-off+on/right+left/Idle-return GIF and two VFX masters at2026-10-16T20:33:23+08:00. Exact acceptance remains in ../recovered-review-v1/acceptance.json. No regeneration, source replacement or repeat visual approval gate.

Reproducible preparation: `python scripts/prepareLushuHeavyAssets.py`. Read-only runtime evidence: `node scripts/inspectLushuHeavyPreflight.mjs`. Run from repo root. Versions, source and output SHA256, geometry and limits are recorded in runtime-prep-manifest.json/SHA256SUMS.json. Both complete runs were byte-identical in the recorded environment. No claim to recover the original historical GIF assembly script.

Four independent256-square transparent cells and1024x256 safe strip;512x128 proposed game strip (four128-square cells); independent128-square wind and144x96 impact derivatives. Full source canvases use uniform0.145scale; visible foot baseline224/112. Each review cell has at least20px nonzero-alpha padding and runtime cells at least5px. Independent sources, exact atlas cell copies, PNG round-trip, source hashes, twice-mirror exactness checked. Alpha compositing was initially found to normalize hidden RGB under alpha0; atlas now uses exact pixel copy, with no visible-source modification. Four original pose masters, identity/Idle/Basic, two VFX masters and approved GIF remain unchanged.

F3 accepted master is RGB JPEG with white background. Only alpha is derived:4-connected exterior neutral light background plus four explicitly inspected red-tail/scarf negative spaces. Source RGB is preserved at every pixel; no global white key deleting white face/fur/blade. Source/background criteria and manual seed coordinates are recorded. F1/F2/F4 retain all source alpha, including faint edge pixels, then receive padding. Light/dark alpha proof manually inspected at full and small view: recognizable face/horns/weapon/tail/feet, no neighboring frame pixels or visible body clipping. This does not establish exact historical PNG-to-GIF provenance or real Arena anchoring/display size.

## Confirmed runtime gaps

1. Current P1 Heavy has windupMs0 and no telegraph. Eight read-only real-BattleSession probes (player/AI, tactical on/off, left/right) confirm movement+one hit occur at the same simulation time/call; cooldown immediately3seconds. Cast event has no phase/actionId; current ActionPlayback ignores it. The approved preview contains200ms F1 +80ms F2, so F3 occurs280ms after loading begins. Do not fake synchronization by delaying HP/text alone or silently copy Basic180ms.
2. Actual all-five required texture residency is16,763,144bytes under16,777,216. Proposed Heavy strip+two VFX add382,976decoded bytes; naive pinned total17,146,120 is368,904bytes over the unchanged hard limit. Encoded PNG file size is not decoded residency. Need a shared residency/load-readiness design before integration; never claim a good PNG pack fits the full encounter or raise the budget unilaterally.

## Proposed next design (NOT approved or implemented)

Recommend true280ms Heavy startup, using the reviewed F1200/F280 timing. Shared data-driven start/resolve/cancel lifecycle, no P1/character-ID branching. Real source/target validation and one authoritative move+hit at resolve; F3/contact/HP/damage number use the same outcome. Keep coefficient1.4, range3, engage distance1.6/stopDistance0.65, cooldown3 anchored to original cast start, AI choice, Basic and existing roster assets unchanged. No retarget/extra hit, no invented DoT/AoE. Target out of range/KO, source KO/control, new ability, scene exit and Pause lifecycle require written design/tests. Heavy air-cast semantics and finite loading failure must preserve existing contract. No automatic movement/input lock or invulnerability implied.

Alternative preserving current gameplay timing would begin at F3 on immediate resolution; it would omit the approved F1/F2 anticipation, so cannot claim the full approved sequence is implemented. Full approved buildup and current immediate damage cannot both be retained unchanged. Player must explicitly choose the true280ms timing change before simulation edits.

Residency is a separate shared engineering requirement; design active-action/preload pin ownership and readiness with measured worst-case simultaneous skills, KO/Move/HUD and transitions, including cache and upload reservations, under16MiB. Do not assume evicting a few optional effects solves a near-full all-required set. Do not touch another character's approved images as a shortcut. No integration/build/Pages/main merge in this checkpoint.

Next: player confirms proposed true timing direction, then review shared runtime/residency written design before implementation. All already accepted art/GIF gates remain closed.
