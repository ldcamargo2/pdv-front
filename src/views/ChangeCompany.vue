<template>
  <div>
   
   <div class="card">
    <div class="card-body">
      <div class="row justify-content-center mt-5">
        <div class="col-md-12 centered">
          Você está conectado como <strong>{{ user.company_name }}</strong>, para alterar, selecione outra empresa abaixo.
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Empresa</th>
                <th scope="col">CNPJ</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="company in companies" :key="company.company_id">
                <th scope="row">{{ company.id }}</th>
                <td>{{ company.company_name }}</td>
                <td>{{ company.cnpj }}</td>
                <td><button class="btn btn-add" @click="changeCompany(company)">Selecionar Empresa</button></td>
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

export default {
  data() {
    return {
      user: {},
      companies: []
    };
  },
  components: {  },
  methods: {
    getCompanies() {
      const self = this;
      const api = self.$store.state.api + "companies";

      axios
        .get(api)
        .then((response) => {
          self.companies = response.data.data;
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    changeCompany(obj) {
      const self = this;
      const api = self.$store.state.api + "change-company";

      axios
        .post(api, obj)
        .then((response) => {
          window.location.href = "/";
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
          // window.location.href = "/";
        });
    },
  },
  mounted() {
    const self = this;
    setTimeout(function () {
      self.user = self.$store.state.user;    
      self.getCompanies();
    }, 100);
  },
  created() { },
};
</script>

<style></style>
