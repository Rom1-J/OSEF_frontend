<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle"/>
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick"/>
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view :key="$route.fullPath"/>
      </div>
      <AppFooter/>
    </div>

    <transition name="layout-mask">
      <div class="layout-mask p-component-overlay"
           v-if="mobileMenuActive"></div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppTopBar from './parts/AppTopbar.vue';
import AppMenu from './parts/AppMenu.vue';
import AppFooter from './parts/AppFooter.vue';

export default {
  emits: ['change-theme'],
  data() {
    return {
      layoutMode: 'static',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: 'Home',
          items: [{
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            to: { name: 'dashboard' },
          }],
        },
        {
          label: 'Échanges',
          items: [
            {
              label: 'Aucun échange...',
            },
          ],
        },
      ],
    };
  },
  methods: {
    ...mapActions(['LoadTransactions', 'LoadFiles']),
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle(e) {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      e.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
  },
  computed: {
    ...mapGetters(['StateTransactions', 'GetTransaction']),
    containerClass() {
      return ['layout-wrapper', {
        'layout-overlay': this.layoutMode === 'overlay',
        'layout-static': this.layoutMode === 'static',
        'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
        'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
        'layout-mobile-sidebar-active': this.mobileMenuActive,
        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
        'p-ripple-disabled': this.$primevue.config.ripple === false,
      }];
    },
  },
  components: {
    AppTopBar,
    AppMenu,
    AppFooter,
  },
  async created() {
    await this.LoadTransactions();
    await this.LoadFiles();

    if (this.StateTransactions) {
      this.menu[1].items = [];

      this.StateTransactions.forEach((el) => {
        const transaction = this.GetTransaction(el.token);
        this.menu[1].items.push({
          label: transaction.external.username,
          icon: 'pi pi-fw pi-user',
          to: {
            name: 'transaction',
            params: {
              token: transaction.token,
            },
          },
        });
      });
    }
  },
};
</script>

<style lang="scss">
@import './App.scss';
</style>
