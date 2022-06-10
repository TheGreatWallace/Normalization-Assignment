const express = require('express');
const db = require('../app');
const router = express.Router();


router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;

    let sql= `DELETE * FROM bcnf.students WHERE id= ${id}`;

    db.query(sql, (err, result) => {
        if(!err){
            res.redirect('index.ejs')
        }else{
            console.log(err)
        }
    })
})

module.exports = router;