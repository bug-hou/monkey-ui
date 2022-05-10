<template>
  <cpn-play-vue
    title="circle"
    description="可以设置为圆形circle为true就可以"
    code='<m-back-top circle :right="50" :offset="600">
      <m-icon name="icon-huidaodingbu"></m-icon>
    </m-back-top>'
  >
    <m-back-top circle :right="250" :offset="600">
      <m-icon name="icon-huidaodingbu"></m-icon>
    </m-back-top>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus,
    corporis! Laudantium, corrupti. Sit sunt optio rerum saepe ipsum obcaecati,
    nobis excepturi, eligendi esse animi officia nihil error eveniet expedita
    incidunt consectetur illo, repellendus eum. Magnam maiores et recusandae
    sequi veniam autem, corrupti aut adipisci qui sit aperiam, accusamus
    veritatis, repudiandae officia. Aut, beatae! Doloremque fugiat expedita
    magnam quaerat ab. Accusamus laborum porro excepturi quisquam et maiores
    vitae consequatur totam dolore fugiat consequuntur officiis, odit aut cum
    assumenda consectetur sunt animi deleniti necessitatibus. Exercitationem ea,
    unde iste rem fugiat accusantium ducimus nostrum sunt consequatur, excepturi
    dolore facere eaque, qui praesentium provident!
  </cpn-play-vue>
</template>

<script lang="ts" setup name="circle">
/*
 * @Author: bughou
 * @Date: 2022-05-10 17:44:27
 * @Description: 创建一个circle组件
 */
// 从下载的组件中导入函数
import cpnPlayVue from "../../../../components/cpnPlay/cpnPlay.vue";
</script>
