<!-- bgSwitch -->
<template>
	<div
		:class="['bgSwitch', size]"
		:style="[{ background: isLeft ? rtColor : ltColor }, { color }]"
	>
		<p :class="isLeft ? right : left" @click="changeDirection">
			{{ position === "out" ? (isLeft ? rtValue : ltValue) : "" }}
		</p>
		<p
			:class="[isLeft ? left : right, 'iconfont', isLeft ? ltIcon : rtIcon]"
			@click="changeDirection"
			:style="{ background: sliderColor }"
		>
			{{ position === "in" ? (isLeft ? ltValue : rtValue) : "" }}
		</p>
	</div>
</template>

<script>
// 从下载的组件中导入函数
import { defineComponent, ref } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
	name: "bgSwitch",
	emits: ["rtClick", "ltClick"],
	props: {
		ltValue: String,
		rtValue: String,
		ltIcon: String,
		rtIcon: String,
		size: {
			type: String,
			default: "small",
		},
		initial: {
			type: Boolean,
			default: false,
		},
		ltColor: String,
		rtColor: String,
		color: String,
		sliderColor: String,
		icon: {
			default: "icon-loader",
			type: String,
		},
		position: {
			default: "out",
			validator(value) {
				return ["out", "in"].includes(value);
			},
		},
	},
	setup(props, { emit }) {
		const left = ref("left");
		const right = ref("right");
		const isLeft = ref(props.initial);
		const changeDirection = () => {
			isLeft.value = !isLeft.value;
			if (isLeft.value) {
				emit("ltClick");
			} else {
				emit("rtClick");
			}
		};
		return {
			left,
			isLeft,
			right,
			changeDirection,
		};
	},
});
</script>
<style scoped lang="less">
.bgSwitch {
	position: relative;
	background: var(--back-color-switch);
	padding: 2px;
	box-sizing: content-box;
	display: flex;
	justify-content: space-between;
	color: var(--font-color-switch);
	p {
		cursor: pointer;
		border-radius: 50%;
		text-align: center;
		position: absolute;
		top: 2px;
		transition: all 0.5s;
		overflow: hidden;
		&:nth-child(2) {
			background: var(--back-color-switch-active);
			transition: all 0.5s;
		}
		&.left {
			left: 2px;
		}
	}
}
.mini {
	width: 40px;
	height: 15px;
	border-radius: 15px;
	p {
		width: 15px;
		height: 15px;
		font-size: 12px;
		line-height: 15px;
		&.right {
			left: calc(100% - 17px);
		}
	}
}

.small {
	width: 50px;
	height: 20px;
	border-radius: 20px;
	p {
		width: 20px;
		height: 20px;
		font-size: 14px;
		line-height: 20px;
		&.right {
			left: calc(100% - 22px);
		}
	}
}
.medium {
	width: 70px;
	height: 30px;
	border-radius: 30px;
	p {
		width: 30px;
		height: 30px;
		font-size: 18px;
		line-height: 30px;
		&.right {
			left: calc(100% - 32px);
		}
	}
}
</style>
