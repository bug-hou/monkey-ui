<template>
  <span
    class="icon iconfont"
    :class="[name, size, !plain && 'plain']"
    :style="{
      ['--color']: color
    }"
  ></span>
</template>

<script lang="ts" setup name="mIcon">
/*
 * @Author: bughou
 * @Date: 2022-05-01 20:19:22
 * @Description: 创建一个icon组件
 */
// 从下载的组件中导入函数
import { defineProps, withDefaults } from "vue";
import { LightTheme } from "../../../common/style";
import { useInject } from "../../../hooks";
import type {
  Size as IconSize,
  Type as IconType
} from "../../../type/index.type";
const props = withDefaults(
  defineProps<{
    name: string;
    size?: IconSize;
    color?: string;
    plain?: boolean;
    type?: IconType;
  }>(),
  {}
);
const type = useInject(props.type, "type", "default");
const size = useInject(props.size, "size", "small");
const plain = useInject(props.plain, "plain", true);
const theme = LightTheme[type];
const color = useInject(props.color, "color", theme.color);
</script>
<style scoped lang="less">
.icon {
  display: inline-block;
  color: var(--color);
  cursor: pointer;
  text-align: center;
}
.plain {
  background-color: var(--color);
  color: white;
}

.mini {
  font-size: 14px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  padding: 3px;
  border-radius: 3px;
}
.small {
  font-size: 16px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  padding: 6px;
  border-radius: 6px;
}
.medium {
  font-size: 18px;
  width: 21px;
  height: 21px;
  line-height: 21px;
  padding: 9px;
  border-radius: 9px;
}
.big {
  font-size: 20px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  padding: 12px;
  border-radius: 12px;
}
</style>
