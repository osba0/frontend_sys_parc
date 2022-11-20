<template>
<div>
  <div class="row">
    <div class="col-sm-12 grid-margin d-flex stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="card-title mb-3">Liste des permissions</h4>
          </div>
          <div class="table-responsive">
            <div class="d-flex justify-content-end">
              <div class="form-group">
                <div class="input-group">
                  <input type="text" placeholder="Ajouter une permission" aria-label="Ajouter une permission" v-model="newPermission" class="form-control py-1 px-3 rounded">
                  <div class="input-group-append">
                    <button class="btn btn-sm btn-primary ms-2" type="button"
                            @click="onPermissionStore()">
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
                <th class="fw-bold w-50">Rôle attribués</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(perm, index) in permissions.data.data" :key="index">
                <td>  {{
                    (permissions.data.current_page - 1) * 8 + index + 1
                  }}</td>
                <td>{{ perm.name }}</td>
                <td>
                  <ul class="list-unstyled list-inline">
                    <li v-for="(role, index) in perm.roles" :key="index" class="list-inline-item">
                      <label class="badge badge-primary">{{ role.name }}</label>
                    </li>
                  </ul>
                </td>
                <td class="text-end">
                  <button
                      class="me-2 btn btn-inverse-primary btn-icon"
                      v-if="permissions.view_index !== false"
                  >
                    <i class="mdi mdi-eye"></i>
                  </button>
                  <button
                      class="me-2 btn btn-inverse-warning btn-icon"
                      v-if="permissions.edit_index !== false"
                  >
                    <i class="mdi mdi-pencil"></i>
                  </button>
                  <button
                      @click="onRoleDelete(role.id);"
                      class="btn btn-inverse-danger btn-icon"
                      v-if="permissions.delete_index !== false"
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
                    v-for="(link, index) in permissions.data.links"
                    :key="index"
                    aria-current="page"
                    :title="'Page ' + link.label"
                >
                    <span
                        class="page-link px-3 text-white bg-primary"
                        aria-disabled="true"
                        v-if="link.label == permissions.data.current_page"
                    >
                      {{ permissions.data.current_page }}
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
                      v-on:click="getPermissions(permissions.data.current_page-1)"
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
                        v-on:click="getPermissions(permissions.data.current_page+1)"
                        role="button"
                    >
                    <a class="text-dark">
                     ❯
                    </a>
                  </span>
                  <span class="page-link  px-3"  role="button" v-on:click="getPermissions(link.label)" v-else>
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
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "PermissionView.vue",
  data() {
    return {
      newPermission: '',
      filter:  '',
      columns: [
        { label: 'ID', field: 'id', align: 'center', filterable: false },
        { label: 'Nom', field: 'name', align: 'center', filterable: false }
      ],
      page: 3,
    };
  },
  methods: {
    ...mapActions([ 'getPermissions',
      'viewPermission',
      'editPermission',
      'deletePermission',
      'storeNewPermission']),
    async onPermissionStore(){
      const response = await this.storeNewPermission(this.newPermission);

      if(response){
        this.newPermission ="";
        this.showNotif();
        this.getPermissions();
      }
    },
    showNotif(){
      for(let i=0; i<this.retrieveMessage2.response_message.length; i++){
        let obj =  this.retrieveMessage2.response_message[i];
        this.$notify({
          group: 'foo',
          title:  this.retrieveMessage2.response_type,
          text: obj,
          type: this.retrieveMessage2.response_type === 'Error'? 'error':'success'
        });
      }
    }
  },

  computed: {
    ...mapGetters(['retrieveMessage2', 'permissions', 'loading']),
  },

  created() {
   this.getPermissions();
  },
}
</script>

<style scoped>

</style>