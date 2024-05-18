import process from 'node:process';
import fs from 'fs-extra';
import { metadata } from '../packages/metadata/metadata';
import { updatePackageJSON } from './utils';

async function run() {
  await Promise.all([updatePackageJSON(metadata)]);

  await fs.copy('./CONTRIBUTING.md', './packages/contributing.md');
}

run();
