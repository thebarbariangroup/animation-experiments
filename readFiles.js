const fs = require('fs');
const path = require('path');

const experiments = {
  experiments: []
}

const experimentsPath = path.join(__dirname, 'src', 'components', 'experiments');
// console.log('CONFIG', experimentsPath);

getDirectoryItems(experimentsPath, experiments.experiments);

// function getDirectoryItems (directory, itemsArray) {

//   fs.readdir(directory, (err, items) => {
//     if (err) { return console.error(err); }

//     items.forEach((item) => {
//       const itemPath = path.join(directory, item);
//       console.log(itemPath);
//       const itemObj = {
//         name: item
//       };

//       fs.lstat(itemPath, (err, stats) => {
//         if (err) { return console.error(err); }

//         if (stats.isDirectory()) {
//           console.log('directory');
//           itemObj.children = [];
//           getDirectoryItems(itemPath, itemObj.children);
//         }
//       });

//       itemsArray.push(itemObj);
//     });
//   });
// }

function getDirectoryItems (itemPath, list) {
  const items = fs.readdirSync(itemPath);
  items.forEach((item) => {
    const newItemPath = path.join(itemPath, item);
    const itemObj = {
      name: item
    };

    if (fs.statSync(newItemPath).isDirectory()) {
      itemObj.children = [];
      getDirectoryItems(path.join(itemPath, item), itemObj.children);
    }

    list.push(itemObj);
  });
}

console.log(experiments.experiments[0].children[0]);