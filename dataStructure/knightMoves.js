function possibleNextSteps(square) {
  if (!square) return null;
  let allMoves = [[-2,-1], [-1,-2], [-2,1], [1,-2], [-1,2], [2, -1], [1,2], [2,1]];
  let allSteps = []
  for (let move of allMoves) {
    allSteps.push([square[0]+move[0], square[1]+move[1]]);
  }
  let allPosSteps = allSteps.filter(step=>(step[0]>=0&&step[1]>=0&&step[0]<8&&step[1]<8));
  return allPosSteps;
}

function Square(coor) {
  let predecessor = null;
  function setPredecessor(prSquare) {
    predecessor = prSquare;
  }
  function getPredecessor() {
    return predecessor;
  }
  return {coor, setPredecessor, getPredecessor};
}

function knightMoves(start, end) {
  let visitedSquares = [start.toString()];//we don't want unneccessary traversing
  let stSquare = Square(start);
  let curSquare = stSquare;
  let queue = [stSquare];
  //who comes first among the paths - this is the shortest path and we can stop traversing
  while (!(curSquare.coor[0]===end[0]&&curSquare.coor[1]===end[1])) {
    curSquare = queue.shift();
    let moves = possibleNextSteps(curSquare.coor);
    let nextSquares = moves
      .filter(move=>!visitedSquares.includes(move.toString()))
      .map(move=>{
        visitedSquares.push(move.toString());
        let nMove = Square(move);
        nMove.setPredecessor(curSquare);
        return nMove;
      });
    queue.push(...nextSquares);
  }
  let pathReverse = [curSquare.coor];//path is reversed since we go back up to the graph
  while (!(curSquare?.coor[0]===start[0]&&curSquare?.coor[1]===start[1])) {
    curSquare = curSquare.getPredecessor();
    pathReverse.push(curSquare.coor);
  } 
  let path = [...pathReverse].reverse();
  return path;
}

function knightMovesFormat(path) {
  console.log(`=> You made it in ${path.length-1} moves! Here's your path: 
[${path.join(']\n[')}\]`)
}

let path = knightMoves([3,3], [4,3]);
knightMovesFormat(path);
// => You made it in 3 moves! Here's your path: 
// [3,3]
// [1,2]
// [3,1]
// [4,3]

export {knightMoves};