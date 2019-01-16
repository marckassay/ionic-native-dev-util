"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs_extra_1 = require("fs-extra");
function enablePreserveSymlink(filepath) {
    return __awaiter(this, void 0, void 0, function () {
        var JSONFilePath;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    JSONFilePath = path.join(process.cwd(), filepath);
                    return [4 /*yield*/, fs_extra_1.pathExists(JSONFilePath)
                            .then(function (value) { return __awaiter(_this, void 0, void 0, function () {
                            var config, err_1, result, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!value) return [3 /*break*/, 8];
                                        config = void 0;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, fs_extra_1.readJson(JSONFilePath)];
                                    case 2:
                                        config = _a.sent();
                                        if (filepath.search('.*tsconfig.*') !== -1) {
                                            config.compilerOptions.preserveSymlinks = true;
                                        }
                                        else if (filepath.search('.*angular.*') !== -1) {
                                            config.projects.app.architect.build.options.preserveSymlinks = true;
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_1 = _a.sent();
                                        console.error(err_1);
                                        return [3 /*break*/, 4];
                                    case 4:
                                        _a.trys.push([4, 6, , 7]);
                                        return [4 /*yield*/, fs_extra_1.writeJson(JSONFilePath, config, { spaces: 4 })];
                                    case 5:
                                        result = _a.sent();
                                        console.log('Enabled preserveSymlink for', filepath);
                                        return [2 /*return*/, result];
                                    case 6:
                                        err_2 = _a.sent();
                                        console.error(err_2);
                                        return [3 /*break*/, 7];
                                    case 7: return [3 /*break*/, 9];
                                    case 8: return [2 /*return*/];
                                    case 9: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newSymlinkPlugin(src) {
    return __awaiter(this, void 0, void 0, function () {
        var pluginname, pluginlink, pluginsrc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pluginname = path.basename(src);
                    pluginlink = path.join('./node_modules/@ionic-native/', pluginname);
                    pluginsrc = path.resolve(src);
                    return [4 /*yield*/, fs_extra_1.pathExists(pluginlink)
                            .then(function (value) {
                            if (!value) {
                                fs_extra_1.symlink(pluginsrc, pluginlink, 'dir', function (err) {
                                    if (!err) {
                                        console.log('Symlink for plugin has been created here: ' + pluginlink);
                                    }
                                    else {
                                        console.log(err);
                                    }
                                });
                            }
                            return;
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * When developing a plugin in ionic-native, this can be called to create a symlink of the built
 * plugin directory. The symlink will be created in the local app's node_modules/@ionic-native
 * folder. Also the `preserveSymlinks` of 'tsconfig.json' and 'angular.json' will be set to `true`.
 *
 * @param {*} src path to the plugin in the build directory (dist) of ionic-native
 */
function linkplugin(src) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    src = src.replace('"', '');
                    return [4 /*yield*/, enablePreserveSymlink('tsconfig.json')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, enablePreserveSymlink('angular.json')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, newSymlinkPlugin(src)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
linkplugin(process.argv[2]);
//# sourceMappingURL=index.js.map