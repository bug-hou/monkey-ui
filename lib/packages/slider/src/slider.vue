<!-- bgSlider -->
<template>
	<div :class="['bgSlider', size,vertical&&'vertical']">
		<p class="sub iconfont icon-jianhao" v-if="button" @click="sub" @mouseenter="showHover" @mouseleave="hiddenHover" @mousedown="longSub" @mouseup="cancelLongSub"></p>
		<div class="all" ref="all" @click="move">
			<p class="value" ref="value">
			<p :class="['dot',hovering&&'hover',clicking&&'click']" @mousedown="dotDown" @touchstart="dotDown" @mouseenter="showHover" @mouseleave="hiddenHover">
				<span v-if="show" v-show="hovering || clicking">
					{{compoutedPrecent(precent)}}
				</span>
				<slot></slot>
			</p>
		</p>
		</div>
		<p class="add iconfont icon-jiahao" v-if="button" @click="add"  @mouseenter="showHover" @mouseleave="hiddenHover"  @mousedown="longAdd" @mouseup="cancelLongAdd"></p>
	</div>
</template>

<script lang="ts" setup>
// 从下载的组件中导入函数
import { computed, onMounted, ref, watch,withDefaults,defineProps } from "vue";
import {offsetValue} from "../../../hooks/index"

// 自定义方法引入

// 自定义组件引入
const props = withDefaults(defineProps<{
  size?: "mini"|"small"|"medium",
		show?:boolean,
		button?:boolean,
		max?:number,
		min?:number,
		fixed?:number,
		vertical?:boolean
}>(),{
  size:"small",
  button:false,
  max:100,
  min:0,
  fixed:0,
  vertical:false,
  show:false
})

const emits = defineEmits(["changeValue"])

		// 获取到滑块的宽度(标签实例)
		const all = ref(null);
		// 值实例
		const value = ref(null);
		// 判断是否移入
		const hovering = ref(false);
		// 判断是否点击
		const clicking = ref(false);
		// 要进行显示分数
		const precent = ref();

		let offsetLeft;
		let offsetTop;
		let allHeight;
		let allWidth;
		let longSubTimer;
		let longAddTimer;
		let startLongTimer;
		onMounted(()=>{
			offsetLeft = computed(()=>{
				return offsetValue(all.value,"left")
			})
			allWidth = computed(()=>{
				return parseFloat(getComputedStyle(all.value).width)
			})
			offsetTop = computed(()=>{
				return offsetValue(all.value,"top")
			})
			allHeight = computed(()=>{
				return parseFloat(getComputedStyle(all.value).height)
			})
			const offsetWidth = parseFloat(getComputedStyle(value.value).width);
			const offsetHeight = parseFloat(getComputedStyle(value.value).height);
			if(props.vertical){
				precent.value = Math.round((offsetHeight / allHeight.value)*100);
			}else{
				precent.value = Math.round((offsetWidth / allWidth.value)*100);
			}
		})
		watch(precent,(newValue)=>{
			emits("changeValue",newValue);
		})
		const dotDown = ()=>{
			clicking.value = true;
			window.addEventListener("mousemove",move);
			window.addEventListener("touchend",dotUp);
			window.addEventListener("mouseup",dotUp);
		}
		const move = (event)=>{
			if(props.vertical){
				clicking.value = true;
				const pageTop = event.pageY;
				const height = pageTop - offsetTop.value;
				if(height <= allHeight.value && height > 0){
					value.value.style.height = height + "px";
				}
				const offsetHeight = parseFloat(getComputedStyle(value.value).height);
				precent.value = Math.round((offsetHeight / allHeight.value)*100);
			}else{
				clicking.value = true;
				const pageLeft = event.pageX;
				const width = pageLeft - offsetLeft.value;
				if(width <= allWidth.value && width > 0){
					value.value.style.width = width + "px";
				}
				const offsetWidth = parseFloat(getComputedStyle(value.value).width);
				precent.value = Math.round((offsetWidth / allWidth.value)*100);
			}
		}
		const dotUp = ()=>{
			clicking.value = false;
			window.removeEventListener("mousemove",move);
			window.removeEventListener("mouseup",dotUp);
			window.removeEventListener("mouseend",dotUp);
		}
		const showHover = ()=>{
			hovering.value = true;
		}
		const hiddenHover = ()=>{
			hovering.value = false;
		}
		const sub = function(){
			precent.value = precent.value - 1 < 0 ? 0 : precent.value - 1;
			if(props.vertical){
				const height = (allHeight.value * (precent.value / 100));
				if(height <= allHeight.value && height > 0){
					value.value.style.height = height + "px";
				}
			}else{
				const width = (allWidth.value * (precent.value / 100));
				if(width <= allWidth.value && width > 0){
					value.value.style.width = width + "px";
				}
			}
		}
		const longSub = ()=>{
			startLongTimer = setTimeout(() => {
				longSubTimer = setInterval(() => {
					sub();
					if(precent.value === 0){
						clearInterval(longSubTimer);
					}
				}, 100);
			}, 500);
		}
		const cancelLongSub = ()=>{
			clearTimeout(startLongTimer);
			clearInterval(longSubTimer);
		}
		const add = function(){
			precent.value = precent.value + 1 > 100 ? 100 : precent.value + 1;
			if(props.vertical){
				const height = (allHeight.value * (precent.value / 100));
				if(height <= allHeight.value && height > 0){
					value.value.style.height = height + "px";
				}
			}else{
				const width = (allWidth.value * (precent.value / 100));
				if(width <= allWidth.value && width > 0){
					value.value.style.width = width + "px";
				}
			}
		}
		const longAdd = ()=>{
			startLongTimer = setTimeout(()=>{
				longAddTimer = setInterval(() => {
					add();
					if(precent.value === 0){
						clearInterval(longSubTimer);
					}
				}, 100);
			},500)
		}
		const cancelLongAdd = ()=>{
			clearTimeout(startLongTimer);
			clearInterval(longAddTimer);
		}
		const compoutedPrecent = (value)=>{
				const max = +props.max;
				const min = +props.min;
				const fixed = +props.fixed;
				const mid = max - min;
				return (min + ((value / 100) * mid)).toFixed(fixed);
		}
</script>
<style scoped lang="less">
.bgSlider {
	border-radius: 5px;
	position: relative;
	display: flex;
	align-items: center;
		.all {
			height: 5px;
			border-radius: 5px;
			background: var(--back-color-slider);
			position: relative;
			cursor: pointer;
			p{
				&.value {
					border-radius: 5px;
					position: absolute;
					height: 100%;
					background: var(--back-color-slider-active);
					left: 0;
					top: 0;
					width: 20px;
					p{
						position: absolute;
						left: 100%;
						top: 50%;
						transform: translate(-50%,-50%);
						border-radius: 50%;
						background: var(--back-color-slider-block);
						border: 1px solid var(--border-color-slider-block);
						font-size: 12px;
						line-height: 18px;
						text-align: center;
						display: flex;
						justify-content: center;;
						align-items: center;
						text-overflow: ellipsis;
						&.hover{
							cursor: grab;
							transform:translate(-50%,-50%) scale(1.2);
							transition: scale .5s;
						}
						&.click{
							cursor: grab;
							transform:translate(-50%,-50%) scale(1.2);
							transition: scale .5s;
						}
						span{
							pointer-events: none;
							display: block;
							position: absolute;
							background: var(--back-color-slider-value);
							color:var(--font-color-slider-value);
							bottom: calc(100% + 8px);
							left:50%;
							transform: translateX(-50%);
							padding: 5px 10px;
							border-radius: 5px;
							&::before{
								display: block;
								content: "";
								position: absolute;
								top: 100%;
								left:50%;
								transform: translate(-50%,-2px);
								border: 8px solid transparent;
								border-top-color: var(--border-color-slider-value);
							}
						}
					}
				}
			}
		}
	p {
		&.sub,&.add{
			width: 20px;
			font-size: 18px;
			margin-right: 10px;
			color: var(--font-color);
			&:hover{
				cursor: pointer;
			}
		}
		&.add{
			margin-left: 10px;
		}
	}
}
.mini {
	div{
		&.all{
			width: 300px;
			p{
				&.value{
					p{
						width: 12px;
						height: 12px;
					}
				}
			}
		}
	}
}
.small {
	div{
		&.all{
			width: 500px;
			p{
				&.value{
					p{
						width: 15px;
						height: 15px;
					}
				}
			}
		}
	}
}
.medium {
	div{
		&.all{
			width: 700px;
			height: 8px;
			p{
				&.value{
					p{
						width: 20px;
						height: 20px;
					}
				}
			}
		}
	}
}
.vertical{
	width: 5px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.all{
		width: 5px;
		height: 500px;
		p{
				&.value {
					height: 10%;
					width:100%;
					left: 0;
					top: 0;
					p{
						left: 50%;
						top: 100%;
					}
				}
			}
	}
	p{
		&.sub,&.add{
			margin-right:0;
			margin-bottom: 10px;
		}
		&.add{
			margin-left: 0;
			margin-top: 10px;
		}
	}
	&.mini {
	  div{
		&.all{
			height: 300px;
		width: 5px;
		}
	}
}
&.small {
	div{
		&.all{
			height: 500px;
		width: 5px;
		}
	}
}
&.medium {
	div{
		&.all{
			height: 700px;
			width: 8px;
		}
	}
}
}
</style>
