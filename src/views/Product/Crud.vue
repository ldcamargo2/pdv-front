<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <base-crud :ref="'productsCrud'" crudName="Produtos" newText="Novo Produto" :table="table" :columns="columns"
          :options="options" :endPoint="endPoint" :enableAdd="true" :enableEdit="true" :enableDelete="true"
          :enableView="true" :enableReset="false" :extra="extra" :dataForm="dataForm" @changeStock="changeStock">
        </base-crud>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalStock" tabindex="-1" role="dialog" aria-labelledby="modalStockLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalStockLabel">Alterar Estoque do Produto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <label>Informe a nova quantidade de estoque para o produto: {{ productSelected.description }}</label>
                <input type="number" class="form-control" v-model="productSelected.stock">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveStock" :disabled="!productSelected.stock">Salvar Alterações</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCrud from "../../layouts/Base/BaseCrud";

export default {
  data: function () {
    return {
      table: "productsTable",
      showMessageImport: false,
      productsCrud: {},
      productSelected: {},
      pages: [],
      url: "",
      columns: ["id", "description", "type", "supplier_id", 'company_id', 'stock', "actions"],
      tableData: ["id", "description", "type", "supplier_id", 'company_id', 'stock'],
      options: {
        filterByColumn: true,
        debounce: 1000,
        filterable: ["id", "code", "description", "type", "supplier_id", "dimension", 'company_id'],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          key: "Chave",
          code: "Código",
          description: "Descrição",
          type: "Tipo",
          dimension: "Dimensão",
          supplier_id: "Fornecedor",
          company_id: "Empresa",
          stock: "Estoque",
          actions: "Ações",
        },

        texts: {
          filterBy: "Filtrar",
          defaultOption: "Selecione",
        },
        listColumns: {},
        templates: {
          company_id: function (h, row, index) {
            return row.company
              ? row.company.fantasy_name
              : '';
          },
          supplier_id: function (h, row, index) {
            return row.supplier
              ? row.supplier.fantasy_name
              : '';
          },
          stock: function (h, row, index) {
            return (
              <h5 class="text-center">
                <span class={row.stock_status}>
                  {row.stock}
                </span>
              </h5>
            );
          },
        },
        requestFunction: function (data) {
          let requestData = {};

          let query = this.$parent.$parent.$parent.query(data.query);
          requestData.params = data;
          requestData.params.query = "";
          requestData.params.with = ['company', 'supplier'];

          return axios.get(this.url + "?" + query, requestData).catch(
            function (e) {
              this.dispatch("error", e);
            }.bind(this)
          );
        },
      },
      extra: [
        {
          id: 1,
          label: "",
          class: "btn btn-crud info",
          title: "Aprovar",
          name: "changeStock",
          icon: "fas fa-box",
        },
      ],
      endPoint: "products",
      dataForm: {},
    };
  },
  components: {
    BaseCrud,
  },
  methods: {
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let fileImport = document.getElementById("fileImport");

      fd.append("fileImport", fileImport.files[0] ? fileImport.files[0] : "");

      return fd;
    },

    query: function (query) {
      let columns = {
        id: 'id',
        key: 'key',
        code: 'code',
        description: 'description',
        type: 'type',
        dimension: 'dimension',
        company_id: 'company[fantasy_name]',
        supplier_id: 'supplier[fantasy_name]',
        actions: 'actions',
      };

      let filters = "";
      
      $.each(query, function (index, value) {
        filters += columns[index] + "=" + value + "&";
      });
      return filters;
    },
    saveStock(){
      const self = this;
      let api = self.$store.state.api + "product/save-stock";
      
      axios
        .post(api, self.productSelected)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          
          $('#modalStock').modal('hide');
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    changeStock(row) {
      const self = this;

      self.productSelected = row.row;

      console.log(row.row)

      setTimeout(() => {
        $('#modalStock').modal('show');
      }, 500);
    },
  },
};
</script>

<style scoped></style>