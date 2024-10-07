const tree = {
  type: "typea",
  children: [
    {
      type: "typea",
      children: [
        {
          type: "typeb",
          children: [],
        },
        {
          type: "typeb",
          children: [],
        },
      ],
    },
    {
      type: "Child2",
      children: [],
    },
  ],
};

function getIterator(item) {
  return item[Symbol.iterator]();
}

function findTree(tree, type) {
  const iterators = [getIterator([].concat(tree))];
  const output = [];

  do {
    const curernt = iterators.at(-1);

    if (!curernt) return output;

    const nextValue = curernt.next();

    if (nextValue.done) {
      iterators.pop();
      continue;
    }

    const node = nextValue.value;

    // yield node;
    if (node.type === type) output.push(node);

    if (node.children?.length) iterators.push(getIterator(node.children));
  } while (true);
}

console.log(findTree(tree, "typea"));
// for (let node of findTree(tree, "typea")) console.log(node);
