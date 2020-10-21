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
}

clientsController.updateClient = (req,res) => {
}

clientsController.deleteClient = (req,res) => {
}


module.exports = clientsController