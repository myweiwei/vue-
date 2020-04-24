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
      currentRole: 'admin'
    }
  },
}
</script>
