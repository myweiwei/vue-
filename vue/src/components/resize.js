import {debounce} from '../common/util';
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
    data() {
        return {
            $_sidebarElm: null
        }
    },
    mounted() {
        let me=this;
        this.__resizeHandler = debounce(() => {
            if (this.chartColumn) {
                this.chartColumn.resize()
            }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler);
        const erd = elementResizeDetectorMaker()
        erd.listenTo(document.getElementsByClassName("contentBox"),(element)=>{
           me.$nextTick(()=>{
                me.resize()
            })
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.__resizeHandler);
    },
    methods: {
        resize() {
            this.__resizeHandler()
        }
    }
}
