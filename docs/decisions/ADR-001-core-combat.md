# ADR-001 — Core Combat Model

## Status
Accepted for Prototype v1.

## Context
The game needs to feel active without requiring constant manual input. The user should be able to intervene instantly without toggling between explicit AUTO and MANUAL modes.

## Decision
Use a 3v3 real-time semi-auto combat model:
- all living characters always have AI capability;
- selected allied character is camera focus;
- valid player input immediately overrides AI intent for that selected character;
- 2.0 seconds after the last valid combat input, full AI tactical control resumes;
- selection, camera focus, and HUD do not change on handoff;
- no AUTO/MANUAL indicator is displayed;
- Basic attack is automatic;
- player controls movement, Heavy, Special, and Awakening;
- soft auto-targeting is used in the prototype.

## Consequences
Positive:
- low-friction mobile control;
- battle remains alive if the player stops touching the screen;
- manual intervention has immediate value;
- one shared combat model serves player and enemy characters.

Risks:
- AI handoff can feel like control theft if transition logic is abrupt;
- soft targeting may frustrate players if priorities are unclear;
- 2.0s timeout requires playtesting.

## Follow-up
Prototype testing may tune timeout, targeting priority, and camera damping without changing the overall controller architecture.
