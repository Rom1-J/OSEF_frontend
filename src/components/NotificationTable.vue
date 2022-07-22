<template>
  <div class="card">
    <div class="flex justify-content-between flex-column md:flex-row
    align-items-center mb-2">
      <h5>
        {{ $t('status.notification.last') }}
        <span class="text-color-secondary">
          ({{ notifications?.length || 0 }}
          {{ $tc('misc.notification', notifications?.length === 0) }})
        </span>
      </h5>
      <div class="mb-2">
            <span class="p-input-icon-left mr-4">
              <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value"
                           :placeholder="$t('fields.filename')"
                           style="width: 100%" type="search"/>
            </span>
        <Button icon="pi pi-refresh" @click="refreshNotifications" :disabled="refreshing"/>
      </div>
    </div>
    <DataTable :value="notifications" :rows="50" :paginator="true"
               responsiveLayout="scroll" class="p-datatable-gridlines"
               :rowHover="true" v-model:filters="filters" :filters="filters"
               :globalFilterFields="['filename']">
      <template #loading>
        {{ $t('status.loading.messages.notifications') }}
      </template>
      <template #empty>
        {{ $t('status.no_result') }}
      </template>
      <Column field="filename" :header="$t('fields.file')"
              style="width:30%" :sortable="true">
      </Column>
      <Column field="owner" :header="$t('fields.owner')"
              style="width:20%" :sortable="true">
      </Column>
      <Column field="receiver" :header="$t('fields.receiver')"
              style="width:20%" :sortable="true">
      </Column>
      <Column field="date" :header="$t('fields.date')"
              style="width:25%" :sortable="true">
        <template #body="{data}">
          <span>{{ formatDate(data.creation_date) }}</span>
        </template>
      </Column>
      <Column style="width:5%">
        <template #body="{data}">
          <FileDownload :file="data"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from 'primevue/api';
import FileDownload from '@/components/FileDownload.vue';
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
  props: ['notifications'],
  data() {
    return {
      refreshing: false,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  components: {
    FileDownload,
  },
  methods: {
    ...mapActions(['LoadNotifications']),
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY, HH:mm:ss');
    },
    async refreshNotifications() {
      this.refreshing = true;
      await this.LoadNotifications({ force: true });
      this.refreshing = false;
    },
  },
};
</script>
