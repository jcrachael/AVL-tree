import { mergeSort, removeDuplicate } from './arrays';

class Node {
    constructor(data) {
        this.data = data || null;
        this.left = null;
        this.right = null;
    }
};

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    // Build the tree
    buildTree(array) {
        // Sort the array and remove duplicates
        let cleanedArray = removeDuplicate(mergeSort(array));
        // Base case:
        if (cleanedArray.length <= 1) {
            let node = new Node(cleanedArray[0]);
            return node;
        }
        // Recursive case:
        // Turn the cleanedArray into a balanced binary tree of Nodes
        let half = Math.floor(cleanedArray.length / 2);
        let node = new Node(cleanedArray[half]);
        let leftArray = cleanedArray.slice(0, half);
        let rightArray = cleanedArray.slice(half);
        node.left = this.buildTree(leftArray);
        node.right = this.buildTree(rightArray);
        // Return the level-0 root node - the middle value of the array
        return node;
    }

    // Insert a node
    insert(value) {
        // Make a new Node with this value
        const newNode = new Node(value);
        // Insert the node in the correct place
    }

    delete(value) {
        // Get the Node with this value

        // Remove the Node (check for if it has children etc)
    }

    find(value) {
        // Get the Node with this value and return it
    }

    levelOrder(callback) {
        // Traverse the tree in a breadth-first level order
        // and provide each Node as the argument to the
        // provided callback function

        // Return an array of values if no callback function is given
    }
};



let array = [1,5,3,9,3,4,9,11,245,6,6,9,3,4];
const tree = new Tree(array);

console.log(tree);


