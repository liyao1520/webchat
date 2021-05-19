<template>
  <div class="home-right">
    <div class="top">
      <div class="avatar">
        <img :src="currentTalk.avatarUrl" v-if="currentTalk.avatarUrl" alt="" />
        <i
          v-if="!currentTalk.avatarUrl"
          class="iconfont"
          style="font-size: 50px"
          >&#xe601;</i
        >
        <i class="iconfont sex nv" v-if="currentTalk.sex == '女'">&#xe665;</i>
        <i class="iconfont sex nan" v-else>&#xe664;</i>
      </div>
      <div class="user-info">
        <div class="username">
          <i class="iconfont">&#xe636;</i><span>{{ currentTalk.name }}</span>
        </div>
        <div class="age">
          <i class="iconfont">&#xe6b2;</i
          ><span>{{ currentTalk.age ? currentTalk.age + "岁" : "无" }}</span>
        </div>
        <div class="city">
          <i class="iconfont">&#xe61d;</i
          ><span>{{ currentTalk.city || "无" }}</span>
        </div>
      </div>
      <div class="intro">
        <span v-if="currentTalk.intro">{{ currentTalk.intro }}</span>
        <span v-else>这个人很懒，什么都没有留下</span>
      </div>
    </div>
    <div class="main">
      <div class="add-friend" @click="addFriendClick">
        <div class="icon">
          <i class="iconfont">&#xe66c;</i>
        </div>
        <div class="name">加好友</div>
      </div>
      <div class="group-chat">
        <div class="icon">
          <i class="iconfont">&#xe613;</i>
        </div>
        <div class="name">群聊</div>
      </div>
      <div class="moment">
        <div class="icon">
          <i class="iconfont">&#xe64f;</i>
        </div>
        <div class="name">好友动态</div>
      </div>
      <div class="agency">
        <div class="icon">
          <i class="iconfont">&#xe61e;</i>
        </div>
        <div class="name">代办</div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentTalk"]),
  },
  created() {
    const fid = this.$route.params.friendId;
    if (fid) {
      this.$store.dispatch("A_currentTalkChange", parseInt(fid));
    }
  },
  methods: {
    addFriendClick() {
      this.$router.push("/home/addfriend");
    },
  },
};
</script>

<style scoped>
.home-right {
  height: 100%;
}
.top {
  width: 220px;
  height: 176px;
  background: #f4f9ff;
  border: 1px solid #e5eaef;
  border-radius: 13px;
  margin: 0 auto;
}
.main {
  display: flex;
  width: 220px;
  opacity: 1;
  background: #f4f9ff;
  border: 1px solid #e5eaef;
  border-radius: 13px;
  margin: 20px auto 20px;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-around;
}
.top .user-info {
  padding-left: 20px;
}
.user-info > div {
  margin: 4px 0;
}
.top .avatar {
  position: relative;
  width: 50px;
  height: 50px;

  margin: 10px auto;
}
.top .avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}
.top .avatar .sex {
  position: absolute;
  right: -21px;
  top: 0;
}
.nv {
  color: #d6628b;
}
.nan {
  color: #3394ce;
}
.top i {
  font-size: 14px;
  margin-right: 10px;
}
.intro {
  height: 50px;
  word-break: break-all;
  padding: 0 5px;
  text-align: center;
  color: #0045ff;
  overflow-y: auto;
}
.main > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 50px;
  border-radius: 9px;
  font-weight: 700;
  cursor: pointer;
  margin: 10px 0;
}
.main .name {
  font-size: 11px;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  margin-right: 2px;
}
.icon > i {
  font-size: 16px;
  font-weight: 400;
}

.main .add-friend {
  background-color: rgba(49, 104, 255, 0.09);
  color: rgba(49, 104, 255, 1);
}
.main .add-friend .icon {
  background-color: rgba(49, 104, 255, 0.2);
}
.main .group-chat {
  background: rgba(14, 198, 177, 0.09);
  color: #0ec6b1;
}
.main .group-chat .icon {
  background-color: rgba(14, 198, 177, 0.2);
}
.main .moment {
  background: rgba(124, 41, 237, 0.09);
  color: #7c29ed;
}
.main .moment .icon {
  background-color: rgba(124, 41, 237, 0.2);
}
.main .agency {
  background: rgba(255, 152, 49, 0.09);
  color: #ff9831;
}
.main .agency .icon {
  background-color: rgba(255, 152, 49, 0.2);
}
</style>
