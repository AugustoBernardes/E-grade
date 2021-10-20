const express = require('express')
const router = express.Router()
// ===========================================
// Controllers
const {loadStudentPage} = require('../controllers/studentsController')

// ===========================================

// GET
router.get('/', loadStudentPage)



module.exports = router