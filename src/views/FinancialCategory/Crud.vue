<template>
  <div>
    <base-crud
      crudName="Categorias"
      newText="Nova Categoria"
      :table="table"
      :columns="columns"
      :options="options"
      :endPoint="endPoint"
      :enableAdd="true"
      :enableEdit="true"
      :enableDelete="true"
      :enableView="false"
      :dataForm="dataForm"
    ></base-crud>
  </div>
</template>

<script>
import BaseCrud from "../../layouts/Base/BaseCrud";

export default {
  data: function () {
    return {
      table: "financialCategoryTable",
      // pages: [],
      // url: '',
      columns: ["id", "title", "actions"],
      tableData: ["id", "title"],
      options: {
        sortable: ["id", "title"],
        filterable: ["title"],
        filterByColumn: true,
        debounce: 1000,
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          title: "Nome",
          actions: "Ações",
        },
        templates: {},
        requestFunction: function (data) {
          let requestData = {};

          let query = this.$parent.$parent.$parent.query(data.query);
          requestData.params = data;
          requestData.params.query = "";
          requestData.params.with = ["user"];

          return this.$http.get(this.url + "?" + query, requestData).catch(
            function (e) {
              this.dispatch("error", e);
            }.bind(this)
          );
        },
      },
      endPoint: "financial_categories",

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
        title: "title",
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
</style>