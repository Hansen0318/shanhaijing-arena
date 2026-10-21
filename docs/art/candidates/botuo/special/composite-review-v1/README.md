# P2 Special 守群 — independent VFX + GIF review

**VFX/GIF CANDIDATES / PLAYER REVIEW PENDING.** All four character poses are already approved; receipt docs/art/approved/botuo/special/poses-v1/acceptance.json. No new gameplay/timing/runtime/phone approval.

Review files:

- botuo-special-composite-normal.gif — right then left; independent activation, four approved poses, continuing protection through Idle/Move, expiry and return.
- botuo-special-composite-slow.gif — same decoded frames, all holds3×. Slow clock is review-only.
- botuo-special-character-only.gif — effects hidden, both directions, Idle return.
- botuo-special-instant-chain.gif — separate reconstruction of the recorded SAME-clock Special→Heavy case; no requirement to finish Special poses before a legal next skill. State follows actor root and later movement, not Heavy image-layout offset.
- botuo-special-reduced-cues.gif — calm static status/activation cues, no pulse/strobe or trail. Not implemented accessibility.
- tier1-recipient-review.png — actual T1 fixture records protect caster a1 and one nearby ally a2; third ally a3 gets no aura. Reuses existing P3/P4 static art solely to illustrate recipients, no development/change to them.
- heavy-special-vfx-comparison.png — exact same approved Idle144×144 for both; Heavy source230×154 versus Special activation320×260 + independent status224×234. This is art comparison, not phone/performance/collision proof.
- sequence-review.png, chain-facing-expiry-QA.png, decoded-facing-state-QA.png, vfx-light-dark-QA.png — inspected art/decoded-output QA.

Two independent transparent effect sources are activation-raw-v1.png and mitigation-state-raw-v1.png; exact built-in Imagegen prompts alongside. Activation uses a broad multilayer amber/ivory ram-horn crest; sustained state uses quieter segmented open contour, neither invents damage/contact, invulnerability, absorption or team AoE. Center remains transparent. Original low-alpha edge pixels retained; full source RGBA padded in memory40px without cleanup/crop. Substantial contours remain interior. New VFX remain unapproved.

Safe art packaging:400×320 cells, generous margins, full four-cell strip1600×320, uniform0.126raw-source density for all four high-resolution poses (same authoring-preview policy as accepted Heavy), translation-only pelvis/support placement and zero rounded support residual. No full-height fit, source regeneration or color edit. Resized full RGBA crop-back equality checked. Original accepted masters remain immutable. Density/anchor are review proposals, not final runtime/body-calibration or16MiB fit proof; compare multiple head/arm/bracer/waist/hoof landmarks with actual built game before integration.

Temporal scope: normal cycle5000ms, pre-cast400ms, illustrative F1/F2/F3/F4 each160ms, source activation400–720ms. T0 actual status record is mapped to400–4400ms, starts at the cast irrespective of pose, disappears at expiry. Normal preview has no next skill during the short gesture solely to show all poses. The separate instant-chain study starts Heavy at that SAME cast point instead, demonstrating the body gesture can be superseded while status remains. Neither preview invents startup, a global cooldown or an animation lock. No damage/HP events manufactured. Future runtime must use actual status source/target/key/Tier/refresh/expiry/KO/leave/Pause/scene cleanup, independent of body playback. T1 static study uses actual recorded27.5%self/16.5%ally/4.32s, not full-team shielding.

Reproduce from root:

```sh
python scripts/prepareBotuoSpecialReview.py
python scripts/prepareBotuoSpecialRecipientReview.py
```

The recipient study refreshes the final SHA256SUMS inventory after its outputs are written. Review-manifest.json records source hashes, per-cell transforms, VFX sources, exact GIF bytes/decoded counts/total durations and limitations. All GIF frames were fully decoded and compared against quantized source frames with shared palette/full opaque frames/disposal2; no blended anatomy/ghosting. Normal and slow checked frame-for-frame,3×timing. Early QA caught aura following Heavy's image-layout translation; corrected so only actual preview actor movement moves it. This was a preview assembly defect, not a production gameplay bug.

Current slice: docs/art + reproducible preview scripts only; no src/public/workflow edits, new runtime assets, build/deploy/cache residency or phone verification. Existing prior engineering evidence reused; five known suite failures remain recorded, no whole-suite pass claim. Live Heavy releaseacf4547 unchanged.16MiB+131072reserve maintained; these master/review assets are not loaded by gameplay.

STOP for actual supplied VFX/normal/slow/character-only/chain/reduced/recipient materials review. On explicit visual approval, bind exact files/hashes/statement, then executable presentation design and faithful packing/shared integration through later gates; do not regenerate approved poses or treat this GIF as a combat-timing contract. No P2Awakening/P3/main merge/new branch/TD.
