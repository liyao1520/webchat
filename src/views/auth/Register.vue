<template>
  <div class="register" :style="registerStyle">
    <div class="form">
      <h2 class="title">用户注册</h2>
      <el-steps :active="active" simple>
        <el-step title="填写表单" icon="el-icon-edit"> </el-step>
        <el-step title="提交表单" icon="el-icon-upload"> </el-step>
        <el-step title="完成注册" icon="el-icon-success"></el-step>
      </el-steps>
      <div class="success" v-if="this.active === 3">
        <div class="tips">恭喜你注册成功!</div>
        <div class="info">
          <div class="username">
            昵称: <span class="content">{{ user.username }}</span>
          </div>
          <div class="id">
            账号: <span class="content">{{ user.id }}</span>
          </div>
        </div>
        <div class="msg">请牢记自己的账号<a href="/login">去登陆</a></div>
      </div>
      <div class="main" v-else>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="昵称:" prop="username">
            <el-input
              v-model="form.username"
              placeholder="起一个好听的昵称~"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="repassword">
            <el-input
              v-model="form.repassword"
              type="password"
              placeholder="再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="submitForm"
              type="primary"
              style="margin-left: 80px"
              >提交</el-button
            >
            <i class="el-icon-loading loading" v-show="loadingIsShow"></i>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/auth";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerStyle: {
        backgroundImage: `url(${require("assets/img/bg.png")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      form: {
        username: "",
        password: "",
        repassword: "",
        sex: "男",
      },
      active: 1,
      loadingIsShow: false,
      rules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            required: true,
            pattern: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/,
            message:
              "密码至少包含数字、大字母、小写字母、符号至少两种，8-16位长度",
            trigger: "blur",
          },
        ],
        repassword: [{ validator: validatePass }],
      },
      user: {}, //用户信息
    };
  },
  methods: {
    submitClick() {
      this.loadingIsShow = true;
      this.active = 2;
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loadingIsShow = true;
          this.active = 2;
          let { username, password, sex } = this.form;
          register(username, password, sex)
            .then((res) => {
              this.user = res.data;
              console.log(this.user);
              this.loadingIsShow = false;
              this.active = 3;
            })
            .catch(() => {
              this.loadingIsShow = false;
              this.active = 1;
              alert("服务器开了点小差~");
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.register {
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
.main {
  padding-left: 56px;
  margin-top: 20px;
}
.main .el-input {
  width: 247px;
}
.main .el-form-item__label {
  width: 100px;
  text-align: right;
}
.loading {
  font-size: 20px;
  margin-left: 20px;
}
.success .tips {
  font-size: 25px;
  text-align: center;
  color: #0045ff;
  margin-top: 40px;
}
.success .info {
  padding-left: 30px;
  font-size: 21px;
}
.success .info .username,
.id {
  margin: 30px 0;
}
.success .info .content {
  padding-left: 50px;
}
.success .msg {
  text-align: center;
  margin-top: 90px;
  font-size: 18px;
}
.success .msg > a {
  color: #0045ff;
}
@media screen and (max-width: 800px) {
  .form {
    position: unset;
    margin: 100px auto 0;
    width: 373px;
    border-radius: 10px;
  }
  .main {
    padding-left: 10px;
  }
}
</style>
