import Vue2Clipboard from './vue2-clipboards';

function plugin (Vue, option = {}) {
    if (plugin.installed) {
        console.warn('[vue-clipboards] already installed.');
    }
    Vue2Clipboard(Vue)
}

if (typeof exports == "object") {
    module.exports = plugin
} else if (typeof define == "function" && define.amd) {
    define([], function () { return plugin })
} else if (window.Vue) {
    //window.vueClipboard = vueClipboard
    Vue.use(plugin)
}

export default plugin;