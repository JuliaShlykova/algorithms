import { rmDuplicatesAndSort, Tree } from "./balBinTree";

test('[5,2,5,5,5,7,0,1] becomes [0,1,2,5,7]', ()=>{
  expect(rmDuplicatesAndSort([5,2,5,5,5,7,0,1])).toEqual([0,1,2,5,7]);
})

test('root after building tree of [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324] is 8', () => {
  let root = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]).root.data;
  expect(root).toBe(8);
})