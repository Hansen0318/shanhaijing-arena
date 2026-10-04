import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('../src/collection/style.css',import.meta.url),'utf8');
const rule=selector=>css.match(new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+' \\{([^}]+)\\}'))?.[1] ?? '';
test('compact grid caps cards close to bench scale and wraps/scrolls a larger catalog',()=>{
 assert.match(rule('.collection-grid'),/repeat\(auto-fill,minmax\(min\(84px,100%\),84px\)\)/);assert.match(rule('.collection-grid'),/overflow-y:auto/);assert.match(rule('.collection-grid'),/overflow-x:hidden/);assert.match(rule('.collection-portrait'),/width:100%/);assert.match(rule('.collection-portrait'),/aspect-ratio:1/);assert.match(rule('.collection-card'),/font:12px/);assert.match(rule('.is-locked .collection-portrait'),/brightness\(\.5\)/);
});
test('detail uses compact paragraph text, bounded portrait, independent scroll body and fixed header',()=>{
 assert.match(rule('.collection-info'),/font-size:13px/);assert.match(rule('.collection-info'),/line-height:1\.45/);assert.match(rule('.collection-detail-content'),/minmax\(96px,144px\)/);assert.match(rule('.collection-detail-content'),/overflow-y:auto/);assert.match(rule('.collection-detail-content'),/min-height:0/);assert.match(rule('.collection-header'),/flex-shrink:0/);assert.match(rule('.collection-info h3'),/font-size:14px/);assert.match(rule('.collection-identity .collection-name'),/font-size:18px/);
});

test('shared BACK placement reserves safe-area while keeping only intended internal scrolling',()=>{
 const campaign=readFileSync(new URL('../src/campaign/style.css',import.meta.url),'utf8'),info=readFileSync(new URL('../src/info/style.css',import.meta.url),'utf8');
 assert.match(campaign,/#campaign \{[^}]*overflow:hidden/);
 assert.match(campaign,/\.screen-back\{[^}]*position:absolute !important;[^}]*left:max\(20px,env\(safe-area-inset-left\)\);bottom:max\(12px,env\(safe-area-inset-bottom\)\)/);
 assert.match(campaign,/\.campaign-page:not\(\.landing-page\)\{[^}]*overflow:hidden;[^}]*padding-bottom:max\(66px/);
 for(const selector of ['.collection-page','.collection-detail'])assert.match(rule(selector),/overflow:hidden/);
 assert.match(rule('.collection-grid'),/overflow-y:auto/);assert.match(rule('.collection-detail-content'),/overflow-y:auto/);
 assert.match(info,/overflow:hidden/);assert.match(info,/overflow-y:auto/);
 for(const path of ['campaign/view.js','roster/view.js','collection/view.js','info/view.js'])assert.ok(readFileSync(new URL('../src/'+path,import.meta.url),'utf8').includes('screen-back'),path);
});
