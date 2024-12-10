<template>
  <div>    
    <div class="row justify-content-center">
      <div class="col-md-3 button-operation input" :class="movement.operation == 1 ? 'input-active' : ''" @click="movement.operation = 1, focus()">Entrada</div>
      <div class="col-md-3 button-operation output" :class="movement.operation == 2 ? 'output-active' : ''" @click="movement.operation = 2, focus()">Saída</div>
    </div>

    <div class="row justify-content-center mt-2">
      <div class="col-md-4">
        <label>Código de Barras</label>
        <input type="text" id="product_code" class="form-control" @keyup.enter="setQuantity" v-model="movement.product_code" :disabled="movement.operation == 0">
      </div>
      <div class="col-md-2" style="margin-top: 27px">
        <button class="btn btn-back" @click="setQuantity">Movimentar</button>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalQuantity" tabindex="-1" role="dialog" aria-labelledby="modalQuantityLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalQuantityLabel">Alterar Estoque do Produto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <label>Informe a nova quantidade que deseja movimentar:</label>
                <input type="number" id="quantidade" class="form-control" v-model="movement.quantity">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="move" :disabled="!movement.quantity">Salvar Alterações</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      movement: {
        operation: 0,
        product_code: '',
        quantity: ''
      }
    };
  },
  components: {  },
  methods: {
    focus(){
      setTimeout(() => {
            document.getElementById("product_code").focus();
      }, 400);
    },
    setQuantity(){        
        $('#modalQuantity').modal('show');
        setTimeout(() => {
            document.getElementById("quantidade").focus();
        }, 700);
    },
    move(){
      const self = this;
      const api = self.$store.state.api + "product/manual-stock-movement";

      axios
        .post(api, self.movement)
        .then((response) => {
          self.$message('Sucesso', 'Movimentação inserida', "success");
          $('#modalQuantity').modal('hide');
          self.movement = {
            product_code: ''
          }
          self.focus();
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
          self.movement = {
            product_code: ''
          }
          self.focus();
        });
    }
  },
};
</script>

<style scoped>
.button-operation{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border: 2px #000000 solid;
  cursor: pointer;
  border-radius: 5px;
  font-size: 22px;
}

.output{
  background: rgba(156, 9, 9, 0.658);
  color: #fff;
  border-color: rgb(156, 9, 9);;
}

.output-active{
  background: rgb(156, 9, 9);
  color: #fff;
  border-color: rgb(156, 9, 9);
  font-weight: bold;
}

.input{
  background: rgba(12, 99, 0, 0.658);
  color: #fff;
  border-color: rgb(12, 99, 0);
}

.input-active{
  background: rgb(12, 99, 0);
  color: #fff;
  border-color: rgb(12, 99, 0);
  font-weight: bold;
}
</style>



