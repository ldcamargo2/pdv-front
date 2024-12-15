<template>
  <div>
    <section v-if="loadedComponent">
      <!-- Main Content -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Receitas</div>
            </div>
            <div class="card-body">
              <div class="row justify-content-center">
                <div class="col-4">
                  <router-link class="btn btn-main" to="bills_receive/add"
                    >Lançar Receita <i class="ml-1 fas fa-plus"></i
                  ></router-link>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label>Filtrar de:</label>
                    <input
                      type="date"
                      v-model="filters.start_date"
                      @change="bringData()"
                      class="form-control"
                      id="inputDate1"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label>até:</label>
                    <input
                      type="date"
                      v-model="filters.end_date"
                      @change="bringData()"
                      class="form-control"
                      id="inputDate2"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-main" @click="lastMonth()">
                    Mês Anterior
                  </button>
                </div>
                <div class="col-6">
                  <button class="btn btn-main" @click="nextMonth()">
                    Próximo Mês
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="spend-title">Total</div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div class="spend-value" style="padding: 10px">
                    <span class="spend-rs">R$ </span>{{ bills.total
                    }}<span class="spend-month">{{ actualDate }}</span>
                  </div>
                  <div class="spend-percent up" style="padding: 10px">
                    0%<i class="fas fa-sort-up"></i>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-4">
                  <div class="spend-stat">Pago</div>
                  <div class="spend-stat-value up">R$ {{ bills.paid }}</div>
                </div>
                <div class="col-4">
                  <div class="spend-stat">A Pagar</div>
                  <div class="spend-stat-value normal">
                    R$ {{ bills.unpaid }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="spend-stat">Vencido</div>
                  <div class="spend-stat-value down">
                    R$ {{ bills.overdue }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="spend-title">Últimas Receitas Lançadas</div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-borderless">
                  <tbody>
                    <tr
                      v-for="bill in bills.data"
                      :key="bill.id"
                      @click="openModal(bill)"
                    >
                      <td>{{ bill.title }}</td>
                      <td>{{ bill.f_due_date }}</td>
                      <td>{{ bill.f_value }}</td>
                      <td :class="bill.status_color">
                        <i class="fas fa-circle"></i>
                      </td>
                    </tr>
                    <tr
                      v-if="bills.data.length == 0"
                      style="text-align: center"
                    >
                      <td colspan="4">Nenhum registro encontrado.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="billsModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="billsModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="billsModalLabel">
                {{ selected.title }}
              </h5>
            </div>
            <div class="modal-body">
              <div class="row" style="padding: 15px">
                <div class="col-md-6 info-client">
                  <i class="far fa-calendar-alt"></i> Vencimento:
                  {{ selected.f_due_date }}
                </div>
                <div class="col-md-6 info-client">
                  <i class="fas fa-money-bill"></i> Valor:
                  {{ selected.f_value }}
                </div>
                <div class="col-md-6 info-client">
                  <i class="fas fa-info"></i> Status:
                  {{
                    selected.status_color == "up"
                      ? "Pago"
                      : selected.status_color == "normal"
                      ? "A Pagar"
                      : "Vencido"
                  }}
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Forma de Pagamento</label>
                  <select
                    class="form-control"
                    v-model="selected.payment_method"
                  >
                    <option value="1">Cartão</option>
                    <option value="2">Dinheiro</option>
                  </select>
                </div>
                <div class="col-md-6" v-if="selected.payment_method == 1">
                  <label>Parcelas</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="selected.installments"
                  />
                </div>
              </div>
              <div class="row" style="padding: 15px">
                <div align="center" class="col-4">
                  <button class="btn btn-add" @click="changeStatus">
                    Alterar Status
                  </button>
                </div>
                <div align="center" class="col-4">
                  <button
                    class="btn btn-add"
                    data-dismiss="modal"
                    @click="edit"
                  >
                    Editar Receita
                  </button>
                </div>
                <div align="center" class="col-4">
                  <button class="btn btn-add" @click="deletar()">
                    Excluir Receita
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

export default {
  data() {
    return {
      bills: {},
      visible: false,
      isLoading: true,
      fullPage: true,
      loadedComponent: false,
      selected: {},
      actualDate: moment().format("MMMM [de] YYYY"),
      filters: {},
    };
  },
  computed: {},
  methods: {
    openModal(object) {
      this.selected = object;
      $("#billsModal").modal();
    },
    nextMonth() {
      this.filters.month = "nextMonth";
      this.bringData();
    },
    lastMonth() {
      this.filters.month = "lastMonth";
      this.bringData();
    },
    bringData: function () {
      const self = this;
      const api = self.$store.state.api + "bills_receives_dashboard_app/";

      self.isLoading = true;

      self.$http
        .post(api, self.filters)
        .then((response) => {
          self.bills = response.data;
          self.filters.actualMonth = self.bills.actualMonth;
          (self.actualDate = moment(self.bills.actualMonth).format(
            "MMMM [de] YYYY"
          )),
            (self.loadedComponent = true);

          self.loadedComponent = true;
          self.isLoading = false;
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
        });
    },
    changeStatus() {
      const self = this;
      const api = self.$store.state.api + "bills_receives_status";

      self.isLoading = true;

      self.$http
        .post(api, self.selected)
        .then((response) => {
          self.isLoading = false;
          self.bringData();
          $("#billsModal").modal("toggle");
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
          self.isLoading = false;
          // $("#billsModal").modal("toggle");
        });
    },
    edit() {
      $("#billsModal").modal("toggle");
      setTimeout(
        () => this.$router.push("/bills_receive/edit/" + this.selected.id),
        400
      );
    },
    deletar() {
      $("#billsModal").modal("toggle");

      const self = this;
      const api = self.$store.state.api + "bills_receives/";

      swal({
        title: "Tem certeza que deseja excluir este registro?",
        text: "Esta ação não pode ser desfeita",
        // showCancelButton: true,
        buttons: {
          catch: {
            text: "Não",
            value: "cancel",
            className: "btn-secondary",
          },
          confirm: {
            text: "Sim",
            value: "confirm",
            className: "btn-primary",
          },
        },
      }).then((value) => {
        switch (value) {
          case "cancel":
            swal("Cancelado", "O registro não foi excluido!", "info");
            break;
          case "confirm":
            self.$http
              .delete(api + self.selected.id, {
                id: self.selected.id,
              })
              .then((response) => {
                self.bringData();
                swal("Sucesso", "Registro excluído com sucesso!", "success");
              });
            break;
        }
      });

      self.isLoading = false;
    },
  },
  components: { Loading },
  props: {},
  mounted: function () {
    this.bringData();
  },
};
</script>
<style scoped>
.no-height {
  width: 100%;
  height: 200px;
  border: 2px solid #222;
  padding: 5px;
}

.card-small-info {
  text-align: justify;
}

.card-small-info-title {
  font-weight: bold;
}

.card-value-info {
  font-size: 28px;
  font-weight: bold;
}

.card-value-info-sm {
  font-size: 22px;
  font-weight: bold;
  margin-top: 15px;
}

.card-value-info-negative {
  font-size: 28px;
  font-weight: bold;
  color: #bb0034;
}

.card-value-info-positive {
  font-size: 28px;
  font-weight: bold;
  color: #28a745;
}

.card-value-info span {
  font-size: 20px;
}

.card-percent.up {
  color: #28a745;
  font-size: 11px;
}

.centered {
  text-align: center;
}

.card-percent.up::before {
  font-family: "Font Awesome 5 Free";
  content: "\f30c";
  font-weight: 700;
  margin-right: 3px;
}

.card-percent.down {
  color: #bb0034;
  font-size: 11px;
}

.card-percent.down::before {
  font-family: "Font Awesome 5 Free";
  content: "\f309";
  font-weight: 700;
  margin-right: 3px;
}

.card-icon {
  position: absolute;
  bottom: -10px;
  right: -10px;
  font-size: 90px;
  color: #08b9b3;
  opacity: 0.1;
  z-index: 0;
}

.next-card {
  border: 1px solid #08b9b3;
  color: #666;
  box-shadow: none;
}

.info-client {
  text-align: justify;
}

.info-client i {
  width: 20px;
  color: #15488A;
}

.info-client span {
  float: right;
}

.main-card .info-client i {
  width: 20px;
  color: #fff;
}

.job-status {
  width: 15px;
  height: 39px;
  border-radius: 0.25rem;
  float: left;
  margin-right: 5px;
}

.job-status.now {
  background: #28a745;
}

.job-status.next {
  background: #f4d800;
}

.job-status.hold {
  background: #bb0034;
}

.job-info {
  float: left;
  width: calc(100% - 25px);
}

.spend-title {
  color: #666;
  font-size: 16px;
}

.spend-title span {
  color: #08b9b3;
}

.spend-value {
  color: #08b9b3;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
}

.spend-rs {
  font-size: 14px;
}

.spend-month {
  font-size: 12px;
  color: #666;
  float: right;
  font-weight: 400;
}

.spend-percent {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.spend-percent.up {
  color: #28a745;
}

.spend-percent.down {
  color: #bb0034;
}

.spend-percent i {
  margin-left: 3px;
}

.spend-stat {
  text-align: center;
  font-size: 12px;
}

.spend-stat-value {
  text-align: center;
  padding: 2px;
  width: 100%;
  display: block;
  border-radius: 0.25rem;
}

.spend-stat-value.up {
  background-color: #28a745;
  color: #fff;
}

.spend-stat-value.down {
  background-color: #bb0034;
  color: #fff;
}

.spend-stat-value.normal {
  background-color: #f4d800;
  color: #000;
}

.btn-main {
  border-radius: 0.25rem;
  border: 2px solid #15488A;
  background-color: #fff;
  color: #222;
  font-weight: 700;
  display: block;
  width: 100%;
  margin-bottom: 1rem;
}

.btn-main:hover {
  border-radius: 0.25rem;
  border: 1px solid #15488A;
  background-color: #15488A;
  color: #fff;
  font-weight: 700;
  display: block;
  width: 100%;
  margin-bottom: 1rem;
}
.card {
  margin-bottom: 1rem;
  background: #fff;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 1px 3px #ccc;
}

.card-title {
  margin-bottom: 0;
  font-size: 18px;
  color: #15488A;
}

.card-title span {
  float: right;
}

.card-header {
  padding: 5px 10px;
  margin-bottom: 0;
  background-color: transparent;
  border-bottom: 1px solid #ccc;
}

.client-name {
  font-size: 18px;
  font-weight: bold;
}

.id_demand {
  font-size: 20px;
  /* font-weight: bold; */
  margin-bottom: 15px;
}

.title-card {
  font-size: 16px;
  font-weight: bold;
  color: #08b9b3;
}

.client-name i {
  color: #15488A;
  width: 20px;
}

.client-time {
  color: #08b9b3;
  float: right;
  font-weight: 700;
}

.card-body {
  padding: 10px;
}

.info-client i {
  width: 20px;
  color: #15488A;
}

.info-client.no-icon {
  margin-left: 20px;
  margin-top: -5px;
}

.table {
  color: #666;
}

.table td {
  vertical-align: middle !important;
}

.table .up {
  color: #28a745;
}

.table .down {
  color: #bb0034;
}

.table .normal {
  color: #f4d800;
}
</style>