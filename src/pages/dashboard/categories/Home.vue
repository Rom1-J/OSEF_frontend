<template>
  <div class="grid">
    <div class="col-12 lg:col-6">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span
                class="block text-500 font-medium mb-3">{{ $t('misc.sent_files') }}</span>
            <span class="text-900 font-medium text-8xl">
              {{ getSentFiles() }}
            </span>
          </div>
          <div
              class="flex align-items-center justify-content-center bg-blue-100 border-round"
              style="width:4.5rem;height:4.5rem">
            <i class="pi pi-cloud-upload text-5xl text-blue-500"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">{{ $t('misc.received_files') }}</span>
            <span class="text-900 font-medium text-8xl">
              {{ getReceivedFiles() }}
            </span>
          </div>
          <div
              class="flex align-items-center justify-content-center bg-green-100 border-round"
              style="width:4.5rem;height:4.5rem">
            <i class="pi pi-cloud-download text-5xl text-green-500"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <FileTable :title="$t('status.exchange.last')" :files="StateFiles?.all" />
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import FileTable from '@/components/FileTable.vue';

export default {
  computed: {
    ...mapGetters(['StateFiles', 'StateUser']),
  },
  components: {
    FileTable,
  },
  methods: {
    ...mapActions(['LoadFiles']),
    getSentFiles() {
      if (!this.StateFiles?.all) return '--';
      return this.StateFiles.all.filter((file) => file.owner === this.StateUser.username).length;
    },
    getReceivedFiles() {
      if (!this.StateFiles?.all) return '--';
      return this.StateFiles.all.filter((file) => file.receiver === this.StateUser.username).length;
    },
  },
  async created() {
    await this.LoadFiles();
  },
};
</script>
