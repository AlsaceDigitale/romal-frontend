<template>
  <div id="app">
    <v-app dark>

      <header-section />

      <router-view id="content" />

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline"
            primary-title
          >
            Plein écran
          </v-card-title>

          <v-card-text>
            Mettre en plein écran pour mieux profiter du jeu ? Un bouton en bas à gauche vous permettra de quitter ce mode.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="amber"
              flat
              @click="dialog = false"
            >
              Mmh non
            </v-btn>
            <v-btn
              color="primary"
              flat
              @click="fullScreen();dialog = false"
            >
              Allez !
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card style="position: absolute; top:0; bottom: 0; " v-if="$store.state.fullScreen">
        <v-card-text style="position: absolute; bottom: 15px; left: 60px;">
          <v-btn
            absolute
            dark
            fab
            top
            right
            id="exitFullScreenBtn"
            @click="exitFullScreen"
          >
            <v-icon>fullscreen_exit</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>

    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  background: #424242;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee;

  #content {
    min-height: 100%;
    padding-top: 56px;
  }

  #exitFullScreenBtn {
    background-color: rgba(95, 95, 95, 0.32) !important;
  }
}
</style>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    'header-section': Header,
  },
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    fullScreen() {
      this.$store.state.fullScreen = true;

      const docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    },
    exitFullScreen() {
      this.$store.state.fullScreen = false;

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  },
  mounted() {
    if(localStorage.getItem('pseudo')) {
      this.$store.state.pseudo = localStorage.getItem('pseudo');
    }
    if(localStorage.getItem('email')) {
      this.$store.state.email = localStorage.getItem('email');
    }
  }
};
</script>
