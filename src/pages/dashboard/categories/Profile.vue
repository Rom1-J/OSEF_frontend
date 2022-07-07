<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>{{ StateUser.username }}</h5>
        <form @submit.prevent="handleSubmit(!v$.$invalid)"
              class="p-fluid formgrid grid">
          <div class="field col-12 md:col-4">
            <label for="username">Nom d'utilisateur</label>
            <InputText v-model="username" id="username" disabled type="text"/>
          </div>
          <div class="field col-12 md:col-4">
            <label for="firstname"
                   :class="{'p-error':v$.firstName.$invalid && submitted}">
              Prénom
            </label>
            <InputText v-model="v$.firstName.$model" id="firstname"
                       :class="{'p-invalid':v$.firstName.$invalid && submitted}"
                       type="text"/>
            <small v-if="(v$.firstName.$invalid && submitted) || v$.firstName.$pending.$response"
                   class="p-error">
              {{v$.firstName.alpha.$message}}
            </small>
          </div>
          <div class="field col-12 md:col-4">
            <label for="lastname"
                   :class="{'p-error':v$.lastName.$invalid && submitted}">
              Nom
            </label>
            <InputText v-model="v$.lastName.$model" id="lastname"
                       :class="{'p-invalid':v$.lastName.$invalid && submitted}"
                       type="text"/>
            <small v-if="(v$.lastName.$invalid && submitted) || v$.lastName.$pending.$response"
                   class="p-error">
              {{v$.lastName.alpha.$message}}
            </small>
          </div>
          <div class="field col-12">
            <label for="email">Adresse e-mail</label>
            <InputText v-model="email" id="email" disabled type="email"/>
          </div>

          <div class="field col-12 mt-5">
            <Button label="Sauvegarder" :disabled="submitted || v$.$invalid" type="submit"/>
          </div>
        </form>

        <Divider/>

        <div class="grid p-fluid">
          <div class="field text-center col-12 md:col-offset-4 md:col-4">
            <label for="friendCode">Code d'ami</label>
            <div class="p-inputgroup">
              <InputText v-model="friendCode" disabled/>
              <Button icon="pi pi-paperclip" @click="copyFriendCode"/>
            </div>
          </div>
          <div class="field col-12 md:col-offset-4 md:col-4">
            <div class="flex flex-column text-center">
              <span class="mb-2">Clé publique</span>
              <QrcodeVue :size="240" :value="publicKey"
                         class="align-self-center"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

import { mapActions, mapGetters } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import {
  alpha,
  helpers,
} from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      friendCode: '',
      publicKey: '',
      submitted: false,
    };
  },
  validations() {
    return {
      firstName: {
        alpha: helpers.withMessage('Le prénom ne doit contenir que des lettres.', alpha),
      },
      lastName: {
        alpha: helpers.withMessage('Le nom ne doit contenir que des lettres.', alpha),
      },
    };
  },
  computed: {
    ...mapGetters(['StateUser', 'StateKeys']),
  },
  methods: {
    ...mapActions(['UpdateUser']),
    copyFriendCode() {
      navigator.permissions
        .query({ name: 'clipboard-write' })
        .then((response) => {
          if (response.state === 'granted' || response.state === 'prompt') {
            navigator.clipboard.writeText(this.friendCode);
            this.$toast.add({
              severity: 'info',
              summary: 'Copié',
              detail: 'Code d\'ami copié dans le presse papier !',
              life: 3000,
            });
            return;
          }
          this.$toast.add({
            severity: 'error',
            summary: 'Impossible',
            detail: 'Impossible de copier dans votre presse papier...',
            life: 3000,
          });
        });
    },
    async handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) return;

      try {
        await this.UpdateUser(this.$data);
        this.$toast.add({
          severity: 'success',
          summary: 'Sauvegardé',
          detail: 'Changements sauvegardés avec succès !',
          life: 3000,
        });
        this.$router.push({ name: 'login' });
      } catch (error) {
        const { response } = error;

        if (response?.status !== 200) {
          this.$toast.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Une erreur inconnue est survenue',
            life: 3000,
          });
        }
      }

      this.submitted = false;
    },
  },
  components: {
    QrcodeVue,
  },
  created() {
    this.username = this.StateUser.username;
    this.firstName = this.StateUser.first_name;
    this.lastName = this.StateUser.last_name;
    this.email = this.StateUser.email;
    this.friendCode = this.StateUser.friend_code;
    this.publicKey = this.StateKeys.publicKey;
  },
};
</script>
