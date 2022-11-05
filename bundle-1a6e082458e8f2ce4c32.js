"use strict";
(self["webpackChunkavl_tree"] = self["webpackChunkavl_tree"] || []).push([["bundle"],{

/***/ 521:
/*!***********************!*\
  !*** ./src/arrays.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeSort": () => (/* binding */ mergeSort),
/* harmony export */   "removeDuplicate": () => (/* binding */ removeDuplicate)
/* harmony export */ });
// Merge sort

// Helper function to merge the arrays back into one sorted array
function merge(leftArray, rightArray) {
    let sortedArray = [];

    while (leftArray.length && rightArray.length) {
        if (leftArray[0] < rightArray[0]) {
            sortedArray.push(leftArray.shift());
        } else {
            sortedArray.push(rightArray.shift())
        }
    }
    
    return [...sortedArray, ...leftArray, ...rightArray];
};

// Recursive function to split the array in 2 until array lengh is 1
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    } else {
        let half = Math.floor(array.length / 2);
        let leftArray = mergeSort(array.slice(0, half));
        let rightArray = mergeSort(array.slice(half));
        return merge(leftArray, rightArray);
    }
};

// Check all values in an array
// E.g.console.log(all([1,2,1], 
// function(num) { return num < 7 }))
// returns true because all indexes in array satisfy the callback condition
function all(array, callback) {
    // Make a shallow copy of the array
    let copy = array.slice();
    // Base case
    if (copy.length === 0) {
        return true;
    }

    if (callback(copy[0])) {
        copy.shift(); // remove first element from array
        return all(copy, callback)
    } else {
        return false;
    }
}

// Remove any duplicate integers from a sorted array

function removeDuplicate(array) {
    // Get the array length
    const arrayLength = array.length
    // Base case
    if (arrayLength <= 1) { return array };
    // Recursion case
    let temp = [];

    for (let i = 0; i < arrayLength; i++) {
        // if this value is NOT a duplicate of the last value
        if (array[i] != array[i-1]) {
            // add this value to temp
            temp.push(array[i]); 
        }
    }
    return temp;

        
}





/***/ }),

/***/ 138:
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ 205);


function randomArray(num, max) {
    const array = [];
    for (let i = 0; i < num; i++) {
        array.push(Math.floor(Math.random() * max));
    }
    return array;
}

(function driver() {
    let array = randomArray(10, 20);
    const tree = new _tree__WEBPACK_IMPORTED_MODULE_0__.Tree(array);
    console.log('Your tree:');
    tree.prettyPrint(tree.root);
    console.log('Balanced? ' + tree.isBalanced(tree.root));

    tree.insert(2);
    tree.insert(8);
    tree.insert(10);

    console.log('Your tree with nodes added:');
    tree.prettyPrint(tree.root);
    console.log('Balanced? ' + tree.isBalanced(tree.root));

    

    console.log('Your tree rebalanced:');
    tree.root = tree.rebalance();
    tree.prettyPrint(tree.root);
    console.log('Balanced? ' + tree.isBalanced(tree.root))

    console.log('Inorder: ' + tree.inOrder(tree.root));
    console.log('Preorder: ' + tree.preOrder(tree.root));
    console.log('Postorder: ' + tree.postOrder(tree.root));
})();



/***/ }),

/***/ 205:
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tree": () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _arrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrays */ 521);


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
        this.array = [...(0,_arrays__WEBPACK_IMPORTED_MODULE_0__.removeDuplicate)((0,_arrays__WEBPACK_IMPORTED_MODULE_0__.mergeSort)(array))];
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



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(138));
/******/ }
]);
//# sourceMappingURL=bundle-1a6e082458e8f2ce4c32.js.map