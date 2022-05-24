<template>
  <div class="index">
    <div class="top">
      <p class="mid">
        <img src="../../assets/M logo.png" alt="" />
      </p>
      <p class="left"></p>
      <p class="right"></p>
    </div>
    <div class="bottom">
      <div class="left">
        <template v-for="(item, index) in lHeights" :key="item">
          <div
            :style="[
              { ['--monkeys-height']: item + '%' },
              { ['--monkeys-delay']: index },
              { ['--color']: lColors[index] }
            ]"
          ></div>
        </template>
      </div>
      <div class="main">
        <h1>Monkeys UI</h1>
        <p>一个vue3 UI组件库</p>
        <p>这里的UI只有你想不到的</p>
        <p>
          <m-button
            @mClick="$router.push('/component')"
            type="success"
            shape="round"
            size="medium"
            :plain="false"
            >这里看看文档吧</m-button
          >
        </p>
      </div>
      <div class="right">
        <template v-for="(item, index) in rHeights" :key="item">
          <div
            :style="[
              { ['--monkeys-delay']: 4 - index },
              { ['--monkeys-height']: item + '%' },
              { ['--color']: rColors[index] }
            ]"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*
 * @Author: bughou
 * @Date: 2022-04-27 17:01:57
 * @Description: 创建一个index组件
 */
// 从下载的组件中导入函数
import { getRandom } from "../../utils";
const name = "index";
const lHeights = getRandom(5, 50).map((item) => item + 50);
const rHeights = getRandom(5, 50).map((item) => item + 50);
const lColors = ["#67c23a", "#909399", "#faaca8", "#3ac5dc", "#f56c6c"];
const rColors = ["#f56c6c", "#3ac5dc", "#faaca8", "#909399", "#67c23a"];
</script>
<style scoped lang="less">
@time: 1s;
@keyframes roundToHeight {
  0% {
    height: 0;
  }
  40% {
    height: calc(var(--monkeys-height) / 10 * 5);
  }
  60% {
    height: calc(var(--monkeys-height) / 10 * 7);
  }
  100% {
    height: var(--monkeys-height);
  }
}
@keyframes topToBottom {
  0% {
    bottom: 50%;
  }
  100% {
    bottom: 0;
  }
}
@keyframes lineMove {
  0% {
    transform: rotate(15deg) translateX(-100%);
  }
  100% {
    transform: rotate(15deg) translateX(0);
  }
}
@keyframes lineMoveCopy {
  0% {
    transform: rotate(-15deg) translateX(100%);
  }
  100% {
    transform: rotate(-15deg) translateX(0);
  }
}
.index {
  overflow: hidden;
  position: relative;
  .top,
  .bottom {
    width: 100%;
    height: 70%;
    position: absolute;
  }
  .top {
    z-index: 100;
    height: 30%;
    .left,
    .right {
      animation: lineMove @time forwards;
      width: 50%;
      height: 1px;
      background: #3ac5dc;
      position: absolute;
      bottom: 0;
      transform-origin: 100% 0;
      transform: rotate(15deg);
      box-shadow: 0px 0px 5px #3ac5dc;
    }
    .right {
      animation: lineMoveCopy @time forwards;
      transform-origin: 0 0;
      transform: rotate(-15deg);
      right: 0;
    }
    .mid {
      animation: topToBottom @time forwards;
      position: absolute;
      left: 50%;
      bottom: 0;
      height: calc(0.06 * 100vw);
      width: 6%;
      transform: translate(-50%, 50%);
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid #3ac5dc;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .bottom {
    display: flex;
    font-size: 0.8rem;
    box-sizing: border-box;
    bottom: 0;
    align-items: center;
    .left,
    .right {
      width: 40%;
      align-items: flex-end;
      display: flex;
      justify-content: space-evenly;
      height: 100%;
      div {
        animation: roundToHeight calc(@time / 2) linear
          calc(var(--monkeys-delay) * 0.2s);
        animation-fill-mode: forwards;
        width: 10%;
        border-radius: 30px 30px 0 0;
        background-color: var(--color);
        box-shadow: 0px 0px 10px 2px var(--color);
      }
    }
    .main {
      flex: 1;
      text-align: center;
      h1 {
        font-size: 2rem;
        letter-spacing: 2px;
        cursor: pointer;
      }
      p {
        margin-top: 5px;
      }
    }
  }
}
</style>
