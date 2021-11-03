<template>
  <div class="content" v-if="userInfo">
    <div class="logo" @click="goHome">
      <img src="~assets/logo.png" alt="" />WebChat
    </div>
    <div class="user-info">
      <div class="avatar">
        <img :src="userInfo.avatarUrl" alt="" v-if="userInfo.avatarUrl" />
        <i class="iconfont" v-else>&#xe601;</i>
      </div>
      <div class="username">
        {{ userInfo.name
        }}<i class="iconfont set-up" @click="settingClick">&#xe60b;</i>
      </div>
      <div class="personal-signature">{{ userInfo.intro }}</div>
      <div class="inline">
        <el-switch v-model="isInline" :width="30" />
        <span>在线</span>
      </div>
    </div>
    <div class="scrollbar">
      <el-scrollbar style="height: 100%">
        <user-list :friendsList="currentTalkList" title="当前对话" />
        <user-list :friendsList="friendsList" title="好友列表" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserList from "@/components/UserList.vue";
export default {
  components: {
    UserList,
  },
  data() {
    return {
      isInline: true,
    };
  },
  props: ["friendsList"],
  computed: {
    ...mapState({
      userInfo: "user",
    }),
    currentTalkList() {
      let currentTalkList = [];
      this.friendsList.forEach((item) => {
        if (this.$store.state.currentTalkIdList.includes(item.id)) {
          currentTalkList.push(item);
        }
      });
      return currentTalkList;
    },
  },
  methods: {
    settingClick() {
      this.$router.push("/home/setting");
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.scrollbar {
  flex: 1;
  overflow: hidden;
  width: 200px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.logo {
  height: 32px;
  font-size: 18px;
  /* color: var(--theme-color); */
  color: #232a31;
  margin-bottom: 30px;
  cursor: pointer;
}
.logo > img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 5px;
}
.user-info {
  width: 192px;
  height: 174px;
  opacity: 1;
  background: #f4f9ff;
  border: 1px solid #e5eaef;
  border-radius: 13px;
  text-align: center;
  margin-bottom: 22px;
}

.avatar > i {
  font-size: 60px;
}
.avatar > img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-top: 5px;
  border: 1px solid #ccc;
}

.username {
  height: 22px;
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #232a31;
  text-align: center;
  margin: 8px 0;
}
.username > i {
  font-weight: 400;
  cursor: pointer;
}
.personal-signature {
  height: 16px;
  opacity: 1;
  font-size: 12px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  color: #232a31;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.inline {
  color: #5f6469;
  margin: 8px 0;
}
.set-up {
  margin-left: 5px;
}
</style>
