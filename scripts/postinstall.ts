import * as path from "path";
import { readJson, writeJson, pathExists } from "fs-extra";

async function insertScriptEntries(value: object) {
    const JSONFilePath: string = path.resolve('../../package.json');

    await pathExists(JSONFilePath)
        .then(async (val) => {
            if (val) {
                let config: any;
                try {
                    config = await readJson(JSONFilePath);

                    if (!config.scripts) {
                        config = Object.assign(config, { scripts: value });
                    } else {
                        Object.entries(value).forEach((v) => {
                            config.scripts[v[0]] = v[1];
                        });
                    }
                } catch (err) {
                    console.error(config)
                }

                try {
                    const result = await writeJson(JSONFilePath, config, { spaces: 2 });
                    console.log('[ionic-native-dev-util]', 'Added linkplugin command to:', JSONFilePath);
                    return result;
                } catch (err) {
                    console.error(err);
                    console.log('[ionic-native-dev-util]', 'Failed to add linkplugin command to:', JSONFilePath);
                }
            } else {
                return;
            }
        });
}

const value = { linkplugin: "node ./node_modules/ionic-native-dev-util" };

insertScriptEntries(value);