//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var dataProduct="";
var dataComment="";

function showInfoProduct(){
    document.getElementById("productName").innerHTML = dataProduct.name;
    document.getElementById("productDescription").innerHTML = dataProduct.description;
    document.getElementById("productCost").innerHTML = dataProduct.currency + " "+ dataProduct.cost;
    document.getElementById("productCant").innerHTML = dataProduct.soldCount;
    document.getElementById("productCategory").innerHTML = dataProduct.category;

    let img = document.getElementById("productImagesGallery");
    let content = "";

    for(let i=0; i<dataProduct.images.length; i++){

        content += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="`+dataProduct.images[i]+`" alt="">
                </div>
            </div>`

    }
    img.innerHTML = content;
}


function showComments(){
    let content = "";
    let element = document.getElementById("cat-list-container");

    for(let i=0; i<dataComment.length; i++){
        let comment = dataComment[i];

        content += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                <div class="col-3">
                    <img src="" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Persona</h5>
                    <small class="text-muted">Soy una fecha</small>
                    </div>
                    <p class="mb-1">Soy una descripcion</p>
                </div>
                </div>
            </div>`
    }
    element.innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function(e){
    let id = JSON.parse(localStorage.getItem("productId")).productId;
    let url = INFO_BYPRODUCT + id + '.json';
    let comments = INFO_COMMENTS + id + "comments.json";

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            
            dataProduct = resultObj.data;
            showInfoProduct();
        }
    });

    getJSONData(comments).then(function (resultObj) {
        if (resultObj.status === "ok") {
            
            dataComment = resultObj.data;
            showComments();
        }
    });
});