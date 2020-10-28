const usersController = {}

usersController.renderSignupForm = (req,res)=> {
    res.render('users/signup')
}

usersController.signup = (req,res)=> {
    res.send('signup')
}

usersController.renderSigninForm = (req,res)=> {
    res.render('users/signin')
}

usersController.signin = (req,res) => {
    res.send('signin')
}

usersController.logout = (req,res) => {
    res.send('logout')
}

module.exports = usersController
