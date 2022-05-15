<!-- bgRadioGroup -->
<template>
	<div class="bgRadioGroup">
		<slot></slot>
	</div>
</template>

<script>
// 从下载的组件中导入函数
import { defineComponent, provide, ref, watch } from "vue";

// 自定义方法引入
import inputEmit from "../../../utils/mixins/inputEmit";

// 自定义组件引入
export default defineComponent({
	name: "bgRadioGroup",
	inheritAttrs: true,
	mixins: [inputEmit],
	props: {
		name: {
			required: true,
		},
		modelValue: {
			required: true,
		},
		disabled: Boolean,
		selectColor: String,
		icon: String,
		selectIcon: String,
		button: Boolean,
		border: Boolean,
		size: {
			validator(value) {
				const sizes = ["mini", "small", "medium"];
				return sizes.includes(value);
			},
		},
	},
	setup(props, { emit }) {
		const value = ref(props.modelValue);
		watch(value, newValue => {
			emit("update:modelValue", newValue);
		});
		provide("name", props.name);
		provide("modelValue", value);
		provide("size", props.size ?? "small");
		provide("button", props.button ?? false);
		provide("border", props.border ?? false);
		provide("icon", props.icon ?? "icon-fangkuang");
		provide("selectIcon", props.selectIcon ?? "icon-xuanze");
		provide("selectColor", props.selectColor ?? "#409eff");
		provide("disabled", props.disabled ?? false);

		return {};
	},
});
</script>
<style scoped lang="less"></style>
