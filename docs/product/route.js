const baseUrl = 'https://raw.githubusercontent.com/JeanleeRoy/data/master/pinicake/shortdata.json';

let path = window.location
let prodImage = document.getElementById('product-image');
let $detail = document.getElementById('product-detail')
let product;

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getList = (opt) => {
    textList = "";
    for (const key in product[opt]) {
        if (product[opt][key]) {
            base_name = key.replace(/_/g, " ");
            textList += capitalize(base_name) + ", ";
        }
    }
    return textList.slice(0,textList.length-2);
}

const fetchProducts = (slug) => {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            data.map(prod => {
                if (prod.slug == slug)
                product = prod;
            })
            if (!product) {
                console.log("404");
                return;
            }
            let price = formatter.format(product.prices.base);
            console.log(price);
            prodImage.src += product.images[0].src;
            $detail.querySelector('#product-name').innerText = product.name;
            $detail.querySelector('#price').innerText = price;
            $detail.querySelector('#description').innerText = product.description;
            $detail.querySelector('#flavors').innerText = getList('flavors');
            $detail.querySelector('#fillings').innerText = getList('fillings');
        })
        .catch(err => {
            console.log(err);
        })
}

const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
});


/*  URL  */

if (path.hash && path.hash.slice(0,2) == '#/') {
    slug = path.hash.slice(2);
    fetchProducts(slug);
} else {
    //console.log(path.href)
    //console.debug("Upss! No se encontró ningún producto")
}