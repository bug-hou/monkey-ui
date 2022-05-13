export const baseCode = `<m-collapse class="collapse">
<m-collapse-item title="昨天">
  <div class="item">
    <p>
      昨天已成往事，幻想昨天已经没有可能，唯一可以改变的就是做好当前，加油，为了大厂梦加油
    </p>
    <p>—— bughou</p>
  </div>
</m-collapse-item>
<m-collapse-item title="今天">
  <div class="item">
    <p>今天的目标比昨天的知识储备多点就可以了</p>
    <p>—— bughou</p>
  </div>
</m-collapse-item>
<m-collapse-item title="明天">
  <div class="item">
    <p>做好今天，放眼未来，加油</p>
    <p>—— bughou</p>
  </div>
</m-collapse-item>
</m-collapse>
<style scoped lang="less">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p:first-child {
    width: 70%;
  }
}
</style>
`;

export const titleCode = `<m-collapse class="collapse" title="目标">
<m-collapse-item title="毕业">
  <div class="item">学习前端的初级部分，自己封装一些小轮子</div>
</m-collapse-item>
<m-collapse-item title="毕业前三年">
  <div class="item">
    成为高级前端工程师，完全掌握node，可以对前端项目进行构架
  </div>
</m-collapse-item>
<m-collapse-item title="毕业前五年">
  <div class="item">希望能够前端方向有一定的贡献</div>
</m-collapse-item>
</m-collapse>
<style scoped lang="less">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p:first-child {
    width: 70%;
  }
}
</style>`

export const extensionCode = `<m-collapse class="collapse">
<template #title>
  <div class="title">
    <div>
      <img src="@/assets/M logo.png" alt="" />
      monkeysUI
    </div>
    <p>卷王之王</p>
  </div>
</template>
<m-collapse-item title="前端" extension>
  <div class="item">
    <p>
      前端开发是创建WEB页面或APP等前端界面呈现给用户的过程，通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互
    </p>
    <p>
      前端开发从网页制作演变而来，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web1.0时代的产物，早期网站主要内容都是静态，以图片和文字为主，用户使用网站的行为也以浏览为主。随着互联网技术的发展和HTML5、CSS3的应用，现代网页更加美观，交互效果显著，功能更加强大。
    </p>
    <p>
      前端开发跟随移动互联网发展带来了大量高性能的移动终端设备应用。HTML5，Node.js的广泛应用，各类UI框架，JS类库层出不穷，开发难度也在逐步提升。
    </p>
  </div>
</m-collapse-item>
<m-collapse-item title="后端">
  <div class="item">
    <p>
      后端是在后台工作的，控制着前端的内容，主要负责程序设计架构思想，管理数据库等。后端更多的是与数据库进行交互以处理相应的业务逻辑，需要考虑的是如何实现功能、数据的存取、平台的稳定性与性能等，涉及动态语言如PHP、ASP、JSP等。
    </p>
    <p>
      后台开发就是来解决这样的需求的。为了让各个服务器同时并行工作，他们研究分布式算法，把大任务拆成小任务，分布给各个服务器单独运算。为了提高数据库的存取速度，他们研究非关系型数据库，也就是NoSQL，把它们用在社交、O2O应用的后台。为了解决硬盘速度远远跟不上内存速度的问题，他们研究缓存技术，简单来说就是数据从硬盘里取出来就不放回去了，这样下次还用就不用再去硬盘取了。当然，也有一些后台开发专注于业务逻辑，前端想请求什么样的数据，大家坐在一起商量一个协议，他们负责写个接口，前端来调用就是了。
    </p>
  </div>
</m-collapse-item>
<m-collapse-item title="架构师">
  <div class="item">
    <p>
      系统架构师（System
      Architect，简称SA或SAr），是在信息系统研发中，负责依据需求来确定主要的技术选择、设计系统的主体框架结构，并负责搭建实施的人。[1]
      他们（与系统分析师共同）确立系统的主体架构和实现方向，并负责指导软件工程师等开发人员的编码开发工作。
      由于硬件通用化，系统架构师多指软件和通信网络系统的架构师，但在IC芯片设计等硬件研发领域仍是不可或缺的角色。
      系统架构师，也是中国工业和信息化部“计算机技术与软件专业资格水平”认证中，对开发实施技术人员的最高一级认证（2003年从原系统分析员中分设出来），是一种高级职称，由初级程序员、程序员、软件设计师逐次上升而来。
    </p>
  </div>
</m-collapse-item>
</m-collapse>
<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  div {
    display: flex;
  }
  img {
    height: 40px;
    margin-right: 20px;
  }
}
.item {
  p {
    text-indent: 2em;
  }
}
</style>`

export const accordionCode = `<m-collapse class="collapse" accordion>
<template #title>
  <div class="title">
    <div>
      <img src="@/assets/M logo.png" alt="" />
      monkeysUI
    </div>
    <p>卷王之王</p>
  </div>
</template>
<m-collapse-item title="前端">
  <div class="item">
    <p>
      前端开发是创建WEB页面或APP等前端界面呈现给用户的过程，通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，
      来实现互联网产品的用户界面交互
    </p>
    <p>
      前端开发从网页制作演变而来，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web1.0时代的产物，早期网站主要内
      容都是静态，以图片和文字为主，用户使用网站的行为也以浏览为主。随着互联网技术的发展和HTML5、CSS3的应用，现代网页更加美观，
      交互效果显著，功能更加强大。
    </p>
    <p>
      前端开发跟随移动互联网发展带来了大量高性能的移动终端设备应用。HTML5
      ，Node.js的广泛应用，各类UI框架，JS类库层出不穷，开发难度也在逐步提升。
    </p>
  </div>
</m-collapse-item>
<m-collapse-item title="后端">
  <div class="item">
    <p>
      后端是在后台工作的，控制着前端的内容，主要负责程序设计架构思想，管理数据库等。
      后端更多的是与数据库进行交互以处理相应的业务逻辑，需要考虑的是如何实现功能、数据的存取、平
      台的稳定性与性能等，涉及动态语言如PHP、ASP、JSP等。
    </p>
    <p>
      后台开发就是来解决这样的需求的。为了让各个服务器同时并行工作，他们研究分布式算法，把大任务
      拆成小任务，分布给各个服务器单独运算。为了提高数据库的存取速度，他们研究非关系型数据库，
      也就是NoSQL，把它们用在社交、O2O应用的后台。为了解决硬盘速度远远跟不上内存速度的问题，他们
      研究缓存技术，简单来说就是数据从硬盘里取出来就不放回去了，这样下次还用就不用再去硬盘取了。
      当然，也有一些后台开发专注于业务逻辑，前端想请求什么样的数据，大家坐在一起商量一个协议，
      他们负责写个接口，前端来调用就是了。
    </p>
  </div>
</m-collapse-item>
<m-collapse-item title="架构师">
  <div class="item">
    <p>
      系统架构师（System
      Architect，简称SA或SAr），是在信息系统研发中，负责依据需求来确定主要的技术选择、设计系统的主体框架结构，并负责搭建实施的人。[1]
      他们（与系统分析师共同）确立系统的主体架构和实现方向，并负责指导软件工程师等开发人员的编码开发工作。
      由于硬件通用化，系统架构师多指软件和通信网络系统的架构师，但在IC芯片设计等硬件研发领域仍是不可或缺的角色。
      系统架构师，也是中国工业和信息化部“计算机技术与软件专业资格水平”认证中，对开发实施技术人员的最高一级认证（2003年从原系统分析员中分设出来），是一种高级职称，由初级程序员、程序员、软件设计师逐次上升而来。
    </p>
  </div>
</m-collapse-item>
</m-collapse>
<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  div {
    display: flex;
  }
  img {
    height: 40px;
    margin-right: 20px;
  }
}
.item {
  p {
    text-indent: 2em;
  }
}
</style>`
