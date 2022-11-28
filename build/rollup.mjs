import Bundler  from "./Bundler.mjs"
import pkg from "../package.json" assert { type: "json" }

export default Bundler(pkg.version, process.env.TARGET)
