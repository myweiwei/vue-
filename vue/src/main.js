// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import {adminRoutes} from './router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/theme/index.css'
import './assets/css/common.css';
import './assets/css/element.css';
import './assets/css/element-variables.scss'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import jsPlumb from 'jsplumb'
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb
let flag=false;
router.beforeEach((to, from, next) => {
  NProgress.start()
  let user=sessionStorage.getItem('user');
  if(user){
    if(to.path=='/login'){
      next('/');
    }
    if(flag){
      next();
    }
    else {
      let routes=[];
      if(user=='admin'){
        routes=adminRoutes;
        router.addRoutes(routes);
        router.options.routes = router.options.routes.concat(routes);
      }
      flag=true;
      next({...to, replace: true});
    }
    NProgress.done()
  }
  else {
    if(to.path!='/login'){
      next('/login');
    }else{
      next();
    }
    NProgress.done()
  }
})
router.afterEach(() => {
  NProgress.done()
})
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      const screenWidth = document.body.clientWidth;
      const screenHeight = document.body.clientHeight;
      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDom.offsetWidth;
      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDom.offsetHeight;

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +screenWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +screenHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        var  l = e.clientX - disX;
        var  t = e.clientY - disY;
        // 边界处理
        if (-(l) > minDragDomLeft) {
            l = -minDragDomLeft
        } else if (l > maxDragDomLeft) {
            l = maxDragDomLeft
        }
        if (-(t) > minDragDomTop) {
            t = -minDragDomTop
        } 
        else  if (t > maxDragDomTop) {
            t = maxDragDomTop
        }
        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`
      }
      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
Vue.prototype.resetSetItem = function (key, newVal) {
  if (key =='theme') {
      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);
              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
              // 派发对象
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }
}
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}) 
