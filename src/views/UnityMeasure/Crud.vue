<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <base-crud 
          :ref="'typesCrud'" 
          crudName="Unidades de Medida" 
          newText="Novo" 
          :table="table" 
          :columns="columns"
          :options="options" 
          :endPoint="endPoint" 
          :enableAdd="true" 
          :enableEdit="true" 
          :enableDelete="true"
          :enableView="false" 
          :enableReset="false" 
          :dataForm="dataForm">
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
      table: "unity_measuresTable",
      showMessageImport: false,
      unity_measuresCrud: {},
      pages: [],
      url: "",
      columns: ["id", "title", "actions"],
      tableData: ["id", "title"],
      options: {
        saveState: true,
        filterByColumn: true,
        debounce: 1000,
        filterable: ["id", "title"],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          title: "Título",
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
      endPoint: "unity_measures",
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
        title: 'title'
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