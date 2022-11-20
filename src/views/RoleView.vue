<template>
  <div>
    <div class="row">
      <div class="col-sm-12 grid-margin d-flex stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="card-title mb-3">Liste des rôles</h4>
            </div>
            <div class="table-responsive">
              <div class="d-flex justify-content-end">
                <div class="form-group">
                  <div class="input-group">
                    <input type="text" placeholder="Ajouter un role" aria-label="Ajouter un role" v-model="newRole" class="form-control py-1 px-3 rounded">
                    <div class="input-group-append">
                      <button class="btn btn-sm btn-primary ms-2" type="button" @click="onRoleStore()">
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                <table class="table  table-striped table-hover">
                  <thead class="thead-dark">
                  <tr>
                    <th class="fw-bold">#</th>
                    <th class="fw-bold">Nom</th>
                    <th class="fw-bold w-50">Autorisations attribuées</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(role, index) in roles.data.data" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ role.name }}</td>
                    <td>
                      <ul class="list-unstyled list-inline">
                        <li v-for="(perm, index) in role.permissions" :key="index" class="list-inline-item">
                          <label class="badge badge-primary">{{ perm.name }}</label>
                        </li>
                      </ul>
                    </td>
                    <td class="text-end">
                      <button
                          class="me-2 btn btn-inverse-primary btn-icon"
                          v-if="roles.view_index !== false"
                      >
                        <i class="mdi mdi-eye"></i>
                      </button>
                      <button
                          class="me-2 btn btn-inverse-warning btn-icon"
                          data-bs-target="#modifyRole" data-bs-toggle="modal" data-bs-dismiss="modal"
                          v-if="roles.edit_index !== false"
                          @click="modifyRole(role)"
                      >
                        <i class="mdi mdi-pencil"></i>
                      </button>
                      <button
                          @click="onRoleDelete(role.id);"
                          class="btn btn-inverse-danger btn-icon"
                          v-if="roles.delete_index !== false"
                      >
                        <i class="mdi mdi-delete "></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              <div class="d-flex justify-content-center">
                <ul class="btn-group list-unstyled mt-2">
                  <li
                      class="page-item font-weight-bold ml-2"
                      v-for="(link, index) in roles.data.links"
                      :key="index"
                      aria-current="page"
                      :title="'Page ' + link.label"
                  >
                    <span
                        class="page-link px-3 text-white bg-primary"
                        aria-disabled="true"
                        v-if="link.label == roles.data.current_page"
                    >
                      {{ roles.data.current_page }}
                    </span>
                    <span
                        class="page-link px-3 text-secondary opacity-50"
                        aria-disabled="true"
                        v-else-if="link.url == null && link.label == '&laquo; Previous'"
                    >
                      ❮
                    </span>
                    <span
                        class="page-link px-3"
                        v-else-if="link.url != null && link.label == '&laquo; Previous'"
                        v-on:click="getRoles(roles.data.current_page-1)"
                        role="button"
                    >
                    <a class="text-dark">
                      ❮
                    </a>
                  </span>
                    <span
                        class="page-link  px-3 text-secondary opacity-50"
                        aria-disabled="true"
                        v-else-if="link.url == null && link.label == 'Next &raquo;'"
                    >
                       ❯
                    </span>
                    <span
                        class="page-link px-3 disabled"
                        aria-disabled="true"
                        v-else-if="link.url != null && link.label == 'Next &raquo;'"
                        v-on:click="getRoles(roles.data.current_page+1)"
                        role="button"
                    >
                    <a class="text-dark">
                     ❯
                    </a>
                  </span>
                    <span class="page-link  px-3"  role="button" v-on:click="getRoles(link.label)" v-else>
                    <a class="text-dark" v-html="link.label"></a>
                  </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!--Modal modify-->
    <div class="modal fade" id="modifyRole" aria-hidden="true" aria-labelledby="modifyRoleLabel" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyRoleLabel">Editer le profil: <span class="text-primary fw-bold text-uppercase fw-3"><u>{{ editRoleResp.role.name }}</u></span> </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex no-auth"  v-if="editRoleResp.index == false ">
            <div class="d-flex flex-column m-auto">
              <h1 class="text-center">401</h1>
              <h1 class="text-center text-danger">UNAUTHORIZED</h1>
              <h5 class="text-center">{{ editRoleResp.message }}</h5>
            </div>
          </div>
            <section id="new-product" class="d-flex" v-else>
              <div class="col">
                <h5 class="my-3 text-success">Ajouter Permission:</h5>
                <div class="text-center">
                  <select
                      class="w-100 border-radius-5px mb-2"
                      v-model="permId"
                      multiple
                  >
                    <option
                        v-for="(perm,
                      index) in editRoleResp.not_granted_permissions"
                        :key="index"
                        :value="perm.id"
                    >
                      {{ perm.name }}
                    </option>
                  </select>

                  <a
                      type="button"
                      @click="update((type = 'Added'));"
                      class="btn btn-success btn-sm my-auto"
                  >
                    Ajouter
                  </a>
                </div>
              </div>
              <div class="d-flex align-items-center px-3">
                <i class=" mdi mdi-swap-horizontal fs-3"></i>
              </div>
              <div class="col">
                <h5 class="my-3 text-danger">Supprimer Permission:</h5>
                <div class="text-center">
                  <select
                      class="w-100 border-radius-5px mb-2"
                      v-model="permId"
                      multiple
                  >
                    <option
                        v-for="(perm, index) in editRoleResp.granted_permissions"
                        :key="index"
                        :value="perm.id"
                    >
                      {{ perm.name }}
                    </option>
                  </select>
                  <a
                      type="button"
                      @click="
                      update((type = 'Removed'));
                      getRoles();
                  "
                      class="btn btn-danger btn-sm my-auto"
                  >
                    Supprimer
                  </a>
                </div>
              </div>

            </section>
          </div>
          <div class="modal-footer justify-content-center">
            <button class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "RoleView",
  data() {
    return {
      newRole: '',
      editRoleResp: {role:{}},
      permId: [],
      hasResp: false
    };
  },
  methods: {
    ...mapActions(['storeNewRole', 'updateRole', 'getRoles', 'viewRole', 'deleteRole', 'editRole']),
    async onRoleStore(){
      const response = await this.storeNewRole(this.newRole);

      if(response){
        this.newRole ="";
        this.showNotif();
        this.getRoles();
      }
    },
    async onRoleDelete(id){
      const response = await this.deleteRole(id);
      console.log("ss", response);
      if(response){
        this.showNotif();
        this.getRoles();
      }
    },
    showNotif(){
      for(let i=0; i<this.retrieveMessage.response_message.length; i++){
        let obj =  this.retrieveMessage.response_message[i];
        this.$notify({
          group: 'foo',
          title:  this.retrieveMessage.response_type,
          text: obj,
          type: this.retrieveMessage.response_type === 'Error'? 'error':'success'
        }); 
      }
    },
    async modifyRole(role){
      this.editRoleResp = await this.editRole(role.id);
      this.hasResp = true;
    },
    update(type) {
      let data = {};
      data['type'] = type;
      data['roleId'] = this.editRoleResp.role.id;
      data['permIds'] = this.permId
      this.updateRole(data);
      this.modifyRole(this.editRoleResp.role);
    },
  },

  computed: {
    ...mapGetters(['editRoleInputs', 'retrieveMessage', 'roles', 'loading']),
  },

  created() {
    this.getRoles();

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>