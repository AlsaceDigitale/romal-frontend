<template>
  <div id="app">
    <v-app dark>
      <header-section />
      <router-view id="content" />
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  background: #252344;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee;

  #content {
    min-height: 100%;
    padding-top: 56px;
  }
}
</style>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    'header-section': Header,
  },
};
</script>
