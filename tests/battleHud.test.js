import test from 'node:test';
import assert from 'node:assert/strict';
import { allyHud, enemyTeamHud, formatBattleTime } from '../src/runtime/battleHud.js';

test('ally portrait HUD keeps health text legible even when KO', () => {
  const cards = allyHud([
    { instanceId: 'a1', hp: 1608, maxHp: 1610 },
    { instanceId: 'a2', hp: 0, maxHp: 100 },
  ], 'a1');
  assert.deepEqual(cards.map(({ id, hpText, hpRatio, selected, selectable }) =>
    ({ id, hpText, hpRatio, selected, selectable })), [
    { id: 'a1', hpText: '1608 / 1610', hpRatio: 1608 / 1610, selected: true, selectable: true },
    { id: 'a2', hpText: '0 / 100', hpRatio: 0, selected: false, selectable: false },
  ]);
});

test('team HUD sums current and maximum enemy HP including KO members', () => {
  assert.deepEqual(enemyTeamHud([
    { hp: 80, maxHp: 100 }, { hp: 0, maxHp: 200 }, { hp: 25, maxHp: 50 },
  ]), { hpText: '105 / 350', hpRatio: 0.3 });
});

test('battle timer counts down from canonical 90 seconds', () => {
  assert.equal(formatBattleTime(0, 90), '01:30');
  assert.equal(formatBattleTime(1.01, 90), '01:29');
  assert.equal(formatBattleTime(89.1, 90), '00:01');
  assert.equal(formatBattleTime(90, 90), '00:00');
});
