const download = require("download-git-repo")
const ora = require("ora")
const chalk = require("chalk")
var path = require("path")
let tplList = require(`${__dirname}/../templates`)
var List = require("prompt-list")
var home = require("user-home") // 获取用户主目录的路径
var generate = require("../utils/generate") // 获取用户主目录的路径


const { prompt } = require("inquirer")
var getTemp = require("../utils/getTemp")
var getDir = require("../utils/getDir")
var program = require("commander") // node操作命令
var getAnswersArray = require("../utils/getAnswersArray")
var logger = require("../utils/logger")

if (typeof program.args[0] === "object") {
  logger.error("命令使用错误， 用法: sxpay init <app-frame>")
  return
}
var enquirer = new List({
  type: "list",
  name: "buildType",
  message: "请选择构建方式?",
  default: "列表选择",
  choices: ["列表选择", "询问构建"]
})
var question = getAnswersArray(program.args[0])
module.exports = enquirer.run().then(obj => {
  if (obj === "列表选择") {
    let enquirer2 = new List({
      type: "list",
      name: "temp",
      message: "请选择模板?",
      choices: Object.values(tplList)
    })
    enquirer2.run().then(obj2 => {
      downloadFunc(obj2)
    })
  } else {
    // enquirer2.push({
    //   type: "list",
    //   name: "temp",
    //   message: "请选择模板?",
    //   choices: Object.values(tplList)
    // })
  }
})

downloadFunc = pathStr => {
  console.log(chalk.green(`download template ${pathStr}...`))
  var rawName = program.args[0]
  var inPlace = !rawName || rawName === "."
  var name = inPlace ? path.relative("../", process.cwd()) : rawName
  var to = path.resolve(rawName || ".")
  var clone = program.clone || false
  var tmp = path.join(home, ".templates")
  function downloadAndGenerate(template) {
    var spinner = ora("downloading template....")
    spinner.start()
    download(template, tmp, { clone: clone }, function(err) {
      spinner.stop()
      if (err)
        console.log(
          chalk.red(
            "Failed to download repo " + template + ": " + err.message.trim()
          )
        )
      generate(name, pathStr, tmp, to, function(err) {
        if (err) {
          console.log(chalk.red("抱歉,没有找你想要的项目模板！"))
          console.log(chalk.red(err))
          return false
        }
        console.log(chalk.green("Project generation success.", name))
        console.log(chalk.green("===================================="))
        console.log(chalk.green("  cd", name))
        console.log(chalk.green("  npm install"))
        console.log(chalk.green("  npm start"))
        console.log(chalk.green("===================================="))
      })
    })
  }
  downloadAndGenerate("sxpay/sxpay-cli")
}
