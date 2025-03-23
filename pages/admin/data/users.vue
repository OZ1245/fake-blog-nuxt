<template>
  <admin-editable-list
    :title="tableTitle"
    :columns="tableColumns"
    :data="users"
    :loading="isLoading"
  />
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user';
import type { ReturnType } from 'birpc';
import type { IProps as IAdminEditableListProps } from '~/components/admin/editableList.vue';

interface IUser extends Awaited<ReturnType<typeof fetchUsers>> {
  company: string;
  address: string;
}

const { t } = useI18n();
const { fetchUsers } = useUserStore();

const isLoading = ref(true);
const users = ref<IUser[]>([]);
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
      
      return <IUser>{
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

init();
</script>