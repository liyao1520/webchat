<template>
  <div class="webchat">
    <div class="left">
      <home-left :userInfo="userInfo" :friendsList="friendsList2"></home-left>
    </div>
    <div class="middle">
      <keep-alive> <router-view :key="$route.path" /></keep-alive>
    </div>
    <div class="right">
      <home-right></home-right>
    </div>
  </div>
</template>

<script>
import HomeLeft from "./childComps/HomeLeft";
import HomeRight from "./childComps/HomeRight";
import { getMyInfo, getfirendsList } from "@/api/user";
export default {
  name: "Home",
  components: {
    HomeLeft,
    HomeRight,
  },
  data() {
    return {
      userInfo: null,
      friendsList: [],
    };
  },
  sockets: {
    getMsg(data) {
      console.log(data);
      if (data.friendId == this.$route.params.friendId) {
        this.$children.forEach((component) => {
          console.log(component.friendId);
          if (component.friendId === parseInt(this.$route.params.friendId)) {
            component.msgList.push(data);
          }
        });
      } else {
        this.$store.commit("addUnreadMsg", {
          friendId: data.friendId,
          content: data.content,
          time: data.time,
        });
      }
    },
  },
  beforeCreate() {
    getMyInfo()
      .then((res) => {
        if (res.status === 401) {
          this.$router.replace("/login");
        }
        this.userInfo = res.data;
        this.$store.commit("userInfo", res.data);
        this.$socket.emit("setUserId", { id: this.$store.state.user.id });
      })
      .catch((err) => {
        console.log(err);
      });
    getfirendsList()
      .then((res) => {
        console.log(res);
        this.friendsList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setInterval(() => {
      getfirendsList()
        .then((res) => {
          console.log(res);
          this.friendsList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 20000);
  },
  computed: {
    friendsList2() {
      //friendList 加未读消息
      console.log("friendsList2");
      const unreadMsgList = this.$store.state.unreadMsgList;
      this.friendsList.forEach((friend) => {
        let fid = friend.id;
        unreadMsgList.forEach((msg) => {
          if (fid == msg.friendId) {
            this.$set(friend, "unreadMsgCount", msg.msgList.length);
          }
        });
      });
      return this.friendsList;
    },
  },
};
</script>

<style>
body,
html {
  background-color: #202735;
  width: 100%;
  height: 99%;
}
.webchat {
  /* width: 1024px; */
  width: 90%;
  height: 97vh;
  margin: 1vh auto 0;
  background-color: #fff;
  padding: 22px 22px 0;
  display: flex;
  box-sizing: border-box;
}
.webchat > .left {
  width: 244px;
}
.webchat > .middle {
  flex: 1;
}
.webchat > .right {
  width: 268px;
}
</style>
