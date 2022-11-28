import Bundler  from "./Bundler.mjs";
module.exports = Bundler(require("../package.json").version, process.env.TARGET)
