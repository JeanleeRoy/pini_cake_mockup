const menu_btn = document.getElementById('menu-btn');
const menu_items = document.getElementById('menu-items');

menu_btn.addEventListener('click', () => {
    menu_items.classList.toggle('active');
})