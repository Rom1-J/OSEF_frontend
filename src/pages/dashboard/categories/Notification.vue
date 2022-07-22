<template>
  <div class="grid">
    <div class="col-12">
      <NotificationTable :notifications="StateNotifications?.all"/>
    </div>
  </div>
</template>

<script>

import NotificationTable from '@/components/NotificationTable.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['StateNotifications']),
  },
  components: {
    NotificationTable,
  },
  methods: {
    ...mapActions(['LoadNotifications']),
  },
  async created() {
    await this.LoadNotifications();
  },
};
</script>
