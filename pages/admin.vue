<template>
  <q-layout view="hHh lpR fFf">
    
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        
        <q-toolbar-title>
          {{ $t('admin.headerTitle') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    
    <q-drawer show-if-above :model-value="true" side="left" bordered :mini="leftDrawerOpen">
      <layouts-drawer-menu :items="drawerMenuItems"/>
    </q-drawer>
    
    <q-page-container>
      <nuxt-page/>
    </q-page-container>
  
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { t } = useI18n();

const leftDrawerOpen = ref(false);
const drawerMenuItems = [
  {
    title: t('admin.drawerMenu.data'),
    icon: 'table_view',
    to: '/admin/data',
  },
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
