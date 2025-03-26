<template>
  <div class="app">
    <h1>SERN - Quantum research</h1>
    <div class="terminal">
      <loginComponent v-if="!showHome" @go="showHome = true" />
      <homeComponent v-if="showHome" />
    </div>
  </div>
</template>
<script>
import homeComponent from './components/homeComponent.vue';
import loginComponent from './components/loginComponent.vue';

export default {
  data() {
    return {
      showHome: false
    }
  },  
  components: {
    homeComponent,
    loginComponent
  }
}
</script>
<style scoped>
.app {
  width: 80%;
  max-width: 1500px;
  height: 80%;
}

.terminal {
  width: 100%;
  height: 100%;
}
</style>
