const User = require('../models/userModel');
      
module.exports = (router) => {
    router.post('/reg-pannel', (req, res) => {

        const valueCheck = [req.body.firstname, req.body.lastname, req.body.email, req.body.password],
              valueCheckInfo = ["First name", "Last Name", "e-mail", "password"];
        let valueCounter = 0;

              for(let i = 0; i< valueCheck.length; i++) {
                  if (!valueCheck[i]) {
                     res.json({ success: false, message: 'Please insert your ' + valueCheckInfo[i]}); 
                  } else {
                      valueCounter++;
                  }
              }
               
              if(valueCounter === valueCheck.length) {
                let user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    infoone: req.body.infoone ? req.body.infoone : '',
                    infotwo: req.body.infotwo ? req.body.infotwo : ''
                })
           
            user.save((err) => {
                if(err) {    
                    if(err.code === 11000) {
                       res.json({success: false, message : "User nod set: "});
                    } else {
                        res.json({success: false, message : "User nod set: " + err});
                    }
                } else {
                    res.json({success: true, message: "good job you are Registred"});
                }
            })

            res.send('hello');
        }  

        console.log(req.body)
    });
    return router;
}