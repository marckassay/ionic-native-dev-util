# ionic-native-dev-util

To assist in development with ionic-native plugins. When being developed concurrently with an app
that consumes an ionic-native plugin, ionic-native-dev-util creates a symbolic directory in the `node_modules/@ionic-native`
folder. And to fully complete this automation, it will modify the app's tsconfig.json and
angular.json files so that `preserveSymlinks` are set to `true`.

## Install

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/marckassay/ionic-native-dev-util/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/ionic-native-dev-util.svg?style=flat)](https://www.npmjs.com/package/ionic-native-dev-util)

### npm

```shell
npm install ionic-native-dev-util --save-dev
```

### yarn

```shell
yarn add ionic-native-dev-util --dev
```

link: [yarnpkg.com/en/package/ionic-native-dev-util](https://yarnpkg.com/en/package/ionic-native-dev-util)

## Usage

The command below should of been added to host's package.json on 'postinstall' event. If not, add it.

```json
{
  "scripts": {
    "linkplugin": "node ./node_modules/ionic-native-dev-util"
  }
}
```

You need to have access to the [ionic-native](https://github.com/ionic-team/ionic-native) 'dist'
folder. This is the build folder that contains all of its plugins which needs to be built post git
clone. And then, for an example, execute the following:

```shell
yarn run linkplugin /home/marc/repos/ionic-native/dist/@ionic-native/plugins/audio-management/
```

Where 'audio-management' is the name of the plugin folder. The 'linkplugin' command should of
created a symbolic directory in the `node_modules/@ionic-native` folder of the app, if there isn't a folder
created already with that name. Also if tsconfig.json and/or angular.json are at the root of the
app, 'linkplugin' command should of enabled the `preserveSymlinks` property.