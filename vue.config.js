const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const fs = require('fs');
const path = require('path');


const experiments = {
  items: []
};
const experimentsPath = path.join(__dirname, 'src', 'components', 'experiments');

getDirectoryItems(experimentsPath, experiments);

function getDirectoryItems (itemPath, obj) {
  const items = fs.readdirSync(itemPath);
  items.forEach((item) => {
    const newItemPath = path.join(itemPath, item);
    const itemObj = {
      type: 'file',
      name: item.replace('.vue', '')
    };

    if (item === '_index.json') {
      const content = fs.readFileSync(newItemPath);
      const jsonContent = JSON.parse(content);
      if (jsonContent.displayName) {
        obj.displayName = jsonContent.displayName;
      }
      return;
    }

    if (fs.statSync(newItemPath).isDirectory()) {
      itemObj.items = [];
      itemObj.type = 'directory',
      getDirectoryItems(path.join(itemPath, item), itemObj);
    }

    obj.items.push(itemObj);
  });
}

module.exports = {
  configureWebpack: {
    plugins: [
      new GenerateJsonPlugin('experiments.json', experiments)
    ]
  }
}