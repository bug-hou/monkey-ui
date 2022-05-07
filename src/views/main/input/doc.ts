export const sizeCode = `<m-input
v-model="a"
placeholder="我可能是最小的"
size="mini"
index="1"
></m-input>
<br>
<m-input
v-model="a"
placeholder="我就中等大小和平时使用的差不多"
size="small"
index="5"
></m-input>
<br>
<m-input
v-model="a"
placeholder="我是超大杯哦pro哦"
size="medium"
index="3"
></m-input>
<script setup>
import {ref} from "vue"
const a = ref('');
</script>
`
