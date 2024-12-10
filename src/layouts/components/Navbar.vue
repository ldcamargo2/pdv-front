<template>
  <div class="navbar-container d-flex content align-items-center" :style="'background-color: ' + user.company_color + ' !important; border-radius: 5px !important;'">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
      <b :class="tempo_logout_tempo_ < 60 ? 'text-danger' : ''" id="tempo_logout_">{{ tempo_logout_ }}</b>
    </div>
    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
        <template #button-content>
          <div class="d-sm-flex d-none user-nav" :style="'color: ' + user.company_font_color +' !important'">
            <p class="user-name font-weight-bolder mb-0">{{ user.name }}</p>
            <span class="user-status">{{ user.company_name }}</span>
          </div>
          <b-avatar size="40" variant="light-primary" badge :src="user.photo" class="badge-minimal"
            badge-variant="success" />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <router-link :to="'/profile'">
            <span>Meu Perfil</span>
          </router-link>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="GridIcon" class="mr-50" />
          <router-link :to="'/change-company'">
            <span>Trocar Empresa</span>
          </router-link>
        </b-dropdown-item>

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MailIcon" class="mr-50" />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MessageSquareIcon" class="mr-50" />
          <span>Chat</span>
        </b-dropdown-item> -->

        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Sair</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";

export default {
  data() {
    return {
      authenticated: false,
      disabled: true,
      tempo_logout_tempo_: 301,
      tempo_logout_: "",
      user: {
        company_color: null
      },
    };
  },
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => { },
    },
  },
  methods: {
    logout: function () {
      let self = this;
      let api = this.$store.state.api + "logout";

      axios
        .post(api)
        .then((response) => {
          localStorage.removeItem("token");

          self.$router.push({ path: "/login" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.$message("Erro", "Erro ao realizar logout", "error");
        });
    },
    inactivityClock: function () {
      const self = this;

      let intervalo = setInterval(function () {
        self.tempo_logout_tempo_--;
        self.tempo_logout_ = "0" + Math.trunc(self.tempo_logout_tempo_ / 60) + ":" + (self.tempo_logout_tempo_ % 60).toString().padStart(2, '0');

        if (self.tempo_logout_tempo_ < 10) {
          $('#tempo_logout_').hide();
          setTimeout(function () {
            $('#tempo_logout_').show();
          }, 300);
        }
        if (self.tempo_logout_tempo_ === 0) {
          clearInterval(intervalo);
          self.logout();
        }
      }, 1000);
    },
  },
  mounted() {
    const self = this;

    // self.inactivityClock();

    // $(document).click(function(){
    //   self.tempo_logout_tempo_ = 301;
    // });
    // $(document).keypress(function(){
    //   self.tempo_logout_tempo_ = 301;
    // });

    setTimeout(function () {
      self.user = self.$store.state.user;
      // if(self.user.access_nivel != 1){
      // setTimeout(() => {
      //   $('#changeCompanyCenter').modal('toggle')
      // }, 1000);
      // }
     
    }, 500);
  },
};
</script>
