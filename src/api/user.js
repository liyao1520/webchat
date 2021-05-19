const { request } = require("./request");

function getUserInfo(id) {
  return request({
    url: "/user/info/" + id,
  });
}
function getMyInfo() {
  return request({
    url: "/user/info",
  });
}
function getfirendsList() {
  return request({
    url: "/user/list",
  });
}
function searchUser(type, keyword) {
  return request({
    url: "/user/search",
    params: {
      type,
      keyword,
    },
  });
}
function addFriend(id) {
  return request({
    url: "/user/add/" + id,
    method: "POST",
  });
}
module.exports = {
  getUserInfo,
  getfirendsList,
  getMyInfo,
  searchUser,
  addFriend,
};
