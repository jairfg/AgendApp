const nameInput = document.querySelector('#name');
const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');
const descriptionInput = document.querySelector('#description');
const formCita = document.querySelector('#nueva-cita');


window.onload = () => {
    const alert = document.querySelector( '[role = "alert"]')
    if(alert) {
        setTimeout(()=> {
            alert.remove()
        }, 3000)
    }
}

function confirmacion(){
    let opcion = confirm("Estas seguro que quieres eliminar?")
    if(opcion){
        return true
    }else{
        return false
    }
 
}

function previewImage(event){
    let reader = new FileReader();
    let imageField = document.getElementById("image-field");
    reader.onload = function () {
        if(reader.readyState === 2){
            imageField.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0])
}

function myFunction(id,name,date,time,description) {
    const object = {id,name,date,time,description}

    nameInput.value = name;
    dateInput.value = date;
    timeInput.value = time;
    descriptionInput.value = description;

    formCita.querySelector('button[type = "submit"]').textContent = 'Guardar Cambios'

}