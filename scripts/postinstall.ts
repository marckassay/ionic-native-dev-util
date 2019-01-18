import * as path from "path";
import { readJson, writeJson, pathExists } from "fs-extra";

const executingModuleName = 'ionic-native-dev-util';

async function init() {
    const scriptEntries = [
        { linkplugin: "node ./node_modules/ionic-native-dev-util" }
    ];

    await insertScriptEntries(scriptEntries);
}
init();

// TODO: perhaps can be optimize with Object.defineProperty() or other Object methods. To many
// possibilities to consider for this to be implemented at this time.
/**
 * Inserts `value` into the `scripts` object of the host app's package.json file. If there isn't a
 * `scripts` object, one will be created.
 *
 * @param value single entry or entries to be added to `scripts` object
 */
async function insertScriptEntries(value: object | Array<object>) {

    if (Array.isArray(value) === false) {
        value = [value];
    }

    const JSONFilePath: string = path.resolve('../../package.json');

    await pathExists(JSONFilePath)
        .then(async (val) => {
            if (val) {
                let config: any;
                let names = [];
                try {
                    config = await readJson(JSONFilePath);

                    if (!config.scripts) {
                        const entry = (value as Array<object>).shift();
                        names.push(Object.getOwnPropertyNames(entry)[0]);
                        Object.assign(config, { scripts: entry });
                    }

                    (value as Array<object>).forEach((entry) => {
                        const name = Object.getOwnPropertyNames(entry)[0];
                        const doesObjectExist = typeof (config.scripts[name]) === 'string';
                        if (doesObjectExist === false) {
                            names.push(name);
                            Object.assign(config.scripts, entry);
                        }
                    });

                } catch (err) {
                    console.error(err);
                    console.log(`[${executingModuleName}]`, 'Failed to update:', JSONFilePath);
                }

                try {
                    const result = await writeJson(JSONFilePath, config, { spaces: 2 });

                    names.forEach((entry) => {
                        console.log(`[${executingModuleName}]`, `Added '${entry}' command to:`, JSONFilePath);
                    });

                    return result;
                } catch (err) {
                    console.log(`[${executingModuleName}]`, 'Failed to update:', JSONFilePath);
                    console.error(err);
                }
            } else {
                return;
            }
        });
}
