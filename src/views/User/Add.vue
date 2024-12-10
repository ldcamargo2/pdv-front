<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <form action>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="Name">
                          <span class="required">*</span> Nome:
                        </label>
                        <input autocomplete="new-password" type="text" id="Name" class="form-control"
                          v-model="users.name" placeholder="" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="Email">
                          <span class="required">*</span> E-mail:
                        </label>
                        <input autocomplete="new-password" class="form-control" id="Email" placeholder="" type="text"
                          v-model="users.email" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="Name">
                          <span class="required">*</span> CPF:
                        </label>
                        <input autocomplete="new-password" type="text" v-mask="'999.999.999-99'" id="Name"
                          class="form-control" v-model="users.cpf_cnpj" placeholder="" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="Email"> RG: </label>
                        <input autocomplete="new-password" class="form-control" id="Email" placeholder="" type="text"
                          v-model="users.rg" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="Cellphone">Celular:</label>
                        <input autocomplete="new-password" class="form-control" id="Cellphone" type="text"
                          v-mask="'(99) 99999-9999'" v-model="users.cellphone" placeholder="" />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputUser">
                          <span class="required">*</span> Nível de acesso:
                        </label>
                        <v-select :options="profile_types" :reduce="(profile_types) => profile_types.id" :label="'name'"
                          v-model="users.access_nivel" class="vselect" />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputUser">
                          <span class="required">*</span> Empresa:
                        </label>
                        <v-select :options="companies" :reduce="(companies) => companies.id" :label="'company_name'"
                          v-model="users.company_id" class="vselect" />
                      </div>
                    </div>
                    <div class="row" v-if="$route.params.id">
                      <div class="col-md-12 mb-2">
                        <button type="button" class="btn btn-add" @click="toggleFormSenha">
                          <i class="fas fa-key"></i> Alterar Senha
                        </button>
                      </div>
                    </div>
                    <div class="form-row" v-if="change_password">
                      <div class="form-group col-md-6">
                        <label for="password">
                          <span class="required">*</span> Senha:
                        </label>
                        <input autocomplete="new-password" type="password" id="password" class="form-control"
                          v-model="users.password" placeholder="" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="confirmPassword">
                          <span class="required">*</span> Confirme a senha:
                        </label>
                        <input autocomplete="new-password" class="form-control" id="confirmPassword" placeholder=""
                          type="password" v-model="users.password_confirmacao" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="Email">
                          <span class="required">*</span> Status:
                        </label>
                        <select class="form-control" v-model="users.status">
                          <option value="1">Ativo</option>
                          <option value="0">Inativo</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="userPic"> Foto do Perfil </label>
                      <div class="user-img">
                        <img v-if="previewImage" :src="previewImage" class="photo" />
                        <img v-else class="photo" />
                      </div>
                      <input type="file" class="" id="userPic" accept="image/*" name="userPic" @change="uploadImage"
                        placeholder />
                    </div>
                    <span class="required_fields">
                      <span class="required">*</span>
                      <strong>Campos obrigatórios</strong>
                    </span>
                    <div class="block text-right">
                      <router-link to="/users" class="btn btn-back">
                        <i class="fa fa-arrow-left"></i> Voltar
                      </router-link>
                      <a class="btn btn-add ml-1" @click="save">
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
  </div>
</template>
<script>
import BaseCrud from "../../layouts/Base/BaseCrud";
import vSelect from "vue-select";

export default {
  name: "imageUpload",
  data() {
    return {
      change_password: true,
      users: {
        name: "",
        email: "",
        cellphone: "",
        telphone: "",
        photo: "",
        access_nivel: "",
        password: "",
        password_confirmacao: "",
        users_id: "",
        status: "1",
        company_id: "",
        rg: "",
        cpg_cnpj: "",
      },
      profile_types: [
        { id: 1, name: "Administrador" },
        { id: 2, name: "Usuário Padrão" },
      ],
      errors: undefined,
      previewImage: null,
      companies: [],
    };
  },
  computed: {},
  methods: {
    toggleFormSenha() {
      const self = this;
      if (self.change_password) {
        self.change_password = false;
      } else {
        self.change_password = true;
      }
    },
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let photo = document.getElementById("userPic");

      fd.append("name", self.users.name);
      fd.append("email", self.users.email);
      fd.append("cellphone", self.users.cellphone);
      fd.append("cpf_cnpj", self.users.cpf_cnpj);
      fd.append("rg", self.users.rg);
      fd.append("access_nivel", self.users.access_nivel);
      fd.append("company_id", self.users.company_id);
      fd.append("status", self.users.status);
      fd.append("password", self.users.password);
      fd.append("password_confirmacao", self.users.password_confirmacao);
      fd.append("_method", "POST");

      fd.append("photo", photo.files[0] ? photo.files[0] : "");

      if (self.users.id) {
        fd.append("id", self.users.id);
        fd.append("_method", "PUT");
      }

      return fd;
    },
    save: function () {
      const self = this;
      let api = self.$store.state.api + "users";

      let fd = self.makeFormData();

      if (self.users.id) {
        api += "/" + self.users.id;
      }

      axios
        .post(api, fd)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/users");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    getUsers: function (id) {
      const self = this;
      const api = self.$store.state.api + "users/" + id;

      axios
        .get(api)
        .then((response) => {
          self.users = response.data.data[0];
          self.users.password = "";
          self.change_password = false;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    getCompanies: function () {
      const self = this;
      const api = self.$store.state.api + "companies/";

      axios
        .get(api)
        .then((response) => {
          self.companies = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.change_password = false;
      self.getUsers(id);
    }
    self.getCompanies();
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