<!-- bgRadio -->
<template>
	<bg-check-box :isRadio="true" :name="radioName"></bg-check-box>
</template>

<script lang="ts">
// 从下载的组件中导入函数
import { defineComponent, inject, ref, watch } from "vue";

// 自定义方法引入

// 自定义组件引入
import bgCheckBox from "../../checkbox/src/base.vue";
export default defineComponent({
	name: "bgRadio",
	components: { bgCheckBox },
	inheritAttrs: true,
	props: {
		name: String,
	},
	setup(props, { emit }) {
		const radioName = inject("name", props.name);

		return {
			radioName,
		};
	},
});
</script>
<style scoped lang="less"></style>
