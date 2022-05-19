export const sizeCode = `<m-check-box-group name="mini" v-model="checks1" size="mini">
  <m-check-box value="m1">腾讯</m-check-box>
  <m-check-box value="m2">字节</m-check-box>
  <m-check-box value="m3">阿里</m-check-box>
  <m-check-box value="m4">百度</m-check-box>
  </m-check-box-group>
  <br />
  <m-check-box-group name="small" v-model="checks2" size="small">
  <m-check-box value="draw">QQ炫舞</m-check-box>
  <m-check-box value="lol">英雄联盟</m-check-box>
  <m-check-box value="cf">穿越火线</m-check-box>
  <m-check-box value="dnf">地下城勇士</m-check-box>
  </m-check-box-group>
  <br />
  <m-check-box-group name="medium" v-model="checks3" size="medium">
  <m-check-box value="dou">斗鱼</m-check-box>
  <m-check-box value="mao">熊猫</m-check-box>
  <m-check-box value="ya">虎牙</m-check-box>
  <m-check-box value="zhan">B站</m-check-box>
</m-check-box-group>
<script setup>
  import { ref } from "vue";
  const checks1 = ref(["m1", "m4"]);
  const checks2 = ref(["lol", "dnf"]);
  const checks3 = ref(["ya", "zhan"]);
</script>`;

export const buttonCode = `<m-check-box-group name="mini" v-model="checks1" button>
  <m-check-box value="m1">腾讯</m-check-box>
  <m-check-box value="m2">字节</m-check-box>
  <m-check-box value="m3">阿里</m-check-box>
  <m-check-box value="m4">百度</m-check-box>
  </m-check-box-group>
  <br />
  <m-check-box-group name="small" v-model="checks2" button>
  <m-check-box disabled value="draw">QQ炫舞</m-check-box>
  <m-check-box value="lol">英雄联盟</m-check-box>
  <m-check-box disabled value="cf">穿越火线</m-check-box>
  <m-check-box value="dnf">地下城勇士</m-check-box>
  </m-check-box-group>
  <br />
  <m-check-box-group name="medium" v-model="checks3" button>
  <m-check-box value="dou">斗鱼</m-check-box>
  <m-check-box value="mao">熊猫</m-check-box>
  <m-check-box value="ya">虎牙</m-check-box>
  <m-check-box value="zhan">B站</m-check-box>
</m-check-box-group>
<script seutp>
  import { ref } from "vue";
  const checks1 = ref(["m1", "m4"]);
  const checks2 = ref(["lol", "dnf"]);
  const checks3 = ref(["ya", "zhan"]);
</script>`

export const disabledCode = `<m-check-box-group name="mini" v-model="checks1">
  <m-check-box value="m1">腾讯</m-check-box>
  <m-check-box value="m2" disabled>字节</m-check-box>
  <m-check-box value="m3">阿里</m-check-box>
  <m-check-box value="m4" disabled>百度</m-check-box>
  </m-check-box-group>
  <br />
  <m-check-box-group name="small" v-model="checks2">
  <m-check-box disabled value="draw">QQ炫舞</m-check-box>
  <m-check-box value="lol">英雄联盟</m-check-box>
  <m-check-box disabled value="cf">穿越火线</m-check-box>
  <m-check-box value="dnf">地下城勇士</m-check-box>
  </m-check-box-group>
  <br />
  <m-check-box-group name="medium" v-model="checks3">
  <m-check-box disabled value="dou">斗鱼</m-check-box>
  <m-check-box disabled value="mao">熊猫</m-check-box>
  <m-check-box disabled value="ya">虎牙</m-check-box>
  <m-check-box disabled value="zhan">B站</m-check-box>
</m-check-box-group>
<script setup>
  import { ref } from "vue";
  const checks1 = ref(["m1", "m4"]);
  const checks2 = ref(["lol", "dnf"]);
  const checks3 = ref(["ya", "zhan"]);
</script>`;

export const maxCode = `<m-check-box-group name="mini" v-model="checks1" button :max="3">
  <m-check-box value="腾讯">腾讯</m-check-box>
  <m-check-box value="字节">字节</m-check-box>
  <m-check-box value="阿里">阿里</m-check-box>
  <m-check-box value="百度">百度</m-check-box>
  <m-check-box value="米哈游">米哈游</m-check-box>
</m-check-box-group>
<m-card type="hover" class="card">最多只能添加3个</m-card>
<m-card type="hover" class="card">当前选择:{{ checks1.join("-") }}</m-card>
<m-check-box-group name="mini" v-model="checks2" button>
  <m-check-box value="王者荣耀">王者荣耀</m-check-box>
  <m-check-box value="英雄联盟">英雄联盟</m-check-box>
  <m-check-box value="和平精英">和平精英</m-check-box>
  <m-check-box value="元神">元神</m-check-box>
  <m-check-box value="CSGO">CSGO</m-check-box>
</m-check-box-group>
<m-card type="hover" class="card">可以添加无穷多个</m-card>
<m-card type="hover" class="card">当前选择:{{ checks2.join("-") }}</m-card>
<script setup>
import { ref } from "vue";
const checks1 = ref([]);
const checks2 = ref([]);
</script>
<style scoped lang="less">
.max {
  .card:nth-child(2),
  .card:nth-child(5) {
    width: 200px;
  }
}
.card {
  margin: 10px 0;
}
</style>`
