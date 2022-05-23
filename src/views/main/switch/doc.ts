export const sizeCode = `<m-switch v-model="switchValue" size="mini"></m-switch>
<p></p>
<m-switch v-model="switchValue" size="small"></m-switch>
<p></p>
<m-switch v-model="switchValue" size="medium"></m-switch>
<script lang="ts" setup>
  import { ref, watch } from "vue";
  const switchValue = ref(true);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>`

export const colorCode = `<m-switch
v-model="switchValue1"
checkValue="我选择前者"
unCheckValue="工作，考研"
checkColor="#faaca8"
unCheckColor="#ddd6f3"
></m-switch>
<p></p>
<m-switch
v-model="switchValue2"
checkColor="#aa4b6b"
unCheckColor="#6b6b83"
>
<template #checked> <m-icon name="m-star"></m-icon>一星向前 </template>
<template #unChecked>
  <m-icon name="m-loader"></m-icon>永无循环
</template>
</m-switch>
<script lang="ts" setup>
  import { ref } from "vue";
  const switchValue1 = ref(false);
  const switchValue2 = ref(false);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>`

export const contentCode = `<m-switch
v-model="switchValue1"
checkValue="花若盛开，蝴蝶自来"
unCheckValue="加油，每一天"
></m-switch>
<p></p>
<m-switch v-model="switchValue2">
<template #checked> <m-icon name="m-file"></m-icon>选择文件 </template>
<template #unChecked>
  <m-icon name="m-calendar"></m-icon>选择日历
</template>
</m-switch>
<script setup>
  import { ref } from "vue";
  const switchValue1 = ref(false);
  const switchValue2 = ref(true);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>`

export const disabledCode = `<m-switch
v-model="switchValue"
unCheckValue="凯文杜兰特不相信黑夜将至"
checkValue="因为火把在他手上"
></m-switch>
<p></p>
<m-switch v-model="switchValue" disabled> </m-switch>
<script setup>
import { ref } from "vue";
const switchValue = ref(false);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>`

export const iconCode = `<m-switch
v-model="switchValue1"
checkValue="花若盛开，蝴蝶自来"
unCheckValue="加油，每一天"
checkIconName="m-front"
unCheckIconName="m-after"
></m-switch>
<p></p>
<m-switch
v-model="switchValue2"
checkIconName="m-file"
unCheckIconName="m-calendar"
>
<template #checked> 选择文件 </template>
<template #unChecked> 选择文件 </template>
</m-switch>
<script setup>
  import { ref } from "vue";
  const switchValue1 = ref(false);
  const switchValue2 = ref(true);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>`

export const shapeCode = `<m-switch
v-model="switchValue1"
checkValue="加油 努力"
unCheckValue="做什么"
checkColor="#cd2f4f"
:radius="7"
></m-switch>
<p></p>
<m-switch
v-model="switchValue2"
unCheckValue="梦想总是遥不可及"
:radius="3"
checkValue="我应该去哪里"
>
</m-switch>
<script setup>
  import { ref } from "vue";
  const switchValue1 = ref(false);
  const switchValue2 = ref(false);
</script>
<style lang="less" scoped>
p {
  width: 20px;
  display: inline-block;
}
</style>`
