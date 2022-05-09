<!-- bgAvatar -->
<template>
  <div
    :class="['mAvatar', 'avatar-' + size, round && 'avatar-round']"
    :style="{ ['--avatar-color']: color }"
  >
    <img :class="[type]" :src="src" :alt="alt" ref="image" v-if="!isError" />
    <img :src="errorSrc ?? errorImage" :alt="alt ?? '加载失败'" v-else />
  </div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { onMounted, ref, withDefaults, defineProps } from "vue";
import type { AvatarSize, AvatarType } from "./avatar";
import errorImage from "../config/error.png";

const props = withDefaults(
  defineProps<{
    src: string;
    size?: AvatarSize;
    round?: boolean;
    type?: AvatarType;
    errorSrc?: string;
    color?: string;
    alt?: string;
  }>(),
  {
    size: "small",
    color: "#f0f2f5"
  }
);

const image = ref<InstanceType<typeof HTMLImageElement>>();
const isError = ref(false);
onMounted(() => {
  image.value.onerror = () => {
    isError.value = true;
  };
});
</script>
<style scoped lang="less">
.mAvatar {
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: var(--avatar-color);
  img {
    width: 100%;
    height: 100%;
    &.top {
      height: auto;
    }
    &.left {
      width: auto;
    }
  }
}
.avatar-mini {
  width: 40px;
  height: 40px;
}
.avatar-small {
  width: 60px;
  height: 60px;
}
.avatar-medium {
  width: 80px;
  height: 80px;
}
.avatar-large {
  width: 100px;
  height: 100px;
}
.avatar-round {
  border-radius: 50%;
}
</style>
