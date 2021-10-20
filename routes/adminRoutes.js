const express = require('express')
const router = express.Router()
// ===========================================
// Controllers
const {loadAdminPage,login,loadAllStudentsPage,loadAddStudentPage} = require('../controllers/adminController')
const authentication = require('../controllers/authentication')
// ===========================================

// GET
router.get('/', loadAdminPage )
router.get('/addstudent',authentication, loadAddStudentPage)
router.get('/allstudents',authentication, loadAllStudentsPage)

// POST
router.post('/login',login)



module.exports = router