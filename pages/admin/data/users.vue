<template>
  <admin-editable-list
    :title="tableTitle"
    :columns="tableColumns"
    :data="users"
    :loading="isLoading"
    :fields="fields"
    @open="handleOpenUser"
    @delete="handleDeleteUser"
    @save="handleSaveUser"
  />
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user';
import type { IUser } from '~/stores/user';
import type { IContextItem, IProps as IAdminEditableListProps } from '~/components/admin/editableList.vue';
import type { IField, ModelValue } from '~/components/admin/modalForm.vue';

// TYPE DECLARE

interface IComputedUser extends Omit<IUser, 'company' | 'address'> {
  company: string;
  address: string;
}

// COMPOSABLES

const { t } = useI18n();
const { fetchUsers } = useUserStore();

// DATA

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

// REACTIVE DATA

const isLoading = ref(true);
const users = ref<IComputedUser[]>([]);
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

// METHODS

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
      message: t('error.cantFetchPosts', [error]),
    });
  } finally {
    isLoading.value = false;
  }
}

const init = () => {
  getUsers();
}

// HANDLERS

const handleOpenUser = ({ item }: IContextItem) => {
  console.log('=== handleOpenUser ===');
  console.log('item', item);
}

const handleDeleteUser = (data) => {
  console.log('=== handleDeleteUser ===');
  console.log('data', data);
}

const handleSaveUser = (form: ModelValue) => {
  console.log('=== handleSaveUser ===');
  console.log('form', form);
}

// LIFECYCLE HOOKS

init();
</script>