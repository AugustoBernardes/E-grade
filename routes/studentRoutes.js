const express = require('express')
const router = express.Router()
// ===========================================
// Controllers
const {loadStudentPage,findStudentGrade} = require('../controllers/studentsController')

// ===========================================

// GET
router.get('/', loadStudentPage)

// POST
router.post('/findgrade',findStudentGrade)



module.exports = router