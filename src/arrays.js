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



export { mergeSort, removeDuplicate }