


const loadAdminPage = (req,res) => {
    res.status(200)
    res.render('adminPage')
}

const login = (req,res) => {
    let password = req.body.password
    res.send(password)
}


module.exports = {loadAdminPage,login}