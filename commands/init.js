// const download = require("download-git-repo")
// const ora = require("ora")

let tplList = require(`${__dirname}/../templates`)
var List = require("prompt-list")

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
    enquirer2.run().then(() => {})
  } else {
    // enquirer2.push({
    //   type: "list",
    //   name: "temp",
    //   message: "请选择模板?",
    //   choices: Object.values(tplList)
    // })
  }
})
// module.exports = prompt(enquirer)
//   .then(obj => {
//     // 列表选择
//     if (obj.buildType === "列表选择") {
//       prompt([
//         {
//           type: "list",
//           name: "temp",
//           message: "请选择模板?",
//           choices: Object.values(tplList)
//         }
//       ])
//     }
//   })
//   .then(function(params) {
//     console.log(params)
//   })

// module.exports = prompt(question).then(({ name, project, place }) => {
//   const gitPlace = tplList[name]["owner/name"]
//   const gitBranch = tplList[name]["branch"]
//   const spinner = ora("Downloading template...")

//   spinner.start()

//   download(`${gitPlace}#${gitBranch}`, `${place}/${project}`, err => {
//     if (err) {
//       console.log(chalk.red(err))
//       process.exit()
//     }
//     spinner.stop()
//     console.log(chalk.green("New project has been initialized successfully!"))
//   })
// })
