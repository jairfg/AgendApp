const usersController = {}


usersController.signup = (req,res)=> {
    console.log(req.body)
}



usersController.signin = (req,res) => {
    res.send('signin')
}

usersController.logout = (req,res) => {
    res.send('logout')
}

module.exports = usersController
