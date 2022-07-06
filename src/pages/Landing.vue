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
              J'Hack Sparrow, formidable jeu de mot mêlant pirate des Caraïbes
              et pirate informatique, est une équipe de 5 étudiants de l'EFREI Paris,
              école d'ingénieur généraliste en informatique et technologies du numérique.
              <br>
              <br>
              Nous sommes des étudiants passionnés par la Cybersécurité et nous réalisons
              ce projet dans le cadre du Mastercamp. Ce Mastercamp est une période de un mois,
              durant lequel nous devons monter en compétences. C'est un défi permettant de
              s'habituer au mode de travail en entreprise mais également de s'habituer aux
              deadlines qui peuvent exister au travail (car ici le délai est serré).
              <br>
              <br>
              Ce site est donc l'aboutissement du travail de cinq étudiants dont la sueur
              aura coulé par plusieurs fois de leurs fronts et nous sommes fiers et
              enthousiastes à l'idée que vous, chers utilisateurs, puissiez l'utiliser
              pour partager vos fichiers ! Nous espérons que votre expérience sera satisfaite,
              pour tout problème technique notre équipe sera ravie de discuter avec vous.
            </blockquote>
          </template>
        </Card>

        <Card class="col-12 md:col-10 mt-4">
          <template #title>
            Quel est notre but ?
          </template>
          <template #content>
            <blockquote>
              OSEF est une plateforme de partage de fichier proposant le chiffrement de bout en
              bout. Grâce à ce chiffrement, les fichiers échangés sur cette application Web ne
              saurait être lu par quelconque autre personne que le destinataire du message.
              <br>
              <br>
              En effet, le chiffrement de bout en bout consiste à chiffrer depuis votre session,
              afin que tout fichier sortant, ce dirigeant vers nos serveurs soit chiffré.
              <br>
              <br>
              Un fichier chiffré correspond à un fichier dont le contenu a été masqué à l'aide
              d'une clé unique que vous possédez à la création de votre compte.
              <br>
              <br>
              Toutefois, vous n'avez pas à vous souciez de ces clés, notre équipe s'occupe de leurs
              gestions. Ainsi, même si des personnes mal-intentionné venait à s'emparer de votre
              fichier, ils ne pourraient pas y voir le contenu car ils ne sont pas désigné comme
              destinataire du message.
              <br>
              <br>
              <br>
              Votre sécurité est notre priorité.
            </blockquote>
          </template>
        </Card>

        <Card class="col-12 md:col-10 mt-4">
          <template #title>
            Peut-on nous faire confiance ?
          </template>
          <template #content>
            <blockquote>
              Ne vous inquiétez pas toutes les données que vous pouvez échanger avec vos contacts
              sont stockées sur le serveur dans un but purement fonctionnel.
              <br>
              <br>
              Nous ne revendons en aucun cas vos données, ni ne les utilisons pour tout autre but.
              <br>
              <br>
              Notre seul préoccupation est que cette plateforme puissent rendre ses utilisateurs
              satisfaits et que ces derniers ne rencontre aucun problème dessus.
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
