<template>
    <div class='al'>
        <el-row :gutter="10">
            <el-col :span='2'>
                <div class='leftContent'> 
                    <div v-for='item in boxList' :key='item.name' class='box' draggable="true" @dragstart.stop="drag(item)">
                        <img :src="require('@/assets/image/'+item.src+'.png')" alt="" />
                        <span>{{item.name}}</span>
                    </div>
                    <div class='box' style='cursor:pointer;height:30px;line-height:30px' :class='activeBtn==0?"active":""' @click='activeBtn=0;isconnect=true'>
                        <span>连线</span>
                    </div>
                    <div class='box' style='cursor:pointer;height:30px;line-height:30px'  :class='activeBtn==1?"active":""' @click='activeBtn=1;isconnect=false'>
                        <span>选择</span>
                    </div>
                </div>
            </el-col>
            <el-col :span='22'>
                <div class='rightContent' id='diagramContainer' @drop="drop($event)"  @dragover="allowDrop($event)">
                    <el-button class='save' @click='saveFunc' type='primary' size='mini'>保存</el-button>
                    <div v-for='item in chooseBox' :key='item.id' class='rightBox' :style='item.style' :id='item.id' @mouseup="move($event,item)"> 
                        <img :src="require('@/assets/image/'+item.src+'.png')" alt="" />
                        <p>{{item.label}}</p>
                        <span class='closeBtn' @click='delNode(item)'>
                            <i class='iconfont iconguanbi'></i>
                        </span>
                        <div v-show="isconnect" class="flow-node-drag"></div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            boxList:[
                {src:'pc',name:'box1'},
                {src:'firewar',name:'box2'}
            ],
            currentBox:'',
            chooseBox:[],
            jsplumbSourceOptions: {
                filter: '.flow-node-drag',
                filterExclude:false,
                anchor:'Continuous',
                allowLoopback:false
            },
            jsplumbTargetOptions: {
                filter: '.flow-node-drag',
                filterExclude:false,
                anchor:'Continuous',
                allowLoopback: false
            },
            jsPlumb:null,
            isconnect:false,
            activeBtn:1
        }
    },
    mounted(){
        let me=this;
        this.jsPlumb = jsPlumb.getInstance({
            PaintStyle: {stroke:'#4cc2ff', strokeWidth: 2 },
            Connector: ["Flowchart",{curviness:70}]
        })
        this.jsPlumb.setContainer('diagramContainer');
        this.jsPlumb.bind('click', function (conn, originalEvent) {
          if (window.confirm('确定删除所点击的连线吗？')) {
            me.jsPlumb.deleteConnection(conn)
          }
        })
    },
    methods:{
        saveFunc(){
            let me=this;
            let lines = this.jsPlumb.getAllConnections()
            console.log(lines);
        },
        drag(item){
            let me=this;
            me.currentBox=item;
        },
        getUUID() {
            var s = []
            var hexDigits = '0123456789abcdef'
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
            }
            s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-'
            var uuid = s.join('')
            return uuid
        },
        drop(event) {
            let me=this;
            event.stopPropagation();
            let temp = {}
            temp = {
                id: this.getUUID(),
                label: this.currentBox.name,
                top: event.offsetY + 'px',
                left: event.offsetX + 'px',
                src:me.currentBox.src
            }
            temp.style={top: event.offsetY + 'px',left: event.offsetX + 'px'}
            this.addNode(temp)
        },
        addNode(temp){
            let me=this;
            me.chooseBox.push(temp)
            this.$nextTick(function () {
                me.jsPlumb.makeSource(temp.id,me.jsplumbSourceOptions);
                me.jsPlumb.makeTarget(temp.id,me.jsplumbTargetOptions);
                me.jsPlumb.draggable(temp.id,{
                    containment: 'parent',
                    grid: [10, 10]
                })
            })
        },
        delNode(arg) {
            let me=this;
            if (window.confirm('确定删除该节点吗？')) {
                me.chooseBox.forEach((item, index) => {
                    if (item.id === arg.id) {
                       me.chooseBox.splice(index, 1);
                    }
                })
                me.$nextTick(function () {
                    me.jsPlumb.removeAllEndpoints(arg.id)
                })
            }
        },
        allowDrop(ev){
            ev.preventDefault();
        },
        move(ev,item){
            let me=this;
            for (var i = 0; i < this.chooseBox.length; i++) {
                let node = this.chooseBox[i]
                if (item.id === node.id) {
                    node.left = ev.clientX;
                    node.top = ev.clientY;
                    node.style.left = ev.clientX
                    node.style.top = ev.clientY
                }
            }
        }
    }
}
</script>
<style lang="scss">
    .al {
        background:url('../../assets/bg.png') no-repeat;
        background-size: 100%;
        .box {
            width:100%;
            height:70px;
            margin:20px auto;
            box-shadow: 0 0 4px #ffffff;
            color: #fff;
            cursor: move;
            text-align: center;
            img {
                width:70%;
                height:70%;
            }
        }
        .rightContent,.leftContent {
            width:98%;
            height:calc(100vh - 80px);
            margin:10px;
            margin-left:0px;
            box-sizing: border-box;
            color:#fff;
            border: 1px solid #4cc2ff;
            border-radius: 5px;
            position: relative;
        }
        .leftContent {
            width:100%;
            margin-right:5px;
            padding:10px ;
        }
        .rightBox {
            position: absolute;
            width:80px;
            height: 80px;
            border-radius: 5px;
            border: 1px solid #4cc2ff;
            text-align: center;
            cursor: move;
            img {
                width:50%;
                height:50%;
                margin:5% auto;
            }
            .closeBtn {
                position: absolute;
                top:-15%;
                right:-15%;
                display: inline-block;
                width:20px;
                height:20px;
                background: transparent;
                border:3px solid #fff;
                color:#fff;
                font-size:17px;
                text-align: center;
                line-height: 20px;
                border-radius:50%;
                cursor: pointer;
            }
        }
        .flow-node-drag {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: crosshair;
        }
        .active {
            background: #4cc2ff;
        }
        .save {
            position: absolute;
            right:2%;
            top:2%;
        }
    }
</style>