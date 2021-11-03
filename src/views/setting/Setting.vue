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
        <h1 class="title">修改基本信息</h1>
        <div class="user-info">
          <el-scrollbar style="height: 100%" class="scrollbar">
            <div class="content">
              <div class="id">
                <span class="lable">id:</span>
                <el-input disabled v-model="inputValue.id" />
              </div>
              <div class="name">
                <span class="lable">昵称:</span>

                <el-input
                  v-model="inputValue.name"
                  :maxlength="10"
                  :minlength="2"
                  show-word-limit
                />
                <span
                  style="color: red"
                  v-show="
                    inputValue.name.length < 2 || inputValue.name.length > 10
                  "
                  >昵称应该2-10个字符</span
                >
              </div>
              <div class="sex">
                <span class="lable">性别:</span>
                <el-select v-model="inputValue.sex">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </div>
              <div class="age">
                <span class="lable">年龄:</span>
                <el-input-number v-model="inputValue.age" :min="1" :max="100" />
              </div>
              <div class="city">
                <span class="lable">城市:</span>
                <el-input v-model="inputValue.city" />
              </div>
              <div class="intro">
                <span class="lable">个性签名:</span>
                <el-input
                  type="textarea"
                  v-model="inputValue.intro"
                  :rows="4"
                  :autosize="false"
                  :maxlength="50"
                  show-word-limit
                />
              </div>
              <el-button @click="updateUserInfoBtnClick">确认修改</el-button>
            </div>
          </el-scrollbar>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账号" name="third">
        <div class="title">修改密码</div>
        <div class="update-password">
          <el-form :model="form" :rules="rules" label-width="150px" ref="form">
            <el-form-item label="当前密码:" prop="currentPassword">
              <el-input
                placeholder="请输入当前密码"
                type="password"
                v-model="form.currentPassword"
                label="当前密码"
              />
            </el-form-item>
            <el-form-item label="要修改的密码" prop="updatePassword">
              <el-input
                placeholder="请输入要修改该的密码"
                type="password"
                v-model="form.updatePassword"
                label="要修改的密码:"
              />
            </el-form-item>
          </el-form>
          <el-button @click="updatePasswordBtnClick">修改密码</el-button>
        </div>
        <div class="title">退出登录</div>
        <el-button @click="exitClick">退出账号</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { updateUserInfo, getMyInfo, updatePassword } from "@/api/user";
import { uploadAvatar } from "@/api/file";
export default {
  data() {
    return {
      activeName: "first",
      file: "",
      fileUrl: null,
      imgMsg: "当前头像",
      isDisabled: true,
      inputValue: {
        id: "",
        name: "",
        age: "",
        sex: "",
        city: "",
        intro: "",
      },
      form: {
        currentPassword: "",
        updatePassword: "",
      },
      rules: {
        currentPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            required: true,
            pattern: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/,
            message:
              "密码至少包含数字、大字母、小写字母、符号至少两种，8-16位长度",
            trigger: "blur",
          },
        ],
        updatePassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            required: true,
            pattern: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/,
            message:
              "密码至少包含数字、大字母、小写字母、符号至少两种，8-16位长度",
            trigger: "blur",
          },
        ],
      },
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
          getMyInfo().then((res) => {
            res.data.avatarUrl += "?t=" + new Date().getTime();
            this.$store.commit("userInfo", res.data);
          });
        } else {
          this.$message.error("头像更新失败!" + res.msg);
        }
      });
    },
    updateUserInfoBtnClick() {
      if (this.inputValue.name.length < 2 || this.inputValue.name.length > 10) {
        return;
      }
      const { name, age, city, intro, sex } = this.inputValue;
      updateUserInfo(name, age, city, intro, sex)
        .then((res) => {
          if (res.status == 200) {
            this.$message.success({
              message: "个人信息修改成功!",
              duration: 5000,
              offset: 130,
            });
            getMyInfo().then((res) => {
              this.$store.commit("userInfo", res.data);
            });
          } else {
            this.$message.error({
              message: "个人信息修改失败!" + res.msg,
              duration: 5000,
              offset: 130,
            });
          }
        })
        .catch(() => {
          this.$message.error({
            message: "个人信息修改失败!",
            duration: 5000,
            offset: 130,
          });
        });
    },
    updatePasswordBtnClick() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.form);
          const password = this.form.currentPassword;
          const newPassword = this.form.updatePassword;
          updatePassword(password, newPassword).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message.success("密码修改成功!");
              localStorage.removeItem("token");
              setTimeout(() => {
                this.$router.replace("/login");
              }, 3000);
            } else {
              this.$message.error("密码修改失败,请查看密码是否输入有误!");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    exitClick() {
      this.$confirm("是否确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.removeItem("token");
        this.$router.replace("/login");
        this.$message({
          type: "success",
          message: "退出成功!",
        });
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
  mounted() {
    let timer = setInterval(() => {
      if (this.$store.state.user) {
        const { id, name, age, city, intro, sex } = this.$store.state.user;
        this.inputValue = { id, name, age, city, intro, sex };
        clearInterval(timer);
      }
    }, 500);
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
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
    transition: 0.2s border ease;
    &:hover {
      border-color: #0045ff;
    }
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
.user-info {
  border: 1px solid #dcdfe6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 250px;
  ::v-deep .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .scrollbar {
    .content > div {
      height: 44px;
    }
  }
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .lable {
    display: inline-block;
    width: 200px;
    font-size: 15px;
    color: #0045ff;
  }
  .el-input {
    width: 260px;
  }
  .el-button {
    margin-top: 85px;
  }
}
.update-password {
  .el-input {
    width: 250px;
    margin-right: 10px;
  }
  .password-lable {
    display: inline-block;
    width: 140px;
    font-size: 14px;
  }
  .el-button {
    margin-left: 140px;
    margin-top: 20px;
  }
}
</style>
