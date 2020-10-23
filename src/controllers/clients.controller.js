const clientsController = {}
const Client = require('../models/Client')


clientsController.createClientForm = async (req,res) => {
    console.log(req.body)
    const {name,email,phone,description}  = req.body
    const newClient = new Client({name,email,phone,description})
    await newClient.save()
    res.redirect('/clients')
}
clientsController.renderClients = async (req,res) => {
    const clients = await Client.find()
    res.render('clients/clients',{clients})
    
}

clientsController.renderEditForm = (req,res) => {
    console.log(req.params) 
    res.render('clients/client')
}

clientsController.updateClient = (req,res) => {
}

clientsController.deleteClient = async (req,res) => {
    const {id} = req.params
    const client = await Client.findByIdAndDelete(id)
    res.redirect('/clients')
}


module.exports = clientsController