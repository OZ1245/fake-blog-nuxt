<template>
<!--  <q-layout view="hHh lpR fFf">-->
  <q-layout view="hHh LPr fFf">
    
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        
        <q-toolbar-title>
          {{ $t('admin.headerTitle') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    
    <q-drawer
      :model-value="true"
      :mini="leftDrawerOpen"
      side="left"
      show-if-above
      bordered
    >
      <layouts-drawer-menu :items="drawerMenuItems"/>
    </q-drawer>
    
    <q-page-container>
      <q-page>
      
      <nuxt-page/>
      </q-page>
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
