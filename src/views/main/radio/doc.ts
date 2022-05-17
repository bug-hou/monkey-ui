export const sizeCode = `<m-radio-group name="mini" v-model="checks1" size="mini">
<m-radio value="m1">腾讯</m-radio>
<m-radio value="m2">字节</m-radio>
<m-radio value="m3">阿里</m-radio>
<m-radio value="m4">百度</m-radio>
</m-radio-group>
<br />
<m-radio-group name="small" v-model="checks2" size="small">
<m-radio value="draw">QQ炫舞</m-radio>
<m-radio value="lol">英雄联盟</m-radio>
<m-radio value="cf">穿越火线</m-radio>
<m-radio value="dnf">地下城勇士</m-radio>
</m-radio-group>
<br />
<m-radio-group name="medium" v-model="checks3" size="medium">
<m-radio value="dou">斗鱼</m-radio>
<m-radio value="mao">熊猫</m-radio>
<m-radio value="ya">虎牙</m-radio>
<m-radio value="zhan">B站</m-radio>
</m-radio-group>
<script>
import { ref } from "vue";
const checks1 = ref("m1");
const checks2 = ref("lol");
const checks3 = ref("ya");
</script>
`;

export const disabledCode = `<m-radio-group name="disabled1" v-model="checks1">
<m-radio value="m1">腾讯</m-radio>
<m-radio value="m2" disabled>字节</m-radio>
<m-radio value="m3">阿里</m-radio>
<m-radio value="m4" disabled>百度</m-radio>
</m-radio-group>
<br />
<m-radio-group name="disabled2" v-model="checks2">
<m-radio disabled value="draw">QQ炫舞</m-radio>
<m-radio value="lol">英雄联盟</m-radio>
<m-radio disabled value="cf">穿越火线</m-radio>
<m-radio value="dnf">地下城勇士</m-radio>
</m-radio-group>
<br />
<m-radio-group name="disabled3" v-model="checks3">
<m-radio disabled value="dou">斗鱼</m-radio>
<m-radio disabled value="mao">熊猫</m-radio>
<m-radio disabled value="ya">虎牙</m-radio>
<m-radio disabled value="zhan">B站</m-radio>
</m-radio-group>
<script setup>
import { ref } from "vue";
const checks1 = ref("");
const checks2 = ref("");
const checks3 = ref("");
</script>
`

export const buttonCode = `<m-radio-group name="buttonmini" v-model="checks1" button>
<m-radio value="m1">腾讯</m-radio>
<m-radio value="m2">字节</m-radio>
<m-radio value="m3">阿里</m-radio>
<m-radio value="m4">百度</m-radio>
</m-radio-group>
<br />
<m-radio-group name="buttonsmall" v-model="checks2" button>
<m-radio disabled value="draw">QQ炫舞</m-radio>
<m-radio value="lol">英雄联盟</m-radio>
<m-radio disabled value="cf">穿越火线</m-radio>
<m-radio value="dnf">地下城勇士</m-radio>
</m-radio-group>
<br />
<m-radio-group name="buttonmedium" v-model="checks3" button>
<m-radio value="dou">斗鱼</m-radio>
<m-radio value="mao">熊猫</m-radio>
<m-radio value="ya">虎牙</m-radio>
<m-radio value="zhan">B站</m-radio>
</m-radio-group>
<script setup>
import { ref } from "vue";
const checks1 = ref("");
const checks2 = ref("");
const checks3 = ref("");
</script>`
