const express = require('express')
const router = express.Router()
// ===========================================
// Controllers
const {loadAdminPage,login} = require('../controllers/adminController')

// ===========================================

// GET
router.get('/', loadAdminPage )

// POST
router.post('/login',login)



module.exports = router