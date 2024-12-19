<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <base-crud :ref="'productsCrud'" crudName="Empresas" newText="Nova Empresa" :table="table" :columns="columns"
          :options="options" :endPoint="endPoint" :enableAdd="true" :enableEdit="true" :enableDelete="true"
          :enableView="false" :enableReset="false" :dataForm="dataForm">
        </base-crud>
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
      pages: [],
      url: "",
      columns: ["id", "fantasy_name", "company_name", "cnpj", "actions"],
      tableData: ["id", "fantasy_name", "company_name", "cnpj"],
      options: {
        saveState: true,
        filterByColumn: true,
        debounce: 1000,
        filterable: ["id", "fantasy_name", "company_name", "cnpj"],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          fantasy_name: "Nome Fantasia",
          company_name: "Razão Social",
          cnpj: "CNPJ",
          actions: "Ações",
        },

        texts: {
          filterBy: "Filtrar",
          defaultOption: "Selecione",
        },
        listColumns: {
        },
        requestFunction: function (data) {
          let requestData = {};

          console.log(this.$parent.$parent);

          let query = this.$parent.$parent.$parent.query(data.query);
          requestData.params = data;
          requestData.params.query = "";
          requestData.params.with = [];

          return axios.get(this.url + "?" + query, requestData).catch(
            function (e) {
              this.dispatch("error", e);
            }.bind(this)
          );
        },
      },
      endPoint: "companies",
      dataForm: {},
    };
  },
  components: {
    BaseCrud,
  },
  methods: {
    query: function (query) {
      let columns = {
        id: "id",
        fantasy_name: 'fantasy_name',
        company_name: 'company_name',
        cnpj: 'cnpj',
      };
      let filters = "";
      $.each(query, function (index, value) {
        filters += columns[index] + "=" + value + "&";
      });
      return filters;
    },
  },
};
</script>

<style scoped>
.VuePagination {
  text-align: center;
}

.uploading-image {
  display: flex;
  border-radius: 10px;
  width: 100px;
  height: 100px;
}
</style>