const baseUrl = 'https://raw.githubusercontent.com/JeanleeRoy/data/master/pinicake/shortdata.json';

const $storeContainer = document.getElementById('store-container');
const $template = document.getElementById('product-template').content;
const $fragment = document.createDocumentFragment();

let baseProducts = []

const fetchProducts = () => {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            baseProducts = data;
            displayProducts(data);
        })
        .catch(err => {
            console.log(err);
        })
}

const displayProducts = (data) => {
    data.forEach(product => {
        let price = formatter.format(product.prices.base);
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