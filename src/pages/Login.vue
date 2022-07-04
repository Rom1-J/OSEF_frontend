<template>
  <div
      class="surface-0 flex align-items-center justify-content-center
       min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <router-link :to="{name: 'landing'}"
                     class="hover:underline">
          <img src="layout/images/OSEF-logo.png" alt="Sakai logo" class="mb-5"
               height="60">
        </router-link>
      </div>
      <div class="col-12 xl:col-6"
           style="border-radius:56px; padding:0.3rem;
           background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4"
             style="border-radius:53px;
             background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium">
              Se connecter
            </div>
            <span class="text-600 font-medium">
              Pas inscrit ?
              <router-link :to="{name: 'register'}"
                           class="hover:underline">
                inscrivez-vous
              </router-link>
            </span>
          </div>

          <form @submit.prevent="handleSubmit(!v$.$invalid)"
                class="w-full md:w-10 mx-auto">
            <div class="field">
              <label for="email"
                     :class="{'p-error':v$.email.$invalid && submitted}"
                     class="block text-900 text-xl font-medium mb-2">
                Adresse e-mail
              </label>
              <InputText id="email" v-model="v$.email.$model"
                         :class="{'p-invalid':v$.email.$invalid && submitted}"
                         class="w-full" type="email"
                         placeholder="Adresse e-mail"
                         style="padding:1rem;"/>
              <ul class="p-0 mt-0 list-none"
                  v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response">
                <li v-if="v$.email.required.$invalid" class="p-error">
                  {{ v$.email.required.$message }}
                </li>
                <li v-if="v$.email.email.$invalid" class="p-error">
                  {{ v$.email.email.$message }}
                </li>
              </ul>
            </div>

            <div class="field">
              <label for="password"
                     :class="{'p-error':v$.password.$invalid && submitted}"
                     class="block text-900 font-medium text-xl mb-2">
                Mot de passe
              </label>
              <Password id="password" v-model="v$.password.$model"
                        placeholder="Mot de passe"
                        :class="{'p-invalid':v$.password.$invalid && submitted}"
                        toggleMask :feedback="false" class="w-full"
                        inputClass="w-full"
                        inputStyle="padding:1rem">
              </Password>
              <ul class="p-0 mt-0 list-none"
                  v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response">
                <li v-if="v$.password.required.$invalid" class="p-error">
                  {{ v$.password.required.$message }}
                </li>
              </ul>
            </div>

            <div class="flex align-items-center justify-content-between mb-5">
              <a class="font-medium no-underline ml-2 text-right cursor-pointer hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
            <Button type="submit" label="Sign In"
                    class="w-full p-3 text-xl"></Button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import { mapActions } from 'vuex';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      submitted: false,
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage('Ce champs ne doit pas être vide.', required),
        email: helpers.withMessage('L\'adresse mail n\'est pas valide.', email),
      },
      password: {
        required: helpers.withMessage('Ce champs ne doit pas être vide.', required),
      },
    };
  },
  methods: {
    ...mapActions(['LogIn']),
    async handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      try {
        await this.LogIn(this.$data);
        await this.$router.push({ name: 'dashboard' });
      } catch (error) {
        const { response } = error;

        if (response?.status === 400) {
          this.$toast.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Mot de passe ou e-mail incorrect',
          });
        }
      }
    },
  },
};
</script>
