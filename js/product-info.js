//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var dataProduct="";
var dataComment="";
var value = 0;

//Guardo el producto seleccionado
function setProduct(id){
    localStorage.setItem("productId", JSON.stringify({productId: id}));
}

function showInfoProduct(){
    document.getElementById("productName").innerHTML = dataProduct.name;
    document.getElementById("productDescription").innerHTML = dataProduct.description;
    document.getElementById("productCost").innerHTML = dataProduct.currency + " "+ dataProduct.cost;
    document.getElementById("productCant").innerHTML = dataProduct.soldCount;
    document.getElementById("productCategory").innerHTML = dataProduct.category;

    let img = document.getElementById("productImagesGallery");
    let content = "";

    for(let i=0; i<dataProduct.images.length; i++){

        if(i==0){
            content += `
                <div class="carousel-item active">
                    <img src="`+dataProduct.images[i]+`" class="d-block w-100" alt="">
                </div>`
        }else{
            content += `
                    <div class="carousel-item">
                        <img src="`+dataProduct.images[i]+`" class="d-block w-100" alt="">
                    </div>`
        }
    }
    img.innerHTML = content;

    let related = document.getElementById("related-products");
    
    for(let j=0; j<dataProduct.relatedProducts.length; j++){
        let product = dataProduct.relatedProducts[j];
        let url_product = INFO_BYPRODUCT + product + '.json';   
        let cargar_html = ""; 

        getJSONData(url_product).then(function (resultObj) {
            if (resultObj.status === "ok") {
                
                productRelated = resultObj.data;

                cargar_html += `
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm custom-card">
                            <a href="product-info.html" class=" list-group-item-action" onclick="setProduct(`+  (product) +`)">
                                <img class="bd-placeholder-img card-img-top"  src="` + productRelated.images[0] + `">
                                <h3 class="m-3">` + productRelated.name + `</h3>
                            </a>
                        </div>
                    </div> `
                
                related.innerHTML += cargar_html;
            }
        });
    }
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