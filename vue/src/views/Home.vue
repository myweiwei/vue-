<template>
  <div class='home'>
    <el-row justify="center">
        <el-col :span='3'>
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="rgb(191, 203, 217)"
            router
            unique-opened
            active-text-color="rgb(64, 158, 255)"
            :default-active="$route.path"
            @open="handleOpen"
            @close="handleClose">
                <template v-for="(item,index) in $router.options.routes" v-key='item.path'> 
                    <el-submenu :index="index+''" v-if="!item.leaf">
                        <template slot="title"><i :class="'iconfont '+item.icon"></i>{{item.name}}</template>
                        <el-menu-item  v-for='(child,index) in item.children' :index='child.path' :key='index'>
                            <template slot="title">
                                <span>{{child.name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item :index='item.children[0].path' v-if="item.leaf">
                        <template slot="title">
                            <i :class="'iconfont '+item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-col>
        <el-col :span='21'>
            <router-view></router-view>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {
        navTitle:""
    }
  },
  mounted(){
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    }
  },
  watch: {
  },
}
</script>

<style lang='scss'>
    .el-submenu .el-menu-item {
        min-width: 150px;
    }
    .home {
        height:100%;
        .el-row {
            height:100%;
            .el-col,.el-menu {
                height:100%;
            }
        }
    }
    .el-menu-item i,.el-submenu__title i {
        margin-right:10px;
    }
</style>
