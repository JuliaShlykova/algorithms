import { LinkedList } from "./linkedList";

let list;

beforeEach(() => {
  list = LinkedList();
});

test('add an element 3 to the end', () => {
  list.append(3);
  expect(list.tail()).toBe(3);
});

test('add an element 0 to the beginning', () => {
  list.prepend(0);
  expect(list.head()).toBe(0);
});

test('add two elements to the empty list and get the size equal to two', () => {
  list.append(3);
  list.append(2);
  expect(list.size()).toBe(2);
});

test('element at index 2 is equal 2', () => {
  list.append(3);
  list.append(2);
  expect(list.at(2)).toBe(2);
});

test('remove element at the end, the final element is equal to 2', () => {
  list.append(3);
  list.append(2);
  list.append(4);
  list.pop();
  expect(list.tail()).toBe(2);
});

test('list contains element 2', () => {
  list.append(3);
  list.append(2);
  expect(list.contains(2)).toBeTruthy();
});

test('element 2 is at the index 2', () => {
  list.append(3);
  list.append(2);
  expect(list.find(2)).toBe(2);
});

test('element 5 is inserted at the index 2', () => {
  list.append(3);
  list.append(2);
  list.insertAt(5,2);
  expect(list.at(2)).toBe(5);
});

test('remove element 5 from index 2', () => {
  list.append(3);
  list.append(2);
  list.insertAt(5,2);
  list.removeAt(2);
  expect(list.at(2)).toBe(2);
});