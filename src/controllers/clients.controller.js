const clientsController = {}
const Client = require('../models/Client')
clientsController.renderClientForm = async (req,res) => {
    res.render('clients/new-client')
}

clientsController.createClientForm = async (req,res) => {
    console.log(req.body)
    const {name,email,phone,description,nroidentidad}  = req.body
    const newClient = new Client({name,email,phone,description,nroidentidad})
    newClient.user = req.user.id
    await newClient.save()
    req.flash('success_msg','Cliente agregado')
    res.redirect('/clients')
}
clientsController.renderClients = async (req,res) => {
    const clients = await Client.find({user : req.user.id}).sort({createdAt: 'desc'})
    res.render('clients/all-clients',{clients})
}

clientsController.renderEditForm = async (req,res) => {
    const {id} = req.params
    const client = await Client.findById(id)
    if(client.user !== req.user.id){
        return res.redirect('/clients')
    }
    console.log(client)
    res.render('clients/edit-client',{client})
}

clientsController.updateClient = async  (req,res) => {
    console.log(req.body)
    const {name,phone,email,description,nro_identidad} =  req.body
    await Client.findByIdAndUpdate(req.params.id, {name,phone,email,description,nro_identidad})
    req.flash('success_msg','Cliente actualizado correctamente')
    res.redirect('/clients')
}

clientsController.deleteClient = async (req,res) => {
    const {id} = req.params
    const client = await Client.findByIdAndDelete(id)
    res.redirect('/clients')
}


module.exports = clientsController