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
    @row-contextmenu.prevent="handleCallContextmenuRow"
  >
    <template v-slot:body-cell="props">
      <q-td :props="props">
        {{ props.value }}
      </q-td>
      <q-menu
        touch-position
        context-menu
      >
<!--        TODO: -->
        <q-list dense style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>Open</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Delete</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </template>
  </q-table>
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

const handleCallContextmenuRow: QTableProps['onRowContextmenu'] = (evt, row, index) => {
  console.log('=== handleCallContextmenuRow ===');
}
</script>