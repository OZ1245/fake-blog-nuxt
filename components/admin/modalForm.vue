<template>
  <q-dialog v-model="isVisibleDialog" class="modal-form">
    <q-card class="modal-form__card">
      <q-form
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <q-card-section class="row items-center">
          <div class="text-h6">{{ headerTitle }}</div>
<!--          <q-space />-->
<!--          <q-btn icon="close" flat round dense v-close-popup @click="handleClose" />-->
        </q-card-section>
        
        <q-separator />
        
        <q-card-section class="row q-col-gutter-md">
          <div v-for="field in fields" class="col-md-6">
            <q-input
              v-model="form[field.key]"
              v-bind="field"
              :readonly="getReadonly(field)"
            />
          </div>
        </q-card-section>
        
        <q-separator />
        
        <q-card-actions align="between">
          <q-btn
            :label="$t('common.cancel')"
            type="button"
            color="primary"
            flat
            @click="handleCancel"
          />
          <q-btn
            :label="$t('common.save')"
            type="submit"
            color="primary"
          />
<!--          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />-->
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { QFieldProps } from 'quasar'

// TYPE DEFINES

export type ModelValue = Record<string, any | any[] | null>;

export interface IField extends QFieldProps {
  key: string;
  defaultValue?: ModelValue;
}

interface IProps {
  isVisible: boolean;
  fields: IField[];
  headerTitle?: string;
  isReadonly?: boolean;
}

// COMPOSABLES

const { t } = useI18n();

// MODEL

const model = defineModel<ModelValue>({ default: () => ({}) });

// PROPS

const {
  isVisible,
  fields,
  headerTitle = '',
  isReadonly = false
} = defineProps<IProps>();

// EMITS

const emits = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void;
  (e: 'toggle', value: boolean): void;
  (e: 'open', value: boolean): void;
  (e: 'close', value: boolean): void;
  (e: 'opened', value: boolean): void;
  (e: 'closed', value: boolean): void;
  (e: 'submit', value: ModelValue): void;
  (e: 'reset', value: ModelValue): void;
}>();

// DATA

const initForm = ref<ModelValue>({});

// COMPUTED

const form = computed<ModelValue>({
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
  }
});

const formIsChanged = computed<boolean>(() => (
  Object.keys(initForm.value).some((key) => initForm.value[key] !== model.value[key]))
);

// METHODS

const getReadonly = (field: IField): boolean => {
  if (isReadonly) return true;
  
  return field.readonly || false;
}

const close = () => {
  isVisibleDialog.value = false;
  emits('close', false);
}

const init = () => {
  initForm.value = { ...model.value };
}

// HANDLERS

const handleSubmit = (e: Event) => emits('submit', form.value);

const handleReset = () => {
  return; // FIXME: Подумать о правильной работе кнопки
  
  Object.keys(form.value).forEach((key) => {
    const field = fields.find((field) => field.key === key);
    
    if (!field || field.readonly) return;
    
    form.value[key] = field.defaultValue || null;
  });
  
  emits('reset');
}

const handleCancel = () => {
  if (isReadonly) {
    close();
    return;
  }
  
  if (!formIsChanged.value) {
    close();
    return;
  }
  
  Dialog.create({
    title: t('common.cancelTitle'),
    message: t('common.cancelMessage'),
    cancel: true,
  })
  .onOk(() => {
    close();
  })
  .onCancel(() => {
    return;
  });
}

// LIFECYCLE HOOKS

onMounted(() => {

init();
})
</script>

<style lang="scss">
.modal-form__card {
  min-width: 360px;
  max-width: 720px;
}
</style>