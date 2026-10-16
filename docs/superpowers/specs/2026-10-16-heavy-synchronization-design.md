# Heavy synchronization and lossless residency design

Player2026-10-16T20:54:52+08:00「你建議同步嗎?如果是的話就繼續」authorizes recommended real280ms startup and continuing native execution in this Work. Exact art/GIF acceptance remains2026-10-16T20:33:23+08:00; do not reopen it. Feature branch/PR1 only; no main merge.

## Combat and events

Extend the existing Basic phased lifecycle into one data-driven pending action map keyed by actor; category stored on record, no character-ID branching. Preserve read-only pendingBasics compatibility and cancelBasicAction for existing callers/tests. Nonzero windup opt-in is valid for basic/heavy with no telegraph; P1.heavy opts into280ms, P1.basic stays180ms, others unchanged. Existing telegraphs cannot combine with a pending windup.

Heavy F1=200ms,F2=80ms; actual target-locked move+hit resolves at280ms, F3=140ms,F4=180ms. ActionPlayback already consumes generic start/resolve/cancel; use it unchanged. One actionId joins simulation start, actual resolve, F3/contact and damage event. No early RNG/damage/movement. Retain coefficient1.4, cooldown3s, engage1.6/stop.65/range3, crit and Tier rules. Cooldown begins at cast start and keeps counting during pending/cancel; no cooldown refund. Basic cadence/start/finish/cancel contract unchanged.

Do not auto-Basic or AI-chain another skill over a pending non-Basic action. Movement/ordinary damage do not root/cancel it. Source KO/control, target KO, battle clear/terminal cancel. Successful different manual skill cancels; failed skill does not. At due recheck locked enemy alive and in original maximum range, do not retarget; if it escaped emit resolve(hitfalse) without contact/RNG/displacement. Existing out-of-range/no-target air-cast consumes cooldown without invented hit, retaining old semantics. No new input lock, immunity, DoT or AoE. Pause freezes simulation time; scene clear/Restart cannot resurrect stale action. Coarse steps resolve once at first simulation time at/after due.

## Assets and budget

Use exact approved Heavy source derivatives, never the GIF for runtime. New512x128 RGBA atlas; independently resized112x112 wind/128x86 impact from approved VFX originals. No Basic pixel/source/descriptor changes. Shared presenter/action descriptor support already accepts category data; attach Heavy via catalog/manifest only.

Current required set16,763,144bytes. Lossless preparation can avoid a new residency subsystem: retain public botuo/battleKo.png byte-identical as master, create512x331 derivative cropping only fully transparent rows [0,125,512,456]. All nonzero alpha and original RGBA rows retained; full512px width preserves both mirrored horizontal positions. Descriptor origin[.5,(405-125)/331],scale2,frame512x331 yields identical pixel-to-ground transform and144px width in both facings. No new pose/restyling/behavior. Saves370,688decoded bytes. Heavy atlas+FX356,352bytes; all-required scene/cache16,748,808 <16,777,216. Existing finite cache/residency and pins unchanged. Verify actual full set, loading reservations, multiple P1 Basic+Heavy, KO and repeated Restarts; do not count PNG compression as GPU savings. Optional assets keep bounded existing fallback.

## Checks and release

TDD for real280ms no-early-damage/RNG/movement, exact onehit+actionId, cooldownstart/cancel, rangeescape/no-retarget, KO/control, manual override, multiple actors, AI, coarse time, Pause/Restart and allTiers. Asset tests prove source hashes, atlas isolation/roundtrip/alpha padding, KO exact pixel equivalence with same mirror/ground, and Basic protected bytes. Presenter integration proves frames0→1→2→3/Idle, contact only on real hit, both facing/reduced motion, no procedural duplicate. Run focused tests then full suite/build because shared battle lifecycle changed. No changes to gameplay damage/AI decisions beyond committed Heavy startup. Review complete delta, feature CI/Pages/public byte fingerprints; stop for player phone acceptance.
