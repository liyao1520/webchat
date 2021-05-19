const { getUserInfo } = require("@/api/user");
module.exports = {
  async A_currentTalkChange(ctx, fid) {
    const result = await getUserInfo(fid);
    ctx.commit("currentTalkChange", result.data);
  },
};
