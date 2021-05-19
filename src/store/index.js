import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    unreadMsgList: [],
    currentTalk: 0,
    currentTalkIdList: [],
  },
  actions,
  mutations,
  getters,
});
