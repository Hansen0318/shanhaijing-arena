import test from 'node:test';
import assert from 'node:assert/strict';
import { portraitCardLayout } from '../src/runtime/portraitCardLayout.js';

test('mirrored portrait content fills its square backing without changing card placement', () => {
  const allies = [0, 1, 2].map((index) => portraitCardLayout('ally', index));
  const enemies = [0, 1, 2].map((index) => portraitCardLayout('enemy', index));

  for (let index = 0; index < 3; index += 1) {
    assert.equal(allies[index].portraitSize, allies[index].backingWidth);
    assert.equal(enemies[index].portraitSize, enemies[index].backingWidth);
    assert.equal(allies[index].backingWidth, allies[index].backingHeight);
    assert.equal(allies[index].portraitSize, 84);
    assert.equal(allies[index].y, enemies[index].y);
    assert.equal(allies[index].x + enemies[index].x, 1120);
  }

  const firstSelectedTop = allies[0].y + allies[0].top * allies[0].selectedScale;
  assert.ok(firstSelectedTop >= 18, `selected first card reaches ${firstSelectedTop}`);
  const cardHeight = allies[0].bottom - allies[0].top;
  assert.ok(allies[1].y - allies[0].y > cardHeight * allies[0].selectedScale);
  const thirdEnemyBottom = enemies[2].y + enemies[2].bottom;
  assert.ok(thirdEnemyBottom < 344 - 48 - 2.5, `E3 ends at ${thirdEnemyBottom}`);
});
