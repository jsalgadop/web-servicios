var enlace_api = 'https://dyxg5db8xd.execute-api.us-east-1.amazonaws.com'

var solicitar_lista=  (event) => {
        fetch(enlace_api + '/dev/servicios/listar')
        .then(r => r.json())
        .then(json => {
            var servicios = json.servicios
            var table = document.getElementById("table_body");
            for (let index = 0; index < servicios.length; index++) {
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = servicios[index]["servicio_id"];
                cell2.innerHTML = servicios[index]["datos"]["descripcion"];
                cell3.innerHTML = servicios[index]["datos"]["unidad"];
                cell4.innerHTML = servicios[index]["datos"]["precio"];
            }
        })
        .catch(err => {
            console.log(err);
        })  
};

if(document.forms[0]){
    const element = document.querySelector('form');
    element.addEventListener('submit', event => {
    event.preventDefault();
        var servicio_id = document.getElementById("servicio_id").value;
        var descripcion = document.getElementById("descripcion").value;
        var unidad = document.getElementById("unidad").value;
        var precio = document.getElementById("precio").value;
        var data = {
            servicio_id : servicio_id,
            datos: {
                descripcion: descripcion,
                precio: precio,
                unidad: unidad,
            }
        }
        fetch(enlace_api + '/dev/servicios/crear' ,{
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(data)
        })
        .then(function(response) {
            if(response.ok) {
                location.href ="index.html";              
            } else {
                throw "Error al guardar.";
            }        
        })
        .catch(err => {
            console.log(err);
        })  
    });
}
