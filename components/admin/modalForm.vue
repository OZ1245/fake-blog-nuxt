<template>
  <q-dialog v-model="isVisibleDialog">
    <q-card>
      <q-form
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ headerTitle }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="handleClose" />
        </q-card-section>
        
        <q-separator />
        
        <q-card-section v-for="field in fields">
          <q-input
            v-model="form[field.key]"
            v-bind="field"
          />
        </q-card-section>
        
        <q-separator />
        
        <q-card-actions align="right">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { QFieldProps } from 'quasar'

export type ModelValue = Record<string, any | any[] | null>;

export interface IField extends QFieldProps {
  key: string;
  defaultValue?: ModelValue;
}

interface IProps {
  isVisible: boolean;
  fields: IField[];
  headerTitle?: string;
}

const model = defineModel<ModelValue>({ default: () => ({}) });

const { isVisible, fields } = defineProps<IProps>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void;
  (e: 'toggle', value: boolean): void;
  (e: 'open', value: boolean): void;
  (e: 'close', value: boolean): void;
  (e: 'opened', value: boolean): void;
  (e: 'closed', value: boolean): void;
}>();

const form = computed({
  get() {
    return model.value;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});

const isVisibleDialog = computed({
  get() {
    return isVisible;
  },
  set(value) {
    emits('toggle', value);
    
    if (value) {
      emits('open', value);
    } else {
      emits('close', value);
    }
  }
});

const handleSubmit = (e: Event) => {
  console.log('=== handleSubmit ===');
  console.log('e:',  e);
}

const handleReset = () => {
  Object.keys(form.value).forEach((key) => {
    const field = fields.find((field) => field.key === key);
    
    if (!field || field.readonly) return;
    
    form.value[key] = field.defaultValue || null;
  });
}

const handleClose = () => {
  isVisibleDialog.value = false;
}
</script>