<template>
  <div id="header">
    <v-toolbar app class="toolbar">
      <v-container pa-0>
        <v-layout>

          <v-flex xs1 md2 xl1 offset-md2>
            <router-link to="/" class="link">
              <v-icon>home</v-icon>
            </router-link>
          </v-flex>

          <v-flex xs4 md2 xl1>
            <router-link to="/login" class="link">
              CONNEXION
            </router-link>
          </v-flex>

          <v-flex xs3 md2 xl1>
            <router-link to="/game" class="link">
              JEU
            </router-link>
          </v-flex>

          <v-flex xs3 md2 xl1>
            <router-link to="/scores" class="link">
              SCORES
            </router-link>
          </v-flex>

          <v-flex xs1 md2 xl1 offset-xs1 offset-md2>
            <div class="link">
              <v-icon>settings</v-icon>
            </div>
          </v-flex>

        </v-layout>
      </v-container>
    </v-toolbar>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  background: #6200ee;

  .link {
    font-size: 15px;
    text-decoration: none;
    font-weight: bold;
    color: #eee;

    >.v-icon {
      color: #eee;
    }

    &.router-link-exact-active {
      color: #e65dff;
      >.v-icon {
        color: #e65dff;
      }
    }
  }
}
</style>


<script>

export default {
  name: 'Header',
  mounted() {
    navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      let cameras = {};
      for(const device of devices) {
        if(device.kind !== 'videoinput') continue;
        
        let name = device.label;
        if(name.indexOf('back') > -1) {
          name = "Caméra arrière";
        }
        else if(name.indexOf('front') > -1) {
          name = "Caméra avant";
        }
        cameras[name] = device.deviceId;
      }
      this.$store.commit('setCameraIds', cameras)
    });
  },
};
</script>
