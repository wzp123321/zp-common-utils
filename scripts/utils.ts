import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
export const DIR_ROOT = resolve(__dirname, '..');

/**
 * 更新版本号
 */
export const updatePackageJSON = async () => {
  const packageDir = join(DIR_ROOT);
  const packageJSONPath = join(packageDir, 'package.json');
  const packageJSON = await fs.readJSON(packageJSONPath);
  const newVersionFn = (version: string) => {
    let [a, b, c] = version.split('.').map((x) => +x);
    if (c + 1 >= 10) {
      b++;
      c = 0;
    } else {
      c++;
    }
    if (b + 1 >= 10) {
      a++;
      b = 0;
    }
    return [a, b, c].join('.');
  };
  const newVersion = newVersionFn(packageJSON.version);
  packageJSON.version = newVersion;
  await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 });
};
