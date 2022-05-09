<!-- bgBackTop -->
<template>
	<transition name="backTop">
		<div
			class="bgBackTop"
			v-show="showBackTop"
			:style="[{ right: right + 'px' }, { bottom: bottom + 'px' }]"
		>
			<slot>
				<bg-button
					class="item"
					:circle="true"
					:icon="icon"
					shape="circle"
					size="medium"
					hoverBackground="#f2f6fc"
					@bgClick="clickHandle"
				></bg-button>
			</slot>
		</div>
	</transition>
</template>

<script>
// 从下载的组件中导入函数
import { defineComponent, onMounted, onUnmounted, ref, watchEffect } from "vue";

// 自定义方法引入
import {
	setScrollPosition,
	getScrollPosition,
} from "../../../utils/hooks/scroll";
// 自定义组件引入
import bgButton from "../../button/src/base.vue";
export default defineComponent({
	name: "bgBackTop",
	inheritAttrs: true,
	components: { bgButton },
	emits: ["bgClick"],
	props: {
		offset: {
			default: 100,
			type: Number,
		},
		icon: {
			type: String,
			default: "icon-huojian",
		},
		right: {
			type: Number,
			default: 50,
		},
		bottom: {
			type: Number,
			default: 50,
		},
	},
	setup(props, { emit }) {
		var callback;
		const showBackTop = ref(false);
		const move = ref(false);

		const clickHandle = () => {
			showBackTop.value = false;
			setScrollPosition();
			emit("bgClick");
		};
		onMounted(() => {
			const scroll = getScrollPosition();
			callback = scroll.callback;
			const scrollY = scroll.y;

			watchEffect(() => {
				if (scrollY.value >= props.offset) {
					showBackTop.value = true;
				} else {
					showBackTop.value = false;
				}
			});
		});

		onUnmounted(() => {
			callback();
		});
		return {
			showBackTop,
			move,
			clickHandle,
		};
	},
});
</script>
<style scoped lang="less">
.bgBackTop {
	position: fixed;
	width: 50px;
	height: 50px;
	.item {
		width: 50px;
		height: 50px;
		font-size: 25px;
		box-shadow: 0 0 6px #0000001f;
	}
}
</style>
