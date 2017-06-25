const User = require('../models/userModel');
      
module.exports = (router) => {
    router.post('/reg-pannel', (req, res) => {
      
        const valueCheck = [req.body.ticket, req.body.first_name, req.body.last_name, req.body.email, req.body.password],
              valueCheckInfo = ["ticket option", "First name", "Last Name", "e-mail", "password"];
        let valueCounter = 0;
            console.log(req.body.ticket  + '<---')
              for(let i = 0; i< valueCheck.length; i++) {
                  if (!valueCheck[i]) {
                     res.json({ success: false, message: 'Please set your ' + valueCheckInfo[i]}); 
                  } else {
                      valueCounter++;
                  }
              }
              if(valueCounter === valueCheck.length) {
                let user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    ticket: req.body.ticket,
                    textarea_1: req.body.textarea_1 ? req.body.textarea_1 : 'null',
                    textarea_2: req.body.textarea_2 ? req.body.textarea_2 : 'null'
                })
            user.save((err) => {
                if(err) {    
                    if(err.code === 11000) {
                       res.json({success: false, message : "User is there !!: "});
                    } else {

                        if(err.errors) {
                           let basicError = [err.errors.email, err.errors.first_name, err.errors.last_name, err.errors.password]        

                            for (let e = 0 ;e <basicError.length; e++) {
                                console.log(basicError[e]);
                                if(basicError[e]) {
                                res.json({success: false, message: basicError[e].message});
                                return;
                              }
                          }
                        }
                    }
                } else {
                    res.json({success: true, message: "good job you are Registred"});
                }
            })
        } else {
            res.json({success: false, message : "User is there !!: "});
        }  
    });
    return router;
}