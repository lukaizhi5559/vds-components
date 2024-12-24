const fs = require('fs');
const path = require('path');
const svgFolderPath = path.resolve(__dirname, '../src/assets/svgs');
const localCorePath = path.resolve(
  __dirname,
  '../../Icons/src/assets/icon-components'
);
const localIcons = new Set([
  'left-caret',
  'down-caret',
  'right-caret',
  'close',
  'info',
]);

function pascalCase(string) {
  return string
    .replace(/(^\w|-\w)/g, letter => letter.toUpperCase())
    .replace(/-/g, '');
}

function kebabCase(string) {
  return string
    .replace(/([a-z])([A-Z])/g, '$1 - $2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function getComponentTemplate() {
  return fs.readFileSync(path.resolve(__dirname, './js-template.txt'), 'utf8');
}

function findIcons() {
  return fs
    .readdirSync(svgFolderPath)
    .filter(file => file.endsWith('.svg'))
    .map(file => path.parse(file).name);
}

function createComponentName(originalName) {
  return pascalCase(originalName)
    .replace('3dAd', 'ThreeDAd')
    .replace('4k', 'FourK');
}

function createComponentFolderName(originalName) {
  return kebabCase(originalName);
}

/**
 * Converts and writes icon svgs to jsx into dist path.
 * @param {Set} iconSet
 * @param {String} distPath
 */
function generateIcons(iconSet = localIcons, distPath = localCorePath) {
  console.log('Generating icons, please wait...');

  for (const file of findIcons()) {
    if (!iconSet.has(file)) continue;

    const [originalName] = file.split('.');
    const svgFileContents = fs.readFileSync(
      path.resolve(svgFolderPath, `${file}.svg`),
      'utf8'
    );

    const componentName = createComponentName(originalName);
    const componentFolderName = createComponentFolderName(originalName);
    const [, getViewBoxValue] = /viewBox="([^"]*)"/.exec(svgFileContents) || [];
    const [, svgContent] = /<svg[^>]*>([\s\S]*?)<\/svg>/.exec(
      svgFileContents
        .replace(/<defs>[\s\S]*?<\/defs>/gi, '')
        .replace(/<style>[\s\S]*?<\/style>/gi, '')
    );

    let source = getComponentTemplate()
      .replace(/TemplateIcon/g, componentName)
      .replace(/{iconName}/g, `"${originalName}"`)
      .replace(/{svgContent}/g, `{<>${svgContent}</>}`)
      .replace(/{viewBox}/g, `'${getViewBoxValue}'`);

    const localFolderPath = path.resolve(distPath, componentFolderName);

    if (localFolderPath && !fs.existsSync(localFolderPath)) {
      fs.mkdirSync(localFolderPath, { recursive: true });
    }

    if (localFolderPath) {
      fs.writeFileSync(path.resolve(localFolderPath, `index.jsx`), source);
    }
  }

  console.log('Icon generation completed successfully.');
}

function deleteIcons(iconSet = localIcons) {
  const getDirectories = source =>
    fs
      .readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

  const dirs = getDirectories(
    path.resolve(__dirname, '../src/assets/icon-components')
  );
  for (const dir of dirs) {
    if (!iconSet.has(dir)) {
      fs.rmdirSync(
        path.resolve(__dirname, '../src/assets/icon-components', dir),
        {
          recursive: true,
          force: true,
        }
      );
    }
  }
}

module.exports = {
  findIcons,
  generateIcons,
  deleteIcons,
};
