import { inspect } from "util";

type TreeEnryType = {
  type: string;
  children: TreeEnryType[];
};

type TreeForceEntryType = {
  type: string;
  children: TreeForceEntryType | undefined;
};

const tree = {
  type: "Root",
  children: [
    {
      type: "Child1",
      children: [
        {
          type: "GrandChild1",
          children: [],
        },
        {
          type: "GrandChild2",
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

function treeParser(treeObject, map) {
  const stack = [treeObject];
  do {
    const node = stack.pop();
    map.push({ type: node.type });

    if (node.children.length > 0) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
  } while (stack.length > 0);
}

const forcedMap = [];

treeParser(tree, forcedMap);

const observe = forcedMap.filter((entry) => entry.type === "Child2");
console.log(observe);
