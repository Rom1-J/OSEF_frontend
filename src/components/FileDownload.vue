<template>
  <Button icon="pi pi-download" @click="download" :disabled="!downloadable()"/>
</template>
<script>
import { mapGetters } from 'vuex';
import { decipher } from '@/utils/crypto';
import axios from 'axios';

export default {
  props: ['file'],
  data() {
    return {
      transaction: null,
    };
  },
  computed: {
    ...mapGetters(['StateKeys', 'StateUser', 'GetTransaction']),
  },
  methods: {
    downloadable() {
      return this.transaction.external.username && this.transaction.external.publicKey;
    },
    async download() {
      let ownerPublicKey;

      if (this.downloadable()) {
        ownerPublicKey = this.transaction.external.publicKey;
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Propriétaire inconnu...',
          life: 3000,
        });
        return;
      }

      const req = await axios.get(
        this.file.file,
        {
          responseType: 'blob',
        },
      );

      if (req.status === 200) {
        await decipher(
          {
            data: req.data,
            name: this.file.filename,
            nonce: this.file.nonce,
          },
          ownerPublicKey,
          this.StateKeys.secretKey,
        );
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de télécharger ce fichier...',
          life: 3000,
        });
      }
    },
  },
  created() {
    this.transaction = this.GetTransaction(this.file.transaction);
  },
};
</script>
