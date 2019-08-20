import s from 'strummer';
// import { QueryAction } from '../dbconnect'
import { simpleHandler } from '../helpers'
import streamService from '../handlers/token-stream'

const nodemailer = require('nodemailer');
let matcher = s.objectWithOnly({
    data: s.object()
});

let handler = simpleHandler(async(req) => {
    let params = {...req.body };
    const transporter = nodemailer.createTransport({
      service: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'your gmail',
        pass: 'your gmail password'
      }
    })
    let token = streamService.generateToken()
    const mailOptions = {
      from: 'your email',
      to: params.data.email,
      subject: 'Please reset password',
      text: 'localhost:3000/reset?reset='+ token 
    }

    // let params = {...req.body };
    // let result = await QueryAction.getUser({ data: params.data })
    // return result

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return error
      } else {
        return token
      }
    })
    return token
});

export default {
    matcher,
    handler
};