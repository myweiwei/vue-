<template>
  <div>
    <component :is="currentRole" />
  </div>
</template>

<script>
import admin from './admin'
import editor from './editor'

export default {
  name: 'Dashboard',
  components: { admin, editor },
  data() {
    return {
      currentRole: ''
    }
  },
  created(){
    let me=this;
    me.currentRole=sessionStorage.getItem('user')=="admin"?sessionStorage.getItem('user'):'editor';
    console.log(sessionStorage.getItem('user'));
  }
}
</script>
