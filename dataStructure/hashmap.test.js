import { HashMap } from "./hashmap";

let hashmap;

beforeEach(() => {
  hashmap = HashMap();
});

test('set tvalue for tkey and get tvalue', () => {
  hashmap.set('tkey', 'tvalue'); 
  expect(hashmap.get('tkey')).toBe('tvalue');
});

test('set new value newvalue for tkey and get newvalue', () => {
  hashmap.set('tkey', 'tvalue'); 
  hashmap.set('tkey', 'newvalue'); 
  expect(hashmap.get('tkey')).toBe('newvalue');
});

test('has value for key tkey', () => {
  hashmap.set('tkey', 'tvalue'); 
  expect(hashmap.has('tkey')).toBeTruthy();
});

test('doesn\'t have value for key tkey', () => {
  expect(hashmap.has('tkey')).toBeFalsy();
});

test('remove key tkey', () => {
  hashmap.set('tkey', 'tvalue'); 
  expect(hashmap.remove('tkey')).toBeTruthy();
  expect(hashmap.has('tkey')).toBeFalsy();

});

test('add 2 keys get legnth 2', () => {
  hashmap.set('tkey', 'tvalue'); 
  hashmap.set('tkey2', 'tvalue2'); 
  expect(hashmap.length()).toBe(2);
})

test('after clear no value for key tkey', () => {
  hashmap.set('tkey', 'tvalue'); 
  hashmap.clear(); 
  expect(hashmap.get('tkey')).toBeFalsy();
})

test('keys are tkey and tkey2', () => {
  hashmap.set('tkey', 'tvalue'); 
  hashmap.set('tkey2', 'tvalue2'); 
  expect(hashmap.keys().sort()).toEqual(['tkey', 'tkey2'].sort())
})

test('values are tvalue and tvalue2', () => {
  hashmap.set('tkey', 'tvalue'); 
  hashmap.set('tkey2', 'tvalue2'); 
  expect(hashmap.values().sort()).toEqual(['tvalue', 'tvalue2'].sort())
})

test('entries are pairs tkey tvalue and tkey2 tvalue2', () => {
  hashmap.set('tkey', 'tvalue'); 
  hashmap.set('tkey2', 'tvalue2'); 
  expect(hashmap.entries().sort()).toEqual([['tkey', 'tvalue'], ['tkey2', 'tvalue2']].sort())
})