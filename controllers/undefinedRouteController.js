
const undefinedRoute = (req,res) => {
    res.status(404)
    res.render('errorPage', {message:'404 route undefined!', url:"/"})
}

module.exports = undefinedRoute