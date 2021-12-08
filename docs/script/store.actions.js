// This file depends on store.menu.js and store.products.js

const $min_price = document.getElementById('flt-price-from');
const $max_price = document.getElementById('flt-price-to');
const activeOptions = document.getElementById('activeOptions');

let modProducts = [];
// Flag to check for any cahnges to the products
let isChanged = false;

let prices = {
    min: 15,
    max: null
}
let order = 'desc';
let contOptions = 0;

let options = [
    /*{
        id: 12
        option: 'flavor',
        value: 'chocolate'
    }*/
]

const cleanContainer = () => $storeContainer.textContent = '';

const setChanges = (products) => {
    cleanContainer();
    displayProducts(products);
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
    let result = isChanged ? modProducts : baseProducts;
    addOption(option, value);
    result = filterByFeature(option, value, result);
    modProducts = result;
    result = filterByPrice(result, prices.min, prices.max);
    setChanges(result);
    isChanged = true;
    displayOptions();
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
    prices.min = min;
    prices.max = max;
}

const handlePriceFilter = (event) => {
    event.preventDefault();
    min = parseFloat($min_price.value) || 10;
    max = parseFloat($max_price.value);
    let products = resultOptions();
    let result = filterByPrice(products, min, max);
    setChanges(result);
}

const filterByPrice = (products, min_, max_) => {
    if (max_ && min_ > max_) {
        let aux = min_; min_ = max_;
        max_ = aux;
    }
    setPriceValues(min_, max_);
    let result = products.filter(product =>
        product.prices.base >= min_
    )
    if (max_)
        result = result.filter(product =>
            product.prices.base <= max_
        )
    return result;
}


/*---- Handle Options ----*/

const addOption = (opt, val) => {
    for (const optn of options) {
        if (optn.option === opt && optn.value===val)
            return;
    }
    options.push({
        id: 'opt-'+contOptions++,
        option: opt,
        value: val
    });
}

const removeOption = (id) => {
    result = baseProducts;
    options = options.filter(opt => {
        if (opt.id !== id) {
            result = filterByFeature(opt.option, opt.value, result);
            return true;
        }
        else return false;
    });
    modProducts = result;
    result = filterByPrice(result, prices.min, prices.max);
    displayOptions();
    setChanges(result);
}

const resultOptions = () => {
    result = baseProducts;
    options.map(opt => {
        result = filterByFeature(opt.option, opt.value, result);
    })
    return result;
}

const optionElem = (opt) => {
    return `
    <a class="act-opt" id="${opt.id}" onclick="removeOption('${opt.id}')">
        <span>${opt.value.replace(/_/g, " ")}</span>
        <svg class="close-icon" width="16" height="16" viewBox="0 0 16 16"><path transform="translate(5 3)" fill="#fff" d="M8.594.552l.855.842L5.87 5.022 9.45 8.6l-.849.848-3.572-3.572-3.521 3.572-.855-.842L4.18 5.028.552 1.4l.849-.848 3.621 3.62L8.594.553z"></path></svg>
    </a>
    `
}

const displayOptions = () => {
    activeOptions.textContent = '';
    for (const opt of options) {
        activeOptions.innerHTML += optionElem(opt);
    }
}

displayOptions();


/*---- Sort Option ----*/

const handleSort = (opt) => {
    console.log("in")
    let result = resultOptions();
    result = filterByPrice(result, prices.min, prices.max);
    result = applySort(opt, result);
    setChanges(result);
}

const applySort = (opt, products) => {
    let c;
    let result = products.sort((a,b) => {
        if (opt === 'asc')
            return a.prices.base - b.prices.base
        if (opt === 'desc')
            return b.prices.base - a.prices.base
    })
    return result;
}
