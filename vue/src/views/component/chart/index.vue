<template>
    <div class='chart'>
        <el-row :gutter='10'>
            <el-col :span='12'>
                <div class='common-container'>
                    <lineChart :srcData='warnCountTrendData' :isGetData='warnCountFlag'></lineChart>
                </div>
            </el-col>
            <el-col :span='12'>
                <div class='common-container'>
                    <mapChart :srcData='mapData' :isGetData='mapFlag'></mapChart>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import lineChart from '@/components/chart/lineChart.vue'
import mapChart from '@/components/chart/map.vue'
export default {
    data(){
        return {
            warnCountTrendData: {
                id: 'warnCountTrend',
                height: 400,
                sData:[
                    {
                        name:'竞逐对',
                        symbol:'circle',
                        symbolSize:6,
                        type:'line',
                        lineStyle:{
                            width:1
                        },
                        data:[
                            {value:["2020-01-01 00:00:00",0]},
                            {value:["2020-01-02 00:00:00",0]},
                            {value:["2020-01-04 01:01:01",200]},
                            {value:["2020-01-07 01:01:01",200]}
                            
                        ]
                    },
                    {
                        name:'竞逐对1',
                        symbol:'circle',
                        symbolSize:6,
                        type:'line',
                        lineStyle:{
                            width:1
                        },
                        data:[
                            {value:["2020-01-02 00:00:00",0]},
                            {value:["2020-01-06 04:01:00",100]},
                            {value:["2020-01-07 01:01:01",200]}
                        ]
                    }
                ]
            },
            warnCountFlag: false,
            mapData: {
                id: 'mapData',
                height: 400
            },
            mapFlag: false,
        }
    },
    components:{
        lineChart,
        mapChart
    },
    mounted(){
        let me=this;
        me.warnCountFlag=true;
        me.mapFlag=true;
    }

}
</script>
<style lang="scss">
    @import "../../../assets/css/theme.scss";
    .chart {
        height:100%;
        width:100%;
        .line {
            height:400px;
            background: #fff;
            border-radius: 5px;
            margin-top:2%;
        }
    }
</style>