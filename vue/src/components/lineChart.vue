
<template>
    <div :id="srcData.id" class="warnCount"></div>
</template>

<script>
    import echarts from 'echarts';
    import resize from './resize'

    export default {
        name: "chart",
        mixins: [resize],
        data() {
            return {
                chartColumn: null,
                scale: 1,
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
                let me=this;
                setTimeout(() => {
                    let me = this;
                    this.chartColumn.clear();
                    this.chartColumn.setOption({
                        tooltip: {
                            trigger: 'axis',
                            confine: true
                        },
                        yAxis: {
                            name: '得分',
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#72aafa'
                                },
                            },
                            splitLine: {
                                show:false,
                                lineStyle: {
                                    color: '#154d5a',
                                    width: 0.5
                                }
                            },
                        },
                        xAxis :{
                            type: 'time',
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#72aafa',
                                    
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#72aafa'
                                }
                            },
                            
                        },
                        grid:{
                            top:'15%',
                            right:'10%',
                            left:'10%',
                            bottom:'15%'
                        },
                        series:this.srcData.sData
                    })
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
            this.scale = window.innerWidth / 1920;
            this.chartColumn = echarts.init(charDom);
            this.chartColumn.on('click', function (params) {
                me.$emit('click', params);
            })
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
    .warnCount {
        width: 100%;
        height: 350px;
    }
</style>