<template>
  <div class="login" :style="loginrStyle">
    <div class="form">
      <h2 class="title">用户登录</h2>
      <el-form ref="form" :model="form" class="form-main" :rules="rules">
        <el-form-item prop="id" label="账号:">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item prop="password" label="密码:">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-left: 80px"
            type="primary"
            @click="submitForm"
            :disabled="isDisabled"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <div class="error" v-if="isError">账号或者密码错误!</div>
      <div class="go-register">没有账号? 去<a href="/register">注册</a></div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/auth";

export default {
  data() {
    return {
      loginrStyle: {
        backgroundImage: `url(${require("assets/img/bg.png")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      form: {
        id: "",
        password: "",
      },
      rules: {
        id: [{ required: true, message: "请填写账号" }],
        password: [{ required: true, message: "请填写密码" }],
      },
      isDisabled: false,
      isError: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isDisabled = true;
          let { id, password } = this.form;
          login(id, password)
            .then((res) => {
              if (res.status === 200) {
                this.isError = false;
                localStorage.setItem("token", res.data.token);
                this.$router.push("/home");
              } else {
                this.isError = true;
                this.isDisabled = false;
              }
            })
            .catch((err) => {
              alert("服务器开了点小差~", err);
              this.isDisabled = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.form {
  position: absolute;
  width: 479px;
  height: 506px;
  background-color: #fff;
  right: 136px;
  top: 125px;
  border-radius: 14px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  padding-top: 45px;
  padding-left: 56px;
  margin-bottom: 20px;
}
.form .el-input {
  width: 247px;
}
.form-main {
  padding-left: 56px;
  margin-top: 80px;
}
.error {
  font-size: 20px;
  color: red;
  padding-left: 100px;
}
.go-register {
  text-align: right;
  font-size: 18px;
  margin-top: 110px;
  margin-right: 25px;
}
.go-register a {
  color: #0045ff;
}
@media screen and (max-width: 700px) {
  .form {
    position: unset;
    margin: 100px auto 0;
    width: 373px;
    border-radius: 10px;
  }
}
</style>
