<template>
  <div class="app">
    <h1>SERN - Quantum research</h1>
    <div class="terminal">
      <loginComponent v-if="show.login" @go="setRoute('home')" />
      <homeComponent v-if="show.home" @goToNews="setRoute('news')" />
      <newsComponent v-if="show.news" @selectNotice="setRoute('newsDetails', $event)" @back="setRoute('home')" />
      <noticeDetails v-if="show.newsDetails" :noticeDetails="newsDetails" @back="setRoute('news')" />
    </div>
  </div>
</template>
<script>
import homeComponent from './components/homeComponent.vue';
import loginComponent from './components/loginComponent.vue';
import newsComponent from "./components/newsComponent.vue";
import noticeDetails from "./components/noticeDetails.vue";

import audioAmbient from "./assets/audio/terminal-ambient.mp3";

export default {
  data() {
    return {
      showHome: false,
      show: {
        login: true,
        home: false,
        news: false,
        newsDetails: false
      },
      newsDetails: null,
      audio: null
    }
  },  
  methods: {
    setRoute: function (route, event) {
      this.show.login = false;
      this.show.home = false;
      this.show.news = false;
      this.show.newsDetails = false;

      switch (route) {
        case "login":
          this.show.login = true;
          break;
        case "home":
          this.createAudio();
          this.show.home = true;
          break;
        case "news":
          this.show.news = true;
          break;
        case "newsDetails":
          this.newsDetails = event;
          this.show.newsDetails = true;
          break;
      }
    },
    createAudio: function () {
      this.audio = new Audio(audioAmbient); 
      this.audio.play();

      setTimeout(() => {
        this.onAudioEnded();
      }, 4250)
    },
    onAudioEnded() {
      this.audio.currentTime = 0; 
      this.audio.play(); 

      setTimeout(() => {
        this.createAudio();
      }, 4250)
    }
  },
  components: {
    homeComponent,
    loginComponent,
    newsComponent,
    noticeDetails
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
