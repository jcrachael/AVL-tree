import { Tree } from './tree'

function randomArray(num, max) {
    const array = [];
    for (let i = 0; i < num; i++) {
        array.push(Math.floor(Math.random() * max));
    }
    return array;
}

(function driver() {
    let array = randomArray(10, 20);
    const tree = new Tree(array);
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

