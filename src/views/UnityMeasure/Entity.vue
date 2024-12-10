<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="Name">
                        <span class="required">*</span> Titulo:
                      </label>
                      <input autocomplete="new-password" type="text" id="Name" class="form-control"
                        v-model="entity.title" placeholder="" />
                    </div>                    
                  </div>

                  <span class="required_fields">
                    <span class="required">*</span>
                    <strong>Campos obrigatórios</strong>
                  </span>
                  <div class="block text-right">
                    <router-link to="/unity_measures" class="btn btn-back">
                      <i class="fa fa-arrow-left"></i> Voltar
                    </router-link>
                    <a class="btn btn-add ml-1" @click="save">
                      Salvar
                      <i class="fa fa-save"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseCrud from "../../layouts/Base/BaseCrud";
import vSelect from "vue-select";

export default {
  data() {
    return {
      entity: {},
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "unity_measures";

      if (self.entity.id) {
        api += "/" + self.entity.id;

        self.entity._method = 'PUT';
      }

      axios
        .post(api, self.entity)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/unity_measures");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    getEntity: function (id) {
      const self = this;
      const api = self.$store.state.api + "unity_measures/" + id;

      axios
        .get(api)
        .then((response) => {
          self.entity = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    }   
  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.getEntity(id);
    }
  },
  components: {
    BaseCrud,
    vSelect,
  },
};
</script>
<style scoped>
.profile_user {
  text-align: center;
}

.photo {
  display: block;
  margin-left: 5px;
  width: 18%;
  border-radius: 10px;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
}

.btn-user:hover,
.btn-user[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important;
}

.photo-title {
  color: #000;
  font-size: 18px;
  display: block;
  margin-left: 5px;
  width: 18%;
}
</style>