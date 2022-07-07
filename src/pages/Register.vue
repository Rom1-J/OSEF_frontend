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
              Créer un compte
            </div>
            <span class="text-600 font-medium">
              Déjà inscrit ?
              <router-link :to="{name: 'login'}"
                           class="hover:underline">
                connectez-vous
              </router-link>
            </span>
          </div>

          <form @submit.prevent="handleSubmit(!v$.$invalid)"
                class="w-full md:w-10 mx-auto">
            <div class="field">
              <label for="username"
                     :class="{'p-error':v$.username.$invalid && submitted}"
                     class="block text-900 text-xl font-medium mb-2">
                Nom d'utilisateur*
              </label>

              <InputText id="username" v-model="v$.username.$model"
                         :class="{'p-invalid':v$.username.$invalid && submitted}"
                         class="w-full" type="text"
                         placeholder="Nom d'utilisateur"
                         style="padding:1rem;"/>
              <ul class="p-0 mt-0 list-none"
                  v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response">
                <li v-if="v$.username.required.$invalid" class="p-error">
                  {{ v$.username.required.$message }}
                </li>
              </ul>
            </div>

            <div class="field">
              <label for="email"
                     :class="{'p-error':v$.email.$invalid && submitted}"
                     class="block text-900 text-xl font-medium mb-2">
                Adresse e-mail*
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
              <label for="password1"
                     :class="{'p-error':v$.password1.$invalid && submitted}"
                     class="block text-900 font-medium text-xl mb-2">
                Mot de passe*
              </label>
              <Password id="password1" v-model="v$.password1.$model"
                        placeholder="Mot de passe"
                        :class="{'p-invalid':v$.password1.$invalid && submitted}"
                        toggleMask class="w-full"
                        inputClass="w-full"
                        inputStyle="padding:1rem">
              </Password>
              <ul class="p-0 mt-0 list-none"
                  v-if="(v$.password1.$invalid && submitted) || v$.password1.$pending.$response">
                <li v-if="v$.password1.required.$invalid" class="p-error">
                  {{ v$.password1.required.$message }}
                </li>
              </ul>
            </div>

            <div class="field">
              <label for="password2"
                     :class="{'p-error':v$.password2.$invalid && submitted}"
                     class="block text-900 font-medium text-xl mb-2">
                Confirmer votre mot de passe*
              </label>
              <Password id="password2" v-model="v$.password2.$model"
                        placeholder="Confirmer votre mot de passe"
                        :class="{'p-invalid':v$.password2.$invalid && submitted}"
                        :toggleMask="true" class="w-full"
                        inputClass="w-full"
                        inputStyle="padding:1rem">

              </Password>
              <ul class="p-0 mt-0 list-none"
                  v-if="(v$.password2.$invalid && submitted) || v$.password2.$pending.$response">
                <li v-if="v$.password2.required.$invalid" class="p-error">
                  {{ v$.password2.required.$message }}
                </li>
                <li v-if="v$.password2.sameAsPassword.$invalid"
                    class="p-error">
                  {{ v$.password2.sameAsPassword.$message }}
                </li>
              </ul>
            </div>

            <div class="field-checkbox">
              <Checkbox id="accept" name="accept" value="Accept"
                        v-model="v$.accept.$model"
                        :class="{'p-invalid':v$.accept.$invalid && submitted}"/>
              <label for="accept"
                     :class="{'p-error': v$.accept.$invalid && submitted}">
                J'accepte les CGU*
              </label>
            </div>

            <Button type="submit" label="S'inscrire"
                    class="w-full p-3 text-xl" :disabled="submitted"/>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  email, helpers, required, sameAs,
} from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import axios from 'axios';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      username: '',
      email: '',
      password1: '',
      password2: '',
      accept: null,
      submitted: false,
    };
  },
  validations() {
    return {
      username: {
        required: helpers.withMessage('Ce champs ne doit pas être vide.', required),
      },
      email: {
        required: helpers.withMessage('Ce champs ne doit pas être vide.', required),
        email: helpers.withMessage('L\'adresse mail n\'est pas valide.', email),
      },
      password1: {
        required: helpers.withMessage('Ce champs ne doit pas être vide.', required),
      },
      password2: {
        required: helpers.withMessage('Ce champs ne doit pas être vide.', required),
        sameAsPassword: helpers.withMessage('Les mots de passes ne correspondent pas.', sameAs(this.password1)),
      },
      accept: {
        required,
      },
    };
  },
  methods: {
    async handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) return;

      try {
        await axios.post('/api/accounts/registration/', this.$data);
        this.$toast.add({
          severity: 'info',
          summary: 'Confirmation',
          detail: 'Votre compte a été crée, veuillez valider votre adresse mail.',
          life: 3000,
        });
        await this.$router.push({ name: 'login' });
      } catch (error) {
        const { response } = error;

        if (response?.status !== 200) {
          Object.values(response.data).forEach((errors) => {
            errors.forEach((message) => {
              this.$toast.add({
                severity: 'error',
                summary: 'Erreur',
                detail: message,
                life: 3000,
              });
            });
          });
        }
      }

      this.submitted = false;
    },
  },
};
</script>
