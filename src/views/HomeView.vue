<template>

<div>
        <div class="row">
          <div class="col-sm-6 mb-4 mb-xl-0">
            <AppComponent msg="Welcome in Backend to Sys.Parc"/>
            <div class="d-lg-flex align-items-center">
              <div>
                <h3 class="text-dark font-weight-bold mb-2">Tableau de bord</h3>
                <h6 class="font-weight-normal mb-2">Last login was 23 hours ago. View details</h6>
              </div>

            </div>
          </div>

        </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
// @ is an alias to /src
import AppComponent from '@/components/Main.vue'

export default {
  name: 'HomeView',
  components: {
    AppComponent
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
