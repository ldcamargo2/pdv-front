<template>
  <div>
    <section v-if="opened">
        <div class="row">
            <div class="col-md-7">
                <div class="card">
                    <div class="card-body mh">
                        <div class="row">
                            <div class="col-md-10">
                                <input type="text" style="min-height: 65px; font-size: 25px; text-align: center" id="inputProduct" @keyup.enter="getProduct"  v-model="temp.product" placeholder="Código ou descrição do produto" class="form-control" autocomplete="new-password">
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
                                <button class="btn btn-pdv finalizar" @click="simularTecla('F4')">Finalizar Venda (F4)</button>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-pdv cancelar" @click="simularTecla('F5')">Cancelar Venda (F5)</button>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-pdv cancelar-item" @click="simularTecla('F3')">Cancelar Item (F3)</button>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-pdv fechar-caixa" @click="simularTecla('F12')">Fechar Caixa (F12)</button>
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
    </section>
    <section v-else>

        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 centered bold fs-26">
                                <i class="fas fa-times" style="color: red"></i> Caixa Fechado
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="row justify-content-center">
                            <div class="col-md-12 centered">
                                Para abrir o caixa, forneça as informações a seguir
                            </div>
                            <div class="col-md-2 mt-5 mb-2 centered">
                                <label>Valor de Abertura</label>
                                <money class="form-control" v-model="new_cashier.open_value" v-bind="money"></money>
                            </div>
                        </div>
                        <div class="row justify-content-center mb-5">
                            <div class="col-md-2 centered">
                                <button class="btn btn-primary" @click="openCashier">
                                    Abrir Caixa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <!-- Modal de Itens -->
    <div class="modal fade" id="modalItens" tabindex="-1" role="dialog" aria-labelledby="modalItensTitle" aria-hidden="true" @keydown="handleKey" >
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalItensLongTitle">Escolha uma opção</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">    
                    <ul>
                        <li 
                            v-for="(item, index) in items" 
                            :key="index"
                            :class="{ selected: index === selectedIndex }"
                            @click="selectItem(index)"
                        >
                            {{ item.description }}
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div> 
    </div>
    <!-- Modal de Pagamento -->
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="save(2)">Não Enviar NF (F7)</button>
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
        opened: false,
        new_cashier: {
            open_value: 0
        },
        cashier: {},
        items: [],
        selectedIndex: 0, // Índice da opção selecionada
        showModalItens: false,
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
    openCashier(){
        const self = this;
        let api = self.$store.state.api + "cashier/new";

        self.$loading(true);

        axios
        .post(api, self.new_cashier)
        .then((response) => {
            self.$message(
                "Sucesso",
                `Caixa aberto`,
                "success"
            );
            self.$loading(false);

            self.getCashier();
        })
        .catch((error) => {
            self.$loading(false);
            self.$message(null, error.response.data, "error");
        });
    },
    resetCashier(){
        const self = this;
        
        self.setPayment = {
            value: 0,
            method: 0
        }

        self.product = {
            output_value: 0,
        }

        self.sale = {
            itens: [],
            payments: [],
            total: 0,
            total_to_pay: 0,
            total_paid: 0
        },
 
        self.temp = {
            quantity: 1
        }

        self.inputFocus();
    },
    handleKey(event) {
      if (event.key === "ArrowDown") {
        this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
      } else if (event.key === "ArrowUp") {
        this.selectedIndex =
          (this.selectedIndex - 1 + this.items.length) % this.items.length;
      } else if (event.key === "Enter") {
        this.selectItem(this.selectedIndex);
      }
    },
    selectItem(index) {
        const self = this;
        self.product = self.items[index];

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

        setTimeout(() => {
            self.inputFocus();
            self.scrollToBottom();
        }, 200);
        
        $('#modalItens').modal('hide');
    },
    print(obj){
        axios
            .post('http://localhost:5000/imprimir', obj, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then((response) => {
                console.log('response impressao', response)
            })
            .catch((error) => {
                console.log('error impressao', error)
            });
    },
    save(id){
        const self = this;
        let api = self.$store.state.api + "sale/save";

        self.$loading(true);

        self.sale.send_nf = id; 
        self.sale.cashier_id = self.cashier.id; 
        
        $('#modalSaveSale').modal('hide');

        axios
            .post(api, self.sale)
            .then((response) => {
                self.$message(
                    "Sucesso",
                    `Venda finalizada`,
                    "success"
                );
                self.$loading(false);

                self.resetCashier();

                console.log('return', response.data);

                self.print(response.data);
            })
            .catch((error) => {
                self.$loading(false);
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

        if(self.setPayment.method == 0){               
            swal("Ops!", 'Selecione a forma de pagamento', "error")
            .then(() => {
                setTimeout(() => {
                    $('#modalPayment').modal('show');

                    setTimeout(() => {
                        const input2 = document.getElementById('inputMoney');
                        input2.focus();
                        input2.select();
                    }, 500);
                }, 300); 
            });
            return;
        }

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

            self.finishing = 1;

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

            if(Array.isArray(response.data)){
                self.items = response.data;

                setTimeout(() => {
                    $('#modalItens').modal('show')
                }, 300);
                return;
            }
            
            self.product = response.data;

            if(!self.product){
                self.temp =  { quantity: 1 }
                swal("Ops!", 'Produto não cadastrado.', "error")
                .then(() => {
                    setTimeout(() => {
                        self.inputFocus();
                    }, 300); 
                });

                return;
            }

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
                case 'F5':                    
                    window.location.reload();
                    break;
                case 'F7':                    
                    self.save(2);
                    break;
                case 'F12':             
                    swal({
                        title: "Deseja fechar o caixa?",
                        text: "Essa operação não pode ser desfeita",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sim, fechar!",
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
                            swal("Cancelado", "O caixa não foi fechado!", "info");
                            break;

                        case "confirm":
                            let api = self.$store.state.api + "cashier/close";

                            self.$loading(true);

                            axios
                                .post(api, self.cashier)
                                .then((response) => {
                                    self.getCashier();
                                    self.$loading(false);
                                    swal("Ok!", 'Caixa fechado com sucesso!', "success");
                                })
                                .catch((error) => {                                    
                                    swal("Ops!", 'Houve um erro ao fechar o caixa, tente novamente.', "error");
                                    self.$loading(false);
                                });
                            break;
                        }
                    });
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
    },
    simularTecla(tecla, tipoEvento = 'keydown') {
        const eventoTeclado = new KeyboardEvent(tipoEvento, {
            key: tecla, // Nome da tecla
            code: `Key${tecla.toUpperCase()}`, // Código da tecla
            keyCode: tecla.charCodeAt(0), // Código numérico da tecla
            charCode: tecla.charCodeAt(0),
            which: tecla.charCodeAt(0),
            bubbles: true // Permite que o evento se propague
        });

        // Dispara o evento no elemento desejado
        document.dispatchEvent(eventoTeclado);
    },
    getCashier(){
        const self = this;
        let api = self.$store.state.api + "cashier/get";

        self.$loading(true);

        axios
            .get(api)
            .then((response) => {
                if(response.data){
                    self.cashier = response.data;
                    self.opened = 1;
                    self.inputFocus();
                } else {
                    self.opened = 0;
                }
                self.$loading(false);
            })
            .catch((error) => {
                self.$loading(false);
            });
    },
  },
  mounted: function () {
    const self = this;

    self.getCashier();

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
.btn-pdv.fechar-caixa{
    background-color: #b9b39c;
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

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  cursor: pointer;
}

li.selected {
  background: #007bff;
  color: #fff;
}

button {
  margin-top: 10px;
}
</style>
