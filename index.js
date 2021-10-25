const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const port = 3100;
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

const api_key = "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";
sgMail.setApiKey(api_key);
app.get('/send_email', (req, res) => {
    const data = req.query.telegram_id;
    const msg = {
        to: ['newcaesar628@gmail.com'], // Change to your recipient
        from: 'contact@autonio.foundation', // Change to your gem sender
        subject: 'User Telegram ID to add to DAO chat',
        text: 'User Telegram ID',
        html: 'User Telegram ID : <strong>' + data.toString() + '</strong>',
    };
    (async () => {
        try {
            await sgMail.send(msg);
            res.send({message: "success"});
        } catch (error) {
            console.error(error);
        
            if (error.response) {
                console.error(error.response.body)
            }
            res.send({message: "error"});
        }
    })();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))