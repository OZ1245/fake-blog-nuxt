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
          <q-item v-if="allowOpen" clickable v-close-popup @click="handleOpenModalForm">
            <q-item-section>{{ openContextMenuItemText }}</q-item-section>
          </q-item>
          <q-item v-if="allowDelete" clickable v-close-popup @click="handleDelete">
            <q-item-section>{{ $t('common.delete') }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </template>
  </q-table>
  
  <!--  TODO: If read only -->
  <admin-modal-form
    v-if="fields"
    v-model="form"
    :fields="fields"
    :is-visible="isVisibleModalForm"
    :is-readonly="isReadonly"
    :header-title="modalFormHeader"
    @close="handleCloseModalForm"
    @submit="handleSubmitModalForm"
  />
</template>

<script lang="ts" setup>
import type { QTableProps } from 'quasar'
import type { IField, ModelValue } from '~/components/admin/modalForm.vue';

// TYPES DECLARE

export interface IProps {
  title: QTableProps['title'];
  columns: QTableProps['columns'];
  data: QTableProps['rows'];
  loading?: QTableProps['loading'];
  isReadonly?: boolean;
  allowOpen?: boolean;
  allowDelete?: boolean;
  fields?: IField[];
}

export interface IContextItem {
  item: any;
  index: number | null;
}

// COMPOSIBLE

const { t } = useI18n();

// PROPS

const {
  title,
  columns,
  data,
  loading,
  isReadonly = false,
  allowOpen = true,
  allowDelete = true,
  fields = [],
} = defineProps<IProps>();

// EMITS

const emits = defineEmits<{
  (e: 'open', value: IContextItem): void;
  (e: 'delete', value: IContextItem): void;
  (e: 'save', value: ModelValue): void;
  (e: 'resetToDefault', value: IContextItem): void;
}>();

// DATA

const pagination = {
  rowsPerPage: 20,
}

// REACTIVE DATA

const isVisibleModalForm = ref<boolean>(false);
const contextItem = reactive<IContextItem>({
  item: null,
  index: null,
});
const form = reactive<ModelValue>({});

// COMPUTED

const openContextMenuItemText = computed<string>(() => isReadonly ? t('common.open') : t('common.edit'));

const modalFormHeader = computed<string>(() => isReadonly
  ? t('admin.openModalFormHeader', [form.username])
  : t('admin.editModalFormHeader', [form.username])
);

// METHODS

const clearContextItem = () => {
  contextItem.item = null;
  contextItem.index = null;
}

const handleCallContextmenuRow: QTableProps['onRowContextmenu'] = (_, row, index) => {
  contextItem.item = row;
  contextItem.index = index;
}

// HANDLERS

const handleOpenModalForm = () => {
  emits('open', contextItem);
  
  Object.keys(contextItem.item).forEach((key) => {
    form[key] = contextItem.item[key];
  });
  
  isVisibleModalForm.value = true;
  
  // nextTick(() => {
  //   clearContextItem();
  // });
}

const handleCloseModalForm = () => {
  isVisibleModalForm.value = false;
}

const handleSubmitModalForm = (form: ModelValue) => {
  emits('save', form);
}

const handleDelete = () => {
  emits('delete', contextItem);
  // clearContextItem();
}
</script>