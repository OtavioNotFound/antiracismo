import test from 'node:test';
import assert from 'node:assert/strict';
import { clampRoom, getFeelings, bookScrollTarget } from '../src/navigation.mjs';
test('book navigation uses rail coordinates and clamps the last visible page',()=>{
 assert.equal(bookScrollTarget(350,1000,650),350);
 assert.equal(bookScrollTarget(700,1000,650),350);
 assert.equal(bookScrollTarget(300,900,900),0);
});
test('room navigation remains within the six-room exhibition',()=>{
  assert.equal(clampRoom(-1),0); assert.equal(clampRoom(6),5);
  assert.equal(clampRoom(3),3); assert.equal(clampRoom(NaN),0);
});
test('every offered feeling has a specific response and an action',()=>{
 const feelings=getFeelings(); assert.equal(feelings.length,5);
 assert.equal(new Set(feelings.map(x=>x.message)).size,5);
 for(const f of feelings){assert.ok(f.title);assert.ok(f.message.length>50);assert.ok(f.action.length>30);}
});
