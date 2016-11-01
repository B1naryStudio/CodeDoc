export function treeSearch(node, key){
    if(node.key == key){
        return node;
    }
    else{
        if(node.children){
            for(let i = 0; i<node.children.length; i++){
              let nodeItem = treeSearch(node.children[i], key);
              if (nodeItem) return nodeItem;
        }
        }
    }
}