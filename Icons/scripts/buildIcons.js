const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');
const { rollup } = require('rollup');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const { findIcons, generateIcons, deleteIcons } = require('./builder');

async function buildIcons() {
  const distFolder = `../../../dist/@vds-core/icons`;

  // generate all icons
  generateIcons(new Set(findIcons()), path.resolve(__dirname, distFolder));

  // build all icons
  console.log('Building icons, please wait...');

  const paths = fg.sync([
    path.resolve(__dirname, `${distFolder}/**/index.jsx`),
  ]);

  for (const file of paths) {
    console.log(`Building ${file}`);
    const folderName = path.basename(path.dirname(file));

    //rollup
    const bundle = await rollup({
      input: path.resolve(file),
      plugins: [
        replace({
          preventAssignment: false,
          delimiters: ['', ''],
          values: {
            '../../../Icon/IconBase': '../cjs/Icon/IconBase',
            '../../../Icon/utils': '../cjs/Icon/utils',
          },
        }),
        babel({
          babelHelpers: 'bundled',
          presets: ['@babel/preset-react'],
        }),
        terser(),
      ],
      external: [
        '../cjs/Icon/IconBase',
        '../cjs/Icon/utils',
        'react',
        '@vds-core/utilities',
      ],
    });

    //write js to dist
    await bundle.write({
      file: path.resolve(__dirname, `${distFolder}/${folderName}/index.js`),
      format: 'cjs',
    });

    // remove jsx
    fs.rmSync(
      path.resolve(__dirname, `${distFolder}/${folderName}/index.jsx`),
      {
        recursive: true,
        force: true,
      }
    );
  }

  console.log('Icon build completed successfully.');
}

buildIcons();
