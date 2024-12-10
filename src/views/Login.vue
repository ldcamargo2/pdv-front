<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <img width="150" src="@/assets/images/logo.png" />
        </b-link>

        <b-card-title class="mb-1">Bem-vindo ao sistema de gestão! 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Por favor, forneca suas credenciais para acessar a plataforma.
        </b-card-text>

        <!-- form -->
        <validation-observer ref="loginForm" #default="{ invalid }">
          <b-form class="auth-login-form mt-2" @submit.prevent>
            <!-- email -->
            <b-form-group label-for="email" label="E-mail">
              <validation-provider #default="{ errors }" name="Email" rules="required|email">
                <b-form-input id="email" v-model="email" name="login-email" :state="errors.length > 0 ? false : null"
                  placeholder="john@example.com" autofocus />
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Senha</label>
                <b-link :to="{ name: 'auth-forgot-password-v1' }">
                  <small>Esqueceu sua senha?</small>
                </b-link>
              </div>
              <validation-provider #default="{ errors }" name="Password" rules="required">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-form-input id="password" v-model="password" :type="passwordFieldType" class="form-control-merge"
                    :state="errors.length > 0 ? false : null" name="login-password" placeholder="Password" />

                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">
                Lembre dos meus dados
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button variant="primary" type="submit" block :disabled="invalid" @click="login">
              Entrar
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BButton,
  BForm,
  BFormInput,
  BFormGroup,
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
} from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: "",
      password: "",
      status: "",
      // validation rules
      required,
      email,
      passwordFieldType: "password",
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    login() {
      const self = this;
      const api = this.$store.state.api + "login";

      axios
        .post(api, {
          email: self.email,
          password: self.password,
        })
        .then((response) => {
          self.$store.commit("auth", response.data.access_token);
          self.$router.push({ path: "/" });
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
