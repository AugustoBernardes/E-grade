const adminUser = require('../model/adminModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
// ===========================================

const loadAdminPage = (req,res) => {
    res.status(200)
    res.render('adminPage')
}

const login = async (req,res) => {
    let password = req.body.password.trim()
    
    try {

        let validatePassword = await adminUser.findOne({password:password})

        if(validatePassword){
            let token = jwt.sign({userPassword:password},JWT_SECRET)

            res.cookie('token', token, {maxAge:28800000, httpOnly: true})
            res.status(200)
            res.render('adminHome')
        }else{
            res.status(400)
            res.render('errorPage',{message:'Password incorrect !', url:"/admin/"})
        }
        
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:'Password incorrect !', url:"/admin/"})
    }

}

const loadAllStudentsPage = (req,res) => {
    res.status(200)
    res.render('allStudents')
}

const loadAddStudentPage = (req,res) => {
    res.status(200)
    res.render('addStudent')
}


module.exports = {loadAdminPage,login,loadAllStudentsPage,loadAddStudentPage}