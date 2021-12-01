const menuOption = document.getElementById('menuOption');
const menuFilters = document.getElementById('storeFilters');
const optionText = document.getElementById('storeOptionText');
const filters = document.getElementsByClassName('filter-setting');
const orderProds = document.getElementById('orderProds')

const toggleSubmenu = (submenuId) => {
    for (let flt of filters) {
        if (flt.id === submenuId)
            flt.classList.toggle('hide');
        else flt.classList.add('hide');
    }
    if (submenuId === 'orderProds')
        orderProds.classList.toggle('hide');
    else orderProds.classList.add('hide');
}

const showMobileOptions = (option) => {
    document.body.classList.add('stop-scroll');
    menuOption.style.display = 'flex';
    if (option === 'filters') {
        menuFilters.style.display = 'flex';
        optionText.innerText = 'Filtrar';
    }
    if (option === 'order') {
        orderProds.classList.remove('hide');
        optionText.innerText = 'Ordenar';
    }
}

const hideMobileOptions = () => {
    document.body.classList.remove('stop-scroll');
    menuOption.style.display = 'none';
    if (optionText.innerText === 'Filtrar')
        menuFilters.style.display = 'none';
    if (optionText.innerText === 'Ordenar')
        orderProds.classList.add('hide');
}

const hideSubmenus = () => {
    for (let flt of filters)
        flt.classList.add('hide');
    if (!orderProds.classList.contains('hide'))
    orderProds.classList.add('hide');
}

// Check if the click is outside the menu options
const verifyClickOutside = (e) => {
    if (window.innerWidth > 768) {
        if (!e.target.classList.contains('store') && 
            !e.target.parentNode.classList.contains('store'))
            hideSubmenus();
    }
}

document.addEventListener('click', verifyClickOutside);

// Handle submenu mobile side effect
window.onresize = (evnt) => {
    hideSubmenus();
    if (document.body.classList.contains('stop-scroll'))
        document.body.classList.remove('stop-scroll');
    if (window.innerWidth > 768) {
        menuOption.style.display = 'flex';
        menuFilters.style.display = 'flex';
    } else {
        menuOption.style.display = 'none';
        menuFilters.style.display = 'none';
    }
}
