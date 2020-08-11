<template>
    <div>
        <el-tree
        ref='tree'
        :data="data1"
        show-checkbox
        node-key="label"
        :default-expanded-keys="['插槽练习']"
        :default-checked-keys="['插槽练习']"
        >
        </el-tree>
        <el-button @click='confirm'>确定</el-button>
    </div>
</template>
<script>
export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data1:[]
      };
    },
    mounted(){
        let me=this;
        console.log(me.$router);
        me.getData();
    },
    methods:{
        getData:function(){
            let me=this;
            let data=me.$router.options.routes;
            for(let i=0;i<data.length;i++){
                let arg={children:[]};
                if(!data[i].hidden){
                    arg.label=data[i].name;
                    arg.path=data[i].path;
                    if(!data[i].leaf){
                        for(let j=0;j<data[i].children.length;j++){
                            var arg1={};
                            arg1.label=data[i].children[j].name;
                            arg1.path=data[i].children[j].path;
                            arg.children.push(arg1);
                        }
                    }
                    else if(data[i].leaf){
                        arg.label=data[i].children[0].name;
                        arg.path=data[i].children[0].path;
                    }
                }
                if(arg.label){
                    me.data1.push(arg);
                }
            }
        },
        confirm:function(val){
            let me=this;
            const checkedKeys = this.$refs.tree.getCheckedKeys()
            console.log(checkedKeys);
        },
        // getData
    }
}
</script>