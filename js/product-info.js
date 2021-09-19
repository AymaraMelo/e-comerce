//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var dataProduct="";
var dataComment="";
var value = 0;

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


function getDataComment(){
    let user = sessionStorage.getItem("userLogin");
    let date = new Date();
    let content = "";
    
    content += `
    <div class="list-group-item">
        <div class="row">
        <div class="col-2">
            <div class="rating"> `+ setStars(value) + ` </div>
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">`+ user +`</h5>
            <small class="text-muted">`+ date +`</small>
            </div>
            <p class="mb-1">`+ document.getElementById("comment").value +`</p>
        </div>
        </div>
    </div>`

    document.getElementById("cat-list-container").innerHTML += content;
}

function setValue(v){
    value=v;
}

function setStars(cant){
    let result ="";

    for(let i=0; i<5; i++){
        if(i<cant){
            result += `<i class="rating_star fa fa-star "></i>`
        } else {
            result += `<i class="rating_star far fa-star"></i>`
        }
    }

    return result;
}

function showComments(){
    let content = "";
    let element = document.getElementById("cat-list-container");

    for(let i=0; i<dataComment.length; i++){
        let comment = dataComment[i];

        content += `
            <div class="list-group-item">
                <div class="row">
                <div class="col-2">
                    <div class="rating"> `+ setStars(comment.score) + ` </div>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">`+ comment.user +`</h5>
                    <small class="text-muted">`+ comment.dateTime +`</small>
                    </div>
                    <p class="mb-1">`+ comment.description +`</p>
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