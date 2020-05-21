<template>
    <div>
        <el-button @click="showDrawer" type="primary" class='showBtn' :style='sty'>
            <i class='iconfont iconshezhi' v-if='!drawer'></i>
            <i class='iconfont iconguanbi' v-else></i>
        </el-button>
        <el-drawer  :visible.sync="drawer" direction="rtl" style='position:absolute' @close='onClose'>
            <span class='drawTitle'>设置</span>
            <div style='margin:0 auto;width:100%;'>
                <el-form ref="form" label-width="80px">
                    <el-form-item label="选择主题">
                        <el-select v-model="value" placeholder="请选择" @change='changeColor'>
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            drawer:false,
            sty:{right:0},
            options:[
                {label:'红色',value:"red-theme"},
                {label:'蓝色',value:'default-theme'}
            ],
            value:'default-theme'
        }
    },
    methods:{
        showDrawer:function(){
            let me=this;
            me.drawer = !me.drawer;
            me.value=sessionStorage.getItem('theme');
            me.sty.right=me.drawer?'30%':'0'
        },
        onClose:function(){
            let me=this;
            me.sty.right='0'
        },
        changeColor:function(){
            let me=this;
            this.resetSetItem('theme',me.value);
        },
    }
}
</script>
<style lang="scss">
    @import "../../assets/css/theme.scss";
    .showBtn {
        position:absolute;
        top:50%;
        transform :translateY(-50%);
        z-index:100000;
        transition: right .3s;
        padding:10px!important;
        i {
            font-size:20px;
        }
    }
    .drawTitle {
        position: absolute;
        top: 4%;
        left: 5%;
        font-weight: 700;
        color: #666;
        font-size: 17px;
    }
</style>
