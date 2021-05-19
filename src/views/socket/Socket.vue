<template>
  <div style="display: none">socket.io</div>
</template>

<script>
export default {
  sockets: {
    connecting() {
      console.log("正在连接");
    },
    disconnect() {
      console.log("Socket 断开");
    },
    connect_failed() {
      console.log("连接失败");
    },
    connect() {
      console.log("socket connected");
    },
  },
  methods: {
    sendMsg(msg) {
      this.$socket.emit(
        "sendMsg",
        {
          friendId: this.friendId,
          // friendId: this.$store.state.user.id,
          userId: this.$store.state.user.id,
          msg,
        },
        (data) => {
          console.log(data);
          if (data === "fail") {
            //如果发送失败!
            this.$emit("sendErr");
          }
        }
      );
    },
  },
  props: ["friendId"],
};
</script>

<style></style>
