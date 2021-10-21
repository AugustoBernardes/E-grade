const express = require('express')
const router = express.Router()
// ===========================================
// Controllers
const {loadAdminPage,login,loadAllStudentsPage,loadAddStudentPage,addNewStudent,loadHomePage} = require('../controllers/adminController')
const authentication = require('../controllers/authentication')
// ===========================================

// GET
router.get('/', loadAdminPage )
router.get('/home',authentication, loadHomePage)
router.get('/addstudent',authentication, loadAddStudentPage)
router.get('/allstudents',authentication, loadAllStudentsPage)

// POST
router.post('/login',login)
router.post('/addstudent',addNewStudent)



module.exports = router
