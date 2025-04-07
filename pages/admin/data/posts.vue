<template>
  <admin-editable-list
    :title="tableTitle"
    :columns="tableColumns"
    :data="posts"
    :loading="isLoading"
    @open="handleOpenPost"
    @delete="handleDeletePost"
  />
</template>

<script lang="ts" setup>
import { usePostStore } from '~/stores/post';
import type { ReturnType } from 'birpc';
import type { IProps as IAdminEditableListProps } from '~/components/admin/editableList.vue';

const { t } = useI18n();
const { fetchComputedPosts } = usePostStore();

const isLoading = ref(true);
const posts = ref<Awaited<ReturnType<typeof fetchComputedPosts>>>([]);
const tableTitle = t('admin.data.posts.tableTitle');
const tableColumns = <IAdminEditableListProps['columns']>[
  { name: "id", label: "ID", field: "id", align: "left" },
  { name: "title", label: t('admin.data.posts.tableColumn.title'), field: "title" },
  { name: "body", label: t('admin.data.posts.tableColumn.body'), field: "body" },
  { name: "user", label: t('admin.data.posts.tableColumn.user'), field: "authorName" },
];

const getPosts = async () => {
  isLoading.value = true;
  
  try {
    const response = await fetchComputedPosts();
    posts.value = response.map((post) => ({
      ...post,
      title: truncateText(post.title, 60),
      body: truncateText(post.body, 60),
      authorName: post.user.name
    }));
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
  getPosts();
}

const handleOpenPost = (data) => {
  console.log('=== handleOpenPost ===');
  console.log('data', data);
}

const handleDeletePost = (data) => {
  console.log('=== handleDeletePost ===');
  console.log('data', data);
}

init();
</script>