<!-- bgInput -->
<template>
	<label
		:class="[
			'bgInput',
			size,
			captcha && 'captcha',
			$attrs.class,
			focus && 'focus',
		]"
	>
		<div v-if="title" @click="$emit('bgClick')">
			<slot name="title">
				<p class="slot">{{ title }}</p>
			</slot>
		</div>
		<input
			v-bind="$attrs"
			@input="changeValue"
			:type="inputType"
			v-model="value"
			@keyup.enter="changeListShow"
			@keyup.up="upHandler"
			@keyup.down="downHandler"
			@blur="blurHandler"
			@focus="focusHandler"
			ref="input"
		/>
		<slot name="icon">
			<p
				v-if="(clear || password) && value"
				@click="clickIcon"
				:class="[
					'iconfont',
					clear ? 'icon-shanchu' : 'icon-xianshimima',
					'bgicon',
				]"
			></p>
		</slot>
		<ul
			v-if="
				list && Array.isArray(list) && list.length !== 0 && (isShow || isHover)
			"
			class="list"
			@mouseenter="enterHandler"
			@mouseleave="leaveHandler"
		>
			<transition-group name="listPositionOpacity" :appear="true" mode="out-in">
				<li
					v-for="(item, index) in list"
					:key="item"
					@click="clickListItem(item, index)"
					:class="activeIndex == index && 'hover'"
					@mouseenter="itemEnterHandler(index)"
				>
					{{ typeof item === "object" ? item.value : item }}
				</li>
			</transition-group>
		</ul>
	</label>
</template>

<script>
// 从下载的组件中导入函数
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
	emits: ["bgClick", "update:modelValue", "liClick", "focus", "blur"],
	name: "bgInput",
	inheritAttrs: false,
	props: {
		size: {
			default: "small",
			// mini,small,medium
			invadator(value) {
				return ["mini", "small", "medium"].includes(value);
			},
		},
		captcha: {
			type: Boolean,
			default: false,
		},
		type: {
			default: "text",
			type: String,
		},
		modelValue: {
			type: String,
			default: "",
		},
		clear: {
			type: Boolean,
			default: false,
		},
		password: {
			type: Boolean,
			default: false,
		},
		list: {
			type: [Boolean, Array],
			default: false,
		},
		title: String,
	},
	setup(props, { emit }) {
		// 监听参数
		var value = ref(
			typeof props.modelValue === "string"
				? props.modelValue
				: JSON.stringify(props.value)
		);
		var inputType = ref(props.type);
		var isShow = ref(true);
		var isHover = ref(true);
		var input = ref(null);
		var activeIndex = ref(undefined);
		var focus = ref(false);

		watch(
			() => props.modelValue,
			newValue => {
				value.value = newValue;
			}
		);

		// 发送input中变量(v-model)
		var changeValue = event => {
			value.value = event.target.value;
			isShow.value = true;
			emit("update:modelValue", event.target?.value);
		};

		// 监听是否点击图标
		const clickIcon = () => {
			if (props.clear) {
				value.value = "";
				emit("update:modelValue", "");
			} else {
				inputType.value = inputType.value === "password" ? "text" : "password";
			}
		};

		// 点击list中的item
		const clickListItem = (item, index) => {
			value.value = item;
			isShow.value = false;
			isHover.value = false;
			emit("update:modelValue", item);
			emit("liClick", item, index);
		};

		const changeListShow = () => {
			if (props.list) {
				value.value =
					typeof props.list[activeIndex.value] == "object"
						? props.list[activeIndex.value].value
						: props.list[activeIndex.value];
				isShow.value = false;
			}
		};

		const blurHandler = e => {
			isShow.value = false;
			focus.value = false;
			emit("blur", e);
		};

		const focusHandler = e => {
			focus.value = true;
			emit("focus", e);
		};

		const enterHandler = () => {
			isHover.value = true;
			// input.value.removeEventListener("blur", blurHandler);
		};

		const leaveHandler = () => {
			activeIndex.value = undefined;
			isHover.value = false;
			// input.value.addEventListener("blur", blurHandler);
		};
		const itemEnterHandler = index => {
			activeIndex.value = index;
		};
		const downHandler = () => {
			if (activeIndex.value < props.list.length - 1) {
				activeIndex.value++;
			}
			if (activeIndex.value === undefined) {
				activeIndex.value = 0;
			}
		};
		const upHandler = () => {
			if (activeIndex.value > 0) {
				activeIndex.value--;
			}
			if (activeIndex.value === undefined) {
				activeIndex.value = 0;
			}
		};

		return {
			value,
			inputType,
			isShow,
			input,
			activeIndex,
			focus,
			isHover,
			clickIcon,
			changeValue,
			clickListItem,
			changeListShow,
			blurHandler,
			focusHandler,
			enterHandler,
			leaveHandler,
			itemEnterHandler,
			downHandler,
			upHandler,
		};
	},
});
</script>
<style scoped lang="less">
.bgInput {
	height: 30px;
	display: flex;
	border-radius: 5px;
	position: relative;
	color: var(--font-color-input);
	border: 1px solid var(--border-color-input);
	&.focus {
		border: 1px solid var(--border-color-input-active);
	}
	> p {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		font-size: inherit;
		color: inherit;
	}
	> * {
		height: 100%;
	}
	div {
		background: var(--back-color-input-title);
		color: var(--font-color-input-title);
		white-space: nowrap;
		padding: 0 3px;
		box-sizing: border-box;
		border-radius: 5px 0 0 5px;
		cursor: pointer;
	}
	div + input {
		border-radius: 0 5px 5px 0;
	}
	input {
		border: none;
		padding-left: 10px;
		box-sizing: border-box;
		width: 100%;
		font-size: inherit;
		color: inherit;
		border-radius: 5px;
		// border: 1px solid var(--border-color-input);
		// &:focus {
		// 	border: 1px solid var(--border-color-input-active);
		// }
	}
	.list {
		padding: 5px;
		position: absolute;
		top: calc(100% + 10px);
		left: 0;
		right: 0;
		height: auto;
		background: var(--back-color-input-list);
		z-index: 100;
		border: 1px solid var(--border-color-input-list);
		border-radius: 5px;
		li {
			transition: all 0.3s;
			font-size: inherit;
			width: 100%;
			padding-left: 5px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			&.hover {
				padding-left: 10px;
				cursor: pointer;
				background: var(--back-color-input-list-active);
				color: var(--font-color-input-list-active);
				font-weight: bold;
			}
		}
	}
}
.captcha {
	flex-direction: row-reverse;
	div {
		border-radius: 0 5px 5px 0;
	}
	div + input {
		border-radius: 5px 0 0 5px;
	}
}
.mini {
	width: 220px;
	height: 30px;
	line-height: 30px;
}
.small {
	width: 280px;
	height: 32px;
	font-size: 14px;
	line-height: 32px;
}
.medium {
	width: 380px;
	height: 35px;
	font-size: 16px;
	line-height: 35px;
}
</style>
