<template>
  <div class="Welcome">
    <transition
      name="fade"
      appear
      appear-class="custom-appear"
      appear-active-class="custom-appear-active"
    >
      <div class="title">welcome</div>
    </transition>
    <transition
      appear
      appear-class="custom-appear"
      appear-active-class="custom-appear-active"
    >
      <div class="footer">
        <div>
          <span class="f-1">I'm </span><span class="f-2"> WebChat </span
          ><span class="f-3"> , 每一天</span>
          <div class="f-4">乐.在.沟.通</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.Welcome {
  position: relative;
  height: 100%;
  background-color: #f4f9ff;

  .footer {
    padding-top: 30px;
    border-radius: 20px;
    margin-top: 121px;
    width: 100%;
    height: 160px;
    text-align: center;
    box-sizing: border-box;
    span {
      text-align: center;
    }
    .f-1,
    .f-3 {
      color: #343434;
      font-size: 39px;
    }
    .f-3 {
      letter-spacing: 0.2em;
    }
    .f-2 {
      color: #0045ff;
      font-size: 40px;
    }
    .f-4 {
      font-size: 40px;
      letter-spacing: 0.84em;
      color: #fba493;
      font-weight: 200;
    }
  }
}
.custom-appear-active {
  opacity: 1;
  transition: all 2s ease 0.4s;
}
.custom-appear {
  opacity: 0;
}
.title {
  text-align: center;
  font-size: 48px;
  color: #0045ff;
  height: 50px;
}
</style>
