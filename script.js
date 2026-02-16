let data = [];
let currentCategory = "all";

const tg = window.Telegram.WebApp;
tg.expand();

if(tg.initDataUnsafe?.user){
  document.getElementById("welcome").innerText =
    "سلام " + tg.initDataUnsafe.user.first_name;
}

fetch("data.json")
.then(res=>res.json())
.then(json=>{
  data = json;
  renderCategories();
  render();
});

function renderCategories(){
  const cats = [...new Set(data.map(i=>i.category))];
  let html = `<button onclick="filter('all')">همه</button>`;
  cats.forEach(c=>{
    html += `<button onclick="filter('${c}')">${c}</button>`;
  });
  document.getElementById("categories").innerHTML = html;
}

function filter(cat){
  currentCategory = cat;
  render();
}

function render(){
  const container = document.getElementById("content");
  container.innerHTML = "";

  data
  .filter(i=> currentCategory=="all" || i.category==currentCategory)
  .forEach(item=>{
    container.innerHTML += `
      <div class="card">
        <img src="${item.image}" style="height:${item.height}px">
        <h3>${item.title}</h3>
        ${item.type=="music" 
          ? `<audio controls src="${item.link}"></audio>`
          : `<a href="${item.link}" target="_blank"><button>دانلود</button></a>`
        }
      </div>
    `;
  });
}

function searchItems(){
  let val = document.getElementById("search").value.toLowerCase();
  const container = document.getElementById("content");
  container.innerHTML = "";

  data.filter(i=> i.title.toLowerCase().includes(val))
  .forEach(item=>{
    container.innerHTML += `
      <div class="card">
        <img src="${item.image}" style="height:${item.height}px">
        <h3>${item.title}</h3>
      </div>
    `;
  });
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function openAdmin(){
  document.getElementById("adminPanel").style.display="block";
}

function loginAdmin(){
  if(document.getElementById("adminPass").value=="1234"){
    document.getElementById("adminContent").style.display="block";
  }
}

function addItem(){
  const newItem={
    title:title.value,
    image:image.value,
    link:link.value,
    category:category.value,
    height:height.value,
    type:"normal"
  };
  data.push(newItem);
  render();
}
