const usersController = {}


usersController.signup = (req,res)=> {
    const errors = []
    const {name,email,password,confirm_password} = req.body
    if(password != confirm_password){
        errors.push({text:'Las contraseñas no coinciden'})
    }
    if(password.length < 6){
        errors.push({text:"Las contraseñas deben ser mayores a 6 caracteres"})
    }
    if(errors.length > 0){
        res.render('index',{errors,
        name,
        email,
        confirm_password,
        password
        })
    }else{
        res.send("Registrado correctamente")
    }
    console.log(req.body)
}



usersController.signin = (req,res) => {
    res.send('signin')
}

usersController.logout = (req,res) => {
    res.send('logout')
}

module.exports = usersController
