const jwt = require('jsonwebtoken')
// ===========================================

const JWT_SECRET = process.env.JWT_SECRET

const authentication = (req,res,next) => {
    let token = req.cookies.token

    if(token){

        try {
            let tokenVerified = jwt.verify(token,JWT_SECRET)
            res.status(200)
            next()
        } catch (error) {
            res.status(403)
            res.render('errorPage',{message:`Access denied,login to use it!`, url:"/admin/"})
        }
    }else{
        res.status(403)
        res.render('errorPage',{message:`Access denied,login to use it!`,url:"/admin/"})
    }
}

module.exports = authentication