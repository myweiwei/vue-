<template>
    <div class='dialogDrag'>
        <el-button type="primary" @click='dialogVisible=true' size='medium' class='btn'>打开弹框</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" v-dialogDrag>
            <div slot="title" class="header-title">
                <span class="title-name">
                    <i class='iconfont iconapplications'></i>
                    自定义标题
                </span>
            </div>
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size='mini'>取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size='mini'>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            dialogVisible:false
        }
    }
}
</script>
<style lang="scss">
    .dialogDrag {
        .btn {
            margin:20px;
        }
    }
</style>