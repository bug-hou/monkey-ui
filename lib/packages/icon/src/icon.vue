<template>
  <span
    class="icon iconfont"
    :class="[name, size, !plain && 'plain', glass && 'glass', shape]"
    :style="{
      ['--color']: color,
      ['--hover']: hoverColor
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
import IconNames from "../config";
import type {
  Size as IconSize,
  Type as IconType,
  Shape as IconShape
} from "../../../type/index.type";
const props = withDefaults(
  defineProps<{
    name: string;
    size?: IconSize;
    color?: string;
    plain?: boolean;
    type?: IconType;
    glass?: boolean;
    shape?: IconShape;
  }>(),
  {
    plain: undefined,
    glass: true
  }
);
const { TYPE, SHAPE, SIZE, PLAIN, COLOR, HOVER_COLOR } = IconNames;
const type = useInject(props.type, TYPE, "info");
const size = useInject(props.size, SIZE, "small");
const plain = useInject(props.plain, PLAIN, true);
const theme = LightTheme[type];
const color = useInject(props.color, COLOR, theme);
const shape = useInject(props.shape, SHAPE, "circle");
const hoverColor = useInject(undefined, HOVER_COLOR, color);
</script>
<style scoped lang="less">
.icon {
  display: inline-block;
  color: var(--color);
  cursor: pointer;
  text-align: center;
  &:hover {
    color: var(--hover);
  }
}
.plain {
  background-color: var(--color);
  color: white;
  &:hover {
    color: white;
  }
}

.mini {
  font-size: 14px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  padding: 4px;
}
.small {
  font-size: 16px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  padding: 6px;
}
.medium {
  font-size: 18px;
  width: 21px;
  height: 21px;
  line-height: 21px;
  padding: 8px;
}
.big {
  font-size: 20px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  padding: 10px;
}
.rect {
  border-radius: 0;
}
.circle {
  border-radius: 50%;
}
.round {
  border-radius: 25%;
}
.glass {
  text-shadow: 0px 0px white;
}
</style>
