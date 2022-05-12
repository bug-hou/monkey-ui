export const baseCode = `<p>我什么也没设置</p>
<m-divider> </m-divider>
<p>十分的朴实无华</p>
<m-divider> </m-divider>
<p>当然你可以添加属性让他变的好看</p>`

export const colorCode = `<p>我改变了颜色</p>
<m-divider color="#67c23a"> </m-divider>
<p>我是#67c23a</p>
<m-divider color="rgb(48, 170, 105)"> </m-divider>
<p>当然也可以使用rgb(48, 170, 105)</p>`

export const shapeCode = `<m-divider> 实线 </m-divider>
<br />
<m-divider shape="dashed"> 虚线 </m-divider>
<br />
<m-divider shape="dotted"> 点线 </m-divider>`

export const titlePlacementCode = `<m-divider titlePlacement="center"> 中间 </m-divider>
<br />
<m-divider titlePlacement="right"> 右边 </m-divider>
<br />
<m-divider titlePlacement="left"> 左边 </m-divider>`

export const verticalCode = `<div class="vertical">
  <p>横向显示</p>
  <m-divider vertical> </m-divider>
  <p>还是挺好看的</p>
  <m-divider vertical> </m-divider>
  <p>你也可以设置颜色</p>
</div>
<style scoped lang="less">
.vertical {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-evenly;
}
</style>`

export const widthCode = `<p>我是5px</p>
<m-divider color="#67c23a" width="3px"> </m-divider>
<p>我是#67c23a</p>
<m-divider color="rgb(48, 170, 105)" width="3px">我是3px </m-divider>
<p>当然也可以使用rgb(48, 170, 105)</p>`
