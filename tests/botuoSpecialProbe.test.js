import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('Special probe skips every Pages stage and uses bounded tests plus both real browser scripts',()=>{
 const workflow=readFileSync('.github/workflows/m0-pages-preview.yml','utf8');
 for(const marker of ['      - name: Configure Pages','      - name: Upload Pages artifact','  deploy:']){
  const block=workflow.slice(workflow.indexOf(marker)).split('\n').slice(0,3).join('\n');
  assert.ok(block.includes("!contains(github.event.head_commit.message, '[botuo special probe]')"),marker);
 }
 const probe=workflow.slice(workflow.indexOf('      - name: Probe P2 Special'),workflow.indexOf('      - name: Check approved Awakening'));
 assert.ok(probe.includes('checkBotuoSpecialBrowser.mjs'));assert.ok(probe.includes('checkBotuoSpecialBuiltEntry.mjs'));assert.ok(probe.includes('actions/upload-artifact@v4'));assert.ok(!probe.includes('deploy-pages'));
 assert.ok(workflow.includes('tests/botuoSpecialRuntime.test.js tests/botuoSpecialPacking.test.js tests/botuoSpecialProbe.test.js'));
});
