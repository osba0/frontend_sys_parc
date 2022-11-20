<template>

    <div class="horizontal-menu">
      <nav class="navbar top-navbar col-lg-12 col-12 p-0">
        <div class="container-fluid">
          <div class="navbar-menu-wrapper d-flex align-items-center justify-content-between">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a class="navbar-brand brand-logo fw-lighter" title="Sys.Parc" href="/dashboard"><span class="fw-bold">Sys</span><span class="fw-bold">.</span>Parc</a>
              <a title="Ouvrir la page de paramétrage du client" class="border-end border-start border-start border-secondary navbar-brand brand-logo fw-lighter px-3 ms-3 h-100 d-flex align-items-center" href="/dashboard">
                <img src="../../public/template/images/logo-client.png" alt="logo" style="height:50px"/></a>
              <a class="navbar-brand brand-logo-mini" href="/dashboard"><img src="../../public/template/images/logo-mini.svg" alt="logo"/></a>
            </div>
            <div class="d-lg-block d-xl-block d-sm-none  h-100">
            <ul class="navbar-nav h-100" >
              <li v-for="(menu, index) in menu" :key="index"  class="nav-item dropdown border-end border-secondary  h-100 d-lg-flex mx-0">
                <a :href="(menu.route_menu=='/'? '' : '/'+menu.route_menu)+'/'+ getUrlFirstSubMenu(menu)" class="btn rounded-0 d-flex align-items-center fs-6" :class="[isCurrentRoute(menu) ? 'btn-inverse-primary activeMenu':'']">
                  <span>{{menu.nom_menu}}</span>
                </a>
              </li>
            </ul>
            </div>
            <ul class="navbar-nav navbar-nav-right">
              <li class="nav-item dropdown">
                <a class="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                  <i class="mdi mdi-bell mx-0"></i>
                  <span class="count bg-success">2</span>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                  <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                  <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <div class="preview-icon bg-success">
                        <i class="mdi mdi-information mx-0"></i>
                      </div>
                    </div>
                    <div class="preview-item-content">
                      <h6 class="preview-subject font-weight-normal">Application Error</h6>
                      <p class="font-weight-light small-text mb-0 text-muted">
                        Just now
                      </p>
                    </div>
                  </a>
                  <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <div class="preview-icon bg-warning">
                        <i class="mdi mdi-settings mx-0"></i>
                      </div>
                    </div>
                    <div class="preview-item-content">
                      <h6 class="preview-subject font-weight-normal">Settings</h6>
                      <p class="font-weight-light small-text mb-0 text-muted">
                        Private message
                      </p>
                    </div>
                  </a>
                  <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <div class="preview-icon bg-info">
                        <i class="mdi mdi-account-box mx-0"></i>
                      </div>
                    </div>
                    <div class="preview-item-content">
                      <h6 class="preview-subject font-weight-normal">New user registration</h6>
                      <p class="font-weight-light small-text mb-0 text-muted">
                        2 days ago
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-bs-toggle="dropdown">
                  <i class="mdi mdi-email mx-0"></i>
                  <span class="count bg-primary">4</span>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                  <p class="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
                  <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <img src="../../public/template/images/faces/face4.jpg" alt="image" class="profile-pic">
                    </div>
                    <div class="preview-item-content flex-grow">
                      <h6 class="preview-subject ellipsis font-weight-normal">David Grey
                      </h6>
                      <p class="font-weight-light small-text text-muted mb-0">
                        The meeting is cancelled
                      </p>
                    </div>
                  </a>
                  <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <img src="../../public/template/images/faces/face2.jpg" alt="image" class="profile-pic">
                    </div>
                    <div class="preview-item-content flex-grow">
                      <h6 class="preview-subject ellipsis font-weight-normal">Tim Cook
                      </h6>
                      <p class="font-weight-light small-text text-muted mb-0">
                        New product launch
                      </p>
                    </div>
                  </a>
                  <a class="dropdown-item preview-item">
                    <div class="preview-thumbnail">
                      <img src="../../public/template/images/faces/face3.jpg" alt="image" class="profile-pic">
                    </div>
                    <div class="preview-item-content flex-grow">
                      <h6 class="preview-subject ellipsis font-weight-normal"> Test 2
                      </h6>
                      <p class="font-weight-light small-text text-muted mb-0">
                        Upcoming board meeting
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a href="#" class="nav-link count-indicator "><i class="mdi mdi-message-reply-text"></i></a>
              </li>
              <li class="nav-item nav-profile dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                  <span class="nav-profile-name">{{ user.first_name }} {{ user.last_name }}</span>
                  <span class="online-status"></span>
                  <img src="../../public/template/images/faces/face28.png" alt="profile"/>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                  <a class="dropdown-item">
                    <i class="mdi mdi-settings text-primary"></i>
                    Settings
                  </a>
                  <a class="dropdown-item"  href="javascript:void (0)" @click="handleClick">
                    <i class="mdi mdi-logout text-primary"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle" @click="activeMobile()">
              <span class="mdi mdi-menu"></span>
            </button>
          </div>
        </div>
      </nav>
      <nav class="bottom-navbar" :class="[menu_mobile?'header-toggled':'']">
        <div class="container">
          <div class="d-lg-none d-sm-block  d-md-none d-xl-none">
            <div class="accordion" id="menuMobile">
              <div class="accordion-item" v-for="(menu, index) in menu" :key="index">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+menu.id" :aria-controls="'collapse'+menu.id" >
                    {{ menu.nom_menu }}
                  </button>
                </h2>
                <div :id="'collapse'+menu.id" class="accordion-collapse collapse" :class="[isCurrentRoute(menu) ? 'show':'']" aria-labelledby="headingOne" data-bs-parent="#menuMobile">
                  <div class="accordion-body">
                    <template v-for="sub in sous_menu" >
                      <div class="nav-item" :key="sub.id" v-if="sub.parent_id == menu.id">
                        <a :href="sub.route_sous_menu" class="nav-link" >
                          <i :class="sub.icone_sous_menu" class="menu-icon"></i>
                          <span>{{sub.name_sous_menu}}</span>
                        </a>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-sm-none d-lg-block d-xl-block">
            <ul class="nav page-navigation">
              <template v-for="sub in sous_menu" >
                <li class="nav-item" :key="sub.id" v-if="hasParentMenu(sub)" :class="[currentSubMenu==sub.name_sous_menu?'active':'']">
                  <a :href="sub.route_sous_menu" class="nav-link">
                    <i :class="sub.icone_sous_menu" class="menu-icon"></i>
                    <span class="menu-title">{{sub.name_sous_menu}}</span>
                  </a>
                </li>
              </template>
          </ul>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "NavView",
  data(){
    return {
      menu:  JSON.parse(localStorage.getItem('menu')),
      sous_menu: JSON.parse(localStorage.getItem('sous_menu')),
      menu_mobile: false,
      parentID: '',
      currentSubMenu: ''
    }
  },
  methods: {
    handleClick(){
      localStorage.removeItem('token');
      localStorage.removeItem('menu');
      localStorage.removeItem('sous_menu');
      this.$store.dispatch('user', null);
      this.$router.push('/login')
    },
    hasParentMenu(sub){
      for(let i=0; i<this.menu.length;i++){
        let obj = this.menu[i];
        if(obj.id==sub.parent_id && this.parentID==sub.parent_id){
          return true;
        }
      }
      return false;
    },
    isCurrentRoute(menu){
      for(let i=0; i<this.sous_menu.length;i++){
        let obj = this.sous_menu[i];
        if(menu.id==obj.parent_id && this.$route.path == (menu.route_menu=='/'? '/'+obj.route_sous_menu :'/'+menu.route_menu+'/'+obj.route_sous_menu)){
          this.parentID=menu.id;
          this.currentSubMenu=obj.name_sous_menu;
          return true;
        }
      }
      return false;
    },
    activeMobile(){
      this.menu_mobile = !this.menu_mobile;
    },
    getUrlFirstSubMenu(menu){
      for(let i=0; i<this.sous_menu.length;i++){
        let obj = this.sous_menu[i];
        if(menu.id==obj.parent_id){
          return obj.route_sous_menu;
        }
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created(){

  }
}
</script>

<style scoped>

</style>