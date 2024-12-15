<template>
  <div>
    
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                {{ category.id ? "Editar Categoria" : "Cadastrar Categoria" }}
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <form id="form">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="title">
                            <span class="required">*</span> Nome:
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            autocomplete="new-password"
                            v-model="category.title"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <span class="required_fields">
                      <span class="required">*</span>
                      <strong>Campos obrigatórios</strong>
                    </span>
                    <div class="block text-right">                      
                      <router-link
                        to="/financial_categories"
                        class="btn btn-back mr-1"
                      >
                        <i class="fa fa-arrow-left"></i> Voltar
                      </router-link>
                      <a class="btn btn-add" @click="save">
                        Salvar
                        <i class="fa fa-save"></i>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  data() {
    return {
      category: {
        title: "",
      },
      companies: [],
      users: [],
    };
  },
  methods: {
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      fd.append("title", self.category.title);

      if (self.category.id) {
        fd.append("id", self.category.id);
        fd.append("_method", "PUT");
      }

      return fd;
    },
    save: function () {
      const self = this;
      let api = self.$store.state.api + "financial_categories";

      let fd = self.makeFormData();

      if (self.category.id) {
        api += "/" + self.category.id;
      }

      self.$http
        .post(api, fd)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/financial_categories");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getCompanies: function (id) {
      const self = this;
      const api = self.$store.state.api + "companies?paginated=false";

      self.$http
        .get(api)
        .then((response) => {
          self.companies = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getCategory: function (id) {
      const self = this;
      const api = self.$store.state.api + "financial_categories/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.category = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getUsers: function (id) {
      const self = this;
      const api = self.$store.state.api + "users?paginated=false";

      self.$http
        .get(api)
        .then((response) => {
          self.users = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
  },
  mounted: function () {
    const self = this;
    let id = self.$route.params.id;
    self.getUsers();
    self.getCompanies();
    if (id) {
      self.getCategory(id);
    }
  },
  components: {
    vSelect,
  },
};
</script>
<style scoped>
</style>