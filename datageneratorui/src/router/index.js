import skeleton from '../components/skeleton';
import skeletonfree from '../components/skeleton-free';
import CustomRows from '../components/CustomRows';
import Combinations from '../components/Combinations';
import Pairs from '../components/Pairs';
import Signin from '../components/Signin';
import Forgot from '../components/Forgot';
import Reset from '../components/Reset';
import { AdminRole } from '../components/roles';
import { UserRole } from '../components/roles';
import services from '../components/services/services'

const routes1 = {
    '/': CustomRows,
    '/custom': CustomRows,
    '/combinations': Combinations,
    '/pairs': Pairs,
    '/login': Signin,
    '/forgot': Forgot,
    '/reset': Reset,
    '/role': AdminRole,
    '/usersetting': UserRole,

    '/fcustom': CustomRows,
    '/fcombinations': Combinations,
    '/fpairs': Pairs,
};

export default async(route) => {
    let comp = routes1[route]

    if (route === '/fcustom' || route === '/fcombinations' || route === '/fpairs') {
        skeletonfree.data = () => ({
            component: comp,
            maxResult: 500,
            active: route
        })
        return skeletonfree
    }

    if (route === '/login') {
        skeleton.data = () => ({
            component: routes1['/login'],
            authInfo: "",
            maxResult: 500,
            active: route
        })
        return skeleton;
    } else if (route === '/forgot') {
        skeleton.data = () => ({
            component: routes1['/forgot'],
            authInfo: "",
            maxResult: 500,
            active: route
        })
        return skeleton;
    } else if (route === '/reset') {
        skeleton.data = () => ({
            component: routes1['/reset'],
            authInfo: "",
            maxResult: 500,
            active: route
        })
        return skeleton;
    } else {
        return await services.authPermission().then((res) => {
            let auth = res.data
            if (auth) {
                if (comp === Combinations && !auth['all_combinations']) {
                    skeleton.data = () => ({
                        component: "",
                        authInfo: auth,
                        maxResult: 0,
                        active: route
                    })
                    return skeleton
                }
                if (comp === Pairs && !auth['all_pairs']) {
                    skeleton.data = () => ({
                        component: "",
                        authInfo: auth,
                        maxResult: 0,
                        active: route
                    })
                    return skeleton
                }
                if (comp === CustomRows && !auth['custome_rows']) {
                    skeleton.data = () => ({
                        component: "",
                        authInfo: auth,
                        maxResult: 0,
                        active: route
                    })
                    return skeleton
                }
                if (comp === AdminRole && auth['role'] !== 'admin') {
                    skeleton.data = () => ({
                        component: "",
                        authInfo: auth,
                        maxResult: 0,
                        active: route
                    })
                    return skeleton
                }

                skeleton.data = () => ({
                    // component: routes[route] || CustomRows,
                    component: comp,
                    authInfo: auth,
                    maxResult: 100000,
                    active: route
                })
                document.body.style.backgroundColor = "white"
            } else {
                return skeletonfree
                    // skeleton.data = () => ({
                    //   component: routes['/fcustom'],
                    //   authInfo: "",
                    //   maxResult: 500
                    // })
                    // skeleton = skeletonfree
            }
            return skeleton;
        })
    }
}