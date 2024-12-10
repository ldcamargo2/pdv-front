<template>
  <div>
    <div class="row">
     <div class="col-md-3">
        <b-card no-body>
          <b-card-body class="pb-0">
            <b-avatar class="mb-1" :variant="`light-primary`" size="45">
              <feather-icon size="21" :icon="'UsersIcon'" />
            </b-avatar>
            <div class="truncate mb-2">
              <h2 class="mb-25 font-weight-bolder">
                {{ dashboard.highlights.users }}
              </h2>
              <span>Usuários Cadastrados</span>
            </div>
          </b-card-body>
        </b-card>
      </div>

      <div class="col-md-3">
        <b-card no-body>
          <b-card-body class="pb-0">
            <b-avatar class="mb-1" :variant="`light-info`" size="45">
              <i class="fas fa-tag" style="font-size: 18px"></i>
            </b-avatar>
            <div class="truncate mb-2">
              <h2 class="mb-25 font-weight-bolder">
                {{ dashboard.highlights.products }}
              </h2>
              <span>Produtos Cadastrados</span>
            </div>
          </b-card-body>
        </b-card>
      </div>
       <div class="col-md-3">
        <b-card no-body>
          <b-card-body class="pb-0">
            <b-avatar class="mb-1" :variant="`light-warning`" size="45">
              <i class="fas fa-tag" style="font-size: 18px"></i>
            </b-avatar>
            <div class="truncate mb-2">
              <h2 class="mb-25 font-weight-bolder">
                {{ dashboard.highlights.tags_total }}
              </h2>
              <span>Etiquetas Geradas</span>
            </div>
          </b-card-body>
        </b-card>
      </div>
       <div class="col-md-3">
        <b-card no-body>
          <b-card-body class="pb-0">
            <b-avatar class="mb-1" :variant="`light-success`" size="45">
              <i class="fas fa-tag" style="font-size: 18px"></i>
            </b-avatar>
            <div class="truncate mb-2">
              <h2 class="mb-25 font-weight-bolder">
                {{ dashboard.highlights.tags_now }}
              </h2>
              <span>Etiquetas Geradas Hoje</span>
            </div>
          </b-card-body>
        </b-card>
      </div>
      <!--<div class="col-md-3">
        <b-card no-body>
          <b-card-body class="pb-0">
            <b-avatar class="mb-1" :variant="`light-success`" size="45">
              <i class="fas fa-tag" style="font-size: 18px"></i>
            </b-avatar>
            <div class="truncate mb-2">
              <h2 class="mb-25 font-weight-bolder">
                {{ dashboard.highlights.pedidos_finalizados }}
              </h2>
              <span>Pedidos Finalizados</span>
            </div>
          </b-card-body>
        </b-card>
      </div>
      <div class="col-md-3">
        <b-card no-body>
          <b-card-body class="pb-0">
            <b-avatar class="mb-1" :variant="`light-danger`" size="45">
              <i class="fas fa-tag" style="font-size: 18px"></i>
            </b-avatar>
            <div class="truncate mb-2">
              <h2 class="mb-25 font-weight-bolder">
                {{ dashboard.highlights.pedidos_cancelados }}
              </h2>
              <span>Pedidos Cancelados Manualmente</span>
            </div>
          </b-card-body>
        </b-card>
      </div>
      <div class="col-md-3">
        <b-card no-body>
          <b-card-body class="pb-0">
            <b-avatar class="mb-1" :variant="`light-danger`" size="45">
              <i class="fas fa-tag" style="font-size: 18px"></i>
            </b-avatar>
            <div class="truncate mb-2">
              <h2 class="mb-25 font-weight-bolder">
                {{ dashboard.highlights.pedidos_erro }}
              </h2>
              <span>Pedidos com Erro</span>
            </div>
          </b-card-body>
        </b-card>
      </div> -->
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Últimas 5 Etiquetas Geradas</div>
          <div class="card-body">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Produto</th>
                  <th scope="col">Código</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Gerado em</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tag in dashboard.highlights.last_tags" :key="tag.id">
                  <th scope="row">{{ tag.id }}</th>
                  <td>{{ tag.product.description }}</td>
                  <td>{{ tag.product.code }}</td>
                  <td>{{ tag.quantity }}</td>
                  <td>{{ tag.created_at_f }}</td>
                  <td><button class="btn btn-crud info" @click="generateTag(tag)"><i class="fas fa-barcode"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      
  </div>
</template>

<script>
import { BCardText, BLink } from "bootstrap-vue";

import { BCard, BCardBody, BAvatar } from "bootstrap-vue";

export default {
  data() {
    return {
      dashboard: {
        highlights: {},
      },
    };
  },
  components: {
    BCard,
    BCardText,
    BLink,
    BCard,
    BCardBody,
    BAvatar,
  },
  methods: {
    getDashboard() {
      const self = this;
      const api = self.$store.state.api + "dashboard";

      axios
        .post(api)
        .then((response) => {
          self.dashboard = response.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    generateTag(obj) {
        const self = this;
        
        var popup = window.open(obj.product.barcode_url + '/' + obj.quantity, 'popupWindow', 'width=900,height=400');

        if (popup === null || typeof popup === 'undefined') {
            swal("Ops!", "O popup foi bloqueado pelo navegador, autorize e tente novamente.", "error");
        }
    },
  },
  mounted() {
    const self = this;
    self.getDashboard();
  },
  created() { },
};
</script>

<style></style>
