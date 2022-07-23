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
               :globalFilterFields="['type', 'emitter']">
      <template #loading>
        {{ $t('status.loading.messages.notifications') }}
      </template>
      <template #empty>
        {{ $t('status.no_result') }}
      </template>
      <Column field="type" :header="$t('fields.type')"
              style="width:37.5%" :sortable="true">
      </Column>
      <Column field="emitter" :header="$t('fields.emitter')"
              style="width:37.5%" :sortable="true">
      </Column>
      <Column field="read" :header="$t('fields.read')"
              style="width:12.5%" :sortable="true">
      </Column>
      <Column field="date" :header="$t('fields.date')"
              style="width:12.5%" :sortable="true">
        <template #body="{data}">
          <span>{{ formatDate(data.created_at) }}</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from 'primevue/api';
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
  methods: {
    ...mapActions(['LoadNotifications']),
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY, HH:mm:ss');
    },
    async refreshNotifications() {
      this.refreshing = true;
      await this.LoadNotifications();
      this.refreshing = false;
    },
  },
};
</script>
