<template>
  <ul class="topBar">
    <li v-for="item in props.barList">
      <slot v-if="!!item.self" :name="item.slotName"></slot>
      <span
        :class="$route.path.includes(item.path) && 'active'"
        @click="clickHandler(item)"
        v-else
        >{{ item.name }}</span
      >
    </li>
  </ul>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-04-27 17:13:36
 * @Description: 创建一个topBar组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults } from "vue";
import { useRouter } from "vue-router";
interface PropsValue {
  barList?: BarList[];
}

interface BarList {
  path: string;
  name: string;
  slotName?: string;
  self?: boolean;
}
const props = withDefaults(defineProps<PropsValue>(), {
  barList: () => []
});
const name = "topBar";
const router = useRouter();
const clickHandler = (item: BarList) => {
  const reg = new RegExp("\^https\?://");
  if (reg.test(item.path)) {
    location.href = item.path;
  } else if (item.path !== "") {
    router.push(item.path);
  }
};
</script>
<style scoped lang="less">
.topBar {
  display: flex;
  width: 70%;
  justify-content: space-evenly;
  li {
    font-size: 0.8rem;
    cursor: pointer;
    span {
      text-align: center;
    }
    .active {
      color: #3ac5dc;
    }
  }
}
</style>
