<template>
  <div v-show="localActive" class="tabs-item">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  inject,
  onMounted,
  getCurrentInstance,
  type ComponentInternalInstance,
} from 'vue';

const props = defineProps<{
  // Текс для кнопки таба
  title?: string;
  // Открыт ли таб изначально
  active?: boolean;
}>();

const registrationItem = inject('registrationItem') as (
  item: ComponentInternalInstance
) => void;

const instance = getCurrentInstance();

onMounted(() => {
  if (props.title) {
    registrationItem(instance as ComponentInternalInstance);
  }
});

const localActive = ref(props.active && props.title);
</script>

<style lang="scss" scoped></style>
