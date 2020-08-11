// 基础的使用
<template>
  <div id="labelManage">
    <div id="diagramContainer">
      <div class='item' v-for='item in nodeList' :key='item.id' :style='item.style' :id='item.id' @dblclick="delNode(item.id)"></div>
      <div class='item' id='A' style='left:350px'></div>
      <div class='item' id='B' style='left:450px'></div>
    </div>
  </div>
</template>
<script>
  export default {
      data(){
        return {
          nodeList:[
            {id:'one',style:{}},
            {id:'two',style:{left:'150px'}},
            {id:'three',style:{left:'250px'}},
          ]
        }
      },
      methods:{
        delNode:function(id){
          let me=this;
          jsPlumb.remove(id)
        },
        zoom (scale) {
            document.getElementById("diagramContainer").style.transform=`scale(${scale})`
            jsPlumb.setZoom(0.75);
        }
      },
      mounted(){
        let me=this;
        jsPlumb.setContainer('diagramContainer');
        jsPlumb.ready(function () {
          //设置连接默认值
          var common = {
            // endpoint: 'Rectangle',
            // connector: ['Flowchart'],
            anchor: ['Bottom'],
            isSource: true,
            isTarget: true,
            connector: 'Flowchart',
            maxConnections: -1
            //endpoint: 'Dot',
            // paintStyle: {
            //   fill: 'white',
            //   outlineStroke: 'blue',
            //   strokeWidth: 3
            // },
            // hoverPaintStyle: {
            //   outlineStroke: 'lightblue'
            // },
            // connectorStyle: {
            //   outlineStroke: 'green',
            //   strokeWidth: 1
            // },
            // connectorHoverStyle: {
            //   strokeWidth: 2
            // }
          }
          for(let i=0;i<me.nodeList.length;i++){
              jsPlumb.addEndpoint(me.nodeList[i].id, {
                anchors: ['Bottom'],
                uuid: me.nodeList[i].id
              },common);
              jsPlumb.draggable(me.nodeList[i].id,{
                containment: 'parent',
                grid: [10, 10]
              }) 
          }
          setTimeout(function () {
            jsPlumb.connect({ uuids: ['one', 'two'] })
          }, 3000)
           jsPlumb.makeSource('A', {
            endpoint:"Dot",
            anchor: "Continuous"
          })

          jsPlumb.makeTarget('B', {
            endpoint:"Dot",
            anchor: "Continuous"
          })

          jsPlumb.draggable('A')
          jsPlumb.draggable('B')
          //缩放
          // var baseZoom = 1
          // setInterval(() => {
          //   baseZoom -= 0.1
          //   if (baseZoom < 0.5) {
          //     baseZoom = 1
          //   }
          //   me.zoom(baseZoom)
          // }, 1000)
        //   jsPlumb.connect({
        //     source: 'item_left',
        //     target: 'item_right',
        //     paintStyle: { stroke: 'lightgray', strokeWidth: 3 },
        //     endpointStyle: { fill: 'lightgray', outlineStroke: 'lightgray', outlineWidth:0 },
        //     //箭头
        //     overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]
        //   },common)
        //   // jsPlumb.importDefaults({
        //   //   ConnectionsDetachable: false
        //   // })
      })
        jsPlumb.bind('click', function (conn, originalEvent) {
          if (window.prompt('确定删除所点击的链接吗？')) {
            jsPlumb.deleteConnection(conn)
          }
        })
        // jsPlumb.draggable('item_left',{
        //   containment: 'parent',
        //   grid: [10, 10]
        // })
        // jsPlumb.draggable('item_right')
      }
  }
</script>

<style scoped lang="scss">
  #diagramContainer {
    padding: 20px; 
    width: 80%;
    height: 400px;
    border: 1px solid gray;
    position: relative;
    .item{
      position: absolute;
      height: 80px;
      width: 80px;
      border: 1px solid blue;
      cursor: pointer;
    }
  }
</style>

