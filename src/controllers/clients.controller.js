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

clientsController.renderEditForm = async (req,res) => {
    const {id} = req.params
    const client = await Client.findById(id)
    console.log(client)
    res.render('clients/client',{client})
}

clientsController.updateClient = async  (req,res) => {
    console.log(req.body)
    const {name,phone,email,description,nro_identidad} =  req.body
    await Client.findByIdAndUpdate(req.params.id, {name,phone,email,description,nro_identidad})
    res.redirect('/clients')
}

clientsController.deleteClient = async (req,res) => {
    const {id} = req.params
    const client = await Client.findByIdAndDelete(id)
    res.redirect('/clients')
}


module.exports = clientsController