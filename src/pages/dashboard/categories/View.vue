<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="flex justify-content-between flex-row align-items-center">
          <span class="text-2xl">{{ transaction?.external.username }}</span>
          <Button label="Supprimer" class="p-button-danger"
                  @click="displayConfirmation = true"/>
          <Dialog header="Confirmation" v-model:visible="displayConfirmation"
                  :style="{width: '350px'}" :modal="true">
            <div class="flex align-items-center justify-content-center">
              <i class="pi pi-exclamation-triangle mr-3"
                 style="font-size: 2rem"/>
              <span>
                Êtes-vous sûr(e) de vouloir retirer
                <b>{{ transaction?.external.username }}</b>
                de vos contacts ?
              </span>
            </div>
            <template #footer>
              <Button label="Non" icon="pi pi-times"
                      @click="displayConfirmation = false"
                      class="p-button-text"/>
              <Button label="Oui" icon="pi pi-check"
                      @click="deleteTransaction" class="p-button-text"/>
            </template>
          </Dialog>
        </div>
      </div>
      <div class="card mb-0">
        <FileUpload :file-limit="1"
                    chooseLabel="Choisir"
                    uploadLabel="Envoyer"
                    :show-cancel-button="false"
                    :multiple="false"
                    :maxFileSize="10000000">
          <template #empty>
            <p>Envoyer un fichier</p>
          </template>
        </FileUpload>
      </div>
    </div>

    <div class="col-12">
      <FileTable title="Derniers échanges" :files="StateFiles[token]"></FileTable>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import FileTable from '@/components/FileTable.vue';

export default {
  data() {
    return {
      token: null,
      transaction: null,
      displayConfirmation: false,
    };
  },
  computed: {
    ...mapGetters(['StateFiles', 'GetTransaction']),
  },
  components: {
    FileTable,
  },
  methods: {
    ...mapActions(['LoadFiles']),
    deleteTransaction() {
      this.$router.push({ name: 'dashboard' })
        .then(() => {
          this.$toast.add({
            severity: 'success',
            summary: 'Suppression terminée',
            detail: 'Ce contact a été supprimé de vos relations avec succès !',
            life: 3000,
          });
        });
    },
  },
  async created() {
    this.token = this.$route.params.token;
    this.transaction = this.GetTransaction(this.token);

    await this.LoadFiles({ token: this.token });
  },
};
</script>
