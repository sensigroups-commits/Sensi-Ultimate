let data = [];
let currentCategory = "all";

const tg = window.Telegram.WebApp;
tg.expand();

if (tg.initDataUnsafe?.user) {
  document.getElementById("welcome").innerText =
    "سلام " + tg.initDataUnsafe.user.first_name;
}

/* ---------------- THEME ---------------- */

if (localStorage.getItem("theme")) {
  document.body.className = localStorage.getItem("theme");
} else {
  document.body.className = "dark";
}

function toggleTheme() {
  if (document.body.className === "dark") {
    document.body.className = "light";
  } else {
    document.body.className = "dark";
  }
  localStorage.setItem("theme", document.body.className);
}

/* ---------------- LOAD DATA ---------------- */

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    const saved = localStorage.getItem("customData");
    data = saved ? JSON.parse(saved) : json;
    renderCategories();
    render();
  });

/* ---------------- RENDER ---------------- */

function renderCategories() {
  const cats = [...new Set(data.map(i => i.category))];
  let html = `<button onclick="filter('all')">همه</button>`;
  cats.forEach(c => {
    html += `<button onclick="filter('${c}')">${c}</button>`;
  });
  document.getElementById("categories").innerHTML = html;
}

function filter(cat) {
  currentCategory = cat;
  render();
}

function render() {
  const container = document.getElementById("content");
  container.innerHTML = "";

  data
    .filter(i => currentCategory === "all" || i.category === currentCategory)
    .forEach(item => {
      container.innerHTML += `
      <div class="card">
        <img src="${item.image}" style="height:${item.height}px">
        <h3>${item.title}</h3>
        ${
          item.type === "music"
            ? `<audio controls src="${item.link}"></audio>`
            : `<a href="${item.link}" target="_blank">
                 <button>مشاهده / دانلود</button>
               </a>`
        }
      </div>
      `;
    });
}

/* ---------------- SEARCH ---------------- */

function searchItems() {
  let val = document.getElementById("search").value.toLowerCase();
  const container = document.getElementById("content");
  container.innerHTML = "";

  data
    .filter(i => i.title.toLowerCase().includes(val))
    .forEach(item => {
      container.innerHTML += `
      <div class="card">
        <img src="${item.image}" style="height:${item.height}px">
        <h3>${item.title}</h3>
      </div>
      `;
    });
}

/* ---------------- ADMIN ---------------- */

function openAdmin() {
  document.getElementById("adminPanel").style.display = "block";
}

function closeAdmin() {
  document.getElementById("adminPanel").style.display = "none";
}

function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === "1234") {
    document.getElementById("adminContent").style.display = "block";
  } else {
    alert("رمز اشتباهه");
  }
}

function addItem() {
  const newItem = {
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    link: document.getElementById("link").value,
    category: document.getElementById("category").value,
    height: document.getElementById("height").value || 200,
    type: "normal"
  };

  data.push(newItem);

  localStorage.setItem("customData", JSON.stringify(data));

  renderCategories();
  render();
  closeAdmin();
}
