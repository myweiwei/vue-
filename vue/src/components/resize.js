import {debounce} from '../common/util';
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
        window.addEventListener('resize', this.__resizeHandler)
        this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
        this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.__resizeHandler)

        this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    methods: {
        // use $_ for mixins properties
        // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
        $_sidebarResizeHandler(e) {
            if (e.propertyName === 'opacity') {
                this.__resizeHandler()
            }
        },
        resize() {
            this.__resizeHandler()
        }
    }
}
