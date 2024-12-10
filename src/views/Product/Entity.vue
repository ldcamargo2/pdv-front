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
                    <div class="form-group col-md-12">
                      <label for="Name">
                        <span class="required">*</span> Nome:
                      </label>
                      <input
                        autocomplete="new-password"
                        type="text"
                        class="form-control"
                        v-model="product.description"
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="Name">
                        <span class="required">*</span> Códigos:
                      </label>
                      <v-select
                        :label="'company_name'"
                        v-model="product.codes"
                        class="vselect"
                        taggable
                        multiple
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="Cellphone">Fornecedor:</label>
                      <v-select
                        :options="suppliers"
                        :reduce="(suppliers) => suppliers.id"
                        :label="'company_name'"
                        v-model="product.supplier_id"
                        class="vselect"
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="Cellphone"
                        ><span class="required">*</span> Empresa:</label
                      >
                      <v-select
                        :options="companies"
                        :reduce="(companies) => companies.id"
                        :label="'company_name'"
                        v-model="product.company_id"
                        class="vselect"
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <!-- <div class="form-group col-md-4">
                      <label for="Name">
                        <span class="required">*</span> Chave:
                      </label>
                      <input
                        autocomplete="new-password"
                        type="text"
                        id="Name"
                        class="form-control"
                        v-model="product.key"
                        placeholder=""
                      />
                    </div> -->
                    <!-- <div class="form-group col-md-4">
                      <label for="Email">
                        <span class="required">*</span> Código:
                      </label>
                      <input
                        autocomplete="new-password"
                        class="form-control"
                        id="Email"
                        placeholder=""
                        type="text"
                        v-model="product.code"
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="Email"> Código ERP: </label>
                      <input
                        autocomplete="new-password"
                        class="form-control"
                        id="Email"
                        placeholder=""
                        type="text"
                        v-model="product.erp_code"
                      />
                    </div> -->
                  </div>                  
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Tipo:</label>
                      <v-select
                        :options="tipos"
                        :reduce="(tipos) => tipos.title"
                        :label="'title'"
                        v-model="product.type"
                        class="vselect"
                      />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Dimensão:</label>
                      <v-select
                        :options="dimensao"
                        :reduce="(dimensao) => dimensao.title"
                        :label="'title'"
                        v-model="product.dimension"
                        class="vselect"
                      />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Unidade de Medida:</label>
                      <v-select
                        :options="grao"
                        :reduce="(grao) => grao.title"
                        :label="'title'"
                        v-model="product.unity_measure"
                        class="vselect"
                      />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Furos:</label>
                      <input
                        autocomplete="new-password"
                        class="form-control"
                        type="text"
                        v-model="product.holes"
                      />
                    </div>
                    <!-- <div class="form-group col-md-3">
                      <label for="Cellphone">Composição:</label>
                      <select
                        class="form-control"
                        v-model="product.mixed_or_pure"
                      >
                        <option value=""></option>
                        <option value="PURA">PURA</option>
                        <option value="MISTA">MISTA</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2">
                      <label for="Cellphone">Quantidade Padrão:</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="product.quantity_default"
                      />
                    </div> -->
                    <div class="form-group col-md-4">
                      <label for="Cellphone">Estoque Mínimo:</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="product.minimum_stock"
                      />
                    </div>
                    <div class="form-group col-md-2">
                      <label for="Cellphone">Valor de entrada:</label>
                      <money class="form-control" v-model="product.input_value" v-bind="money"></money>
                    </div>
                    <div class="form-group col-md-2">
                      <label for="Cellphone">Valor de saída:</label>
                      <money class="form-control" v-model="product.output_value" v-bind="money"></money>
                    </div>      
                    <div class="form-group col-md-2">
                      <label for="Cellphone">Estoque Atual:</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="product.stock"
                      />
                    </div>                                  
                  </div>

                  <span class="required_fields">
                    <span class="required">*</span>
                    <strong>Campos obrigatórios</strong>
                  </span>
                  <div class="block text-right">
                    <router-link to="/products" class="btn btn-back">
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
      product: {},
      endereco: {},
      naoLocalizado: false,
      tipos: [],
      dimensao: [],
      grao: [],
      companies: [],
      suppliers: [],
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "products";

      if (self.product.id) {
        api += "/" + self.product.id;

        self.product._method = "PUT";
      }

      axios
        .post(api, self.product)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/products");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getEntity: function (id) {
      const self = this;
      const api = self.$store.state.api + "products/" + id + '?with[]=codes';

      axios
        .get(api)
        .then((response) => {
          self.product = response.data.data[0];

          var codes = [];
          self.product.codes.forEach(element => {
            codes.push(element.code);  
          });

          self.product.codes = codes;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getCompanies: function (id) {
      const self = this;
      const api = self.$store.state.api + "companies?paginated=false";

      axios
        .get(api)
        .then((response) => {
          self.companies = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getSuppliers: function (id) {
      const self = this;
      const api = self.$store.state.api + "suppliers?paginated=false";

      axios
        .get(api)
        .then((response) => {
          self.suppliers = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getTypes: function (id) {
      const self = this;
      const api = self.$store.state.api + "types?paginated=false";

      axios
        .get(api)
        .then((response) => {
          self.tipos = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getDimensions: function (id) {
      const self = this;
      const api = self.$store.state.api + "dimensions?paginated=false";

      axios
        .get(api)
        .then((response) => {
          self.dimensao = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getUnityMeasures: function (id) {
      const self = this;
      const api = self.$store.state.api + "unity_measures?paginated=false";

      axios
        .get(api)
        .then((response) => {
          self.grao = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.getEntity(id);
    }

    self.getCompanies();
    self.getTypes();
    self.getUnityMeasures();
    self.getDimensions();
    self.getSuppliers();
  },
  components: {
    BaseCrud,
    vSelect,
  },
};
</script>
<style scoped></style>
