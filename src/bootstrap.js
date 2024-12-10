
import axios from 'axios'
import env from "./config/env"
//expose axios to global object
window.axios = axios;

window.axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token')

window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'sasasa',
//     cluster: 'sasasa',
//     wsHost: '179.190.28.108',
//     authEndpoint: env.normalURL + 'broadcasting/auth',
//     auth: {
//         headers: {
//             Authorization: 'Bearer ' + localStorage.getItem('token'),
//         },
//     },
//     wsPort: 6001,
//     forceTLS: false,
//     disableStats: true,
// });

window.$ = window.jQuery = require('jquery');
require('bootstrap');
