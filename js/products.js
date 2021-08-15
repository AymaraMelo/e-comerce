//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            var products_array = [];
            products_array = resultObj.data;
            let element = document.getElementById("products");
            let cargar_html = "";

            for(let i=0; i<products_array.length ; i++){
                let product = products_array[i];

                cargar_html += `
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm custom-card">
                            <img class="bd-placeholder-img card-img-top"  src="` + product.imgSrc + `">
                            <h3 class="m-3">` + product.name + `</h3>
                            <div class="card-body">
                                <p class="card-text"> ` + product.description + `</p>
                                <br>
                                <p class="card-text"> ` + product.currency + " " + product.cost + `</p>
                            </div>
                        </div>
                    </div> `
            }

            element.innerHTML += cargar_html;
        }
    });
});