<template>
  <div class='home flexStartBox'>
    <el-menu
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    background-color="rgb(48, 65, 86)"
    text-color="rgb(191, 203, 217)"
    router
    unique-opened
    collapse-transition
    active-text-color="rgb(64, 158, 255)"
    :default-active="$route.path"
    @open="handleOpen"
    @close="handleClose">
        <template v-for="(item,index) in $router.options.routes" v-key='item.path'> 
            <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title">
                    <i :class="'iconfont '+item.icon"></i>
                    <span>{{item.name}}</span>
                    </template>
                <el-menu-item-group>
                    <el-menu-item  v-for='(child,index) in item.children' :index='child.path' :key='index'>
                        <template slot="title">
                            <span>{{child.name}}</span>
                        </template>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index='item.children[0].path' v-if="item.leaf">
                <i :class="'iconfont '+item.icon"></i>
                <span>{{item.name}}</span>
            </el-menu-item>
        </template>
    </el-menu>
    <div style='flex:1;height:100%'>
        <div class="navBar">
            <i class='iconfont icondaohangshouqi- pointer' @click='isCollapse=true' v-if='!isCollapse'></i>
            <i class='iconfont iconzhankai  pointer' @click='isCollapse=false' v-if='isCollapse'></i>
        </div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {
        navTitle:"",
        isCollapse:false
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
    .home {
        height:100%;
        .navBar {
            height: 50px;
            overflow: hidden;
            position: relative;
            background: #fff;
            -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            line-height: 50px;
            i {
                font-size: 20px;
                padding:0 15px;
            }
        }
        .el-menu {
            height:100%;
        }
        .el-submenu .el-menu-item {
            min-width: 150px;
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
        }
        .el-menu-item i,.el-submenu__title i {
            margin-right:10px;
        }
        // menu hover
        .submenu-title-noDropdown:hover,.el-submenu__title:hover {
            background-color: #263445!important;
        }
        .is-active>.el-submenu__title {
        color: #f4f4f5!important;
        }
    .nest-menu .el-submenu>.el-submenu__title:hover,.el-submenu .el-menu-item:hover,.el-menu-item:hover {
            background-color: #263445!important;
        }
    }
</style>
