<template>
  <q-list padding class="drawer-menu">
    <q-item v-for="(item, i) in items" :key="`drawer-menu-item-${i}`" clickable v-ripple @click="handleItemClick(item.to)">
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      
      <q-item-section>
        {{ item.title }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from '#vue-router';

interface IItem {
  title: string;
  icon: string;
  to: RouteLocationRaw;
}

interface IProps {
  items: IItem[];
}

const router = useRouter();
const props = defineProps<IProps>();
const { items } = toRefs(props);

const handleItemClick = (to: IItem['to']) => router.push(to);
</script>