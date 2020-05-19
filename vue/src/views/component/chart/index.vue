<template>
    <div class='chart'>
        <div class='flexAroundBox'>
            <div class='line'>
                <lineChart :srcData='warnCountTrendData' :isGetData='warnCountFlag'></lineChart>
            </div>
            <!-- <div class='line'>
                <lineChart :srcData='warnCountTrendData' :isGetData='warnCountFlag'></lineChart>
            </div> -->
        </div>
    </div>
</template>
<script>
import lineChart from '@/components/lineChart.vue'
export default {
    data(){
        return {
            warnCountTrendData: {
                id: 'warnCountTrend',
                height: 350,
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
        }
    },
    components:{
        lineChart
    },
    mounted(){
        let me=this;
        me.warnCountFlag=true;
    }

}
</script>
<style lang="scss">
    .chart {
        height:100%;
        width:100%;
        background: #f0f2f5;
        .line {
            width:49.5%;
            height:350px;
            background: #fff;
            border-radius: 5px;
            margin:0.5;
        }
    }
</style>