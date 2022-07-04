<template>
  <div class="grid">
    <div class="col-12 lg:col-6">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span
                class="block text-500 font-medium mb-3">Fichiers envoyés</span>
            <span class="text-900 font-medium text-8xl">--</span>
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
            <span class="block text-500 font-medium mb-3">Fichiers reçus</span>
            <span class="text-900 font-medium text-8xl">--</span>
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
      <div class="card">
        <h5>Derniers échanges</h5>
        <DataTable :value="files" :rows="15" :paginator="true"
                   responsiveLayout="scroll">
          <Column field="filename" header="Fichier"
                  style="width:25%"></Column>
          <Column field="owner" header="Propriétaire"
                  style="width:25%">
          </Column>
          <Column field="receiver" header="Receveur"
                  style="width:25%">
          </Column>
          <Column field="date" header="Date"
                  style="width:25%">
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      files: [],
    };
  },
  computed: {
    ...mapGetters(['StateFiles']),
  },
  async created() {
    this.StateFiles.forEach((el) => {
      this.files.push({
        filename: el.filename,
        owner: el.owner,
        receiver: el.receiver,
        date: moment(el.creation_date).format('DD/MM/YYYY, hh:mm:ss'),
      });
    });
  },
};
</script>
