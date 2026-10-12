import test from 'node:test';
import assert from 'node:assert/strict';
import { learningDependencyWarnings } from '../boot-health.mjs';

test('healthy dependencies leave the dashboard unobstructed', () => {
  assert.deepEqual(learningDependencyWarnings({online:true,pythonRuntime:true,cloudSdk:true}), []);
});
test('blocked Python runtime is distinguished from cloud auth failure', () => {
  const messages=learningDependencyWarnings({online:true,pythonRuntime:false,cloudSdk:true});
  assert.equal(messages.length, 1);
  assert.match(messages[0], /Python runtime/);
});
test('offline and missing providers report recoverable limits', () => {
  const messages=learningDependencyWarnings({online:false,pythonRuntime:false,cloudSdk:false});
  assert.equal(messages.length, 3);
});
