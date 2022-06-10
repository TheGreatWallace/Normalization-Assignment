const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('login',{

    })
})


router.post('/auth',(req,res)=>{
   let email = req.body.email
   let password = req.body.password
   let authQuery = `SELECT * FROM users WHERE email = ? AND password = ?`

   db.query(authQuery,[email,password],(err,rows)=>{
       if (err) throw err

       if(rows.length <= 0){
           req.session.loggedIn = false
           res.redirect('/login')
       }else{
           req.session.loggedIn = true
           req.session.user_id = rows[0].id
           req.session.email = rows[0].email
           req.session.code = rows[0].password
           res.redirect('/index')
       }
   })

})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})
module.exports = router;