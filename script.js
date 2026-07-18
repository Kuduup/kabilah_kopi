// ---- MENU DATA ----
const menuData = [
  {name:"Aceh Tubruk", price:7000, cat:"coffee", code:"CF-01"},
  {name:"Bali Tubruk", price:7000, cat:"coffee", code:"CF-02"},
  {name:"Flores Tubruk", price:7000, cat:"coffee", code:"CF-03"},
  {name:"Papua Tubruk", price:7000, cat:"coffee", code:"CF-04"},
  {name:"Toraja Tubruk", price:7000, cat:"coffee", code:"CF-05"},
  {name:"Es Kopi Gula Aren", price:12000, cat:"coffee", code:"CF-06"},
  {name:"Americano", price:15000, cat:"coffee", code:"CF-07"},
  {name:"Espresso", price:8000, cat:"coffee", code:"CF-08"},
  {name:"Mango Squash", price:13000, cat:"noncoffee", code:"NC-01"},
  {name:"Orange Squash", price:13000, cat:"noncoffee", code:"NC-02"},
  {name:"Mineral Water", price:6000, cat:"noncoffee", code:"NC-03"},
  {name:"Ocean Blue", price:13000, cat:"noncoffee", code:"NC-04"},
  {name:"Happy Soda", price:13000, cat:"noncoffee", code:"NC-05"},
  {name:"Milkshake Choco", price:15000, cat:"noncoffee", code:"NC-06"},
  {name:"Lychee Tea", price:15000, cat:"noncoffee", code:"NC-07"},
  {name:"Lemon Tea", price:15000, cat:"noncoffee", code:"NC-08"},
  {name:"Ice Tea", price:8000, cat:"noncoffee", code:"NC-09"},
  {name:"Durian", price:13000, cat:"noncoffee", code:"NC-10"},
  {name:"Taro", price:13000, cat:"noncoffee", code:"NC-11"},
  {name:"Hot Choco", price:13000, cat:"noncoffee", code:"NC-12"},
  {name:"Matcha Latte", price:null, cat:"noncoffee", code:"NC-13"},
  {name:"Chicken Rice Bowl", price:18000, cat:"makanan", code:"MK-01"},
  {name:"Egg Sausage Rice Bowl", price:18000, cat:"makanan", code:"MK-02"},
  {name:"Nasi Goreng Ayam", price:18000, cat:"makanan", code:"MK-03"},
  {name:"Ardia Noodles Special", price:18000, cat:"makanan", code:"MK-04"},
  {name:"Carbonara", price:18000, cat:"makanan", code:"MK-05"},
  {name:"Bolognese Chicken", price:18000, cat:"makanan", code:"MK-06"},
  {name:"Bolognese Sausage", price:18000, cat:"makanan", code:"MK-07"},
  {name:"Mie Rebus", price:null, cat:"makanan", code:"MK-08"},
  {name:"Mie Goreng", price:null, cat:"makanan", code:"MK-09"},
  {name:"French Fries", price:15000, cat:"snack", code:"SN-01"},
  {name:"Bakso Goreng", price:13000, cat:"snack", code:"SN-02"},
  {name:"Sosis Goreng", price:13000, cat:"snack", code:"SN-03"},
  {name:"Dimsum", price:15000, cat:"snack", code:"SN-04"},
];
const catIcon = {coffee:"☕", noncoffee:"🥤", makanan:"🍝", snack:"🍟"};
const grid = document.getElementById('menuGrid');
const emptyMsg = document.getElementById('menuEmpty');
let activeFilter = 'all';
let searchTerm = '';

function fmtRupiah(n){ return 'Rp' + n.toLocaleString('id-ID'); }

function renderMenu(){
  const filtered = menuData.filter(item=>{
    const matchCat = activeFilter==='all' || item.cat===activeFilter;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });
  grid.innerHTML = filtered.map(item=>`
    <div class="menu-item ${item.img ? 'has-photo' : ''} reveal in">
      ${item.img ? `<div class="menu-photo"><img src="${item.img}" alt="${item.name}"></div>` : ''}
      <span class="cat-tag">${catIcon[item.cat]}</span>
      ${item.tag ? `<span class="new-tag">${item.tag}</span>` : ''}
      <div class="code">${item.code}</div>
      <h5>${item.name}</h5>
      <div class="dash"></div>
      <div class="price ${item.price ? '' : 'price-soon'}">${item.price ? fmtRupiah(item.price) : 'Harga segera hadir'}</div>
    </div>
  `).join('');
  emptyMsg.style.display = filtered.length ? 'none' : 'block';
}
renderMenu();

document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderMenu();
  });
});
document.getElementById('menuSearch').addEventListener('input', (e)=>{
  searchTerm = e.target.value;
  renderMenu();
});

// ---- MOBILE MENU ----
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> mobileMenu.classList.remove('open')));

// ---- LIGHTBOX ----
const lightbox = document.getElementById('lightbox');
const lightboxBox = document.getElementById('lightboxBox');
const lightboxLabel = document.getElementById('lightboxLabel');
document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click', ()=>{
    const img = item.querySelector('img');
    lightboxBox.style.background = `center/cover no-repeat url('${img.getAttribute('src')}')`;
    lightboxBox.textContent = '';
    lightboxLabel.textContent = item.dataset.label;
    lightbox.classList.add('open');
  });
});
document.getElementById('lightboxClose').addEventListener('click', ()=> lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.classList.remove('open'); });

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
  });
},{threshold:0.15});
revealEls.forEach(el=> io.observe(el));

// ---- BACK TO TOP ----
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));