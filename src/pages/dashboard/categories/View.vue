<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="flex justify-content-between flex-row align-items-center">
          <span class="text-2xl">{{ transaction?.external.username }}</span>
          <Button label="Supprimer" class="p-button-danger"/>
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
      <FileTable title="Derniers échanges" :files="files"></FileTable>
    </div>
  </div>
</template>

<script>

import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

import FileTable from '@/components/FileTable.vue';

export default {
  data() {
    return {
      files: [],
      token: null,
      transaction: null,
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
  },
  async created() {
    this.token = this.$route.params.token;
    this.transaction = this.GetTransaction(this.token);

    await this.LoadFiles(this.token);

    this.StateFiles[this.token].forEach((el) => {
      this.files.push({
        id: el.id,
        filename: el.filename,
        owner: el.owner,
        receiver: el.receiver,
        date: moment(el.creation_date).format('DD/MM/YYYY, hh:mm:ss'),
      });
    });
  },
};
</script>
