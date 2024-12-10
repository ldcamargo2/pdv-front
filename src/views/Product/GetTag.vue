<template>
    <div>
        <div class="main-content">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-title">Selecione um produto para gerar a etiqueta</div>
                            <div class="row justify-content-center">
                                <div class="col-md-12">
                                    <label>Produto</label>
                                    <v-select :options="products" :reduce="(products) => products"
                                        :label="'description'" v-model="generate.product_id" @input="quantityDefault" class="vselect" />
                                </div>
                                <div class="col-md-4 mt-2">
                                    <label>Quantidade</label>
                                    <input type="text" v-model="generate.quantity" class="form-control">
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-md-2 mt-2 centered">
                                    <button class="btn btn-add" @click="generateTag">Gerar Etiquetas</button>
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
            products: [],
            generate: {},
        };
    },
    computed: {}, 
    methods: {
        quantityDefault(obj){
            this.generate.quantity = obj.quantity_default;
        },
        generateTag() {
            const self = this;

            if (!self.generate.product_id) {
                swal("Ops!", "Selecione um produto para prosseguir", "info");
            }

            if (!self.generate.quantity) {
                swal("Ops!", "Selecione uma quantidade para prosseguir", "info");
            }

            var popup = window.open(self.generate.product_id.barcode_url + '/' + self.generate.quantity, 'popupWindow', 'width=900,height=400');

            if (popup === null || typeof popup === 'undefined') {
                swal("Ops!", "O popup foi bloqueado pelo navegador, autorize e tente novamente.", "error");
            }
        },
        getEntity: function () {
            const self = this;
            const api = self.$store.state.api + "products/?paginated=false";

            axios
                .get(api)
                .then((response) => {
                    self.products = response.data.data;
                })
                .catch((error) => {
                    self.$message(null, error.response.data, "error");
                });
        },

    },
    mounted: function () {
        const self = this;

        self.getEntity();
    },
    components: {
        BaseCrud,
        vSelect,
    },
};
</script>
<style scoped></style>