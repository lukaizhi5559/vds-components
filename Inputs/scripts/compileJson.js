const path = require('path');
const svgFolderPath = path.resolve(
  __dirname,
  '../src/components/InputField/assets/svgs'
);
const fs = require('fs');
const { parseSync } = require('svgson');
const svgFilePath = path.resolve(
  __dirname,
  '../src/components/InputField/assets/data.json'
);

function run() {
  let svgFileJson = {};
  let svgs = fs.readdirSync(svgFolderPath);
  svgs.forEach(svgFile => {
    if (svgFile.indexOf('.svg') == -1) return;
    let svgFileNameWithoutSuffix = svgFile.split('.')[0];
    const svgFilePath = `${svgFolderPath}/${svgFile}`;
    let svgFileHtml = fs.readFileSync(svgFilePath, 'utf-8');
    const svgJson = parseSync(svgFileHtml);
    let svgObj = svgJson;

    svgFileJson[svgFileNameWithoutSuffix] = svgObj;
  });
  let stringifiedFileJson = JSON.stringify(svgFileJson, null, 4);
  fs.writeFileSync(svgFilePath, stringifiedFileJson);
}

run();
