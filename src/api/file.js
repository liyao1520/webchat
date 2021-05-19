const { request } = require("./request");

function uploadAvatar(formdata) {
  return request({
    method: "post",
    url: "/file/upload/avatar",
    headers: { "Content-Type": "multipart/form-data" },
    data: formdata,
  });
}
module.exports = { uploadAvatar };
