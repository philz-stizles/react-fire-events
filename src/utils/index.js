export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') -1 >>> 0) + 2);
}

export const createDataTree = (dataset) => {
  let hashTable = Object.create(null);
  dataset.forEach(c => hashTable[c.id] = { ...c, childNodes: [] });

  let dataTree = [];
  dataset.forEach(c => {
    if(c.parentId) {
      hashTable[c.parentId].childNodes.push(hashTable[c.id]);
    } else {
      dataTree.push(hashTable[c.id])
    }
  });

  return dataTree;
}