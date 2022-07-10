<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="flex justify-content-between flex-row align-items-center">
          <span class="text-2xl">{{ transaction?.external.username }}</span>
          <Button :label="$t('status.delete.title')" class="p-button-danger"
                  @click="displayConfirmation = true" disabled/>
          <Dialog :header="$t('status.confirm.title')" v-model:visible="displayConfirmation"
                  :style="{width: '350px'}" :modal="true">
            <div class="flex align-items-center justify-content-center">
              <i class="pi pi-exclamation-triangle mr-3"
                 style="font-size: 2rem"/>
              <span>
                {{ $t('misc.confirm.messages.contact', {msg: transaction?.external.username }) }}
              </span>
            </div>
            <template #footer>
              <Button :label="$t('status.no')" icon="pi pi-times"
                      @click="displayConfirmation = false"
                      class="p-button-text"/>
              <Button :label="$t('status.yes')" icon="pi pi-check"
                      @click="deleteTransaction" class="p-button-text"/>
            </template>
          </Dialog>
        </div>
      </div>
      <div class="card mb-0">
        <FileUpload :transaction="transaction"/>
      </div>
    </div>

    <div class="col-12">
      <FileTable title="Last exchanges" :files="StateFiles[token]"></FileTable>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import FileUpload from '@/components/FileUpload.vue';
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
    FileUpload,
    FileTable,
  },
  methods: {
    ...mapActions(['LoadFiles']),
    deleteTransaction() {
      this.$router.push({ name: 'dashboard' })
        .then(() => {
          this.$toast.add({
            severity: 'success',
            summary: this.$t('status.delete.completed'),
            detail: this.$t('status.delete.messages.contact'),
            life: 5000,
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
