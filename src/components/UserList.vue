<template>
  <div class="user-list">
    <div class="header">
      <span class="title">{{ title }}</span>
      <span class="count">{{ friendsList.length }}</span>
      <span class="open-icon">
        <i class="el-icon-arrow-up" v-if="isOpen" @click="close"></i>
        <i class="el-icon-arrow-down" v-else @click="open"></i>
      </span>
    </div>
    <div class="main" v-if="isOpen">
      <div
        class="user-list-item"
        v-for="item in friendsList"
        :key="item.id"
        @click="userListItemClick(item.id)"
        :class="{ active: $route.params.friendId == item.id }"
      >
        <span class="avatar">
          <img :src="item.avatarUrl" alt="" v-if="item.avatarUrl" />
          <i class="iconfont" v-else>&#xe601;</i>
          <span class="unread-msg-count" v-if="item.unreadMsgCount">{{
            item.unreadMsgCount
          }}</span>
        </span>
        <span class="username">{{ item.name }}</span>
        <span
          class="online-status"
          :class="{
            'online-color': item.online === 1,
            'offline-color': item.online === 0,
          }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["friendsList", "title"],
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    open() {
      this.isOpen = true;
    },
    userListItemClick(id) {
      this.$router.push({
        path: "/home/talk/" + id,
      });
      this.$store.dispatch("A_currentTalkChange", id);
    },
  },
};
</script>

<style>
.active {
  background-color: #deebfc;
}
.active:hover {
  background-color: #deebfc !important;
}
.user-list {
  user-select: none;
}
.header {
  position: relative;
  color: #232a31;
  font-size: 13px;
  padding: 10px 0;
  background-color: #f4f9ff;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 5px;
  padding-left: 5px;
}
.header .title {
  margin-right: 10px;
}
.open-icon {
  width: 13px;
}
.open-icon > i {
  position: absolute;
  font-size: 16px;
  cursor: pointer;
  left: 170px;
}
.user-list-item {
  height: 48px;
  display: flex;
  align-items: center;
  position: relative;
}
.user-list-item:hover {
  background-color: #f4f9ff;
  cursor: pointer;
}
.main .avatar {
  position: relative;
}
.main .avatar > img {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;
  vertical-align: middle;
}
.main .avatar > i {
  font-size: 36px;
  color: #ccc;
}
.main .avatar .unread-msg-count {
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: red;
  border-radius: 50%;
  text-align: center;
  font-size: 10px;
  line-height: 16px;
  color: #fff;
  left: 30px;
}
.main .username {
  color: #232a31;
  font-size: 12px;
  margin-left: 15px;
}
.online-status {
  position: absolute;
  right: 15px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.online-color {
  background-color: #67c23a;
}
.offline-color {
  background-color: #f56c6c;
}
</style>
