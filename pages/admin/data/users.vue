<template>
  <admin-editable-list
    :title="tableTitle"
    :columns="tableColumns"
    :data="users"
    :loading="isLoading"
    @open="handleOpenPost"
    @delete="handleDeletePost"
  />
  
<!--  TODO: If read only -->
  <admin-modal-form
    v-model="form"
    :fields="fields"
    :is-visible="isVisibleModalForm"
    :header-title="modalFormHeader"
    @close="handleCloseModalForm"
  />
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user';
import type { IUser } from '~/stores/user';
import type { IContextItem, IProps as IAdminEditableListProps } from '~/components/admin/editableList.vue';
import type { IField, ModelValue } from '~/components/admin/modalForm.vue';

interface IComputedUser extends Omit<IUser, 'company' | 'address'> {
  company: string;
  address: string;
}

const { t } = useI18n();
const { fetchUsers } = useUserStore();

const isLoading = ref(true);
const users = ref<IComputedUser[]>([]);
const isVisibleModalForm = ref<boolean>(false);
const isReadonlyModalForm = ref<boolean>(false);
const form = reactive<ModelValue>({
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
});

const tableTitle = t('admin.data.users.tableTitle');
const tableColumns = <IAdminEditableListProps['columns']>[
  { name: "id", label: "ID", field: "id", align: "left" },
  { name: "name", label: t('admin.data.users.tableColumn.name'), field: "name" },
  { name: "username", label: t('admin.data.users.tableColumn.username'), field: "username" },
  { name: "email", label: t('admin.data.users.tableColumn.email'), field: "email" },
  { name: "address", label: t('admin.data.users.tableColumn.address'), field: "address" },
  { name: "phone", label: t('admin.data.users.tableColumn.phone'), field: "phone" },
  { name: "website", label: t('admin.data.users.tableColumn.website'), field: "website" },
  { name: "company", label: t('admin.data.users.tableColumn.company'), field: "company" },
];
const fields = ref<IField[]>([
  {
    key: 'username',
    label: t('admin.data.users.tableColumn.username'),
    readonly: true
  },
  {
    key: 'name',
    label: t('admin.data.users.tableColumn.name')
  },
  {
    key: 'email',
    label: t('admin.data.users.tableColumn.email')
  },
  {
    key: 'phone',
    label: t('admin.data.users.tableColumn.phone')
  },
  {
    key: 'website',
    label: t('admin.data.users.tableColumn.website')
  },
]);

const modalFormHeader = computed<string>(() => isReadonlyModalForm.value
  ? t('admin.openModalFormHeader', [form.username])
  : t('admin.editModalFormHeader', [form.username])
);

const getUsers = async () => {
  isLoading.value = true;
  
  try {
    const response = await fetchUsers();
    users.value = response.map((user) => {
      const company = user.company.name;
      const address = `
        ${user.address.city},
        ${user.address.street},
        ${user.address.suite}
      `;
      
      return <IComputedUser>{
        ...user,
        company,
        address
      };
    });
  } catch (error) {
    Notify.create({
      type: 'error',
      message: `${t('error.cantFetchPosts')}: ${error}`,
    });
  } finally {
    isLoading.value = false;
  }
}

const init = () => {
  getUsers();
}

const handleOpenPost = ({ item }: IContextItem) => {
  console.log('=== handleOpenPost ===');
  console.log('item', item);
  
  Object.keys(item).forEach((key) => {
    form[key] = item[key];
  });
  
  isVisibleModalForm.value = true;
}

const handleDeletePost = (data) => {
  console.log('=== handleDeletePost ===');
  console.log('data', data);
}

const handleCloseModalForm = () => {
  isVisibleModalForm.value = false;
}

init();
</script>