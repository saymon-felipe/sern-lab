<template>
  <div class="terminal">
    <homeComponent />
  </div>
</template>
<script>
import homeComponent from './components/homeComponent.vue';

export default {
  components: {
    homeComponent
  }
}
</script>
<style scoped>
.terminal {
  width: 80%;
  max-width: 1500px;
}
</style>
