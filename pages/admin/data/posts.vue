<template>
  <admin-editable-list
    :title="tableTitle"
    :columns="tableColumns"
    :data="posts"
    :loading="isLoading"
  />
</template>

<script lang="ts" setup>
import { usePostStore } from '~/stores/post';
import type { ReturnType } from 'birpc';
import type { IProps as IAdminEditableListProps } from '~/components/admin/editableList.vue';

const { t } = useI18n();
const { fetchPosts } = usePostStore();

const isLoading = ref(true);
const posts = ref<Awaited<ReturnType<typeof fetchPosts>>>([]);
const tableTitle = t('admin.data.posts.tableTitle');
const tableColumns = <IAdminEditableListProps['columns']>[
  { name: "id", label: "ID", field: "id", align: "left" },
  { name: "title", label: t('admin.data.posts.tableColumn.title'), field: "title" },
  { name: "body", label: t('admin.data.posts.tableColumn.body'), field: "body" },
  { name: "userId", label: t('admin.data.posts.tableColumn.user'), field: "userId" },
];

const getPosts = async () => {
  console.log('=== getPosts ===');
  isLoading.value = true;
  
  try {
    const response = await fetchPosts();
    console.log('response:', response);
    posts.value = response.map((post) => ({
      ...post,
      title: truncateText(post.title, 60),
      body: truncateText(post.body, 60)
    }));
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
  getPosts();
}

init();
</script>