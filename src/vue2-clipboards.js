;(function () {
  var vueClipboard = {}
  
  vueClipboard.install = function (Vue) {

    const Clipboard = require('clipboard');

    if (!Clipboard) {
        throw new Error('[vue-clipboards] cannot locate Clipboard.');
    }

    var clipboards;

    Vue.directive('clipboard', {
      bind: function (container, binding, vnode) {
            const { value } = binding;
            const option = {};

            if (value && typeof value === 'string') {
                option.text = () => value;
            }

            clipboards = new Clipboard(container, option);

            const { componentOptions, data } = vnode;
            const listeners = componentOptions ? componentOptions.listeners : null;
            const on = data ? data.on : null;
            const events = listeners ? listeners : on ? on : null;

            if (events && typeof events === 'object' && Object.keys(events).length) {
                Object.keys(events).map(cb => clipboards.on(cb, events[cb].fn));
            }

            container._v_clipboard = clipboards
      },

      update: function (container, binding) {
          container._v_clipboard.text = function () { return binding.value },
          container._v_clipboard.action = function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
      },

      unbind: function () {
          if (clipboards && clipboards.destroy) {
                clipboards.destroy();
            }
      }
    })
  }


  if (typeof exports == "object") {
    module.exports = vueClipboard
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return vueClipboard })
  } else if (window.Vue) {
    window.vueClipboard = vueClipboard
    Vue.use(vueClipboard)
  }

})()