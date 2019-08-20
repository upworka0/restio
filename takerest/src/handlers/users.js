import s from 'strummer';
import {QueryAction} from '../dbconnect'
import {simpleHandler} from '../helpers'
import streamService from './token-stream'

let matcher = s.objectWithOnly({
    data: s.object()
});

let handler = simpleHandler(async (req) => {
    // console.log(req.headers.data)
    let token = req.headers.token
    if(!token || token === 'none') {
      return {error: 'Please login again.', token_error: 'failed'}
    }
    let result = await QueryAction.getUsers(token)
    return result
});

let saveUserHandler = simpleHandler(async (req) => {
    let params = {...req.body};
    let result = await QueryAction.saveUser({data: params.data})
    return result
});

let insertUserHandler = simpleHandler(async (req) => {
    let params = {...req.body};
    let result = await QueryAction.insertUser({data: params.data})
    return result
});

let removeUserHandler = simpleHandler(async (req) => {
    let params = {...req.body};
    let result = await QueryAction.removeUser({data: params.data})
    return result
});

let removeUsersHandler = simpleHandler(async (req) => {
    let params = {...req.body};
    let result = await QueryAction.removeUsers({data: params.data})
    return result
});

let authPermissionHandler = simpleHandler(async(req) => {
    let token = req.headers.token
    return await streamService.authToken().then(data => {
        if(data) {
            let obj = JSON.parse(data);
            let userAuth = obj.find(o => o.token === token)
            return userAuth
        }else{
            return {error: 'Please login again.'}
        }
    })
});

let saveAdminHandler = simpleHandler(async (req) => {
    let params = {...req.body};
    let result = await QueryAction.saveAdmin({data: params.data})
    return result
});

export default {
    matcher,
    handler,
    saveUserHandler,
    insertUserHandler,
    removeUserHandler,
    removeUsersHandler,
    authPermissionHandler,
    saveAdminHandler
};