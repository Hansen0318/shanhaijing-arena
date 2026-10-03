import test from 'node:test';import assert from 'node:assert/strict';import {createLabConfig} from '../src/dev/battleLab/config.js';import {readFileSync} from 'node:fs';
import {createLabBattleSession} from '../src/dev/battleLab/battleFactory.js';
import {createAbilityDefinition} from '../src/combat/ability.js';
test('Lab visual inspection is presentation-only session data and rejects invalid slots',()=>{
 const config=createLabConfig({visualSlot:'battleIdle'});assert.equal(config.options.visualSlot,'battleIdle');assert.throws(()=>createLabConfig({visualSlot:'secret'}));
});
test('cast event carries target identity for presentation without changing shared impact',()=>{
 const session=createLabBattleSession(createLabConfig({scenarioId:'aoe'}));assert.equal(session.usePlayerAbility('a1','heavy'),true);const event=session.drainCastEvents()[0];assert.ok(event.targetId?.startsWith('e'));assert.ok(session.actorById(event.targetId).hp<session.actorById(event.targetId).maxHp);
});
test('ability factory retains optional immutable presentation without changing mechanics',()=>{
 const input={id:'future.heavy',category:'heavy',cooldown:3,maxRange:2,targetingRule:'enemy',effect:{coefficient:1.4}};const base=createAbilityDefinition(input),art={vfx:{form:'sprite',assetKey:'placeholder.actor-strip'}},decorated=createAbilityDefinition({...input,presentation:art});
 assert.deepEqual(decorated.presentation,art);art.vfx.assetKey='changed';assert.equal(decorated.presentation.vfx.assetKey,'placeholder.actor-strip');const {presentation,...mechanics}=decorated;assert.deepEqual(mechanics,base);assert.ok(Object.isFrozen(presentation.vfx));
});
test('Arena routes cast/damage presentation through shared asset adapter; telegraph remains authority',()=>{
 const source=readFileSync('src/runtime/ArenaScene.js','utf8');assert.match(source,/new AssetPresenter/);assert.match(source,/visualAssets\.cast/);assert.match(source,/visualAssets\.hit/);assert.match(source,/visualAssets\.destroy/);assert.match(source,/this\.telegraphs\.render\(this\.session\.threats\.active/);
 const p=readFileSync('src/runtime/assetPresenter.js','utf8');assert.doesNotMatch(p,/usePlayerAbility|applyDamage|\.damage\(|\.heal\(|localStorage|if\s*\([^)]*characterId/);
});
