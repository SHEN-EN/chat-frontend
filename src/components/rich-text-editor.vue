<script setup lang="ts">
</script>
<template>
  <div class="editor" contenteditable="true" @input="handleInput" ref="editor">
    {{ content }}
  </div>
</template>
  
  <style scoped lang="scss">
.editor {
  box-shadow: none;
  resize: none;
  padding: 10px;
  font-size: 12px;
  outline: none;
  height: 69px;
}
</style>