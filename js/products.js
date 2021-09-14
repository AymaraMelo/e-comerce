const ORDER_ASC_BY_COST = "Menor precio";
const ORDER_DESC_BY_COST = "Mayor precio";
const ORDER_DESC_BY_SOLD = "Mas vendidos";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;


//Muestra los productos
function showProducts() {
    var products_array = currentProductsArray;
    let element = document.getElementById("products");
    let cargar_html = "";

    for (let i = 0; i < products_array.length; i++) {
        let product = products_array[i];

        /* Se cargan solamente los productos que se encuentran dentro del rango de precios definido, en caso de que
        no se haya definido un rango de precios (minCount == undefined) se listan todos. */

        /* */
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            if ((buscar == undefined || product.description.toLowerCase().indexOf(buscar) != -1) || product.name.toLowerCase().indexOf(buscar) != -1) {

                cargar_html += `
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm custom-card">
                            <img class="bd-placeholder-img card-img-top"  src="` + product.imgSrc + `">
                            <h3 class="m-3">` + product.name + `</h3>
                            <div class="card-body">
                                <p class="card-text"> ` + product.description + `</p>
                                <p class="card-text"> ` + "Cantidad vendidos " + product.soldCount + `</p>
                                <p class="card-text"> ` + product.currency + " " + product.cost + `</p>
                            </div>
                        </div>
                    </div> `
            }
        }
    }

    element.innerHTML = cargar_html;
}

//Ordena los productos del segundo parámetro según el criterio indicado en el primer parámetro.
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_SOLD) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }
    return result;
}

//Mostrar y ordenar productos.
function sortAndShowProducts(sortCriteria) {
    currentSortCriteria = sortCriteria;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            showProducts();
        }
    });

    //Usuario solicita ordenar de menor a mayor precio (hace click sobre el boton radio).
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });
    //Usuario solicita ordenar de mayor a menor precio (hace click sobre el boton radio).
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });
    //Usuario solicita ordenar por más vendidos (hace click sobre el boton radio).
    document.getElementById("sortVendidos").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_SOLD);
    });

    //Usuario solicita ordenar segun rango de precios
    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio del producto.
        minCount = document.getElementById("rangeFilterCostMin").value;
        maxCount = document.getElementById("rangeFilterCostMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            //parsea la cadena de entrada a un entero.
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            //parsea la cadena de entrada a un entero.
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProducts();
    });

    document.getElementById("buscar").addEventListener('input', function () {

        buscar = document.getElementById("buscar").value.toLowerCase();
        showProducts();

    });


    //Usuario selecciona "limpiar" para borrar los criterios de rango
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProducts();
    });
});