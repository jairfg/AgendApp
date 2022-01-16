const helpers = {}

//agregando un metodo al objeto
helpers.aleatorio = () => {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = 'contact'
    for(let i = 0; i<6;i++){
        randomString = randomString + caracteres.charAt (Math.floor(Math.random()*caracteres.length))
    }
    return randomString
}

module.exports = helpers

