const express = require('express');
const req = require('express/lib/request');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const db = require('../app');
const router = express.Router();


router.get('/edit/:id', (req,res)=>{
    const id = req.params.id;

    let sql= `SELECT * FROM bcnf.students WHERE id= ${id}`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.render('student_edit.ejs', { students: result[0]})
    })
})

router.post('/update/:id',(req,res)=>{
    const id = req.params.id;
    let update = {
        student_name: req.body.name,
        student_email: req.body.email,
        student_address: req.body.address
    }

    let sql = `UPDATE bcnf.students SET ? WHERE id = ${id};`;
    db.query(sql,update,(err,results)=>{
        if(!err){
            res.redirect('/')
        }else{
            console.log(err)
        }
    })
})

module.exports = router;