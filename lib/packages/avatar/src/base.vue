<!-- bgAvatar -->
<template>
	<div :class="['bgAvatar', size, radius && 'radius']">
		<img :class="[shape]" :src="src" alt="alt" ref="image" v-if="!isError" />
		<img src="../../assets/image/error.png" alt="" v-else />
	</div>
</template>

<script>
// 从下载的组件中导入函数
import { defineComponent, onMounted, ref } from "vue";

// 自定义方法引入

// 自定义组件引入
export default defineComponent({
	name: "bgAvatar",
	inheritAttrs: true,
	props: {
		src: {
			type: String,
			required: true,
		},
		size: {
			default: "small",
			type: String,
		},
		radius: {
			default: false,
			type: Boolean,
		},
		shape: {
			default: "cover",
			validator(value) {
				return ["top", "left", "cover"].includes(value);
			},
		},
	},
	setup() {
		const image = ref();
		const isError = ref(false);
		onMounted(() => {
			image.value.onerror = () => {
				isError.value = true;
			};
		});
		return {
			image,
			isError,
		};
	},
});
</script>
<style scoped lang="less">
.bgAvatar {
	overflow: hidden;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--back-color-avatar);
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
	&.mini {
		width: 60px;
		height: 60px;
	}
	&.small {
		width: 80px;
		height: 80px;
	}
	&.medium {
		width: 100px;
		height: 100px;
	}
	&.radius {
		border-radius: 50%;
	}
}
</style>
