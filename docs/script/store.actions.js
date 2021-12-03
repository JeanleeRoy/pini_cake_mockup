// This file depends on store.menu.js and store.products.js

const $min_price = document.getElementById('flt-price-from');
const $max_price = document.getElementById('flt-price-to');

let modProducts = baseProducts;
// Flag to check for any cahnges to the products
let isChanged = false;

const cleanContainer = () => $storeContainer.textContent = '';

const setChanges = (products) => {
    cleanContainer();
    displayProducts(products);
    modProducts = products;
    isChanged = true;
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            hideSubmenus();
            hideMobileOptions();
        }, 180);
    } else {
        hideSubmenus();
    }
}

const handleFilter = (option, value) => {
    let result = baseProducts;
    result = filterByFeature(option, value, result);
    setChanges(result);
}

const filterByFeature = (feature, value, products) => {
    let result = products.filter(product => {
        if (feature === 'flavor')
        return product.flavors[value];
        if (feature === 'filling')
        return product.fillings[value];
        if (feature === 'size')
        return product.sizes_detail[value].state;
    })
    return result;
}

const setPriceValues = (min, max) => {
    $min_price.value = min;
    $max_price.value = max;
}

const handlePriceFilter = (event) => {
    event.preventDefault();
    min = parseFloat($min_price.value) || 10;
    max = parseFloat($max_price.value);
    let products = baseProducts;
    let result = filterByPrice(products, min, max);
    setChanges(result);
}

const filterByPrice = (products, min_, max_) => {
    if (min_ > max_) {
        let aux = min_; min_ = max_;
        max_ = aux;
        setPriceValues(min_, max_);
    }
    let result = products.filter(product =>
        product.prices.base >= min_
    )
    if (max_)
        result = result.filter(product =>
            product.prices.base <= max_
        )
    return result;
}
