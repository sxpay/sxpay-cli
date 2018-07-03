module.exports = function getTemp(frame, obj) {
  let template = [frame]
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key]
      if (typeof element === "string") {
        if (key !== "projectName" && element !== "null")
          template += "-" + element
      } else if (element) {
        template += "-" + key
      }
    }
  }
  return template
}
