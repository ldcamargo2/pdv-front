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
                        <span class="required">*</span> Chave:
                      </label>
                      <input disabled autocomplete="new-password" type="text" id="Name" class="form-control"
                        v-model="product.key" placeholder="" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="Email">
                        <span class="required">*</span> Código:
                      </label>
                      <input disabled autocomplete="new-password" class="form-control" id="Email" placeholder="" type="text"
                        v-model="product.code" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="Name">
                        <span class="required">*</span> Descrição:
                      </label>
                      <input disabled autocomplete="new-password" type="text" class="form-control"
                        v-model="product.description" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Tipo:</label>
                      <input disabled autocomplete="new-password" class="form-control" type="text" v-model="product.type" />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Dimensão:</label>
                      <input disabled autocomplete="new-password" class="form-control" type="text" v-model="product.dimension" />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Unidade de Medida:</label>
                      <input disabled autocomplete="new-password" class="form-control" type="text" v-model="product.unity_measure" />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Furos:</label>
                      <input disabled autocomplete="new-password" class="form-control" type="text" v-model="product.holes" />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Composição:</label>
                      <select disabled class="form-control" v-model="product.mixed_or_pure">
                        <option value=""></option>
                        <option value="PURA">PURA</option>
                        <option value="MISTA">MISTA</option>
                      </select>
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Quantidade Padrão:</label>
                      <input disabled type="text" class="form-control" v-model="product.quantity_default" />
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Cellphone">Quantidade atual em estoque:</label>
                      <input disabled type="text" class="form-control" v-model="product.stock" />
                    </div>
                  </div>

                  <span class="required_fields">
                    <span class="required">*</span>
                    <strong>Campos obrigatórios</strong>
                  </span>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Movimentações de Estoque</div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <table class="table table-striped mb-4">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th>Responsável</th>
                        <th>Valor Anterior</th>
                        <th>Valor Movimentado</th>
                        <th>Valor Atual</th>
                        <th>Operação</th>
                        <th>Data/Hora</th>
                      </tr>
                    </thead>
                    <tbody v-if="product.movements.length > 0">
                      <tr v-for="movement in product.movements" :key="movement.id">
                        <th scope="row">{{ movement.id }}</th>
                        <td>{{ movement.responsible.name }}</td>
                        <td>{{ movement.last_value }}</td>
                        <td>{{ movement.moved_value }}</td>
                        <td>{{ movement.actual_value }}</td>
                        <td v-if="movement.operation == 2"><span class="badge badge-pill badge-danger">Saída</span></td>
                        <td v-else><span class="badge badge-pill badge-success">Entrada</span></td>
                        <td>{{ movement.created_at_f }}</td>
                      </tr>
                     
                    </tbody>
                    <tbody v-else>
                      <td colspan="7" align="center">Nenhum registro encontrado.</td>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-12">

                  <div class="block text-right">
                    <router-link to="/products" class="btn btn-back">
                      <i class="fa fa-arrow-left"></i> Voltar
                    </router-link>
                    <!-- <a class="btn btn-add ml-1" @click="save">
                      Salvar
                      <i class="fa fa-save"></i>
                    </a> -->
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
      product: {},
      endereco: {},
      naoLocalizado: false
    };
  },
  computed: {},
  methods: {
    save: function () {
      const self = this;
      let api = self.$store.state.api + "products";

      if (self.product.id) {
        api += "/" + self.product.id;

        self.product._method = 'PUT';
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
      const api = self.$store.state.api + "products/" + id + '?with[]=movements';

      axios
        .get(api)
        .then((response) => {
          self.product = response.data.data[0];
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
  },
  components: {
    BaseCrud,
    vSelect,
  },
};
</script>
<style scoped></style>