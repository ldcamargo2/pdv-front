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
                        <span class="required">*</span> Razão Social:
                      </label>
                      <input autocomplete="new-password" type="text" id="Name" class="form-control"
                        v-model="company.company_name" placeholder="" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="Email">
                        <span class="required">*</span> Nome Fantasia:
                      </label>
                      <input autocomplete="new-password" class="form-control" id="Email" placeholder="" type="text"
                        v-model="company.fantasy_name" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="Name">
                        <span class="required">*</span> CNPJ:
                      </label>
                      <input autocomplete="new-password" type="text" v-mask="'99.999.999/9999-99'" class="form-control"
                        v-model="company.cnpj" />
                    </div>
                    <div class="form-group col-md-2">
                      <label for="Name">
                        Cor do Sistema:
                      </label>
                      <input autocomplete="new-password" type="color" class="form-control"
                        v-model="company.color" />
                    </div>
                    <div class="form-group col-md-2">
                      <label for="Name">
                        Cor da fonte do sistema:
                      </label>
                      <input autocomplete="new-password" type="color" class="form-control"
                        v-model="company.font_color" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-2">
                      <label for="Cellphone">CEP:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-mask="'99999-999'"
                        v-on:keyup="buscar" v-model="company.cep" />
                    </div>

                    <div class="form-group col-md-4">
                      <label for="Cellphone">Logradouro:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="company.street" />
                    </div>

                    <div class="form-group col-md-2">
                      <label for="Cellphone">Número:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="company.number" />
                    </div>

                    <div class="form-group col-md-4">
                      <label for="Cellphone">Complemento:</label>
                      <input autocomplete="new-password" class="form-control" type="text"
                        v-model="company.complement" />
                    </div>

                    <div class="form-group col-md-5">
                      <label for="Cellphone">Cidade:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="company.city" />
                    </div>

                    <div class="form-group col-md-5">
                      <label for="Cellphone">Estado:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="company.state" />
                    </div>

                    <div class="form-group col-md-2">
                      <label for="Cellphone">País:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="company.country" />
                    </div>

                  </div>


                  <span class="required_fields">
                    <span class="required">*</span>
                    <strong>Campos obrigatórios</strong>
                  </span>
                  <div class="block text-right">
                    <router-link to="/companies" class="btn btn-back">
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
      company: {},
      endereco: {},
      naoLocalizado: false
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "companies";

      if (self.company.id) {
        api += "/" + self.company.id;

        self.company._method = 'PUT';
      }

      axios
        .post(api, self.company)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/companies");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    getCompany: function (id) {
      const self = this;
      const api = self.$store.state.api + "companies/" + id;

      axios
        .get(api)
        .then((response) => {
          self.company = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    buscar: function () {
      var self = this;

      self.naoLocalizado = false;

      if (/^[0-9]{5}-[0-9]{3}$/.test(this.company.cep)) {
        $.getJSON(
          "https://viacep.com.br/ws/" + this.company.cep + "/json/",
          function (endereco) {
            if (endereco.erro) {
              self.endereco = {};
              $("#inputNumero").focus();
              self.naoLocalizado = true;
              return;
            }
            self.endereco = endereco;
            self.company.street = self.endereco.logradouro;
            self.company.neighborhood = self.endereco.bairro;
            self.company.state = self.endereco.estado;
            self.company.city = self.endereco.localidade;
            self.company.complement = self.endereco.complemento;
            self.company.country = 'Brasil';
            $("#inputNumero").focus();
          }
        );
      }
    },
  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.change_password = false;
      self.getCompany(id);
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