module.exports = {
  userInfo(state, payload) {
    state.user = payload;
  },
  addUnreadMsg(state, payload) {
    let unreadMsgItem = state.unreadMsgList.find((item) => {
      return item.friendId === payload.friendId;
    });
    console.log(unreadMsgItem);
    let msgItem = {
      content: payload.content,
      time: payload.time,
    };
    if (unreadMsgItem) {
      unreadMsgItem.msgList.push(msgItem);
    } else {
      unreadMsgItem = {
        friendId: payload.friendId,
        msgList: [msgItem],
      };
      state.unreadMsgList.push(unreadMsgItem);
    }
  },
  removeUnreadMsg(state, index) {
    let msgList = state.unreadMsgList[index].msgList;
    msgList.splice(0, msgList.length);
  },
  currentTalkChange(state, data) {
    state.currentTalk = data;
  },
  currentTalkIdListAdd(state, fid) {
    state.currentTalkIdList.push(fid);
  },
};
