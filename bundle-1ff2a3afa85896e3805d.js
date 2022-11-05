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
        this.root = this.buildTree(array);
    }

    // Build the tree
    buildTree(array) {
        // Sort the array and remove duplicates
        let cleanedArray = (0,_arrays__WEBPACK_IMPORTED_MODULE_0__.removeDuplicate)((0,_arrays__WEBPACK_IMPORTED_MODULE_0__.mergeSort)(array));
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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(138));
/******/ }
]);
//# sourceMappingURL=bundle-1ff2a3afa85896e3805d.js.map