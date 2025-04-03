<template>
  <q-tabs
    v-model="tab"
    inline-label
    align="left"
    class="bg-secondary"
    style="position: sticky; top: 50px; z-index: 1;"
  >
    <q-tab
      v-for="(item, i) in tabs"
      :key="`data-tab-${i}`"
      :name="item.name"
      :icon="item.icon"
      :label="item.label"
      @click="handleItemClick(item.to)"
    />
  </q-tabs>
  
  <q-separator />
  
  <q-page style="min-height: calc(100vh - 100px); max-height: calc(100vh - 100px)">
    <nuxt-page/>
  </q-page>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from '#vue-router';

interface  ITab {
  name: string;
  icon: string;
  label: string;
  to: RouteLocationRaw;
}

const { t } = useI18n();
const router = useRouter();

const tabs = <ITab[]>[
  {
    name: 'posts',
    icon: 'article',
    label: t('admin.data.tabs.posts'),
    to: 'data/posts',
  },
  {
    name: 'users',
    icon: 'person',
    label: t('admin.data.tabs.users'),
    to: 'data/users',
  },
];
const tab = ref<string>('posts');

const handleItemClick = (to: ITab['to']) => router.push(to);
</script>
