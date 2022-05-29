<!-- bgUpload -->
<template>
	<div class="bgUpload">
		<bg-message :type="'error'" :value="fileInfo" v-if="message"></bg-message>
		<label>
			<p v-if="type === 'text'">{{ title }}</p>
			<p v-else :class="['shape', 'iconfont', icon]"></p>
			<input
				type="file"
				:accept="accept"
				ref="input"
				v-bind="$attrs"
				@change="getFiles"
			/>
		</label>
		<p class="discript">{{ descriptor }}</p>
		<div class="list">
			<p v-for="(item, index) in files" :key="index">
				<slot :item="item">
					<span class="iconfont icon-wenjianguanli">{{ item }}</span>
					<span @click="cancle(index)" class="iconfont icon-cha cancle"></span>
				</slot>
			</p>
		</div>
	</div>
</template>

<script>
// 从下载的组件中导入函数
import { defineComponent, reactive, ref } from "vue";

// 自定义方法引入

// 自定义组件引入
import bgButton from "../../button/src/base.vue";
import bgMessage from "../../message/src/base.vue";
export default defineComponent({
	name: "bgUpload",
	inheritAttrs: false,
	emits: ["select", "cancle"],
	components: {
		bgButton,
		bgMessage,
	},
	props: {
		accept: String,
		splitCount: Number,
		descriptor: [String, Number],
		type: {
			// text|shape
			default: "text",
		},
		name: {
			required: true,
		},
		title: {
			default: "select file",
		},
		icon: {
			default: "icon-shangchuan",
			type: String,
		},
		size: Number,
	},
	setup(props, { emit }) {
		const input = ref(null);
		const message = ref(false);

		const files = reactive([]);

		const fileInfo = ref("");

		const getFiles = () => {
			if (input.value.files[0]) {
				if (input.value.files[0].size > props.size) {
					fileInfo.value = input.value.files[0].name.slice(-8) + "文件太大了";
					message.value = true;
					return;
				}
				let name = input.value.files[0].name;
				if (props.splitCount) {
					name =
						name.split(".")[0].slice(-props.splitCount) +
						"." +
						name.split(".")[1];
				}
				files.push(name);
				const file = new FormData();
				file.append(props.name, input.value.files[0]);
				emit("select", file);
			}
		};

		const cancle = index => {
			emit(cancle, files[index], index);
			files.splice(index, 1);
		};
		return {
			input,
			files,
			getFiles,
			message,
			cancle,
			fileInfo,
		};
	},
});
</script>
<style scoped lang="less">
.bgUpload {
	color: var(--font-color-upload);
	label {
		display: block;
		p {
			display: inline-block;
			font-size: 18px;
			border-radius: 6px;
			padding: 2px 10px;
			text-align: center;
			border: 1px solid var(--border-color-upload);
			background: var(--back-color-upload);
			cursor: pointer;
		}
		.shape {
			width: 200px;
			height: 200px;
			border-style: dashed;
			border-width: 2px;
			font-size: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		input {
			display: none;
		}
	}
	.discript {
		padding: 0 5px;
		color: var(--font-color-upload-list);
		font-size: 12px;
	}
	.list {
		p {
			padding: 3px 5px;
			color: var(--font-color-upload-list);
			position: relative;
			.iconfont {
				font-size: 12px;
			}
			cursor: pointer;
			&:hover {
				color: var(--font-color-upload-active);
				.cancle {
					display: block;
				}
			}
			.cancle {
				display: none;
				position: absolute;
				top: 0;
				left: 90%;
			}
		}
	}
}
</style>
