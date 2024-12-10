<template>
  <div>    
    <!-- <div class="row justify-content-center">
      <div class="col-md-3 button-operation input" :class="movement.operation == 1 ? 'input-active' : ''" @click="movement.operation = 1, focus()">Entrada</div>
      <div class="col-md-3 button-operation output" :class="movement.operation == 2 ? 'output-active' : ''" @click="movement.operation = 2, focus()">Saída</div>
    </div> -->

    <div class="row justify-content-center mt-2">
      <div class="col-md-4">
        <label>Código de Barras</label>
        <input type="text" id="product_code" class="form-control" @keyup.enter="move" v-model="movement.product_code">
      </div>
      <div class="col-md-2" style="margin-top: 27px">
        <button class="btn btn-back" @click="move">Movimentar</button>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      movement: {
        product_code: ''
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
    move(){
      const self = this;
      const api = self.$store.state.api + "product/confirm-movement";

      axios
        .post(api, self.movement)
        .then((response) => {
          self.$message('Sucesso', 'Movimentação inserida', "success");
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
  mounted(){
    this.focus();
  }
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



