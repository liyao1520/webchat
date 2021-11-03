<template>
  <div class="addfriend">
    <div class="title"><i class="iconfont">&#xe66c;</i>添加好友</div>
    <div class="search">
      <el-select v-model="selectValue" placeholder="请选择" style="width: 100px">
        <el-option label="id号" value="id" />
        <el-option label="昵称" value="name" />
      </el-select>
      <el-input style="width: 300px; margin-right: 20px" v-model="inputValue" /><el-button @click="searchClick"
        >搜索</el-button
      >
    </div>
    <el-scrollbar class="scrollbar" stripe>
      <el-table style="width: 100%" :data="userInfoList" v-if="userInfoList != null">
        <el-table-column label="id" prop="id" />
        <el-table-column label="头像">
          <template v-slot:default="scope">
            <img :src="scope.row.avatarUrl" class="avatar" alt="" v-if="scope.row.avatarUrl" />
            <i class="iconfont avatar-icon" v-else>&#xe601;</i>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="name" />
        <el-table-column label="性别" prop="sex" />
        <el-table-column label="添加">
          <template v-slot:default="scope">
            <i class="iconfont add-friend-icon" @click="addFriendClick(scope.row.id)">&#xe66c;</i>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>
<script>
import { searchUser, addFriend, getfirendsList } from "@/api/user";

export default {
  data() {
    return {
      selectValue: "id",
      inputValue: "",
      userInfoList: null,
    };
  },
  methods: {
    async searchClick() {
      const type = this.selectValue;
      const keyword = this.inputValue;
      if (keyword == "" || !keyword) {
        return this.$message({
          type: "info",
          message: "搜索的信息不能为空~",
          duration: 1500,
        });
      }
      console.log(type, keyword);
      const result = await searchUser(type, keyword);
      if (result.status === 200) {
        this.userInfoList = result.userinfo;
      }
    },
    addFriendClick(id) {
      addFriend(id).then((res) => {
        if (res.status === 200) {
          this.$message.success("添加好友成功!");
          getfirendsList()
            .then((res) => {
              this.$parent.friendsList = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.error("添加好友失败!" + res.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.addfriend {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  border-radius: 12px;
  background-color: #f4f9ff;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  min-width: 530px;
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: rgba(49, 104, 255, 1);
  }
  .search {
    width: 500px;
    margin: 40px auto 0;
  }
  .scrollbar {
    width: 100%;
    height: 70vh;
    margin-top: 30px;
    .avatar {
      width: 50px;
      height: 50px;
      overflow: hidden;
    }
    .add-friend-icon {
      font-size: 20px;
      color: var(--theme-color);
      cursor: pointer;
    }
    .avatar-icon {
      display: flex;
      font-size: 50px;
      height: 50px;
      line-height: 50px;
    }
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
