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
          <q-item v-if="allowOpen" clickable v-close-popup @click="handleOpen">
            <q-item-section>{{ openContextMenuItemText }}</q-item-section>
          </q-item>
          <q-item v-if="allowDelete" clickable v-close-popup @click="handleDelete">
            <q-item-section>{{ $t('common.delete') }}</q-item-section>
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
  isReadonly?: boolean;
  allowOpen?: boolean;
  allowDelete?: boolean;
}

interface IContextItem {
  item: any;
  index: number | null;
}

const { t } = useI18n();

// const props = (defineProps<IProps>());
// const { title, columns, data, loading, isReadonly } = toRefs(props);
const {
  title,
  columns,
  data,
  loading,
  isReadonly = false,
  allowOpen = true,
  allowDelete = true
} = defineProps<IProps>();

const emits = defineEmits<{
  (e: 'open', value: IContextItem): void;
  (e: 'delete', value: IContextItem): void;
}>()

const pagination = {
  rowsPerPage: 20,
}

const contextItem = reactive<IContextItem>({
  item: null,
  index: null,
})

const openContextMenuItemText = computed<string>(() => isReadonly ? t('common.open') : t('common.edit'));

const clearContextItem = () => {
  contextItem.item = null;
  contextItem.index = null;
}

const handleCallContextmenuRow: QTableProps['onRowContextmenu'] = (_, row, index) => {
  contextItem.item = row;
  contextItem.index = index;
}

const handleOpen = () => {
  emits('open', contextItem);
  clearContextItem();
}

const handleDelete = () => {
  emits('delete', contextItem);
  clearContextItem();
}
</script>