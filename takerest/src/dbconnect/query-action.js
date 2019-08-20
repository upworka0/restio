'user strict';

const fs = require('fs');
const util = require('util');
import dbcon from './db'
import config from "../config";
import streamService from '../handlers/token-stream'

const query = util.promisify(dbcon.query).bind(dbcon);
const readFile = util.promisify(fs.readFile);

async function registerUser(params) {
  let result = await query('SELECT * from users');
  return result
}

async function getUser(params) {
  let adminInfo = config.get('admin');
  let user = {id: '', name: '', password: '', permission: false, role: '', token: '', custome_rows: 0, all_combinations: 0, all_pairs: 0}
  
  if(adminInfo.id === params.data.username && adminInfo.password === params.data.password) {
    user.id = adminInfo.id
    user.name = adminInfo.id
    user.password = adminInfo.password
    user.permission = true
    user.role = 'admin'
    user.custome_rows = 1
    user.all_combinations = 1
    user.all_pairs = 1

    let token = streamService.generateTokenUser(user)
    return token
  }

  let result = await query('SELECT * from users where user_name="' + params.data.username +'"');
  if(result.length > 0) {
    result = result[0]
    if(result.user_password === params.data.password) {
      user.id = result.id
      user.name = result.user_name
      user.password = result.user_password
      user.permission = true
      user.role = 'user'
      user.custome_rows = result.custom_rows
      user.all_combinations = result.all_combinations
      user.all_pairs = result.all_pairs

      let today = +new Date()
      if(result.timeline - today < 0) {
        return {error: 'Your account was due.\nPlease contact with administrator.'}  
      }

      let token = streamService.generateTokenUser(user)
      return token
    }else{
      return {error: 'Wrong password.'}
    }
  }else{
    return {error: 'You are an user not registered.'}
  }
}

async function getUsers(token) {
  let result = await query('SELECT * from users');
  if(result) {
    return result
  }else{
    return {error: 'Faulted connect'}
  }
}

async function saveUser(params) {
  let fields = {...params.data}
  let id = fields.id
  delete fields.id
  let sqlSet = ''
  let fieldKeys = Object.keys(fields)
  fieldKeys.forEach(key => {
    if(Number.isInteger(fields[key])) {
      sqlSet = sqlSet + key + '=' + fields[key] + ', '; 
    }else{
      sqlSet = sqlSet + key + '="' + fields[key] + '", '; 
    }
  })
  let _sqlSet = sqlSet.substring(0, sqlSet.length-2)
  let sqlWhere = 'id="'+id+'"'
  let sql = 'UPDATE users SET ' + _sqlSet + ' WHERE ' + sqlWhere
  let result = await query(sql)
  if(result) {
    return result
  }else{
    return {error: 'Failed connect'}
  }
}

async function insertUser(params) {
  let fields = {...params.data}
  let sqlInto = '('
  let sqlValues = '('
  let fieldKeys = Object.keys(fields)
  fieldKeys.forEach(key => {
    sqlInto = sqlInto + key + ', '
    if(Number.isInteger(fields[key])) {
      sqlValues = sqlValues + fields[key] + ', '; 
    }else{
      sqlValues = sqlValues + '"' + fields[key] + '", '; 
    }
  })
  let _sqlInto = sqlInto.substring(0, sqlInto.length-2)
  let _sqlValues = sqlValues.substring(0, sqlValues.length-2)
  _sqlInto = _sqlInto + ')'
  _sqlValues = _sqlValues + ')'
  let sql = 'INSERT INTO users' + _sqlInto + ' VALUES' + _sqlValues
  let result = await query(sql)
  if(result) {
    return result
  }else{
    return {error: 'Failed connect'}
  }
}

async function removeUser(params) {
  let fields = {...params.data}
  let sql = 'DELETE FROM users WHERE id="' + fields.id +'"'
  let result = await query(sql)
  if(result) {
    return result
  }else{
    return {error: 'Failed connect'}
  }
}

async function removeUsers(params) {
  let ids = [...params.data]
  let sqlValues = ''
  ids.forEach((id, idx) => {
    if(idx === ids.length-1) {
      sqlValues = sqlValues + 'id="' + id +'" '
    }else{
      sqlValues = sqlValues + 'id="' + id +'" OR '
    }
  })
  let sql = 'DELETE FROM users WHERE ' + sqlValues
  let result = await query(sql)
  if(result) {
    return result
  }else{
    return {error: 'Failed connect'}
  }
}

async function saveAdmin(params) {
  let fields = {...params.data}
  let filePath = config.stores.file.file

  await fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
    if (err){
      console.log(err);
    } else {
      let obj = []
      if(data) {
        obj = JSON.parse(data); //now it an object
        obj.admin = {...fields}  
      }
      let json = JSON.stringify(obj); //convert it back to json
      fs.writeFile(filePath, json, 'utf8', (err) => {
        console.log(err)
        if(!err) {
          return 'OK'
        }
      }); // write it back 
  }});
}

function fileStreamWrite(user) {

}

export default {
  getUser,
  getUsers,
  saveUser,
  insertUser,
  removeUser,
  removeUsers,
  registerUser,
  saveAdmin
}