import type { Router } from 'vue-router'
import { canNavigate } from '@layouts/plugins/casl'

export const setupGuards = (router: Router) => {
  // 👉 router.beforeEach
  // Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
  router.beforeEach(to => {
    /*
     * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
     * Examples of public routes are, 404, under maintenance, etc.
     */
    if (to.meta.public)
      return

    /**
     * Check if user is logged in by checking if token & user data exists in local storage
     * Feel free to update this logic to suit your needs
     */
    const isLoggedIn = !!(useCookie('userData').value && useCookie('accessToken').value)

    // console.log('isloggedin', isLoggedIn, useCookie('userData').value, useCookie('accessToken').value)

    /*
      If user is logged in and is trying to access login like page, redirect to home
      else allow visiting the page
      (WARN: Don't allow executing further by return statement because next code will check for permissions)
     */
    // console.log('env', import.meta.env.VITE_APP_TYPE)

    // بررسی اینکه صفحه مورد نظر کاربر باید در محدوده اپلیکیشن مورد استفاده باشد
    if (!to.path.toUpperCase().includes(import.meta.env.VITE_APP_TYPE) && !to.meta.unauthenticatedOnly)
      return '404'

    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn)
        return '/'
      else
        return undefined
    }

    // if (!canNavigate(to) && to.matched.length) {

    //   return isLoggedIn
    //     ? { name: 'not-authorized' }
    //     : {
    //         name: 'auth',
    //         query: {
    //           ...to.query,
    //           to: to.fullPath !== '/' ? to.path : undefined,
    //         },
    //       }

    // }
  })
}
