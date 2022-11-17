import { knightMoves } from "./knightMoves";

test('knight moves from [3,3] to [4,3] for 3 steps', () => {
  let path = knightMoves([3,3], [4,3]);
  expect(path.length-1).toBe(3);
});

test('knight moves from [3,3] to [4,5] for 1 step', () => {
  let path = knightMoves([3,3], [4,5]);
  expect(path.length-1).toBe(1);
})