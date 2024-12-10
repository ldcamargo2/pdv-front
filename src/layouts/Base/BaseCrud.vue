<template>
  <div class="card content-crud">
    <div class="ibox" v-if="!$route.params.operation">
      <div class="ibox-title" style="padding: 16px">
        <h3>
          {{ crudName }}
          <router-link :to="endPoint + '/add'" class="btn btn-primary" v-show="enableAdd"
            style="float: right; margin-top: -5px">{{ newText }}</router-link>
        </h3>
      </div>
      <div class="ibox-content">
        <div class="block m-b-md text-right" v-if="enableAddModal">
          <button type="button" class="btn btn-success" @click="addModal">
            Adicionar {{ crudName }}
          </button>
        </div>

        <v-server-table style="padding: 10px" ref="table" :tableData="tableData" :name="table" :url="url"
          :columns="columns" :options="options">
          <div :slot="'filter__' + filter.name" v-for="filter in customFilters" :key="filter.name">
            <template v-if="filter.type == 'calendar'">
              <input type="date" class="form-control" :name="filter.call" :id="filter.name"
                @change="filterChange(filter.call, filter.name)" />
            </template>
          </div>

          <div slot="actions" slot-scope="props">
            <a v-show="enableDownload" data-toggle="tooltip" title="Download" class="btn btn-crud check"
              @click="download(props.row.file)"><i class="fas fa-file-download"></i></a>
            <button v-show="enableView" data-toggle="tooltip" title="Consultar" class="btn btn-crud view"
              @click="view(props.row.id)">
              <i class="fas fa-eye" data-toggle="tooltip" title="Visualizar"></i>
            </button>
            <button v-show="enableEdit" data-toggle="tooltip" title="Editar" type="button" class="btn btn-crud edit"
              @click="edit(props.row.id)">
              <i class="fas fa-pencil-alt" data-toggle="tooltip" title="Editar"></i>
            </button>
            <a v-show="enableEditModal" @click="editModal(props.row.id)" data-toggle="tooltip" title="Editar"
              class="btn btn-warning fa fa-pencil"></a>
            <button v-show="enableDelete" data-toggle="tooltip" title="Deletar" type="button"
              class="btn btn-crud delete" @click="destroy(props, props.row, props.index)">
              <i class="far fa-trash-alt" data-toggle="tooltip" title="Excluir"></i>
            </button>
            <button v-show="enableReset" data-toggle="tooltip" title="Alterar Senha" class="btn btn-crud view key"
              @click="resetpassword(props.row.id)">
              <i class="fas fa-key" data-toggle="tooltip" title="Resetar Senha"></i>
            </button>
            <template v-for="extra in extra">
              <button data-toggle="tooltip" :title="extra.title" :key="extra.id" :class="extra.class"
                @click="callExtra(extra.name, props, props.row, props.index)">
                <i :class="extra.icon" v-if="extra.icon.length > 0"></i>
                {{ extra.label }}
              </button>
            </template>
          </div>
          <div slot="photo" slot-scope="props">
            <img :src="props.row.photo" alt class="photo" />
          </div>
          <div slot="cover_photo" slot-scope="props">
            <img :src="props.row.cover_photo" alt class="photo" />
          </div>
          <div slot="color" slot-scope="props">
            <div class="box" v-bind:style="{ 'background-color': props.row.color }"></div>
            <span class="bold">{{ props.row.color }}</span>
          </div>
          <div slot="qrcode" slot-scope="props">
            <img :src="props.row.qrcode + ''" alt class="qrcode" />
            <br />
            <span class="bold">{{ props.row.qrcode_name }}</span>
          </div>
          <div slot="qrcodeid" slot-scope="props">
            <qrcode-vue class="code_crud" size="70" :value="props.row.qrcodeid ? props.row.qrcodeid + '' : props.row.id + ''
              " level="H"></qrcode-vue>
          </div>
        </v-server-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from "vue-pagination-2";
// import BaseForm from "./BaseForm";
// import QrcodeVue from "qrcode.vue";

export default {
  data: function () {
    return {
      records: [],
      pages: [],
      tableData: [],
      model: [],
    };
  },
  props: {
    crudName: String,
    fieldStatus: String,
    status: String,
    newText: String,
    table: String,
    customFilters: Array,
    columns: Array,
    options: Object,
    endPoint: String,
    with: String,
    enableAdd: Boolean,
    enableAddModal: Boolean,
    enableEditModal: Boolean,
    enableEdit: Boolean,
    enableDelete: Boolean,
    enableView: Boolean,
    enableReset: Boolean,
    enableDownload: Boolean,
    extra: Array,
    dataForm: Object,
  },
  mounted() {
    this.enableAddModal = this.enableAddModal || false;
    this.enableEditModal = this.enableEditModal || false;
  },
  computed: {
    url() {
      return (
        this.$store.getters.api + this.endPoint + (this.with ? this.with : "")
      );
    },
  },
  methods: {
    filterChange(call, date) {
      let valor = $("#" + date).val();
      valor = valor.replace("T", " ");

      // console.log(valor)

      this.$emit(call, valor);
      this.$refs.table.refresh();
    },
    callExtra(name, props, row, index) {
      this.$emit(name, {
        props,
        row,
        index,
      });
    },
    edit(id) {
      this.$router.push({
        path: this.endPoint + "/edit/" + id,
      });
    },
    resetpassword(id) {
      this.$router.push({
        path: this.endPoint + "/resetpassword/" + id,
      });
    },
    view(id) {
      this.$router.push({
        path: this.endPoint + "/view/" + id,
      });
    },
    download(file) {
      window.open(file, "_blank");
    },
    destroy(props, row, index) {
      const self = this;

      swal({
        title: "Deseja deletar o registro?",
        text: "Essa operação não pode ser desfeita",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, deletar!",
        showLoaderOnConfirm: true,
        buttons: {
          catch: {
            text: "Não",
            value: "cancel",
            className: "btn-danger",
          },
          confirm: {
            text: "Sim",
            value: "confirm",
          },
        },
      }).then((value) => {
        switch (value) {
          case "cancel":
            swal("Cancelado", "O registro não foi excluido!", "info");
            break;

          case "confirm":
            axios
              .delete(this.url + "/" + row.id, {
                id: row.id,
              })
              .then((response) => {
                // self.$refs.table.tableData.splice(index - 1, 1);
                self.$refs.table.data.splice(index - 1, 1);
                swal("Sucesso", "Registro excluído com sucesso!", "success");
              });
            break;
        }
      });
    },
    addModal: function () {
      this.$emit("addModal");
    },
    editModal: function (id) {
      this.$emit("editModal", id);
    },
  },
  components: {
    Pagination,
  },
};
</script>

<style scoped>
.photo {
  max-height: 90px;
  max-width: 90px;
}

.key {
  border: 2px solid #ff7301;
}

.btn-crud {
  margin: 3px !important;
}
</style>
