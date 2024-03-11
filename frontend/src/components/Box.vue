<template>
    <div 
        v-bind:class="['box', color]" 
        v-bind:style="{ width: width + 'px', height: height + 'px' }">
    </div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: "" }
  },
  data() {
    return {
      width: 50,
      height: 80
    };
  }
};
</script>

<style scoped>.box {
    border: 1px solid #000;
  }
  .blue {
    background: #009bff;
  }
  .purple {
    background: #8f46ff;
  }
  .green {
    background: #00bcac;
  }
</style>