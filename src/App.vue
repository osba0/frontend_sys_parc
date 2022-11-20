<template>
  <div id="app"  class="container-scroller">
    <template v-if="user">
      <NavView/>
    </template>
    <template  v-if="currentRouteName()!=='login'">
      <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view />
          </div>
          <FooterView v-if="user"/>
        </div>
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
    <notifications group="foo" />
  </div>
</template>
<script>
import axios from 'axios'
import NavView from "@/views/NavView"
import FooterView from "@/views/FooterView"
import {mapGetters} from "vuex";

export default {
  name: "App",
  components: {
    NavView,
    FooterView
  },
  methods: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  async created() {
    if(this.$route.name !== 'login'){
      const response = await axios.get('user');
      this.$store.dispatch('user', response.data);
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
<style>
</style>