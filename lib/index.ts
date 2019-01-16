import * as path from "path";
import { readJson, writeJson, symlink, pathExists } from "fs-extra";

async function enablePreserveSymlink(filepath: string) {
    const JSONFilePath: string = path.join(process.cwd(), filepath);

    await pathExists(JSONFilePath)
        .then(async (value) => {
            if (value) {
                let config: any;
                try {
                    config = await readJson(JSONFilePath);

                    if (filepath.search('.*tsconfig.*') !== -1) {
                        config.compilerOptions.preserveSymlinks = true;
                    } else if (filepath.search('.*angular.*') !== -1) {
                        config.projects.app.architect.build.options.preserveSymlinks = true;
                    }
                } catch (err) {
                    console.error(err)
                }

                try {
                    const result = await writeJson(JSONFilePath, config, { spaces: 4 });
                    console.log('Enabled preserveSymlink for', filepath);
                    return result;
                } catch (err) {
                    console.error(err)
                }
            } else {
                return;
            }
        });
}

async function newSymlinkPlugin(src) {
    const pluginname = path.basename(src);
    const pluginlink = path.join('./node_modules/@ionic-native/', pluginname);
    const pluginsrc = path.resolve(src);

    await pathExists(pluginlink)
        .then((value) => {
            if (!value) {
                symlink(pluginsrc, pluginlink, 'dir', (err) => {
                    if (!err) {
                        console.log('Symlink for plugin has been created here: ' + pluginlink);
                    } else {
                        console.log(err);
                    }
                });
            }
            return;
        });
}

/**
 * When developing a plugin in ionic-native, this can be called to create a symlink of the built 
 * plugin directory. The symlink will be created in the local app's node_modules/@ionic-native 
 * folder. Also the `preserveSymlinks` of 'tsconfig.json' and 'angular.json' will be set to `true`.
 *
 * @param {*} src path to the plugin in the build directory (dist) of ionic-native
 */
async function linkplugin(src) {
    src = src.replace('"', '');

    await enablePreserveSymlink('tsconfig.json');
    await enablePreserveSymlink('angular.json');
    await newSymlinkPlugin(src);
}
linkplugin(process.argv[2]);
