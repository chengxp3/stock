'use strict';

import App from '../src/app.vue'
import Chat from '../src/chat.vue'
export default function(router) {
    router.map({
        '/': {
            name: 'App',
            component: App,
        },
        '/chat/:id': {
            name: 'Chat',
            component: Chat,
        },
    })
    router.redirect({
      '*': '/'
    })
    router.beforeEach(() => window.scrollTo(0, 0))
    router.afterEach(function ({to}) {
        console.log(`成功浏览到:${to.path}`)
    })
}