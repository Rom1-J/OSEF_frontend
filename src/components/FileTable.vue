<template>
  <div class="card">
    <DataTable :value="files" :rows="15" :paginator="true"
               responsiveLayout="scroll" class="p-datatable-gridlines"
               :rowHover="true" v-model:filters="filters" :filters="filters"
               :globalFilterFields="['filename']">
      <template #header>
        <div
            class="flex justify-content-between flex-column sm:flex-row align-items-center">
          <h5>
            {{ title }}
            <span class="text-color-secondary">
              ({{ files.length }}
              fichier{{ files.length > 1 ? 's' : '' }})
            </span>
          </h5>
          <span class="p-input-icon-left mb-2">
            <i class="pi pi-search"/>
              <InputText v-model="filters['global'].value"
                         placeholder="Nom du fichier"
                         style="width: 100%" type="search" />
          </span>
        </div>
      </template>
      <template #loading>
        Chargement des fichiers...
      </template>
      <template #empty>
        Aucun résultat...
      </template>
      <Column field="filename" header="Fichier"
              style="width:30%" :sortable="true">
      </Column>
      <Column field="owner" header="Propriétaire"
              style="width:25%" :sortable="true">
      </Column>
      <Column field="receiver" header="Receveur"
              style="width:25%" :sortable="true">
      </Column>
      <Column field="date" header="Date"
              style="width:20%" :sortable="true">
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from 'primevue/api';

export default {
  props: ['title', 'files'],
  data() {
    return {
      filters: null,
    };
  },
  created() {
    this.initFilters();
  },
  methods: {
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>
