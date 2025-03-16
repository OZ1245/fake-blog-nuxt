<template>
  <q-tabs
    v-model="tab"
    inline-label
    align="left"
    class="bg-secondary"
  >
    <q-route-tab v-for="(item, i) in tabs" :key="`data-tab-${i}`" v-bind="item"/>
  </q-tabs>
  
  <q-separator />
  
  <nuxt-page/>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const tabs = [
  {
    name: 'posts',
    icon: 'article',
    label: t('admin.data.posts'),
    to: '/admin/data/posts',
  },
  {
    name: 'users',
    icon: 'person',
    label: t('admin.data.users'),
    to: '/admin/data/users',
  },
];
const tab = ref<string>('posts');
</script>
