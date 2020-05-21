<template>
  <div class='home flexStartBox'>
    <el-menu
        :collapse="isCollapse" 
        class="el-menu-vertical-demo"
        background-color="rgb(48, 65, 86)"
        text-color="rgb(191, 203, 217)"
        router
        unique-opened
        active-text-color="rgb(64, 158, 255)"
        :default-active="$route.path"
        @open="handleOpen" 
        @close="handleClose" mode="vertical">
        <template v-for="(item,index) in $router.options.routes" v-key='index' v-if='!item.hidden'> 
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
                <span>{{item.children[0].name}}</span>
            </el-menu-item>
        </template>
    </el-menu>
    <div class='contentBox'>
        <div class="navBar flexBetweenBox">
            <div class="flexStartBox">
                <div>
                    <i class='iconfont icondaohangshouqi- pointer' @click='isCollapse=true' v-if='!isCollapse'></i>
                    <i class='iconfont iconzhankai  pointer' @click='isCollapse=false' v-if='isCollapse'></i>
                </div>
                <transition mode="out-in">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-for='item in breadcrumb' :key='item.name'>{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </transition>
            </div>
            <div class="flexStartBox">
                <i class='iconfont iconzhankai1 pointer' @click='full' v-if='!fullFlag'></i>
                <i class='iconfont iconsuoxiao pointer' @click='full' v-else></i>
                <el-dropdown class='avaImg' trigger="click">
                    <span class="el-dropdown-link">
                        <img src="../assets/img.png" alt="">
                        <div>
                            <i class="iconfont iconxiala" style='padding:0 5px;font-size:15px;'></i>
                        </div>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item>{{user}}</el-dropdown-item>
                        <el-dropdown-item divided>
                            <span @click='logOut'>登出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div style="width:100%;height:100%;padding-top:60px;box-sizing:border-box">
            <transition name="el-fade-in-linear" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
        <rightPanel></rightPanel>
    </div>
  </div>
</template>

<script>
import screenfull  from 'screenfull'
import rightPanel from '../components/rightPanel/index.vue'
export default {
  name: '',
  data(){
    return {
        navTitle:"",
        isCollapse:false,
        fullFlag:false,
        user:'',
        breadcrumb:[],
        
    }
  },
  components:{
      rightPanel
  },
  mounted(){
    let me=this;
    window.onresize=function(){
    // 全屏下监控是否按键了ESC
        if (!me.checkFull()) {
        // 全屏下按键esc后要执行的动作
            me.fullFlag = false
        }
    }
    me.user=sessionStorage.getItem('user');
    let match1=me.$route.matched;
    match1=match1.filter(item => item.name&&item.name!='首页' );
    me.breadcrumb=match1;
  },
  methods:{
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    full:function(){
        if (!screenfull.isEnabled) { // 如果不允许进入全屏，发出不允许提示
            this.$message({
                message: '不支持全屏',
                type: 'warning'
            })
            return false
        }
        this.fullFlag=!this.fullFlag
        screenfull.toggle();
    },
    checkFull() {
        var isFull = screenfull.isFullscreen;
        if (isFull === undefined) {
            isFull = false;
        }
        return isFull;
    },
    logOut:function(){
        let me=this;
        this.$confirm('确认要登出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            sessionStorage.setItem('user','');
            sessionStorage.clear();
            me.$router.push('/login');
            window.location.reload();
        }).catch(() => {
        });
    },
  },
  watch: {
    $route(route) {
        let match=route.matched;
        match=match.filter(item => item.name&&item.name!='首页' );
        this.breadcrumb=match;
    }
  }
}
</script>

<style lang='scss'>
    @import  '../assets/css/theme.scss';
    .home {
        height:100%;
        .contentBox {
            flex:1;
            height:100%;
            overflow:hidden;
            position:relative;
        }
        .navBar {
            width:100%;
            overflow: hidden;
            position: absolute;
            background: #fff;
            -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            height:60px;
            box-sizing:border-box;
            i {
                font-size: 20px;
                padding:0 15px;
            }
        }
        .avaImg {
            img {
                width:40px;
                height:40px;
                border-radius: 50%;
            }
        }
        .el-dropdown-link {
            display: flex;
            align-items: baseline;
            line-height: 100%;
        }
        .el-menu {
            border:none;
        }
        .fade-enter-active,.fade-leave-active {
            transition: width .2s ease;
        }
        .fade-enter,.fade-leave-to{
           width:64px;
        }
        
    }
    .sidebar-container {
        transition: width 0.28s;
        width: 200px;
        height: 100%;
        overflow: hidden;
        // reset element-ui css
        .collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }
    }
</style>
