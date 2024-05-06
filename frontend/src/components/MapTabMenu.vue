<template>
    <button  @click="$emit('tabSelected', props.id)"  :class="[active, 'tab']">
      {{ props.label }}
    </button>
  
  </template>
<!-- @click="$emit('input', props.id)" -->
<script setup>
import { ref, watch ,reactive ,computed  } from 'vue'
const props = defineProps(['id','label' ,'color'])
const v_model = defineModel()
const r_color = ref(props.color)
const active = computed(() => {
  return v_model.value === props.id ? 'active' : false
})


const emit = defineEmits(['tabSelected'])

// function onInput(e) {
//     console.log(v_model.value, 'e.target.value' , props.id , props.label)
//   emit('update:id', props.id)
// }
</script>
<style>
.tab {
  border-radius: 2px 2px 0 0;
  background: #fff;
  color: #311d0a;
  line-height: 24px;
  width:80px;
}
button {
    border :0;
    border-left: 1px solid #4f4f4f31;;
}
button:first-child{
    border-left:none;
}
.active {
  background: v-bind(r_color);
}
</style>