import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { allyHud, enemyHud, formatBattleTime } from '../src/runtime/battleHud.js';

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
  assert.equal(cards[0].alive, true);
  assert.equal(cards[1].alive, false);
});

test('enemy cards show independent HP and KO without becoming selectable', () => {
  assert.deepEqual(enemyHud([
    { instanceId: 'e1', hp: 80, maxHp: 100 },
    { instanceId: 'e2', hp: 0, maxHp: 200 },
    { instanceId: 'e3', hp: 25, maxHp: 50 },
  ]), [
    { id: 'e1', hpText: '80 / 100', hpRatio: 0.8, selected: false, selectable: false, alive: true },
    { id: 'e2', hpText: '0 / 200', hpRatio: 0, selected: false, selectable: false, alive: false },
    { id: 'e3', hpText: '25 / 50', hpRatio: 0.5, selected: false, selectable: false, alive: true },
  ]);
});

test('battle timer counts down from canonical 90 seconds', () => {
  assert.equal(formatBattleTime(0, 90), '01:30');
  assert.equal(formatBattleTime(1.01, 90), '01:29');
  assert.equal(formatBattleTime(89.1, 90), '00:01');
  assert.equal(formatBattleTime(90, 90), '00:00');
});

test('Arena overhead HP bars are side-colored and derive from live actor hp/maxHp',()=>{
  const source=readFileSync(new URL('../src/runtime/ArenaScene.js',import.meta.url),'utf8');
  assert.match(source,/const hpBar = this\.add\.graphics\(\)\.setDepth\(12\)/);
  assert.match(source,/maxHp=Math\.max\(1,liveActor\?\.maxHp\?\?actor\.maxHp\?\?1\)/);
  assert.match(source,/const hpRatio=Math\.max\(0,Math\.min\(1,actor\.hp\/maxHp\)\)/);
  assert.match(source,/view\.allied\?\[0x69cbff,0x2875d8\]:\[0xff8178,0xb82a38\]/);
  assert.match(source,/fillGradientStyle/);
  assert.match(source,/setVisible\(actor\.hp>0\)/);
});

test('campaign result buttons recenter from three actions to retry/exit on defeat',()=>{
  const source=readFileSync(new URL('../src/runtime/ArenaScene.js',import.meta.url),'utf8');
  assert.match(source,/const labels=visible\?\['NEXT STAGE','RETRY','EXIT'\]:\['RETRY','EXIT'\]/);
  assert.match(source,/const gap=230,startX=ARENA_STAGE\.width\/2-gap\*\(labels\.length-1\)\/2/);
  assert.match(source,/view\.button\.setPosition\(x,338\);view\.text\.setPosition\(x,338\)/);
});
