function Node(value=null, nextNode=null) {
  return {value, nextNode};
}

function LinkedList () {
  let HEAD = null;

  function append(value) {
    let newNode = Node(value);
    if (HEAD === null) {
      HEAD = newNode;
      return;
    }
    let pointer = HEAD;
    while (pointer.nextNode!==null) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = newNode;
  }
  function prepend(value) {
    let newNode = Node(value);
    newNode.nextNode = HEAD;
    HEAD = newNode;
  }
  function size() {
    let count = 0;
    let pointer = HEAD;
    while (pointer!==null) {
      pointer = pointer.nextNode;
      count++;
    }
    return count;
  }
  function head() {
    if (!HEAD) return null;
    return HEAD.value;
  }
  function tail() {
    let pointer = HEAD;
    if (!HEAD) return null;
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode;
    }
    return pointer.value;
  }
  function at(index) {
    if (!HEAD) return null;
    let pointer = HEAD;
    for (let i=1;i<index;i++) {
      if (!pointer) return null; 
      pointer = pointer.nextNode;
    }
    return pointer.value;
  }
  function pop() {
    if (!HEAD) return;
    if (!HEAD.nextNode) {
      HEAD = null;
      return;
    }
    let pointer = HEAD;
    while (pointer.nextNode.nextNode!==null) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = null;
  }
  function contains(value) {
    if (!HEAD) return false;
    let pointer = HEAD;
    while (pointer!==null) {
      if (pointer.value === value) {
        return true;
      }
      pointer = pointer.nextNode;
    }
    return false;
  }
  function find(value) {
    if (!HEAD) return null;
    let i = 1;
    let pointer = HEAD;
    while (pointer!==null) {
      if (pointer.value===value) {
        return i;
      }
      pointer = pointer.nextNode;
      i++;
    }
    return null;
  }
  function toString() {
    let str = '';
    let pointer = HEAD;
    while (pointer!==null) {
      str+=`( ${pointer.value} ) -> `;
      pointer = pointer.nextNode
    };
    str+='null';
    return str;
  }
  function insertAt(value, index) {
    let pointer = HEAD;
    let newNode = Node(value);
    if (index===1) {
      newNode.nextNode = pointer;
      HEAD = newNode;
      return;
    }
    for (let i=2; i<index; i++) {
      if (pointer.nextNode === null) {
        console.log('The index is out of range');
        return
      }
      pointer = pointer.nextNode;
    }
    let fNode = pointer.nextNode;
    newNode.nextNode = fNode;
    pointer.nextNode = newNode;
  }
  function removeAt(index) {
    let pointer = HEAD;
    if (index === 1) {
      pointer = pointer.nextNode;
      HEAD = pointer;
      return
    }
    for(let i=2; i<index;i++) {
      if (!pointer.nextNode) {
        console.log('The index is out of range');
        return;
      }
      pointer = pointer.nextNode;
    }
    pointer.nextNode = pointer.nextNode.nextNode;
  }
  return {append, prepend, size, head, tail, at, pop, contains, find, toString, insertAt, removeAt};
}

export {LinkedList};