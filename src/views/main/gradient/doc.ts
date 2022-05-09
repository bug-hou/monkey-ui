export const colorCode = `<div class="color">
  <m-gradient>我就使用默认的属性吧</m-gradient>

  <m-gradient :colors="['#1f4037 0%', '#5aa978 50%', '#99f2c8 100%']"
    >我还是来自定义的案例</m-gradient
  >
  <m-gradient :colors="['#000 0%', '#000 50%', '#0ff 50%', '#0ff 100%']"
    >我是一个字符串</m-gradient
  >
</div>
<style scoped>
.color {
  font-weight: bold;
  display: flex;
  justify-content: space-around;
}
</style>
`
export const degCode = `<div class="deg">
<m-gradient deg="to left">我的方向是右边</m-gradient>

<m-gradient
  deg="0deg"
  :colors="['#1f4037 0%', '#5aa978 50%', '#99f2c8 100%']"
  >我应该是从上到下</m-gradient
>
<m-gradient
  deg="135deg"
  :colors="['#000 0%', '#000 50%', '#0ff 50%', '#0ff 100%']"
  >我喜欢斜着走</m-gradient
>
</div>
<style scoped>
.deg {
  font-weight: bold;
  display: flex;
  justify-content: space-around;
}
</style>
`
