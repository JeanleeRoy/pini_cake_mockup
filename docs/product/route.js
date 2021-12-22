const baseUrl = 'https://raw.githubusercontent.com/JeanleeRoy/data/master/pinicake/shortdata.json';

const $container = document.getElementById('product-container');
const $template = document.getElementById('product-template').content;
const $fragment = document.createDocumentFragment();
const $loader = document.getElementById('loading');
const $error = document.getElementById('error');

let path = window.location;
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
                if (prod.slug == slug) product = prod;
            })
            if (!product) {
                showNotFound();
                return;
            }
            let price = formatter.format(product.prices.base);
            $template.querySelector('#product-image').src += product.images[0].src;
            $template.querySelector('#product-image').alt = product.slug;
            $template.querySelector('#product-name').innerText = product.name;
            $template.querySelector('#price').innerText = price;
            $template.querySelector('#description').innerText = product.description;
            $template.querySelector('#flavors').innerText = getList('flavors');
            $template.querySelector('#fillings').innerText = getList('fillings');
            let clone = document.importNode($template, true);
            $fragment.appendChild(clone);
            document.title = product.name;
            setTimeout(() => {
                hideLoading();
                $container.appendChild($fragment);
            }, 400);
        })
        .catch(err => {
            showNotFound();
        })
}

const hideLoading = () => {
    $loader.style.display = "none";
}

const showNotFound = () => {
    setTimeout(() => {
        hideLoading();
        $error.style.display = "block";
    }, 800);
} 


/*  URL  */

if (path.hash && path.hash.slice(0,2) == '#/') {
    slug = path.hash.slice(2);
    fetchProducts(slug);
} else {
    showNotFound();
}

window.addEventListener('hashchange', () => {
    window.location.reload(true);
})


/*  UTtility  */

const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
});
