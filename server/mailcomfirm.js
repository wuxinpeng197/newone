const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

module.exports={sendMail(from, to, subject, html){
    return new Promise((resolve,reject)=>
        {
            transporter.sendMail({from,subject,to,html }, (err,info)=>{
            if (err) reject(err);
            resolve(info);

        });
})
}
}