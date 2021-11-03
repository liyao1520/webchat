<template>
  <div class="talk">
    <div class="main">
      <el-scrollbar id="scrollbar">
        <div class="no-msg" v-if="msgList.length === 0">没有任何消息~</div>
        <div
          v-for="(item, index) in msgList"
          :key="index"
          class="msgItem"
          :class="{ self: item.type === 0, friend: item.type === 1 }"
        >
          <div class="content">
            {{ item.content }}
            <span class="time" :class="{ 'time-l': item.type === 1 }">‎‏‎{{ item.time | formatTime }}</span>
            <i class="isErr el-icon-warning" v-if="item.isErr"></i>
          </div>
          <div class="avatar">
            <img :src="baseUrl + '/file/avatar/' + item.friendId" alt="" @error="imgError($event)" />
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="footer">
      <i class="iconfont link">&#xe623;</i>
      <div class="input-wrap">
        <el-input v-model="msg" placeholder="请输入内容~" resize="none" class="input" @keyup.native="send" />
        <div class="emoji">&#xe64e;</div>
      </div>

      <button class="send" @click="send">发送 <i class="iconfont">&#xe604;</i></button>
    </div>
    <socket v-if="$store.state.user.id" :friendId="friendId" ref="socket" @sendErr="sendErr" />
  </div>
</template>

<script>
const baseUrl = process.env.VUE_APP_API_URL;
import Socket from "../socket/Socket.vue";
import { formatDate } from "@/utils/format";
export default {
  components: { Socket },
  data() {
    return {
      msg: "",
      msgList: [],
      friendId: null,
      baseUrl,
    };
  },
  methods: {
    send(e) {
      if (!e.keyCode || e.keyCode === 13) {
        const content = this.msg;
        if (content === "" || null) {
          return;
        }
        this.$refs.socket.sendMsg(content);
        this.msgList.push({
          type: 0,
          content,
          time: new Date().getTime(),
          friendId: this.$store.state.user.id, //friendId 指向自己
        });
        this.msg = "";
        if (!this.$store.state.currentTalkIdList.includes(this.friendId)) {
          this.$store.commit("currentTalkIdListAdd", this.friendId);
        }

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      let el = document.querySelector("#scrollbar").querySelector(".el-scrollbar__wrap");
      el.scrollTop = el.scrollHeight;
    },
    sendErr() {
      this.$set(this.msgList[this.msgList.length - 1], "isErr", true);
    },
    imgError(e) {
      console.log("imgErrorimgError");
      console.log(e.target.src);
      e.target.src = baseUrl + "/img/avatar.png";
    },
  },
  beforeMount() {
    this.friendId = parseInt(this.$route.params.friendId);
  },
  watch: {
    currentTalkId(friendId) {
      this.$store.state.unreadMsgList.forEach((item, index) => {
        if (item.friendId === parseInt(friendId)) {
          item.msgList.forEach((msg) => {
            msg.type = 1;
            msg.friendId = friendId;
          });
          //从Vuex渲染到页面
          this.msgList.push(...item.msgList);
          //容Vuex中删除
          this.$store.commit("removeUnreadMsg", index);
        }
      });
    },
  },
  computed: {
    currentTalkId() {
      return this.$store.state.currentTalk.id;
    },
  },
  filters: {
    formatTime(time) {
      return formatDate(time);
    },
  },
  mounted() {
    this.$store.state.unreadMsgList.forEach((item, index) => {
      if (item.friendId === parseInt(this.$route.params.friendId)) {
        item.msgList.forEach((msg) => {
          msg.type = 1;
          msg.friendId = item.friendId;
        });
        //从Vuex渲染到页面
        this.msgList.push(...item.msgList);
        //容Vuex中删除
        this.$store.commit("removeUnreadMsg", index);
      }
    });
  },
};
</script>

<style scoped>
.talk {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  border-radius: 12px;
  background-color: #f4f9ff;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  display: flex;
  min-width: 530px;
}
.footer {
  position: absolute;
  height: 48px;
  bottom: 39px;
  width: 92%;
  left: 4%;
  background: #ffffff;
  border-radius: 9px;
  box-shadow: 0px 1px 3px 0px rgba(35, 42, 49, 0.08);
  display: flex;
  align-items: center;
  margin-left: 6px;
}
.footer .link {
  font-size: 12px;
  color: #232a31;
  padding: 10px;
  margin-left: 5px;
  cursor: pointer;
}
.input-wrap {
  width: 100%;
  position: relative;
}
.input {
  height: 30px;
}
.emoji {
  font-family: "iconfont";
  position: absolute;
  width: 20px;
  height: 20px;
  font-size: 18px;
  cursor: pointer;
  right: 6px;
  top: 6px;
}
::v-deep .el-input__inner {
  height: 100%;
  padding-right: 30px;
}
.send {
  width: 60px;
  height: 30px;
  margin: 0 9px;
  outline: none;
  border: 0;
  background: #0045ff;
  border-radius: 6px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.send > i {
  font-size: 9px;
}
.main {
  flex: 1;
  margin-bottom: 100px;
}
.main > #scrollbar {
  box-sizing: border-box;
  height: 100%;
}
#scrollbar ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.msgItem {
  display: flex;
  margin: 28px 22px 28px 0;
}
.self {
  justify-content: flex-end;
}
.friend {
  justify-content: flex-end;
  flex-direction: row-reverse;
}
.friend > .content {
  background-color: #fff !important;
  color: #232a31 !important;
  box-shadow: 0px 1px 3px 0px rgba(35, 42, 49, 0.08);
}
.msgItem .content {
  position: relative;
  font-size: 12px;
  padding: 11px;
  background-color: #232a31;
  border-radius: 9px;
  color: #fff;
  margin: 0 12px;
  max-width: 35%;
  word-wrap: break-word;
  line-height: 1.3;
}
.msgItem .content .time {
  position: absolute;
  bottom: -18px;
  color: #9fa1a3;
  right: 5px;
  width: 200px;
  text-align: right;
  font-size: 8px;
}
.time-l {
  text-align: left !important;
  left: 5px !important;
}
.msgItem .avatar {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;
}
.msgItem .avatar > img {
  width: 100%;
  height: 100%;
}
.no-msg {
  text-align: center;
  font-size: 16px;
}
.isErr {
  position: absolute;
  left: -25px;
  color: red;
  font-size: 20px;
  cursor: help;
}
.isErr:hover::after {
  display: block;
}
.isErr::after {
  display: none;
  width: 130px;
  position: absolute;
  right: 5px;
  top: 9px;
  content: "对方离线或网络错误!";
  font-size: 10px;
}
</style>
