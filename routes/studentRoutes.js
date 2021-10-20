const express = require('express')
const router = express.Router()
// ===========================================
// Controllers
const {loadStudentPage} = require('../controllers/studentsController')

// ===========================================


router.get('/', loadStudentPage)



module.exports = router