<template>
    <div :id="srcData.id" class="pie"></div>
</template>

<script>
    import echarts from 'echarts';
    import resize from '../resize'
    import china from '@/assets/json/china.json'
    export default {
        name: "chart",
        mixins: [resize],
        data() {
            return {
                chartColumn: null
            }
        },
        props: {
            srcData: Object,
            isGetData: Boolean
        },
        watch: {
            isGetData(val) {
                this.drawChart();
            }
        },
        methods: {
            drawChart() {
                setTimeout(() => {
                    let me = this;
                    echarts.registerMap('china', china);
                    var name_title = "新冠状病毒感染引起的肺炎疫情情况"
                    var nameColor = " rgb(55, 75, 113)"
                    var name_fontFamily = '等线'
                    var name_fontSize = 18
                    var mapName = 'china'
                    var data = [
                        {name:"北京",value:114},
                        {name:"天津",value:31},
                        {name:"河北",value:65},
                        {name:"山西",value:35},
                        {name:"内蒙古",value:18},
                        {name:"辽宁",value:41},
                        {name:"吉林",value:14},
                        {name:"黑龙江",value:43},
                        {name:"上海",value:112},
                        {name:"江苏",value:129},
                        {name:"浙江",value:428},
                        {name:"安徽",value:200},
                        {name:"福建",value:101},
                        {name:"江西",value:162},
                        {name:"山东",value:158},
                        {name:"河南",value:278},
                        {name:"湖北",value:4903},
                        {name:"湖南",value:277},
                        {name:"重庆",value:182},
                        {name:"四川",value:142},
                        {name:"贵州",value:12},
                        {name:"云南",value:70},
                        {name:"西藏",value:1},
                        {name:"陕西",value:63},
                        {name:"甘肃",value:26},
                        {name:"青海",value:8},
                        {name:"宁夏",value:17},
                        {name:"新疆",value:14},
                        {name:"广东",value:354},
                        {name:"广西",value:78},
                        {name:"海南",value:46},
                        ];
                        
                    var geoCoordMap = {};
                    var toolTipData = [ 
                        {name:"北京",value:[{name:"确诊",value:114},{name:"死亡",value:1},{name:"治愈",value:5}]},
                        {name:"天津",value:[{name:"确诊",value:31},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"河北",value:[{name:"确诊",value:65},{name:"死亡",value:1},{name:"治愈",value:0}]},
                        {name:"山西",value:[{name:"确诊",value:35},{name:"死亡",value:0},{name:"治愈",value:1}]},
                        {name:"内蒙古",value:[{name:"确诊",value:18},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"辽宁",value:[{name:"确诊",value:41},{name:"死亡",value:0},{name:"治愈",value:1}]},
                        {name:"吉林",value:[{name:"确诊",value:14},{name:"死亡",value:0},{name:"治愈",value:1}]},
                        {name:"黑龙江",value:[{name:"确诊",value:44},{name:"死亡",value:1},{name:"治愈",value:0}]},
                        {name:"上海",value:[{name:"确诊",value:112},{name:"死亡",value:1},{name:"治愈",value:5}]},
                        {name:"江苏",value:[{name:"确诊",value:129},{name:"死亡",value:0},{name:"治愈",value:1}]},
                        {name:"浙江",value:[{name:"确诊",value:428},{name:"死亡",value:0},{name:"治愈",value:8}]},
                        {name:"安徽",value:[{name:"确诊",value:200},{name:"死亡",value:0},{name:"治愈",value:3}]},
                        {name:"福建",value:[{name:"确诊",value:101},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"江西",value:[{name:"确诊",value:162},{name:"死亡",value:0},{name:"治愈",value:5}]},
                        {name:"山东",value:[{name:"确诊",value:158},{name:"死亡",value:0},{name:"治愈",value:1}]},
                        {name:"河南",value:[{name:"确诊",value:278},{name:"死亡",value:2},{name:"治愈",value:2}]},
                        {name:"湖北",value:[{name:"确诊",value:4903},{name:"死亡",value:162},{name:"治愈",value:90}]},
                        {name:"湖南",value:[{name:"确诊",value:277},{name:"死亡",value:0},{name:"治愈",value:2}]},
                        {name:"重庆",value:[{name:"确诊",value:182},{name:"死亡",value:0},{name:"治愈",value:1}]},
                        {name:"四川",value:[{name:"确诊",value:142},{name:"死亡",value:1},{name:"治愈",value:1}]},
                        {name:"贵州",value:[{name:"确诊",value:12},{name:"死亡",value:0},{name:"治愈",value:1}]},
                        {name:"云南",value:[{name:"确诊",value:70},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"西藏",value:[{name:"确诊",value:1},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"陕西",value:[{name:"确诊",value:63},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"甘肃",value:[{name:"确诊",value:26},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"青海",value:[{name:"确诊",value:8},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"宁夏",value:[{name:"确诊",value:17},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"新疆",value:[{name:"确诊",value:14},{name:"死亡",value:0},{name:"治愈",value:0}]},
                        {name:"广东",value:[{name:"确诊",value:354},{name:"死亡",value:0},{name:"治愈",value:10}]},
                        {name:"广西",value:[{name:"确诊",value:78},{name:"死亡",value:0},{name:"治愈",value:2}]},
                        {name:"海南",value:[{name:"确诊",value:46},{name:"死亡",value:1},{name:"治愈",value:1}]},
                    ];

                    /*获取地图数据*/
                    this.chartColumn.showLoading();
                    var mapFeatures = echarts.getMap(mapName).geoJson.features;
                    this.chartColumn.hideLoading();
                    mapFeatures.forEach(function(v) {
                        // 地区名称
                        var name = v.properties.name;
                        // 地区经纬度
                        geoCoordMap[name] = v.properties.cp;

                    });
                    var max = 5880,
                        min = 9; // todo 
                    var maxSize4Pin = 100,
                        minSize4Pin = 20;

                    var convertData = function(data) {
                        var res = [];
                        for (var i = 0; i < data.length; i++) {
                            var geoCoord = geoCoordMap[data[i].name];
                            if (geoCoord) {
                                res.push({
                                    name: data[i].name,
                                    value: geoCoord.concat(data[i].value),
                                });
                            }
                        }
                        return res;
                    };
                    let option = {
                        title: {
                            text: name_title,
                            x: 'center',
                            textStyle: {
                                color: nameColor,
                                fontFamily: name_fontFamily,
                                fontSize: name_fontSize
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                if (typeof(params.value)[2] == "undefined") {
                                    var toolTiphtml = ''
                                    for(var i = 0;i<toolTipData.length;i++){
                                        if(params.name==toolTipData[i].name){
                                            toolTiphtml += toolTipData[i].name+':<br>'
                                            for(var j = 0;j<toolTipData[i].value.length;j++){
                                                toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                                            }
                                        }
                                    }
                                    return toolTiphtml;
                                } else {
                                    var toolTiphtml = ''
                                    for(var i = 0;i<toolTipData.length;i++){
                                        if(params.name==toolTipData[i].name){
                                            toolTiphtml += toolTipData[i].name+':<br>'
                                            for(var j = 0;j<toolTipData[i].value.length;j++){
                                                toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                                            }
                                        }
                                    }
                                    return toolTiphtml;
                                }
                            }
                        },
                        // legend: {
                        //     orient: 'vertical',
                        //     y: 'bottom',
                        //     x: 'right',
                        //     data: ['credit_pm2.5'],
                        //     textStyle: {
                        //         color: '#fff'
                        //     }
                        // },
                        visualMap: {
                            show: true,
                            min: 1,
                            max: 500,
                            left: 'left',
                            top: 'bottom',
                            text: ['高', '低'], // 文本，默认为数值文本
                            calculable: true,
                            seriesIndex: [1],
                            inRange: {
                                // color: ['#3B5077', '#031525'] // 蓝黑
                                // color: ['#ffc0cb', '#800080'] // 红紫
                                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                                // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                                // color: ['#23074d', '#cc5333'] // 紫红
                                color: ['#00467F', '#A5CC82'] // 蓝绿
                                // color: ['#1488CC', '#2B32B2'] // 浅蓝
                                // color: ['#00467F', '#A5CC82'] // 蓝绿
                                // color: ['#00467F', '#A5CC82'] // 蓝绿
                                // color: ['#00467F', '#A5CC82'] // 蓝绿
                                // color: ['#00467F', '#A5CC82'] // 蓝绿

                            }
                        },
                        geo: {
                            show: true,
                            map: mapName,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                }
                            },
                            roam: false,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#3B5077',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7',
                                }
                            }
                        },
                        series: [{
                                name: '散点',
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                data: convertData(data),
                                symbolSize: function(val) {
                                    return val[2] / 100;
                                },
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: true
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#05C3F9'
                                    }
                                }
                            },
                            {
                                type: 'map',
                                map: mapName,
                                geoIndex: 0,
                                aspectScale: 5.75, //长宽比
                                showLegendSymbol: false, // 存在legend时显示
                                label: {
                                    normal: {
                                        show: true
                                    },
                                    emphasis: {
                                        show: false,
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    }
                                },
                                roam: true,
                                itemStyle: {
                                    normal: {
                                        areaColor: '#031525',
                                        borderColor: '#3B5077',
                                    },
                                    emphasis: {
                                        areaColor: '#2B91B7'
                                    }
                                },
                                animation: false,
                                data: data
                            },
                            {
                                name: '点',
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                symbol: 'pin', //气泡
                                symbolSize: function(val) {
                                    var a = (maxSize4Pin - minSize4Pin) / (max - min);
                                    var b = minSize4Pin - a * min;
                                    b = maxSize4Pin - a * max;
                                    return a * val[2] + b;
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: 9,
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#F62157', //标志颜色
                                    }
                                },
                                zlevel: 6,
                                
                            },
                            {
                                name: 'Top 5',
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                data: convertData(data.sort(function(a, b) {
                                    return b.value - a.value;
                                }).slice(0, 5)),
                                symbolSize: function(val) {
                                    return val[2] / 150;
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    brushType: 'stroke'
                                },
                                hoverAnimation: true,
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: true
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'yellow',
                                        shadowBlur: 10,
                                        shadowColor: 'yellow'
                                    }
                                },
                                zlevel: 1
                            },

                        ]
                    };
                    this.chartColumn.setOption(option);
                }, 0);
            }
        },
        created() {
            var me = this;
        },
        updated() {
        },
        mounted() {
            let charDom = document.getElementById(this.srcData.id), me = this;
            charDom.style.height = this.srcData.height + "px";
            this.chartColumn = echarts.init(charDom);
            echarts.registerMap('china', china);
        },
        beforeDestroy() {
            if (this.chartColumn) {
                this.chartColumn.clear()
            }
        },
        destroy() {
            if (this.chartColumn) {
                this.chartColumn.dispose()
                this.chartColumn = null;
            }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    .pie {
        width: 100%;
        height: 350px;
    }
</style>