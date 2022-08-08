<template>
  <CoinsDataTable />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CoinsDataTable from "./components/CoinsDataTable.vue";

export default defineComponent({
  name: "App",
  components: {
    CoinsDataTable,
  },
});
</script>
