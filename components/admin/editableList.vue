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
    @row-dblclick="handleDbClickRow"
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

export interface ICurrentRow {
  item: any;
  index: number;
}

// COMPOSABLES

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

// PROPS

// const props = defineProps<IProps>();
const {
  title,
  columns,
  data,
  loading = true,
  isReadonly = false,
  allowOpen = true,
  allowDelete = true,
  fields = [],
} = defineProps<IProps>();
// } = toRefs(props);

// EMITS

const emits = defineEmits<{
  (e: 'open', value: ICurrentRow): void;
  (e: 'delete', value: ICurrentRow): void;
  (e: 'save', value: ModelValue): void;
  (e: 'resetToDefault', value: ICurrentRow): void;
}>();

// DATA

const pagination = {
  rowsPerPage: 20,
}

// REACTIVE DATA

const isVisibleModalForm = ref<boolean>(false);
const currentRow = reactive<ICurrentRow>({
  item: null,
  index: 0,
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
  currentRow.item = null;
  currentRow.index = 0;
}

const routeModalForm = () => {
  router.push({
    query: {
      modal: encodeURI(JSON.stringify({
        index: currentRow.index
      })),
    }
  });
}

const openModalForm = () => {
  if (route.query.modal) {
    const { index } = JSON.parse(decodeURI(route.query.modal as string));
    
    currentRow.index = index;
    currentRow.item = data[index];
    
    processModalForm();
    
    isVisibleModalForm.value = true;
  }
}

const processModalForm = () => {
  if (!currentRow.item) return;
  
  Object.keys(currentRow.item).forEach((key) => {
    form[key] = currentRow.item[key];
  });
  
  // nextTick(() => {
  //   clearContextItem();
  // });
}

// HANDLERS

const handleCallContextmenuRow: QTableProps['onRowContextmenu'] = (_, row, index) => {
  currentRow.item = row;
  currentRow.index = index;
}

const handleDbClickRow: QTableProps['onRowDblclick'] = (_, row, index) => {
  currentRow.item = row;
  currentRow.index = index;
  
  // processModalForm();
  nextTick(() => {
    routeModalForm();
  })
}

const handleOpenModalForm = () => {
  emits('open', currentRow);
  
  routeModalForm();
}

const handleCloseModalForm = () => {
  isVisibleModalForm.value = false;
  
  router.push({
    query: undefined
  });
}

const handleSubmitModalForm = (form: ModelValue) => {
  emits('save', form);
}

const handleDelete = () => {
  emits('delete', currentRow);
  // clearContextItem();
}

// WATCHERS

watch(
  () => loading,
  (val) => {
    if (val) return;
    openModalForm();
  }
)

watch(
  () => route.query,
  () => {
    openModalForm();
  },
  {
    deep: true,
  }
);

// LIFECYCLE HOOKS
</script>