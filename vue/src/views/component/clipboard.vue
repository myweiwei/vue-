<template>
    <div>
        <div style="margin: 15px;width:40%;">
            <el-input id="foo" placeholder="请输入内容" v-model="ipt">
                <el-tooltip class="item" effect="dark" content="点我复制哦" placement="top" slot="append">
                    <el-button  class="btn" data-clipboard-target="#foo">
                        <i class='iconfont iconfuzhi'></i>
                    </el-button>
                </el-tooltip>
            </el-input>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard'
export default {
    data(){
        return {
            ipt:'https://github.com/myweiwei/vue-'
        }
    },
    mounted(){
        var clipboard = new Clipboard('.btn');
        let me=this;
        clipboard.on('success', function(e) {
            me.$message({
                message: '复制成功',
                type: 'success'
            });
            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            me.$message({
                message: '复制失败',
                type: 'success'
            });
        });
    }
}
</script>