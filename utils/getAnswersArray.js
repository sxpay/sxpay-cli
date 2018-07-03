// 获取所有问题
// react+router+redux+eslint+webpack
const { prompt } = require("inquirer")
module.exports = function getAnswersArray(answers) {
  var answersArray = [
    {
      type: "Input",
      name: "projectName",
      message: "请输入项目名字?",
      default: "myProject"
    },
    {
      type: "list",
      message: "请选择构建方式?",
      name: "build",
      choices: ["webpack", "parcel", "gulp"]
    }
  ]
  // react 模板
  if (answers === "react") {
    // var reactQuestion=require('./react-question')
    answersArray.push(
      {
        type: "confirm",
        name: "router",
        message: "需要安装react-router?",
        default: true
      },
      {
        type: "list",
        message: "请选择构建方式?",
        name: "stateMng",
        choices: ["redux", "mobx", "null"]
      }
    )
  }
  // vue 模板
  if (answers === "vue") {
    answersArray.push(
      {
        type: "confirm",
        name: "router",
        message: "Install vue-router?",
        default: true
      },
      {
        type: "list",
        message: "请选择构建方式?",
        name: "state",
        choices: ["redux", "mobx", "false"]
      }
    )
  }
  // eslint
  answersArray.push({
    type: "confirm",
    name: "eslint",
    message: "Use ESLint to lint your code?",
    default: true
  })
  return answersArray
}
