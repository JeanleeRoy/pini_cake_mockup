const baseUrl = 'https://raw.githubusercontent.com/JeanleeRoy/data/master/pinicake/shortdata.json';

const $storeContainer = document.getElementById('store-container');
const $template = document.getElementById('product-template').content;
const $fragment = document.createDocumentFragment();

let listOptions = ['size','filling','flavor']

let baseProducts = []
let colectionUrl = window.location.href;
let url = new URL(colectionUrl);



/* --------- URL methods --------- */


const verifyUrlPath = () => {
    for (const [key, value] of url.searchParams.entries()) {
        console.log(key + ": ", value);
    }
}

const setUrlPriceRange = (min, max) => {
    let range = min.toString() + "-" + (max ? max.toString() : '');
    handlePriceIndicador(min, max);
    if (min > 15 || max) setUniqueUrlParam('price', range);
    else rmUniqueUrlParam('price');
}

const setUniqueUrlParam = (option, value) => {
    url.searchParams.set(option, value);
    window.history.replaceState({}, document.title, url);
}

const rmUniqueUrlParam = (option) => {
    if (!url.searchParams.has(option)) return;
    url.searchParams.delete(option);
    window.history.replaceState({}, document.title, url);
}

const setUrlParam = (option, value) => {
    value = value.toString();
    if (!listOptions.includes(option)) return;
    if (url.searchParams.getAll(option).includes(value)) return;
    url.searchParams.append(option, value);
    window.history.replaceState({}, document.title, url);
}

const removeUrlParam = (option, value) => {
    value = value.toString();
    if (!url.searchParams.has(option)) return;
    let values = url.searchParams.getAll(option);
    url.searchParams.delete(option);
    for (const v of values) {
        if (v !== value) 
            url.searchParams.append(option, v);
    }
    window.history.replaceState({}, document.title, url);
}



/* --------- Product methods --------- */


const fetchProducts = () => {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            baseProducts = data;
            verifyUrlPath();
            displayProducts(data);
        })
        .catch(err => {
            console.log(err);
        })
}

const displayProducts = (data) => {
    data.forEach(product => {
        let price = formatter.format(product.prices.base);
        $template.querySelector("a").href = "/product/#/"+product.slug;
        $template.querySelector(".product-image").src = product.images[0].src;
        $template.querySelector(".product-name").innerText = product.name;
        $template.querySelector(".main-price").innerText = price;
        let clone = document.importNode($template, true);
        $fragment.appendChild(clone);
    });
    $storeContainer.appendChild($fragment);
}

const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
});

fetchProducts();