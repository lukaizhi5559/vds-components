const path = require('path');
const svgFolderPath = path.resolve(__dirname, '../src/assets/svgs');
const restrictedFolderPath = path.resolve(
  __dirname,
  '../src/assets/restricted'
);
const fs = require('fs');
const { parseSync } = require('svgson');
const svgFilePath = path.resolve(__dirname, '../src/Icon/data.json');
const restrictedFilePath = path.resolve(
  __dirname,
  '../src/RESTRICTED_Icon/data.json'
);

function transformSVG(svgs, folderPath, outputFilePath) {
  let svgFileJson = {};
  svgs.forEach(svgFile => {
    if (svgFile.indexOf('.svg') == -1) return;
    let svgFileNameWithoutSuffix = svgFile.split('.')[0].toLowerCase();
    const svgFilePath = `${folderPath}/${svgFile}`;
    let svgFileHtml = fs.readFileSync(svgFilePath, 'utf-8');
    const svgJson = parseSync(svgFileHtml);
    let svgObj = svgJson;
    svgFileJson[svgFileNameWithoutSuffix] = svgObj;
  });
  let stringifiedFileJson = JSON.stringify(svgFileJson, null, 4);
  fs.writeFileSync(outputFilePath, stringifiedFileJson);
}

function run() {
  let svgs = fs.readdirSync(svgFolderPath);
  transformSVG(svgs, svgFolderPath, svgFilePath);

  // RESTRICTED ICONS
  let restricted_svgs = fs.readdirSync(restrictedFolderPath);
  transformSVG(restricted_svgs, restrictedFolderPath, restrictedFilePath);
}

run();
