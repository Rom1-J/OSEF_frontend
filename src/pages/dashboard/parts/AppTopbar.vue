<template>
  <form class="layout-topbar" @submit.prevent="invite(!v$.$invalid)">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" src="@/layout/images/OSEF-logo.png"/>
    </router-link>
    <button class="p-link layout-menu-button layout-topbar-button"
            @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button"
            v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
            leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top lg:align-items-center">
      <li>
        <div class="p-inputgroup">
          <InputText placeholder="Friend code" maxlength="6"
                     v-model="v$.inviteCode.$model"/>
          <Button :label="$t('misc.invite')" type="submit"
                  :disabled="v$.inviteCode.$invalid || submitted"/>
        </div>
      </li>
      <li>
        <router-link :to="{name: 'notification'}" v-slot="{ isActive, navigate }">
          <button :class="{'text-primary': isActive}" @click="navigate"
                  class="p-link layout-topbar-button">
            <i class="pi pi-envelope"></i>
            <span>{{ $t('misc.notification') }}</span>
          </button>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'profile'}" v-slot="{ isActive, navigate }">
          <button :class="{'text-primary': isActive}" @click="navigate"
                  class="p-link layout-topbar-button">
            <i class="pi pi-user"></i>
            <span>{{ $t('misc.profile') }}</span>
          </button>
        </router-link>
      </li>
      <li>
        <Button @click="handleSubmit" class="p-link layout-topbar-button">
          <i class="pi pi-sign-out"></i>
          <span>{{ $t('login.sign_out') }}</span>
        </Button>
      </li>
    </ul>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { minLength, maxLength, required } from '@vuelidate/validators';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      inviteCode: '',
      submitted: false,
    };
  },
  validations() {
    return {
      inviteCode: {
        required,
        minLengthValue: minLength(6),
        maxLengthValue: maxLength(6),
      },
    };
  },
  methods: {
    ...mapActions(['LogOut']),
    onMenuToggle(event) {
      this.$emit('menu-toggle', event);
    },
    async invite(isFormValid) {
      if (!isFormValid) return;
      this.submitted = true;

      try {
        await axios.post('/api/transactions/', { friend_code: this.inviteCode });
        this.$toast.add({
          severity: 'success',
          summary: this.$t('status.sent.title'),
          detail: this.$t('status.sent.message'),
          life: 5000,
        });
        this.inviteCode = '';
      } catch (error) {
        const { response } = error;

        if (response?.status !== 200) {
          this.$toast.add({
            severity: 'error',
            summary: this.$t('status.error.title'),
            detail: this.$t('status.error.message'),
            life: 5000,
          });
        }
      }
      this.submitted = false;
    },
    async handleSubmit() {
      await this.LogOut();
      this.$toast.add({
        severity: 'success',
        summary: this.$t('status.disconnection.title'),
        detail: this.$t('status.disconnection.message'),
        life: 5000,
      });

      await this.$router.push({ name: 'login' });
    },
  },
};
</script>
