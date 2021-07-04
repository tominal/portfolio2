import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faAngleDoubleDown,
    faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons'
import {
    faGithub,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faAngleDoubleDown,
    faLongArrowAltRight,
    faGithub,
    faLinkedin,
    faTwitter,
)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
