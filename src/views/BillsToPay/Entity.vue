<template>
  <div>
    <section v-if="loadedComponent">
      <!-- Main Content -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Lançar Despesas</div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="inputName">Nome</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="bills.title"
                      id="inputName"
                    />
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-group">
                    <label for="inputValue">Valor (R$)</label>
                    <money
                      type="tel"
                      v-model="bills.value"
                      class="form-control"
                      v-bind="money"
                      id="inputValue"
                    />
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-group">
                    <label for="inputValue">Parcelar valor?</label>
                    <br />
                    <toggle-button class="mt-2" v-model="bills.split" />
                  </div>
                </div>
                <div class="col-2" v-if="bills.split">
                  <div class="form-group">
                    <label for="inputValue">Quantidade de parcelas</label>
                    <br />
                    <input
                      type="number"
                      class="form-control"
                      v-model="bills.installments"
                      id="inputDate"
                    />
                  </div>
                </div>
                <div class="col-4" v-if="bills.split">
                  <div
                    class="alert alert-primary"
                    role="alert"
                    v-if="bills.value != 0 && bills.installments != 0"
                  >
                    <strong>Valor por parcela: </strong>
                    {{
                      (
                        Number(bills.value) / Number(bills.installments)
                      ).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-group">
                    <label for="inputDate">Data</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="bills.due_date"
                      id="inputDate"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <label for="inputDate">Categoria</label>
                    <v-select
                      :options="categories"
                      label="title"
                      :reduce="(categories) => categories.id"
                      class="style-chooser"
                      v-model="bills.category_id"
                    >
                      <div slot="no-options">Nenhum registro encontrado.</div>
                    </v-select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="inputDate">Fornecedor</label>
                    <v-select
                      :options="companies"
                      label="company_name"
                      :reduce="(companies) => companies.id"
                      class="style-chooser"
                      v-model="bills.relation_id"
                    >
                      <div slot="no-options">Nenhum registro encontrado.</div>
                    </v-select>
                  </div>
                </div>
                <div class="col-12" v-if="!bills.split">
                  <div class="form-group">
                    <label for="inputDate">Repetir lançamento?</label>
                    <br />
                    <toggle-button class="mt-2" v-model="bills.repeat" />
                  </div>
                </div>
                <div class="col-6" v-if="bills.repeat">
                  <div class="form-group">
                    <label for="inputDate">Quantidade de meses</label>
                    <input
                      type="tel"
                      class="form-control"
                      v-model="bills.repeat_quantity"
                      id="inputDate"
                    />
                  </div>
                </div>
                <div class="col-6" v-if="bills.repeat">
                  <div class="form-group">
                    <label for="inputDate">Marcar as repetições?</label>
                    <br />
                    <toggle-button class="mt-2" v-model="bills.repeat_mark" />
                  </div>
                </div>
              </div>
              <div class="row" style="margin-top: 55px">
                <div class="col-4">
                  <router-link to="/bills_pay" class="btn btn-back mr-1">
                    <i class="fas fa-arrow-left"></i> Voltar
                  </router-link>
                  <button class="btn btn-add mb-0" @click="save">
                    {{ bills.id ? "Atualizar" : "Lançar" }} Despesa
                    <i class="fas fa-save"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    ></loading>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import vSelect from "vue-select";

export default {
  data() {
    return {
      categories: [],
      companies: [],
      bills: {
        repeat: false,
        split: false,
        repeat_mark: true,
        installments: 0,
      },
      visible: false,
      isLoading: false,
      fullPage: true,
      loadedComponent: true,
      money: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false,
      },
    };
  },
  computed: {},
  methods: {
    save() {
      const self = this;
      let api = self.$store.state.api + "bills_pays";

      self.isLoading = true;

      if (self.bills.id) {
        self.bills._method = "PUT";
        api += "/" + self.bills.id;
      }

      self.$http
        .post(api, self.bills)
        .then((response) => {
          self.isLoading = false;
          this.$router.push("/bills_pay");
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
          self.isLoading = false;
          // this.$router.push("/");
        });
    },
    getEntity: function (id) {
      const self = this;
      const api = self.$store.state.api + "bills_pays/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.bills = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getCategories: function () {
      const self = this;
      const api =
        self.$store.state.api + "financial_categories/?paginated=false";

      self.$http
        .get(api)
        .then((response) => {
          self.categories = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getCompanies: function () {
      const self = this;
      const api = self.$store.state.api + "companies/?paginated=false";

      self.$http
        .get(api)
        .then((response) => {
          self.companies = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
  },
  components: { Loading, vSelect },
  props: {},
  mounted: function () {
    const self = this;

    self.getCategories();
    self.getCompanies();

    let id = self.$route.params.id;
    if (id) {
      self.getEntity(id);
    }
  },
};
</script>
<style scoped>
</style>