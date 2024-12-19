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
                        <span class="required">*</span> Tipo Cliente:
                      </label>
                      <select class="form-control" v-model="customer.customer_type">
                        <option value="2">Pessoa Física</option>
                        <option value="1">Empresa</option>
                      </select>
                    </div>
                   
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="Name">
                        <span class="required">*</span> Nome:
                      </label>
                      <input autocomplete="new-password" type="text" id="Name" class="form-control"
                        v-model="customer.name" placeholder="" />
                    </div>
                    <div class="form-group col-md-6" v-if="customer.customer_type == '1'">
                      <label for="Email">
                        <span class="required">*</span> Nome Fantasia:
                      </label>
                      <input autocomplete="new-password" class="form-control" id="Email" placeholder="" type="text"
                        v-model="customer.fantasy_name" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6" v-show="customer.customer_type == '2'">
                      <label for="Name">
                        <span class="required">*</span> CPF:
                      </label>
                      <input autocomplete="new-password" type="text" v-mask="'999.999.999-99'" class="form-control"
                        v-model="customer.cpf" />
                    </div>
                    <div class="form-group col-md-6" v-show="customer.customer_type == '1'">
                      <label for="Name">
                        <span class="required">*</span> CNPJ:
                      </label>
                      <input autocomplete="new-password" type="text" v-mask="'99.999.999/9999-99'" class="form-control"
                        v-model="customer.cnpj" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-2">
                      <label for="Cellphone">CEP:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-mask="'99999-999'"
                        v-on:keyup="buscar" v-model="customer.cep" />
                    </div>

                    <div class="form-group col-md-4">
                      <label for="Cellphone">Logradouro:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="customer.street" />
                    </div>

                    <div class="form-group col-md-2">
                      <label for="Cellphone">Número:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="customer.number" />
                    </div>

                    <div class="form-group col-md-4">
                      <label for="Cellphone">Complemento:</label>
                      <input autocomplete="new-password" class="form-control" type="text"
                        v-model="customer.complement" />
                    </div>

                    <div class="form-group col-md-5">
                      <label for="Cellphone">Cidade:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="customer.city" />
                    </div>

                    <div class="form-group col-md-5">
                      <label for="Cellphone">Estado:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="customer.state" />
                    </div>

                    <div class="form-group col-md-2">
                      <label for="Cellphone">País:</label>
                      <input autocomplete="new-password" class="form-control" type="text" v-model="customer.country" />
                    </div>
                    <div class="form-group col-md-2">
                      <div class="form-group">
                        <label for="inputValue">Permite venda conveniada?</label>
                        <br />
                        <toggle-button v-model="customer.credit_status" />
                      </div>
                    </div>

                    <div class="form-group col-md-2">
                      <label for="Cellphone">Limite de crédito:</label>
                      <money class="form-control" v-model="customer.limit" v-bind="money"></money>
                    </div>
                  </div>


                  <span class="required_fields">
                    <span class="required">*</span>
                    <strong>Campos obrigatórios</strong>
                  </span>
                  <div class="block text-right">
                    <router-link to="/customers" class="btn btn-back">
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
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
      customer: {},
      endereco: {},
      naoLocalizado: false
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "customers";

      if (self.customer.id) {
        api += "/" + self.customer.id;

        self.customer._method = 'PUT';
      }

      axios
        .post(api, self.customer)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/customers");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },

    getCompany: function (id) {
      const self = this;
      const api = self.$store.state.api + "customers/" + id;

      axios
        .get(api)
        .then((response) => {
          self.customer = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    buscar: function () {
      var self = this;

      self.naoLocalizado = false;

      if (/^[0-9]{5}-[0-9]{3}$/.test(this.customer.cep)) {
        $.getJSON(
          "https://viacep.com.br/ws/" + this.customer.cep + "/json/",
          function (endereco) {
            if (endereco.erro) {
              self.endereco = {};
              $("#inputNumero").focus();
              self.naoLocalizado = true;
              return;
            }
            self.endereco = endereco;
            self.customer.street = self.endereco.logradouro;
            self.customer.neighborhood = self.endereco.bairro;
            self.customer.state = self.endereco.estado;
            self.customer.city = self.endereco.localidade;
            self.customer.complement = self.endereco.complemento;
            self.customer.country = 'Brasil';
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