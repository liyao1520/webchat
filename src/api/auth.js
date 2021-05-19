const { request } = require("./request");

function register(username, password, sex) {
  return request({
    url: "/user",
    method: "POST",
    data: {
      username,
      password,
      sex,
    },
  });
}
function login(id, password) {
  return request({
    url: "/login",
    method: "POST",
    data: {
      id,
      password,
    },
  });
}
module.exports = {
  register,
  login,
};
