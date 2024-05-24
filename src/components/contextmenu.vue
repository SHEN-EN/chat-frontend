<script setup lang="ts">
import { computed } from 'vue'
import { type menuItem } from '@/types/global'
const props = defineProps({
  menu: {
    type: Array<menuItem[]>,
    default: [],
  },
  position: {
    type: Object,
    default: {},
  },
})

const getMenuPosition = computed(() => {
  const { left, right, top, bottom } = props.position
  return `left:${left}px;top:${top}px;right:${right}px;bottom:${bottom}px`
})

const handleCallback = ({
  callback,
  args,
}: Pick<menuItem, 'callback' | 'args'>) => {
  if (!callback) return

  callback(args)
}
</script>
<template>
  <div class="right-click-menu" id="right-click-menu" :style="getMenuPosition">
    <div v-for="item in menu" @click="handleCallback(item)" class="menuitem">
      {{ item.name }}
      <i :class="`iconfont ${item.icon}`"></i>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.right-click-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #e4e3e3;
  margin: 5px 0;
  font-family: Arial, sans-serif;
  font-size: 14px;
  user-select: none;
  width: var(--right-click-menu-width);
  border-radius: 2px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  z-index: 99;

  .menuitem {
    padding: 5px 10px;
    background-color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #6495ed;
      border-radius: 5px;
    }

    + .menuitem {
      border-top: 1px solid #eee;
      /* 上边框 */
    }
  }
}
</style>