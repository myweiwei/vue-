<template >
  <div class='slottest'>
    <temp1>
      <p class='color-red'>父组件中的内容</p>
    </temp1>
  </div>
</template>

<script>
import temp1 from './temp1'

export default {
  name: 'slottest',
  components: { temp1 },
  data() {
    return {
    }
  },
}
</script>
<style lang="scss">
    .slottest {
      .color-red{
        color:red;
      }
    }
</style>
