<template>
  <div>
    <div class="row">
        <div class="col-md-7">
            <div class="card">
                <div class="card-body mh">
                    <div class="row">
                        <div class="col-md-10">
                            <input type="text" style="min-height: 65px; font-size: 25px; text-align: center" id="inputProduct" @keyup.enter="getProduct"  v-model="temp.product" placeholder="Código ou descrição do produto" class="form-control">
                        </div>
                        <div class="col-md-2">
                            <input type="text" style="min-height: 65px; font-size: 25px; text-align: center" id="inputQtd" @keyup.enter="setQuantity"  v-model="temp.quantity" class="form-control">
                        </div>
                    </div>
                    <div class="row bold mt-5 mb-5" style="height: 15vh">
                        <div class="col-md-12" v-if="product.description">
                            Último produto:
                        </div>
                        <div class="col-md-9" style="font-size: 30px; font-style: italic" v-if="product.description">
                            {{ product.description }}
                        </div>
                        <div class="col-md-3" style="text-align:right; font-size: 30px; font-style: italic" v-if="product.description">
                            R${{ formatMoney(Number(product.output_value)) }}
                        </div>
                    </div>
                    <div class="row p-1 justify-content-center">
                        <div class="col-md-3 mr-1 box-total">
                            <span style="font-size: 20px">Total</span><br>
                            <span class="bold font_blue">{{ formatMoney(sale.total) }}</span>
                        </div>
                        <div class="col-md-3 mr-1 box-total">
                            <span style="font-size: 20px">Total à Pagar (-)</span><br>
                            <span class="bold font_red">{{ formatMoney(sale.total_to_pay) }}</span>
                        </div>
                        <div class="col-md-3 mr-1 box-total">
                            <span style="font-size: 20px">Total Pago (+)</span><br>
                            <span class="bold font_green">{{ formatMoney(sale.total_paid) }}</span>
                        </div>
                    </div>
                    <div class="row p-1 justify-content-center">
                        <div class="col-md-3">
                            <button class="btn btn-pdv finalizar">Finalizar Venda (F4)</button>
                        </div>
                        <div class="col-md-3">
                            <button class="btn btn-pdv cancelar">Cancelar Venda (F5)</button>
                        </div>
                        <div class="col-md-3">
                            <button class="btn btn-pdv cancelar-item">Cancelar Item (F3)</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>    
        <div class="col-md-5">
            <div class="card">
                <div class="card-body mh">
                    <div class="row bold">
                        <div class="col-md-12">
                            <div class="row item" style="margin-top: -5px">
                                <div class="col-md-1">
                                    #
                                </div>
                                <div class="col-md-7">
                                    Descrição
                                </div>                             
                                <div class="col-md-2">
                                    Vl. Unit
                                </div>                            
                                <div class="col-md-2">
                                    Total
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 list-products" id="scrollDiv">
                            <div class="row item" v-for="(item, index) in sale.itens" :key="index">
                                <div class="col-md-1">
                                    {{ index + 1 }}
                                </div>
                                <div class="col-md-7">
                                    {{ item.quantity }} x {{ item.product.product_stripped }}
                                </div>                            
                                <div class="col-md-2">
                                    {{ formatMoney(item.unit_value) }}
                                </div>                            
                                <div class="col-md-2">
                                    {{ formatMoney(item.total) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>    
    </div>    
    <!-- Modal -->
    <div class="modal fade" id="modalPayment" tabindex="-1" role="dialog" aria-labelledby="modalPaymentTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalPaymentLongTitle">Inserir pagamento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <money class="form-control" id="inputMoney" v-model="setPayment.value" v-bind="money" @keyup.enter.native="savePayment" ></money>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 btn-payment" :class="setPayment.method == 'C' ? 'active' : ''" @click="setPayment.method = 'C'">Crédito (C)</div>
                    <div class="col-md-3 btn-payment" :class="setPayment.method == 'D' ? 'active' : ''" @click="setPayment.method = 'D'">Débito (D)</div>
                    <div class="col-md-3 btn-payment" :class="setPayment.method == 'M' ? 'active' : ''" @click="setPayment.method = 'M'">Dinheiro (M)</div>
                    <div class="col-md-3 btn-payment" :class="setPayment.method == 'P' ? 'active' : ''" @click="setPayment.method = 'P'">Pix (P)</div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" @click="savePayment">Salvar</button>
            </div>
            </div>
        </div>
    </div>

    <!-- Modal Cancelar Item -->
    <div class="modal fade" id="modalCancelItem" tabindex="-1" role="dialog" aria-labelledby="modalCancelItemTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCancelItemLongTitle">Cancelar item</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <input class="form-control" id="inputItem" v-model="cancelItem" @keyup.enter="saveCancelItem" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" @click="saveCancelItem">Salvar</button>
            </div>
            </div>
        </div>
    </div>

    <!-- Modal Finalizar Item -->
    <div class="modal fade" id="modalSaveSale" tabindex="-1" role="dialog" aria-labelledby="modalSaveSaleTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalSaveSaleLongTitle">Finalizar Venda</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <label>Informar CPF</label>
                        <input class="form-control" id="inputCPF" v-mask="'###.###.###-##'" v-model="sale.cpf" @keyup.enter="save(1)" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="save(2)">Não Enviar NF (ESC)</button>
                <button type="button" class="btn btn-primary" @click="save(1)">Enviar NF (F6)</button>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import vSelect from "vue-select";

export default {
  data() {
    return {
        cancelItem: null,
        finishing: 0,
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            suffix: '',
            precision: 2,
            masked: false
        },
        setPayment: {
            value: 0,
            method: 0
        },
        product: {
            output_value: 0,
        },
        sale: {
            itens: [],
            payments: [],
            total: 0,
            total_to_pay: 0,
            total_paid: 0
        },
        temp: {
            quantity: 1
        }
    };
  },
  computed: {},
  methods: {
    save(id){
        const self = this;
        let api = self.$store.state.api + "sale/save";

        self.sale.send_nf = id; 

        axios
            .post(api, self.sale)
            .then((response) => {
                self.$message(
                    "Sucesso",
                    `Venda finalizada`,
                    "success"
                );
            })
            .catch((error) => {
                self.$message(null, error.response.data, "error");
            });
    },
    saveCancelItem(){
        const self = this;
        $('#modalCancelItem').modal('hide');

        console.log(self.sale.itens[(self.cancelItem-1)]);

        self.sale.total_to_pay = self.sale.total_to_pay - self.sale.itens[(self.cancelItem-1)].total;
        self.sale.total = self.sale.total - self.sale.itens[(self.cancelItem-1)].total;

        self.sale.itens.splice((self.cancelItem-1), 1)

        self.cancelItem = null;
        
        self.inputFocus();
    },
    savePayment(){
        const self = this;
        $('#modalPayment').modal('hide');

        console.log('inserindo pagamento');

        var obj = {
            method: self.setPayment.method,
            value: self.setPayment.value
        }

        self.sale.payments.push(obj);

        self.sale.total_paid = self.sale.total_paid + self.setPayment.value;
        self.sale.total_to_pay = self.sale.total_to_pay - self.setPayment.value;
        
        self.setPayment = {
            method: 0,
            value: 0
        }

        if(self.sale.total_to_pay == 0){
            $('#modalSaveSale').modal('show');

            setTimeout(() => {
                const input = document.getElementById('inputCPF');
                input.focus();  
            }, 500);          
        }
        
        self.inputFocus();
    },
    formatMoney(value){
        return value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).replace('.', '');
    },
    setQuantity(){
        this.inputFocus();
    },
    getProduct: function (id) {
      const self = this;
      const api = self.$store.state.api + "product/get-product";

      axios
        .post(api, self.temp)
        .then((response) => {
            self.product = response.data;

            var obj = {
                quantity: self.temp.quantity,
                product: self.product,
                unit_value: Number(self.product.output_value),
                total: self.temp.quantity * Number(self.product.output_value)
            };

            self.sale.itens.push(obj);

            //Soma o total da compra
            self.sale.total = self.sale.total + obj.total;
            self.sale.total_to_pay = self.sale.total_to_pay + obj.total;

            self.temp =  { quantity: 1 }
            self.inputFocus();
            self.scrollToBottom();
        })
        .catch((error) => {
            self.temp =  { quantity: 1 }
            swal("Ops!", error.response.data, "error")
            .then(() => {
                setTimeout(() => {
                    self.inputFocus();
                }, 300); 
            });
        });
    },
    inputFocus(){        
        const input = document.getElementById('inputProduct');
        input.focus();
    },
    detectarTeclaF(event) {
        const self = this;

        // Verifica se a tecla está na linha F (F1 a F12)
        if (event.key.startsWith("F") && !isNaN(event.key.slice(1))) {
            event.preventDefault();
            switch (event.key) {
                case 'F1':                    
                    const input = document.getElementById('inputQtd');
                    input.focus();
                    input.select();
                    break;
                case 'F2':                    
                    self.inputFocus();
                    break;
                case 'F4':                    
                    $('#modalPayment').modal('show')

                    setTimeout(() => {
                        const input2 = document.getElementById('inputMoney');
                        input2.focus();
                        input2.select();
                    }, 500);

                    break;
                case 'F3':                    
                    $('#modalCancelItem').modal('show')

                    setTimeout(() => {
                        const input3 = document.getElementById('inputItem');
                        input3.focus();
                        input3.select();
                    }, 500);

                    break;
            
                default:
                    break;
            }
        }
        
        if ((event.key.startsWith("D") || event.key.startsWith("d")) && !isNaN(event.key.slice(1))) {
            self.setPayment.method = 'D';
        }
        
        if ((event.key.startsWith("C") || event.key.startsWith("c")) && !isNaN(event.key.slice(1))) {
            self.setPayment.method = 'C';
        }
        
        if ((event.key.startsWith("P") || event.key.startsWith("p")) && !isNaN(event.key.slice(1))) {
            self.setPayment.method = 'P';
        }
        
        if ((event.key.startsWith("M") || event.key.startsWith("m")) && !isNaN(event.key.slice(1))) {
            self.setPayment.method = 'M';
        }
    },
    scrollToBottom() {
        setTimeout(() => {
            const scrollDiv = document.getElementById("scrollDiv");
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
        }, 200);
    }
  },
  mounted: function () {
    const self = this;

    self.inputFocus();

    window.addEventListener("keydown", this.detectarTeclaF);
  },
  beforeUnmount() {
    // Remove o evento ao destruir o componente
    window.removeEventListener("keydown", this.detectarTeclaF);
    console.log('Detecção de teclas removida')
  },
  components: {
    vSelect,
  },
};
</script>
<style scoped>
.mh{
    height: 75vh !important;
}
.list-products{
    width: 100vh;
    height: 65vh;
    overflow: auto;
}
.item{
    height: 35px !important;
    border-bottom: 1px dotted #b1b1b1 !important;
    margin-top: 15px;
    width: 100% !important;
}
.box-total{
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #222;
    font-size: 35px
}
.font_red{
    color: red;
}
.font_blue{
    color: blue;
}
.font_green{
    color: green;
}
.btn-pdv{
    border-radius: 8px;
    border: 1px solid #333;
    padding: 15px;
    height: 100px;
    font-size: 20px
}
.btn-pdv.finalizar{
    background-color: #64bb3b;
    color: #000;
}
.btn-pdv.cancelar{
    background-color: #bb3b3bbe;
    color: #000;
}
.btn-pdv.cancelar-item{
    background-color: #e0b938;
    color: #000;
}

.btn-payment{
    margin-top: 25px;
    background-color: #b6b1fc;
    border: 10px solid #fff; 
    padding: 25px;
    text-align: center;
    font-weight: bold;
    vertical-align: middle;
    cursor: pointer;
}
.btn-payment.active{
    background-color: #5347ff;
    color: white;
}
</style>
