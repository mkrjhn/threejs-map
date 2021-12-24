<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <img class="test" alt="Vue logo" src="@/assets/logo.png">
  <HelloWorld msg="asdf" msg2="" />
  <div class="test_test">
    asdfsdf
  </div>
</template>

<style lang="pcss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.test {
  font-size: 15px;

  &_test {
    font-size: 16px;
    background: url('@/assets/logo.png') 0 0 no-repeat;
  }
}
</style>
