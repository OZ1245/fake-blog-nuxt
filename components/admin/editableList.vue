<template>
  <q-table
    :title="title"
    :columns="columns"
    :rows="data"
    :loading="loading"
    :pagination="pagination"
    flat
    virtual-scroll
    class="my-sticky-header-table"
  />
</template>

<script lang="ts" setup>
import type { QTableProps } from 'quasar'

export interface IProps {
  title: QTableProps['title'];
  columns: QTableProps['columns'];
  data: QTableProps['rows'];
  loading?: QTableProps['loading'];
}

const props = defineProps<IProps>();
const { title, columns, data, loading } = toRefs(props);

const pagination = {
  rowsPerPage: 20,
}
</script>