<template>
  <FileUpload :file-limit="1" ref="fileUpload"
              chooseLabel="Choisir"
              uploadLabel="Envoyer"
              custom-upload @uploader="uploader"
              :show-cancel-button="false"
              :multiple="false" :disabled="!transaction.external?.publicKey"
              :maxFileSize="10000000">
    <template #empty>
      <p>Envoyer un fichier</p>
    </template>
  </FileUpload>
</template>

<script>
import { nacl, cipher } from '@/utils/crypto';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  props: ['transaction'],
  computed: {
    ...mapGetters(['StateKeys']),
  },
  methods: {
    ...mapActions(['LoadFiles']),
    async uploader(file) {
      const data = file.files[0];
      const nonce = nacl.randomBytes(24);
      const receiverPublicKey = this.transaction.external.publicKey;

      await cipher(
        {
          data,
          nonce,
        },
        receiverPublicKey,
        this.StateKeys.secretKey,
        async (result) => {
          const form = new FormData();
          const blob = new Blob([result], { type: 'application/text' });

          form.set('nonce', nacl.util.encodeBase64(nonce));
          form.set('file', new File([blob], data.name));
          form.set('transaction', this.transaction.token);

          const req = await axios.post(
            '/api/files/',
            form,
            {
              headers: {
                'content-type': 'multipart/form-data',
              },
            },
          );

          if (req.status === 201) {
            await this.LoadFiles({ force: true });
            this.$toast.add({
              severity: 'info',
              summary: this.$t('status.sent.title'),
              detail: this.$t('status.sent.message'),
              life: 5000,
            });
            this.$refs.fileUpload.clear();
            this.$refs.fileUpload.uploadedFileCount = 0;
            return;
          }

          this.$toast.add({
            severity: 'error',
            summary: this.$t('status.error.title'),
            detail: this.$t('status.error.message'),
            life: 5000,
          });
        },
      );
    },
  },
};
</script>
