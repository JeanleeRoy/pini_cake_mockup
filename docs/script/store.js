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
