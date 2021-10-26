const express = require('express')
const router = express.Router()
// ===========================================
// Controllers
const {loadAdminPage,login,loadAllStudentsPage,loadAddStudentPage,addNewStudent,loadHomePage,loadGradesMenu,loadEditPage,updateGrade,confirmingDeleteStudent,deleteStudent,confirmingCleanGrades,cleanAllGrades,searchStudent} = require('../controllers/adminController')
const authentication = require('../controllers/authentication')
// ===========================================

// GET
router.get('/', loadAdminPage )
router.get('/home',authentication, loadHomePage)
router.get('/addstudent',authentication, loadAddStudentPage)
router.get('/allstudents',authentication, loadAllStudentsPage)
router.get('/gradesmenu/:id',authentication,loadGradesMenu)
router.get('/updategrade/:id/:type',authentication,loadEditPage)
router.get('/confirmingdelete/:id',authentication,confirmingDeleteStudent)
router.get('/confirmingcleangrades',authentication,confirmingCleanGrades)

// POST
router.post('/login',login)
router.post('/search',searchStudent)
router.post('/addstudent',addNewStudent)
router.post('/cleanthegrades',cleanAllGrades)
router.post('/updategrade/:id/:type',updateGrade)

// DELETE
router.delete('/:id',deleteStudent)



module.exports = router
