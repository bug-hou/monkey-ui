<!-- bgButton -->
<template>
  <button
    @click="handleClick"
    @touchend="handleTouch"
    :class="[size, shape, disabled && 'disabled']"
    :style="[
      {
        ['--color']:
          color ?? plain ? colors[type].color : colors[type].hoverColor
      },
      {
        ['--back']:
          backgroundColor ?? plain
            ? colors[type].backgroundColor
            : colors[type].hoverBackgroundColor
      },
      { ['--border']: borderColor ?? colors[type].border },
      { ['--hover-color']: hoverColor ?? colors[type].hoverColor },
      {
        ['--hover-backgroundColor']:
          hoverBackgroundColor ?? colors[type].hoverBackgroundColor
      }
    ]"
  >
    <div v-if="loading">
      <slot name="icon"></slot>
    </div>
    <slot> </slot>
  </button>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { defineEmits, defineProps, withDefaults } from "vue";

type ButtonType =
  | "success"
  | "error"
  | "info"
  | "primary"
  | "warning"
  | "default";

type ButtonShape = "rect" | "round" | "arc" | "circle";

type ButtonSize = "medium" | "small" | "mini";

interface ButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  shape?: ButtonShape;
  plain?: boolean;
  size?: ButtonSize;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  disabled: false,
  loading: false,
  shape: "rect",
  plain: true,
  size: "small"
});

const emits = defineEmits(["mClick", "mTouch"]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emits("mClick", event);
  }
};

const handleTouch = (event: TouchEvent) => {
  if (!props.disabled) {
    emits("mClick", event);
  }
};

const colors = {};

// 自定义方法引入

// 自定义组件引入
// export default defineComponent({
//   name: "bgButton",
//   emits: ["bgClick"],
//   props: {
//     type: {
//       default: "default",
//       validator(value) {
//         const sizes = [
//           "success",
//           "error",
//           "info",
//           "primary",
//           "warning",
//           "default"
//         ];
//         return sizes.includes(value);
//       }
//     },
//     disabled: {
//       type: Boolean,
//       default: false
//     },
//     loading: {
//       type: Boolean,
//       default: false
//     },
//     iconLoading: {
//       default: "icon-loader"
//     },
//     shape: {
//       default: "rect",
//       validator(value) {
//         const types = ["rect", "smallArc", "arc", "circle"];
//         return types.includes(value);
//       }
//     },
//     circle: {
//       type: Boolean,
//       default: false
//     },
//     plain: {
//       default: false,
//       type: Boolean
//     },
//     size: {
//       default: "small",
//       validator(value) {
//         const sizes = ["mini", "small", "medium"];
//         return sizes.includes(value);
//       }
//     },
//     icon: String,
//     color: String,
//     background: String,
//     border: String,
//     hoverColor: String,
//     hoverBackground: String,
//     value: String
//   },
//   setup(props, { emit }) {
//     const colors = {
//       success: {
//         color: "#67c23a",
//         background: "rgb(240, 249, 235)",
//         border: "#67c23a",
//         hoverColor: "white",
//         hoverBackground: "#67c23a"
//       },
//       info: {
//         color: "#909399",
//         background: "rgb(244, 244, 245)",
//         border: "#909399",
//         hoverColor: "white",
//         hoverBackground: "#909399"
//       },
//       warning: {
//         color: "#e6a23c",
//         background: "rgb(253, 246, 236)",
//         border: "#e6a23c",
//         hoverColor: "white",
//         hoverBackground: "#e6a23c"
//       },
//       primary: {
//         color: "#409eff",
//         background: "rgb(236, 245, 255)",
//         border: "#409eff",
//         hoverColor: "white",
//         hoverBackground: "#409eff"
//       },
//       error: {
//         color: "#f56c6c",
//         background: "rgb(254, 240, 240)",
//         border: "#f56c6c",
//         hoverColor: "white",
//         hoverBackground: "#f56c6c"
//       },
//       default: {
//         color: "black",
//         background: "white",
//         border: "#dcdfe6",
//         hoverColor: "#409eff",
//         hoverBackground: "white"
//       }
//     };

//     const btnClick = (event) => {
//       if (!props.disabled) {
//         emit("bgClick", event);
//       }
//     };

//     return {
//       colors,
//       btnClick
//     };
//   }
// });
</script>
<style scoped lang="less">
/*
--back-color-one
--font-color-two
 */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
button {
  display: flex;
  padding: 2px 10px;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  border: 1px var(--border) solid;
  color: var(--color);
  background: var(--back);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background: var(--hover-background);
    color: var(--hover-color);
  }
  &.disabled {
    cursor: not-allowed;
    &:hover {
      color: var(--color);
      background: var(--back);
    }
  }
  > div {
    p {
      animation: rotate 3s linear infinite;
    }
    font-size: inherit;
    margin-right: 3px;
  }
}
.mini {
  padding: 2px 8px;
  font-size: 12px;
}
.small {
  padding: 5px 15px;
  font-size: 14px;
}
.medium {
  padding: 10px 20px;
  font-size: 16px;
}
.rect {
  border-radius: 0;
}
.smallArc {
  border-radius: 10px;
}
.arc {
  border-radius: 50px;
}
.circle {
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  padding: 0;
}
</style>
