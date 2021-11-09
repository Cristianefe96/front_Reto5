function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.121.47:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

function traerInformacionBike() {
    $.ajax({
        url:"http://129.151.121.47:8080/api/Bike/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaBike(response);
        }
    });

}

function pintarRespuestaBike(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Marca</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonBike2" onclick="borrar(' + response[i].id + ')">Borrar Bike!</button></td>';
        myTable+='<td><button class = "botonBike2" onclick="cargarDatosBike(' + response[i].id + ')">Editar Bike!</button></td>';
        myTable+='<td><button class = "botonBike2" onclick="actualizar(' + response[i].id + ')">Actualizar Bike!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaBike").html(myTable);
}

function cargarDatosBike(id) {
    $.ajax({
        dataType: 'JSON',
        url:"http://129.151.121.47:8080/api/Bike/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#Bname").val(item.name);
            $("#Bbrand").val(item.brand);
            $("#Byear").val(item.year);
            $("#Bdescription").val(item.description);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function agregarBike() {

    if($("#Bname").val().length == 0 || $("#Bbrand").val().length == 0 || $("#Byear").val().length == 0 || $("#Bdescription").val().length == 0){
        alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#Bname").val(),
                brand: $("#Bbrand").val(),
                year: $("#Byear").val(),
                description: $("#Bdescription").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/JSON",
                url:"http://129.151.121.47:8080/api/Bike/save",
                data: dataToSend,
                datatype: 'JSON',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    
                    // $("#resultado2").empty();
                    $("#Bname").val("");
                    $("#Bbrand").val("");
                    $("#Byear").val("");
                    $("#Bdescription").val("");
                    
                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}

function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'JSON',
            data: dataToSend,
            url:"http://129.151.121.47:8080/api/Bike/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaBike").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

function actualizar(idElemento) {
    
    if($("#Bname").val().length == 0 || $("#Bbrand").val().length == 0 || $("#Byear").val().length == 0 || $("#Bdescription").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#Bname").val(),
            brand: $("#Bbrand").val(),
            year: $("#Byear").val(),
            description: $("#Bdescription").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'JSON',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.121.47:8080/api/Bike/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaBike").empty();
                listarSkate();
                alert("se ha Actualizado Correctamente!")

                $("#resultado2").empty();
                $("#id").val("");
                $("#Bname").val("");
                $("#Bbrand").val("");
                $("#Byear").val("");
                $("#Bdescription").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}