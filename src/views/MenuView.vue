<template>
  <div>

    <div class="row">
      <div class="col-sm-7 grid-margin d-flex stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="card-title mb-3">Configuration des Menus</h4>
            </div>
            <div>
              <div class="accordion" id="configMenu">
                <div class="accordion-item" v-for="(menu, index) in menu" :key="index">
                  <h2 class="accordion-header" :id="'heading'+menu.id">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+menu.id" :aria-controls="'collapse'+menu.id" >
                      {{ menu.nom_menu }}
                    </button>
                  </h2>
                  <div :id="'collapse'+menu.id" class="accordion-collapse collapse" :class="[index==0? 'show':'']" aria-labelledby="'heading'+menu.id" data-bs-parent="#menuMobile">
                    <div class="accordion-body">
                      <div class="table-responsive">
                        <div class="pt-2 pb-3 d-flex justify-content-between align-items-end">
                          <div class="d-flex align-items-end">
                            <div class="me-2">
                              <label class="mb-2"><u>Menu:</u></label>
                              <span class="badge badge-dark px-3 mx-3" v-if="upMenu.id!==menu.id">{{ menu.nom_menu }}</span>
                              <input type="text" v-model="upMenu.nom_menu" class="form-control py-1 px-2" v-else/>
                            </div>
                            <div class="me-2">
                              <label class="mb-2 text-nowrap">Lien</label>
                              <span class="badge badge-dark px-3 mx-3" v-if="upMenu.id!==menu.id">{{ menu.route_menu }}</span>
                              <input type="text" v-model="upMenu.route_menu" class="form-control py-1 px-2"  v-else/>
                            </div>
                            <div class="me-2">
                              <label class="mb-2 text-nowrap">N° Ordre</label>
                              <span class="badge badge-dark px-3 mx-3" v-if="upMenu.id!==menu.id">{{ menu.level_menu }}</span>
                              <input type="number" v-model="upMenu.level_menu" class="form-control py-1 px-2 small-width" v-else/>
                            </div>
                            <div class="me-2">
                              <label class="mb-2">Icone</label>
                              <span class="badge badge-dark px-3 mx-3" v-if="upMenu.id!==menu.id">{{ menu.icone_menu==''? '-': menu.icone_menu }}</span>
                              <input type="text" v-model="upMenu.icone_menu" class="form-control py-1 px-2" v-else/>
                            </div>
                            <div class="me-2">
                              <label class="mb-2">Etat</label>
                              <span class="badge badge-dark px-3 mx-3" v-if="upMenu.id!==menu.id">{{ menu.etat_menu==1?'Activé':'Désactivé' }}</span>
                              <label class="toggle-switch toggle-switch-success d-block" v-else>
                                <input type="checkbox"  v-model="upMenu.etat_menu" :checked="upMenu.etat_menu==1?true:false">
                                <span class="toggle-slider round"></span>
                              </label>
                            </div>

                          </div>
                          <div>
                            <template  v-if="upMenu.id!==menu.id">
                              <button type="button" class="btn btn-outline-warning btn-rounded btn-icon me-2"  @click="editMenu(menu)">
                                <i class="mdi mdi-pencil"></i>
                              </button>
                              <button type="button"  @click="onMenuDelete(menu.id);" class="btn btn-outline-danger btn-rounded btn-icon">
                                <i class="mdi mdi-delete"></i>
                              </button>
                            </template>

                            <template v-else>
                              <button type="button" title="Enregistrer" class="me-2 btn btn-inverse-success btn-icon" @click="saveEdit()">
                                <i class="mdi mdi-check"></i>
                              </button>
                              <button type="button" title="Annuler" class="btn btn-inverse-light btn-icon" @click="initModif()">
                                <i data-v-3ec79cde="" class="mdi mdi-undo"></i>
                              </button>
                            </template>


                          </div>
                        </div>
                        <hr/>
                        <div>
                          <label><u>Sous Menu:</u></label>
                        </div>
                        <table class="table">
                          <thead>
                          <tr>
                            <th class="fw-bold">Nom</th>
                            <th class="fw-bold">Lien</th>
                            <th class="fw-bold">N° Ordre</th>
                            <th class="fw-bold">Icone</th>
                            <th class="fw-bold">Etat</th>
                            <th></th>
                          </tr>
                          </thead>
                          <tbody>
                          <template v-for="sub in sous_menu" >
                            <tr :key="sub.id" v-if="sub.parent_id == menu.id">
                              <td>
                                <span v-if="subMenu.id != sub.id">{{sub.name_sous_menu}}</span>
                                <input type="text" v-model="subMenu.name_sous_menu" class="form-control py-1 px-2" v-else/>
                              </td>
                              <td>
                                <span v-if="subMenu.id != sub.id">{{sub.route_sous_menu}}</span>
                                <input type="text" v-model="subMenu.route_sous_menu" class="form-control py-1 px-2" v-else/>
                              </td>
                              <td>
                                <span v-if="subMenu.id != sub.id">{{sub.level_sous_menu}}</span>
                                <input type="text" v-model="subMenu.level_sous_menu" class="form-control py-1 px-2" v-else/>
                              </td>
                              <td>
                                <i  v-if="subMenu.id != sub.id" :class="sub.icone_sous_menu" class="menu-icon fs-3"></i>
                                <input type="text" v-model="subMenu.icone_sous_menu" class="form-control py-1 px-2" v-else/>
                              </td>
                              <td>
                                <span class="badge" :class="[sub.etat_sous_menu==1?'badge-success':'badge-danger']" v-if="subMenu.id != sub.id">
                                  {{ sub.etat_sous_menu==1? 'Activé': 'Désactivé'}}
                                </span>
                                <label class="toggle-switch toggle-switch-success" v-else>
                                  <input type="checkbox" :checked="sub.etat_sous_menu==1?true:false">
                                  <span class="toggle-slider round"></span>
                                </label>
                              </td>
                              <td>
                                <div class="d-flex justify-content-end w-100">
                                  <template v-if="subMenu.id != sub.id">
                                    <button type="button" class="me-2 btn btn-inverse-warning btn-icon" @click="editSubMenu(sub)">
                                      <i class="mdi mdi-pencil"></i>
                                    </button>
                                    <button type="button" class="btn btn-inverse-danger btn-icon">
                                      <i class="mdi mdi-delete"></i>
                                    </button>
                                  </template>
                                  <template v-else>
                                    <button type="button" title="Enregistrer" class="me-2 btn btn-inverse-success btn-icon" @click="saveEditSub()">
                                      <i class="mdi mdi-check"></i>
                                    </button>
                                    <button type="button" title="Annuler" class="btn btn-inverse-light btn-icon" @click="initModifSub()">
                                      <i data-v-3ec79cde="" class="mdi mdi-undo"></i>
                                    </button>
                                  </template>
                                </div>

                              </td>
                            </tr>
                          </template>
                          <tr :class="[activeFormSubMenu && idAddSusMenu==menu.id? '':'d-none']">
                            <td>
                              <input type="text" class="form-control w-100 p-2"/>
                            </td>
                            <td>
                              <input type="text"  class="form-control w-100 p-2"/>
                            </td>
                            <td>
                              <input type="number"  class="form-control w-100 p-2"/>
                            </td>
                            <td>
                              <input type="text"  class="form-control w-100 p-2"/>
                            </td>
                            <td>
                              <label class="toggle-switch toggle-switch-success">
                                <input type="checkbox">
                                <span class="toggle-slider round"></span>
                              </label>
                            </td>
                            <td>
                              <button type="button" title="Enregistrer" class="me-2 btn btn-inverse-success btn-icon">
                                <i class="mdi mdi-check"></i>
                              </button>
                              <button type="button" title="Annuler" class="btn btn-inverse-light btn-icon">
                                <i class="mdi mdi-undo"></i>
                              </button>
                            </td>
                          </tr>
                          <tr :class="[activeFormSubMenu && idAddSusMenu==menu.id? 'd-none':'']">
                            <td colspan="6" class="text-center">
                              <button type="button" class="btn btn-outline-primary btn-sm" @click="showFormSubMenu(menu)">
                                <i class="fs-5 mdi mdi-plus-circle align-middle"></i>
                                <span class="ps-2">Ajouter un sous menu</span>
                              </button>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-5 grid-margin d-flex stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="card-title mb-3">Formulaire création Menu</h4>
            </div>
            <div>
              <form class="forms-sample">
                <div class="form-group row">
                  <label for="nom_menu" class="col-sm-3 col-form-label">Nom Menu</label>
                  <div class="col-sm-9">
                    <input type="text" v-model="newMenu.nom_menu" class="form-control" id="nom_menu" placeholder="Nom du menu">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="route_menu" class="col-sm-3 col-form-label">Lien</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" v-model="newMenu.route_menu" id="route_menu" placeholder="Lien du menu">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="level_menu" class="col-sm-3 col-form-label">N° Ordre</label>
                  <div class="col-sm-9">
                    <input type="number" class="form-control" v-model="newMenu.level_menu" id="level_menu" placeholder="Position du menu">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="icone_menu" class="col-sm-3 col-form-label">Icone</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" id="icone_menu" v-model="newMenu.icone_menu" placeholder="Icone du menu">
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Etat</label>
                  <div class="col-sm-9 d-flex align-items-center">
                    <label class="toggle-switch toggle-switch-success">
                      <input type="checkbox" checked v-model="newMenu.etat_menu">
                      <span class="toggle-slider round"></span>
                    </label>
                  </div>
                </div>
                <button class="btn btn-primary me-2"  type="button" @click="onMenuStore()">Enregistrer</button>
                <button class="btn btn-light">Annuler</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "MenuView",
  data(){
    return {
      menu:  JSON.parse(localStorage.getItem('menu')),
      sous_menu: JSON.parse(localStorage.getItem('sous_menu')),
      idAddSusMenu: '',
      activeFormSubMenu: false,
      newMenu: {
        nom_menu: '',
        route_menu: '',
        level_menu: '',
        etat_menu: 0,
        icone_menu: ''
      },
      upMenu: {
        id: '',
        nom_menu: '',
        route_menu: '',
        level_menu: '',
        etat_menu: 0,
        icone_menu: ''
      },
      subMenu: {
        id: '',
        name_sous_menu: '',
        route_sous_menu: '',
        level_sous_menu: '',
        icone_sous_menu: '',
        etat_sous_menu: 0
      }
    }
  },
  methods: {
    ...mapActions(['storeNewMenu', 'deleteMenu', 'updateMenu']),
    showFormSubMenu(menu){
      this.activeFormSubMenu = true;
      this.idAddSusMenu = menu.id;
    },
    async onMenuStore(){
      const response = await this.storeNewMenu(this.newMenu);

      console.log(this.retrieveMessageMenu.last_created);
      this.menu.push(this.retrieveMessageMenu.last_created);
      localStorage.removeItem('menu');
      localStorage.setItem('menu',  JSON.stringify(this.menu));

      if(response){
        this.flushData();
        this.showNotif();
      }
    },
    async onMenuDelete(id){
      const response = await this.deleteMenu(id);
      if(response){
        this.showNotif();
        // Remove menu from Storage
        let tampon = [];
        for(let i=0; i<this.menu.length; i++){
          if(this.menu[i].id != id){
            tampon.push(this.menu[i]);
          }
        }
        this.menu = tampon;
        localStorage.removeItem('menu');
        localStorage.setItem('menu',  JSON.stringify(tampon));
      }
    },
    showNotif(){
      for(let i=0; i<this.retrieveMessageMenu.response_message.length; i++){
        let obj =  this.retrieveMessageMenu.response_message[i];
        this.$notify({
          group: 'foo',
          title:  this.retrieveMessageMenu.response_type,
          text: obj,
          type: this.retrieveMessageMenu.response_type === 'Error'? 'error':'success'
        });
      }
    },
    flushData(){
      this.newMenu.nom_menu= '';
      this.newMenu.route_menu= '';
      this.newMenu.level_menu= '';
      this.newMenu.etat_menu= 0;
      this.newMenu.icone_menu= '';
    },
    editMenu(current){
      this.upMenu.id=current.id;
      this.upMenu.nom_menu=current.nom_menu;
      this.upMenu.route_menu=current.route_menu;
      this.upMenu.level_menu=current.level_menu;
      this.upMenu.etat_menu=current.etat_menu;
      this.upMenu.icone_menu=current.icone_menu;
    },
    initModif(){
      this.upMenu.id= '';
      this.upMenu.nom_menu= '';
      this.upMenu.route_menu= '';
      this.upMenu.level_menu= '';
      this.upMenu.etat_menu= 0;
      this.upMenu.icone_menu= '';
    },
    async saveEdit(){
      const response = await this.updateMenu(this.upMenu);
      if(response) {
        this.showNotif();
        if(this.retrieveMessageMenu.response_type =='Success'){

          // Remove and add menu updated from Storage
          let tampon = [];
          for(let i=0; i<this.menu.length; i++){
            if(this.menu[i].id === this.upMenu.id){
              tampon.push(this.retrieveMessageMenu.menu_updated);
            }else{
              tampon.push(this.menu[i]);
            }
          }
          this.menu = tampon;
          localStorage.removeItem('menu');
          localStorage.setItem('menu',  JSON.stringify(tampon));
          this.initModif();
        }
      }
    },
    editSubMenu(sub){
      this.subMenu.id = sub.id;
      this.subMenu.name_sous_menu = sub.name_sous_menu;
      this.subMenu.route_sous_menu = sub.route_sous_menu;
      this.subMenu.level_sous_menu = sub.level_sous_menu;
      this.subMenu.icone_sous_menu = sub.icone_sous_menu;
      this.subMenu.etat_sous_menu = sub.etat_sous_menu;
    },
    saveEditSub(){

    },
    initModifSub(){
      this.subMenu.id = '';
      this.subMenu.name_sous_menu = '';
      this.subMenu.route_sous_menu = '';
      this.subMenu.level_sous_menu = '';
      this.subMenu.icone_sous_menu = '';
      this.subMenu.etat_sous_menu = '';
    }

  },
  computed: {
    ...mapGetters(['retrieveMessageMenu', 'loadingMenu']),
  }
}
</script>

<style scoped>

</style>