<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Meu Perfil</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  style="card-body"
                  class="photo"
                />
                <img
                  v-else
                  :src="users.photo"
                  style="card-body"
                  class="photo"
                />
              </div>
              <div class="profile_user form-group">
                <h3 class="user_name_max">{{ users.name }}</h3>
                <hr class="hr" />
                <!-- <p style="text-align: center">{{ users.login }}</p> -->
                <br />
                <br />
              </div>
              <div class="row">
                <div class="col-md-12">
                  <form action>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="userName">
                          <span class="required">*</span> Nome:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="users.name"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="userName">
                          <span class="required">*</span> Email:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="users.email"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div>
                        <label
                          href="#"
                          class="pointer"
                          data-target="#pwdModal"
                          data-toggle="modal"
                        >
                          <a class="btn btn-put-pass">
                            Deseja alterar a senha?
                            <i class="fa fa-key"></i>
                          </a>
                        </label>
                      </div>

                      <div
                        id="pwdModal"
                        v-on:keyup="keymonitor"
                        class="modal fade"
                        tabindex="-1"
                        role="dialog"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <label>Digite a nova Senha</label>
                            </div>
                            <div class="modal-body">
                              <div class="col-md-12">
                                <div class="panel panel-default">
                                  <div class="panel-body">
                                    <div class="text-center">
                                      <div class="panel-body">
                                        <fieldset>
                                          <div class="form-group">
                                            <label for="userPassword">
                                              <span class="required">*</span>
                                              Nova Senha:
                                            </label>
                                            <input
                                              type="password"
                                              class="form-control"
                                              id="userPassword"
                                              v-on:keyup="keymonitor"
                                              v-model="users.nova_password"
                                              autocomplete="false"
                                              minlength="6"
                                              maxlength="12"
                                            />
                                          </div>
                                          <div class="form-group">
                                            <label
                                              for="userPasswordConfirmation"
                                            >
                                              <span class="required">*</span>
                                              Confirmar Senha:
                                            </label>
                                            <input
                                              type="password"
                                              v-on:keyup="keymonitor"
                                              class="form-control"
                                              id="userPasswordConfirmation"
                                              v-model="
                                                users.password_confirmation
                                              "
                                              placeholder
                                              autocomplete="false"
                                              minlength="6"
                                              maxlength="12"
                                            />
                                          </div>
                                          <div
                                            v-if="comparePassword()"
                                            class="left"
                                          >
                                            <label>
                                              <div
                                                class="alert alert-danger col-md-12"
                                                role="alert"
                                              >
                                                <span class="comparePassword"
                                                  >As passwords não podem ser
                                                  diferentes!</span
                                                >
                                              </div>
                                            </label>
                                          </div>
                                        </fieldset>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <div class="col-md-12">
                                <div class="block text-right">
                                  <a
                                    id="exitModal"
                                    @click="clearModal()"
                                    data-dismiss="modal"
                                    class="btn btn-back"
                                  >
                                    <i class="fa fa-arrow-left"></i> Cancelar
                                  </a>
                                  <a
                                    data-dismiss="modal"
                                    class="btn btn-add ml-2"
                                  >
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
                    <hr />

                    <div class="form-group">
                      <label for="userPic">Foto do Perfil</label>
                      <input
                        type="file"
                        class="form-control"
                        id="userPic"
                        accept="image/*"
                        name="userPic"
                        @change="uploadImage"
                        placeholder
                      />
                    </div>
                    <span class="required_fields">
                      <span class="required">*</span>
                      <strong>Campos obrigatórios</strong>
                    </span>
                    <div class="block text-right">
                      <router-link to="/users" class="btn btn-back mr-1">
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
  </div>
</template>

<script>
import BaseCrud from "../../layouts/Base/BaseCrud";
import vSelect from "vue-select";

export default {
  name: "imageUpload",
  data() {
    return {
      companies: [],
      departments: [],
      change_password: true,
      users: {
        name: "",
        password: "",
        password_confirmacao: "",
        nova_password: "",
        password_confirmation: "",
        photo: "",
      },
      companies: {},
      departments: {},

      errors: undefined,

      previewImage: null,
    };
  },
  computed: {},
  methods: {
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let photo = document.getElementById("userPic");

      fd.append("name", self.users.name);
      fd.append("email", self.users.email);
      fd.append("password", self.users.nova_password);
      fd.append("password_confirmacao", self.users.password_confirmation);

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

      self.$http
        .post(api, fd)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    comparePassword: function () {
      if (this.users.nova_password != this.users.password_confirmation || null)
        return [];
    },
    keymonitor() {
      if (event.getModifierState && event.getModifierState("CapsLock")) {
        this.activatedCaps = true;
      } else {
        this.activatedCaps = false;
      }
    },
    clearModal() {
      this.users.password_confirmation = "";
      this.users.nova_password = "";
    },

    // getAcceptTerms: function () {
    //   this.url = this.$route.params.accept_terms;

    //   console.log(this.url);
    // },

    getUsers: function (id) {
      const self = this;
      const api = self.$store.state.api + "me";

      self.$http
        .post(api)
        .then((response) => {
          self.users = response.data;
          self.users.password_confirmacao = "";
          self.users.password = "";
          self.users.password_confirmation = "";
          self.users.nova_password = "";
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
    // let id = self.$store.getters.user.id;
    // if (id) {
    self.getUsers();
    // }
  },
  components: {
    BaseCrud,
    vSelect,
  },
};
</script>
<style scoped>
.left {
  text-align: left;
}
.profile_user {
  text-align: center;
}
.photo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  height: 200px;
  object-fit: cover;
}

.modal-footer {
  border-top: 0px;
}
.pointer {
  cursor: pointer;
}
.caps {
  color: black;
  font: bold;
  text-align: right;
  font-size: 20px;
}

.required {
  color: red !important;
}
.btn-put-prof:hover,
.btn-put-prof[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important ;
}
.profile_user {
  text-align: center;
}
</style>