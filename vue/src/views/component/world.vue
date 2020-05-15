<template>
    <div class='world'>
        <div id="container" class='map'></div> 
    </div>
</template>
<script>
export default {
    data(){
        return {
            location_data: [  // 地图标点
                {
                  "name": "应用企业1",  // 企业名称
                  "alert_num": 5555,  // 告警数量
                  "info": {
                      "location": "xxx",  // 企业地址
                      "coord": [118.88, 28.97],
                      "contact": {
                          "name": "xx",  // 联系人
                          "phone": "15022222222"  // 手机号
                      }
                  }
                },
                {
                  "name": "应用企业1",
                  "alert_num": 555,
                  "info": {
                      "location": "xxx",
                      "coord": [116.7, 39.53],
                      "contact": {
                          "name": "xx",
                          "phone": "15022222222"
                      }
                  }
                },
                {
                  "name": "应用企业1",
                  "alert_num": 55,
                  "info": {
                      "location": "xxx",
                      "coord": [115.480656, 35.23375],
                      "contact": {
                          "name": "xx",
                          "phone": "15022222222"
                      }
                  }
                },
                {
                  "name": "应用企业1",
                  "alert_num": 112,
                  "info": {
                      "location": "xxx",
                      "coord": [117.27, 31.86],
                      "contact": {
                          "name": "xx",
                          "phone": "15022222222"
                      }
                  }
                },
                {
                  "name": "武汉钢铁（集团）公司",
                  "alert_num": 332,
                  "info": {
                      "location": "xxx",
                      "coord": [86.06,41.68],
                      "contact": {
                          "name": "xx",
                          "phone": "15022222222"
                      }
                  }
                },
               {
                  "name": "鞍山钢铁集团有限公司",
                  "alert_num": 222,
                  "info": {
                      "location": "xxx",
                      "coord": [125.03, 46.58],
                      "contact": {
                          "name": "xx",
                          "phone": "15022222222"
                      }
                  }
                },
                {
                  "name": "唐山钢铁有限公司",
                  "alert_num": 444,
                  "info": {
                      "location": "xxx",
                      "coord": [111.65,40.82],
                      "contact": {
                          "name": "xx",
                          "phone": "15022222222"
                      }
                  }
                }
            ],
            infoWin:"",
            tableDom:''
        }
    },
    methods:{
    },
    mounted(){
        let me=this;
        window.onLoad  = function(){
            var map = new AMap.Map('container', {
                zoom:6,//级别
                center: [116.397428, 39.90923],//中心点坐标
                pitch:45,//视角
                viewMode: '3D',//开启3D视图,默认为关闭
                resizeEnable: true, //是否监控地图容器尺寸变化
                features: ["bg", "road", "point"], //隐藏默认楼块
                mapStyle: "amap://styles/3484ce5283d8486fa3df43a67cecb8e0", //设置地图的显示样式
            });
            for(let i=0;i<me.location_data.length;i++){
                var marker = new AMap.Marker({
                    position:me.location_data[i].info.coord
                })
                marker.on('click', function (ev) {
                    // 信息窗体的内容
                    this.infoWin = new AMap.InfoWindow({
                        autoMove: false,
                        isCustom: true,  //使用自定义窗体
                        offset: new AMap.Pixel(10, -10),
                        content:'<div class="name">'+me.location_data[i].name+'</div>'
                    });
                    var x = ev.pixel.x;
                    var y = ev.pixel.y;
                    var lngLat = map.containerToLngLat(new AMap.Pixel(x, y));
                    this.infoWin.open(map, lngLat);
                });
                map.add(marker);
            }
            
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=11e64de2f3e3c6dc6402923a45b46d90&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}
</script>
<style lang="scss">
    .world {
        width:100%;
        height:94%;
        .map {
            background: #011144;
            width: 100%;
            height: 100%;
        }
        .name {
            color:#fff;
            padding:20px 20px 0 20px;
        }
    }
</style>