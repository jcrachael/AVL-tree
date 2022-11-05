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
        // Sort the array and remove duplicates
        this.array = [...removeDuplicate(mergeSort(array))];
        // build the root
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
        this.inOrderData = [];
        this.preOrderData = [];
        this.postOrderData = [];
    }

    // Build the tree
    buildTree(array, start, end) {
        // Base case: if array has no values, return null
        if (start > end) return null;

        // Recursive case:
        // Get the half-way index of the array
        // Math.ceil() for left-leaning, Math.floor() for right-leaning
        let half = Math.ceil((start + end) / 2);

        // Set the root node to be the value at the index of half
        let node = new Node(array[half]);

        // Recursively call this method to build the next level of the tree
        node.left = this.buildTree(array, start, half - 1);
        node.right = this.buildTree(array, half + 1, end);
        // Return the level-0 root node - the middle value of the array
        return node;
    }

    // Insert a node
    insert(value, root = this.root) {
        if (root === null) return (root = new Node(value));
        if (root.data < value) {
            root.right = this.insert(value, root.right);
        } else {
            root.left = this.insert(value, root.left);
        }
        return root;
    }

    delete(value, root = this.root) {
        if (root === null) return root;
       
        if (root.data > value) {
            root.left = this.delete(value, root.left);
        } else if (root.data < value) {
            root.right = this.delete(value, root.right);
        } else {
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }
            root.data = getMin(root);
            root.right = this.delete(root.right, root.data);
        }
        return root;
    }

    find(value, root = this.root) {
        if (root === null) return false;
        // Get the Node with this value and return it
        if (root.data === value) return root;
        if (root.data > value) {
            return this.find(value, root.left);
        } else if (root.data > value) {
            return this.find(value, root.right)
        }
        return root;
    }

    levelOrder(root) {
        const queue = [];
        const result = [];
        if (root === null) return;
        queue.push(root);
        while (queue.length > 0) {
            let current = queue.shift(root);
            result.push(current.data);
            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
        }
        return result;
    }

    inOrder(root) {
        if (root === null) return;
        if (root.left !== null) {
            this.inOrder(root.left);
        }
        if (root.data !== undefined) {
            this.inOrderData.push(root.data);
        }

        if (root.right !== null) {
            this.inOrder(root.right);
        }
        return this.inOrderData;
    }

    preOrder(root) {
        if (root === null) return;
        if (root.data !== undefined) {
            this.preOrderData.push(root.data);
        }
        if (root.elft !== null) {
            this.preOrder(root.left);
        }
        if (root.right !== null) {
            this.preOrder(root.right);
        }
        return this.preOrderData;
    }

    postOrder(root) {
        if (root === null) return;
        if (root.left !== null) {
            this.postOrder(root.left);
        }
        if (root.right !== null) {
            this.postOrder(root.right);
        }
        if (root.data !== undefined) {
            this.postOrderData.push(root.data);
        }
        return this.postOrderData;
    }

    height(root) {
        if (root === null) {
            return -1;
        } else {
            let left = this.height(root.left);
            let right = this.height(root.right);
            return Math.max(left, right) + 1;
        }
    }

    depth(node, root = this.root) {
        let depth = -1;
        if (root === null) return depth;
        if (root == node || 
            (depth = this.depth(node, root.left)) >= 0 ||
            (depth = this.depth(node, root.right) >= 0)) {
                return depth + 1;
            }
        return depth;
    }

    traverse(root, array) {
        if (array !== undefined) {
            array.push(root.data);
        }
        if (root.left !== null) {
            this.traverse(root.left, array);
        }
        if (root.right !== null) {
            this.traverse(root.right, array);
        }
        return array;
    }

    isBalanced(root) {
        if (root === null) return false;
        let leftHalf = root.left;
        let rightHalf = root.right;

        if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
            return false;
        } else {
            return true;
        }
    }

    rebalance() {
        if (this.isBalanced(this.root)) return this.root;
        let rebalancedArray = [];
        rebalancedArray = this.traverse(this.root, rebalancedArray);
        let balancedTree = new Tree(rebalancedArray);
        return balancedTree.root;
    }

    prettyPrint(root, prefix = '', isLeft = true) {
        if (root.right !== null) {
            this.prettyPrint(root.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${root.data}`);
        if (root.left !== null) {
            this.prettyPrint(root.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
        
    }
};

function getMin(root) {
    let min = root.data;
    while (root != null) {
        min = root.data;
        root = root.leftPart;
    }
    return min;
}

export { Tree };