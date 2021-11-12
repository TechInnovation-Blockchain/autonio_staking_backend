const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

const app = express();
const port = 3100;
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/send_email', (req, res) => {
    const data = req.query.telegram_id;
    const address = req.query.account;
    const staked = req.query.staked;

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {
        "sender":{
           "email":"contact@autonio.foundation",
           "name":"Autonio"
        },
        "subject":"This is my default subject line",
        "templateId":17,
        "params":{
           "telegram_id" : "@" + data.toString(),
           "address" : address.toString(),
           "staked_amount" : staked.toString(),
        },
        "messageVersions":[
          {
            "to":[
                {
                    "email":"ikram@autonio.foundation",
                    "name":"Ikram"
                },
                {
                    "email":"rajat@autonio.foundation",
                    "name":"Rajat"
                },
                {
                    "email":"contact@autonio.foundation",
                    "name":"Autonio"
                },
                {
                    "email":"newcaesar628@gmail.com",
                    "name":"Autonio"
                },
              ],
              "params":{
                 "greeting":"Welcome onboard!",
                 "headline":"Be Ready for Takeoff."
              },
              "subject":"We are happy to be working with you"
            },
         ]
      };
     apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
         res.send({message: "success"});
     }, function(error) {
         res.send({message: "error"});
     });
 });
 
 app.listen(port, () => console.log(`Example app listening on port::: ${port}!`))