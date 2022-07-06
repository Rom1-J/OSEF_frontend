<template>
  <div class="overflow-hidden surface-0">
    <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex
    align-items-center justify-content-between relative lg:static">
      <router-link to="/" class="flex align-items-center">
        <!--suppress CheckImageSize -->
        <img src="@/layout/images/OSEF-logo.png"
             alt="OSEF" height="36" class="mr-0 lg:mr-2">
      </router-link>
      <a class="cursor-pointer block lg:hidden text-500 p-ripple" v-ripple
         v-styleclass="{ selector: '@next', enterClass: 'hidden',
         leaveToClass: 'hidden', hideOnOutsideClick: true }">
        <i class="pi pi-bars text-4xl"></i>
      </a>
      <div
          class="surface-0 align-items-center flex-grow-1 justify-content-between
           hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2"
          style="top:92%">
        <ul class="list-none p-0 m-0 flex lg:align-items-center select-none
         flex-column lg:flex-row cursor-pointer">
          <li>
            <a @click="smoothScroll('#hero')" v-ripple
               class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium
               line-height-3 p-ripple text-500">
              <span>Accueil</span>
            </a>
          </li>
          <li>
            <a @click="smoothScroll('#features')" v-ripple
               class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium
               line-height-3 p-ripple text-500">
              <span>Fonctionnalités</span>
            </a>
          </li>
          <li>
            <a @click="smoothScroll('#about')" v-ripple
               class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium
               line-height-3 p-ripple text-500">
              <span>À propos</span>
            </a>
          </li>
        </ul>
        <div class="flex justify-content-between lg:block border-top-1
        lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
          <template v-if="!isAuthenticated">
            <router-link :to="{name: 'login'}" custom
                         v-slot="{ navigate }">
              <Button label="Se connecter" @click="navigate"
                      class="p-button-text p-button-rounded border-none
                    font-light line-height-2 text-primary"></Button>
            </router-link>
            <router-link :to="{name: 'register'}" custom
                         v-slot="{ navigate }">
              <Button label="S'inscrire" @click="navigate"
                      class="p-button-rounded border-none ml-5 font-light
                    text-black line-height-2 bg-primary"></Button>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{name: 'dashboard'}" custom
                         v-slot="{ navigate }">
              <Button label="Dashboard" @click="navigate" icon="pi pi-home"
                      class="p-button-rounded border-none ml-5 font-light
                    text-black line-height-2 bg-primary"></Button>
            </router-link>
          </template>
        </div>
      </div>
    </div>

    <div class="grid py-4 px-4 lg:px-8 relative" id="hero">
      <div class="mx-4 md:mx-8 mt-0 md:mt-4 z-1">
        <h1 class="text-6xl font-bold text-gray-900 line-height-2">
          <span class="font-light block">OSEF</span>
          Open Storage for Encrypted Files
        </h1>
        <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">
          Commencez dès maintenant à envoyer des fichiers de manière sécurisée
          à vos contacts !
        </p>
        <router-link :to="{name: 'register'}" custom
                     v-slot="{ navigate }" v-if="!isAuthenticated">
          <Button label="Inscrivez-vous" @click="navigate"
                  icon="pi pi-angle-double-right" iconPos="right"
                  class="p-button-rounded text-xl border-none mt-5
                  bg-primary font-normal text-black line-height-3 px-3"></Button>
        </router-link>
        <router-link :to="{name: 'dashboard'}" custom
                     v-slot="{ navigate }" v-else>
          <Button label="Dashboard" @click="navigate"
                  class="p-button-rounded text-xl border-none mt-5
                  bg-primary font-normal text-black line-height-3 px-3"></Button>
        </router-link>
      </div>
      <img src="@/layout/images/demo.png" class="bottom-0 z-0"
           alt="demo screen" style="right:10%;">
    </div>

    <div class="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8" id="features">
      <div class="grid justify-content-center">
        <div class="col-12 text-center mt-8 mb-4">
          <h2 class="text-900 font-normal mb-2">Fonctionnalités</h2>
          <span class="text-600 text-2xl">Quelques-unes des nombreuses fonctionnalités</span>
        </div>

        <div
            class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
          <div style="border-radius:10px;" class="border-1 border-yellow-200">
            <div class="p-3 surface-card h-full" style="border-radius:8px;">
              <div
                  class="flex align-items-center justify-content-center bg-yellow-200 mb-3"
                  style="width:3.5rem;height:3.5rem; border-radius:10px;">
                <i class="pi pi-fw pi-users text-2xl text-yellow-700"></i>
              </div>
              <h5 class="mb-2 text-900">Simple d'utilisation</h5>
              <span class="text-600">Créez un compte et invitez vos amis en quelques clicks !</span>
            </div>
          </div>
        </div>

        <div
            class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
          <div style="border-radius:10px;" class="border-1 border-orange-200">
            <div class="p-3 surface-card h-full" style="border-radius:8px;">
              <div
                  class="flex align-items-center justify-content-center bg-orange-200 mb-3"
                  style="width:3.5rem;height:3.5rem; border-radius:10px;">
                <i class="pi pi-fw pi-code text-2xl text-orange-700"></i>
              </div>
              <h5 class="mb-2 text-900">Open Source</h5>
              <span class="text-600">
                Application totalement open source pour une totale transparence.
              </span>
            </div>
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
          <div style="border-radius:10px;" class="border-1 border-pink-200">
            <div class="p-3 surface-card h-full" style="border-radius:8px;">
              <div
                  class="flex align-items-center justify-content-center bg-pink-200 mb-3"
                  style="width:3.5rem;height:3.5rem; border-radius:10px;">
                <i class="pi pi-fw pi-database text-2xl text-pink-700"></i>
              </div>
              <h5 class="mb-2 text-900">Large stockage</h5>
              <span class="text-600">Envoyez des fichiers jusqu'à 10Mo sans limitation !</span>
            </div>
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
          <div style="border-radius:10px;" class="border-1 border-blue-200">
            <div class="p-3 surface-card h-full" style="border-radius:8px;">
              <div
                  class="flex align-items-center justify-content-center bg-blue-200 mb-3"
                  style="width:3.5rem;height:3.5rem; border-radius:10px;">
                <i class="pi pi-fw pi-globe text-2xl text-blue-700"></i>
              </div>
              <h5 class="mb-2 text-900">Adaptabilité</h5>
              <span
                  class="text-600">Acceder à votre compte depuis votre mobile ou ordinateur.</span>
            </div>
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-4 p-0 lg-4 mt-4 lg:mt-0">
          <div style="border-radius:10px;" class="border-1 border-purple-200">
            <div class="p-3 surface-card h-full" style="border-radius:8px;">
              <div
                  class="flex align-items-center justify-content-center bg-purple-200 mb-3"
                  style="width:3.5rem;height:3.5rem; border-radius:10px;">
                <i class="pi pi-fw pi-eye text-2xl text-purple-700"></i>
              </div>
              <h5 class="mb-2 text-900">Vie privée</h5>
              <span class="text-600">
                Aucun service tiers ou données sensible stockées sur nos services.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8" id="about">
      <div class="grid justify-content-center">
        <div class="col-12 text-center mt-8 mb-4">
          <h2 class="text-900 font-normal mb-2">À propos</h2>
          <span class="text-600 text-2xl">Foire aux questions</span>
        </div>

        <Card class="col-12 md:col-10">
          <template #title>
            Qui sommes-nous ?
          </template>
          <template #content>
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore
              sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa
              ratione
              quam perferendis esse, cupiditate neque quas!
            </blockquote>
          </template>
        </Card>

        <Card class="col-12 md:col-10 mt-4">
          <template #title>
            Quel est notre but ?
          </template>
          <template #content>
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore
              sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa
              ratione
              quam perferendis esse, cupiditate neque quas!
            </blockquote>
          </template>
        </Card>

        <Card class="col-12 md:col-10 mt-4">
          <template #title>
            Peut-on nous faire confiance ?
          </template>
          <template #content>
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore
              sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa
              ratione
              quam perferendis esse, cupiditate neque quas!
            </blockquote>
          </template>
        </Card>
      </div>
    </div>

    <div class="py-4 px-4 mx-0 mt-8 lg:mx-8 border-gray-200 border-top-1"
         id="contact">
      <div class="grid justify-content-between">
        <div class="col-12 md:col-2" style="margin-top:-1.5rem;">
          <div
              class="flex flex-wrap align-items-center
              justify-content-center md:justify-content-start md:mb-0 mb-3">
            <img src="layout/images/OSEF-logo.png"
                 alt="OSEF" height="50" class="mr-2">
          </div>
        </div>

        <div class="col-12 md:col-7">
          <div class="grid text-center md:text-right">
            <div class="col-12 md:col-6">
              <h4 class="font-medium text-2xl line-height-3 mb-3 text-black">
                Ressources
              </h4>
              <a class="line-height-3 text-xl block cursor-pointer mb-2 text-500 hover:underline">
                GitHub
              </a>
              <a class="line-height-3 text-xl block cursor-pointer mb-2 text-500 hover:underline">
                EFREI Paris
              </a>
            </div>

            <div class="col-12 md:col-6 mt-4 md:mt-0">
              <h4 class="font-medium text-2xl line-height-3 mb-3 text-black">
                Mentions Légales
              </h4>
              <a class="line-height-3 text-xl block cursor-pointer mb-2 text-500 hover:underline">
                Conditions générales d'utilisation
              </a>
              <a class="line-height-3 text-xl block cursor-pointer mb-2 text-500 hover:underline">
                Gestion des cookies
              </a>
              <a class="line-height-3 text-xl block cursor-pointer mb-2 text-500 hover:underline">
                Données personnelles et sécurité
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ isAuthenticated: 'isAuthenticated' }),
  },
  methods: {
    smoothScroll(id) {
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="scss">
#hero {
  background: linear-gradient(0deg, rgba(255, 255, 255, .2), rgba(255, 255, 255, .2)),
  radial-gradient(80% 256% at 80% 60%, #afefb8 0%, #C3E3FA 100%);
  height: 700px;
  overflow: hidden;
}

@media screen and (min-width: 768px) {
  #hero {
    clip-path: ellipse(150% 87% at 93% 13%);
    height: 530px;
  }
}

@media screen and (min-width: 1300px) {
  #hero > img {
    position: absolute;
  }

  #hero > div > p {
    max-width: 450px;
  }
}

@media screen and (max-width: 1300px) {
  #hero {
    height: 600px;
  }

  #hero > img {
    position: static;
    transform: scale(1);
    margin-left: auto;
  }

  #hero > div {
    width: 100%;
  }

  #hero > div > p {
    width: 100%;
    max-width: 100%;
  }
}
</style>
