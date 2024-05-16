// export interface PackageIndexes {
//   packages: Record<string, VueUsePackage>
//   categories: string[]
//   functions: VueUseFunction[]
// }

// export async function updatePackageJSON(indexes: PackageIndexes) {
//   const { version } = await fs.readJSON('package.json')

//   for (const { name, description, author, submodules, iife } of packages) {
//     const packageDir = join(DIR_SRC, name)
//     const packageJSONPath = join(packageDir, 'package.json')
//     const packageJSON = await fs.readJSON(packageJSONPath)

//     packageJSON.version = version
//     packageJSON.description = description || packageJSON.description
//     packageJSON.author = author || 'Anthony Fu <https://github.com/antfu>'
//     packageJSON.bugs = {
//       url: 'https://github.com/vueuse/vueuse/issues',
//     }
//     packageJSON.homepage = name === 'core'
//       ? 'https://github.com/vueuse/vueuse#readme'
//       : `https://github.com/vueuse/vueuse/tree/main/packages/${name}#readme`
//     packageJSON.repository = {
//       type: 'git',
//       url: 'git+https://github.com/vueuse/vueuse.git',
//       directory: `packages/${name}`,
//     }
//     packageJSON.main = './index.cjs'
//     packageJSON.types = packageJSON.type === 'module' ? './index.d.ts' : './index.d.cts'
//     packageJSON.module = './index.mjs'
//     if (iife !== false) {
//       packageJSON.unpkg = './index.iife.min.js'
//       packageJSON.jsdelivr = './index.iife.min.js'
//     }
//     packageJSON.exports = {
//       '.': {
//         import: './index.mjs',
//         require: './index.cjs',
//       },
//       './*': './*',
//       ...packageJSON.exports,
//     }

//     if (submodules) {
//       indexes.functions
//         .filter(i => i.package === name)
//         .forEach((i) => {
//           packageJSON.exports[`./${i.name}`] = {
//             import: `./${i.name}.mjs`,
//             require: `./${i.name}.cjs`,
//           }
//           if (i.component) {
//             packageJSON.exports[`./${i.name}/component`] = {
//               import: `./${i.name}/component.mjs`,
//               require: `./${i.name}/component.cjs`,
//             }
//           }
//         })
//     }

//     await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 })
//   }
// }
