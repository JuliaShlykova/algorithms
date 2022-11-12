function Node(data, left=null, right=null) {
  return {data, left, right};
}

function rmDuplicatesAndSort(arr) {
  let arrSet = [...new Set(arr)];
  let sArr = arrSet.sort((a,b) => {
    return a-b;
  });
  return sArr;
}

function buildTree(arr) {
  if (!arr.length) return null;
  let sArr = rmDuplicatesAndSort(arr);
  return buildTreeRec(sArr, 0, sArr.length);
}

function buildTreeRec(sArr, start, end) {
  if (start>=end) return null;
  let mid = Math.floor((start+end)/2);
  let left = buildTreeRec(sArr, start, mid);
  let right = buildTreeRec(sArr, mid+1, end);
  let root = Node(sArr[mid], left, right); 
  return root;
}

function insertRec(root, value) {
  if (!root) {
    root = Node(value);
    return root;
  }
  if (value < root.data) {
    root.left = insertRec(root.left, value);
  } else if (value > root.data) {
    root.right = insertRec(root.right, value);
  }
  return root;
}

function postorderRec(callback, root, arr=[]) {
  if (root) {
    postorderRec(callback, root.left, arr);
    postorderRec(callback, root.right, arr);
    arr.push(root.data);
    if (callback) callback(root);
  }
  return arr;
}

function Tree(arr) {
  let root = buildTree(arr);
  
  function insert(value) {
    if (value === null) return;
    if (!root) {
      root = buildTree([value]);
      return;
    }
    insertRec(root, value);
  }

  function deleteNode(value) {
    if (value === null) return;
    if (!root) return;
    let curNode = root;
    let parent;
    //searching for a node
    while (curNode.data!==value) {
      if (curNode.data>value) {
        parent = curNode;
        curNode = curNode.left;
      } else if (curNode.data<value) {
        parent = curNode;
        curNode = curNode.right;
      } else {
        return
      }
    }

    //if the node has two children: need to set as root the smallest in right subtree
    if (curNode.left&&curNode.right) {
      let rCurNode = curNode.right;
      let minV = rCurNode.data;
      while (rCurNode.left !== null) {
        minV = rCurNode.left.data;
        rCurNode = rCurNode.left;
      }
      deleteNode(minV);
      curNode.data = minV;
      return
    } else {
      //if the node has only one child or no children
      if(parent.right?.data===value) {
        parent.right = curNode.right||curNode.left;
      } else if (parent.left?.data===value) {
        parent.left = curNode.right||curNode.left;
      }
    }
  }

  function find(value) {
    let curNode = root;
    while(curNode.data!==value) {
      if (curNode.data>value) {
        curNode = curNode.left;
      } else if (curNode.data<value) {
        curNode = curNode.right;
      } else {
        return null;
      }
    }
    return curNode;
  }

  function levelOrderIter(callback) {
    let queue = [root];
    let nodesData = [];
    while (queue.length) {
      nodesData.push(queue[0].data);
      if (queue[0].left) {
        queue.push(queue[0].left);
      }
      if (queue[0].right) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }
    if (!callback) {
      return nodesData;
    } else {
      nodesData.forEach(el => {
        callback(el);
      });
    }
  }

  function inorder(callback) {
    //LDR
    if (root === null) {
      return null;
    }
    let nodesData = [];
    let stack=[];
    let curNode = root;
    while (curNode!==null||stack.length) {
      if (curNode!==null) {
        stack.push(curNode);
        curNode = curNode.left;
      } else {
        curNode = stack.pop();
        nodesData.push(curNode.data);
        if (callback) callback(curNode);
        curNode = curNode.right;
      }
    }
    if (!callback) return nodesData;
  }

  function preorder(callback) {
    //DLR
    if (!root) return null;
    let nodesData = [];
    let stack = [root];
    let curNode = root;
    while (stack.length) {
      curNode = stack.pop();
      nodesData.push(curNode.data);
      if (callback) callback(curNode);
      if (curNode.right) stack.push(curNode.right);
      if (curNode.left) stack.push(curNode.left);
    }
    if (!callback) {
      return nodesData;
    }
  }

  function postorder(callback) {
    //LRD
    if (!root) return null;
    let nodesData = postorderRec(callback, root);
    if (!callback) {
      return nodesData;
    }
  }

  function height(node) {
    if(!node) return 0;
    let lHeight = (node.left)?height(node.left)+1:0;
    let rHeight = (node.right)?height(node.right)+1:0;  
    return Math.max(lHeight, rHeight);
  }

  function depth(node) {
    let curNode = root;
    let count = 0;
    let value = node.data;
    while (curNode.data!==value) {
      if (curNode.data>value) {
        curNode = curNode.left;
      } else if (curNode.data<value) {
        curNode = curNode.right;
      } else {
        return null;
      }
      count++;
    }
    return count;
  }

  function isBalanced() {
    //balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1
    let curNode = root;
    let queue = [root];
    while (queue.length) {
      curNode = queue.shift();
      if (Math.abs(height(curNode.left)-height(curNode.right)>1)) {
        return false;
      }
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);
    }
    return true;
  }

  function rebalance() {
    if (isBalanced()) return;
    const newArray = inorder();
    buildTree(newArray);
  }

  return {get root() {return root}, insert, deleteNode, find, levelOrderIter, inorder, preorder, postorder, height, depth, isBalanced, rebalance};
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

let myTree = Tree([1,2,3,4,5,6,7,8]);
prettyPrint(myTree.root);
console.log(myTree.inorder());

// export {rmDuplicatesAndSort, Tree};