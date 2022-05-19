export const sizeCode = `<m-select
  :options="options"
  size="mini"
  v-model="selectValue1"
  placeholder="我是mini很小"
  ></m-select>
  <br />
  <m-select
  :options="options"
  size="small"
  v-model="selectValue2"
  placeholder="我是默认大小"
  ></m-select>
  <br />
  <m-select
  :options="options"
  size="medium"
  v-model="selectValue2"
  placeholder="我是大号"
></m-select>
<script setup>
  import { ref } from "vue";
  const options = ["腾讯", "字节", "斗鱼", "北盛", "京东", "阿里", "B站"];
  const selectValue1 = ref<string[]>([]);
  const selectValue2 = ref<string[]>([]);
  const selectValue3 = ref<string[]>([]);
</script>`;

export const moreCode = `<m-select
  :options="options"
  v-model="selectValue"
  more
  @loading="loadingHandle"
></m-select>
<script setup>
  import { reactive, ref } from "vue";
  const options = reactive([
    "京东",
    "阿里",
    "腾讯",
    "字节",
    "北森",
    "百度",
    "苹果",
    "小米",
    "oppo",
    "华为",
    "易方达",
    "茅台"
  ]);
  const selectValue = ref<string[]>([]);

  function loadingHandle() {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        options.push(options[Math.floor(Math.random() * options.length)]);
      }
    }, 1000);
  }
</script>`;

export const disabledCode = `<m-card>
  当前你的选择:{{
    selectValue.length === 0 ? "未选择" : selectValue.join(",")
  }}
  </m-card>
  <br />
  <m-select
  :options="options"
  size="small"
  v-model="selectValue"
  placeholder="我禁用了Java和go语言"
  multiple
  ></m-select>
  <br />
  <m-select
  :options="options"
  size="small"
  v-model="selectValue"
  placeholder="disabled为true"
  multiple
  disabled
></m-select>
<script setup>
import { ref } from "vue";
const options = [
  {
    label: "java",
    value: "java",
    disabled: true
  },
  {
    label: "js",
    value: "js"
  },
  {
    label: "php",
    value: "php"
  },
  {
    label: "go",
    value: "go",
    disabled: true
  },
  {
    label: "python",
    value: "python"
  },
  {
    label: "dart",
    value: "dart"
  },
  {
    label: "swift",
    value: "swift"
  }
];
const selectValue = ref<string[]>([]);
</script>`;

export const multipleCode = `<m-card>
  当前你的选择:{{
    selectValue.length === 0 ? "未选择" : selectValue.join(",")
  }}
  </m-card>
  <br />
  <m-select
  :options="options"
  size="small"
  v-model="selectValue"
  placeholder="multiple为true"
  multiple
></m-select>
<script setup>
  import { ref } from "vue";
  const options = ["腾讯", "字节", "斗鱼", "北盛", "京东", "阿里", "B站"];
  const selectValue = ref<string[]>([]);
</script>`
