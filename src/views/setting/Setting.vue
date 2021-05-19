<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="用户信息" name="first">
        <h1 class="title">头像</h1>
        <form class="avatar-uploader">
          <div class="avatar" @click="fileInputClick">
            <input
              type="file"
              class="avatar-file"
              name="avatar"
              accept="image/png, image/jpeg"
              @change="getFiles($event)"
              ref="fileInput"
            />
            <i class="el-icon-plus"></i>
            <span class="fileInputMsg">选择图片</span>
          </div>
          <div class="preview-avatar">
            <img :src="avatarUrl" alt="" />
            <div>{{ imgMsg }}</div>
          </div>
          <div>
            <div class="avatar-update-msg">
              请选择图片上传：大小180 * 180像素支持JPG、PNG格式，图片需小于2M
            </div>
            <el-button
              type="primary"
              :disabled="isDisabled"
              class="update-avatar-btn"
              @click="updateAvatarClick"
              >更新</el-button
            >
          </div>
        </form>
      </el-tab-pane>
      <el-tab-pane label="账号" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { uploadAvatar } from "@/api/file";
export default {
  data() {
    return {
      activeName: "first",
      file: "",
      fileUrl: null,
      imgMsg: "当前头像",
      isDisabled: true,
    };
  },
  methods: {
    getFiles(e) {
      this.file = e.target.files[0];
      this.imgMsg = "预览图片";
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          this.fileUrl = reader.result;
          this.isDisabled = false;
        },
        false
      );
      if (this.file) {
        reader.readAsDataURL(this.file);
      }
      //image/png image/jpeg  this.file.type
    },
    fileInputClick() {
      this.$refs.fileInput.click();
    },
    updateAvatarClick() {
      let formdata = new FormData();
      formdata.append("avatar", this.file);
      uploadAvatar(formdata).then((res) => {
        if (res.status === 200) {
          this.$message.success("头像更新成功!");
        } else {
          this.$message.error("头像更新失败!" + res.msg);
        }
      });
    },
  },
  computed: {
    avatarUrl() {
      if (this.fileUrl) {
        return this.fileUrl;
      }
      return this.$store.state.user.avatarUrl;
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
}
.avatar-uploader {
  display: flex;
  .avatar {
    position: relative;
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    cursor: pointer;
    line-height: 150px;
    text-align: center;
    .avatar-file {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      overflow: hidden;
      cursor: pointer;
      display: none;
    }
    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
    }
    .fileInputMsg {
      position: absolute;
      bottom: 8px;
      left: 0;
      width: 100%;
      height: 18px;
      line-height: 18px;
      font-size: 16px;
      text-align: center;
      color: #8c939d;
    }
  }
  .preview-avatar {
    width: 150px;
    height: 160px;
    margin-left: 50px;
    margin-right: 20px;
    padding-left: 50px;
    border-left: 2px solid #e5e9ef;
    text-align: center;
    font-size: 14px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .avatar-update-msg {
    width: 200px;
    margin-bottom: 20px;
  }
}
.update-avatar-btn {
  width: 140px;
  height: 40px;
}
</style>
