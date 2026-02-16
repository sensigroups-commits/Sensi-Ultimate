let data = JSON.parse(localStorage.getItem("data")) || [];

function save() {
  localStorage.setItem("data", JSON.stringify(data));
}

function render() {
  const container = document.getElementById("content");
  container.innerHTML = "";

  data.forEach((item, index) => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.image}" style="height:${item.height}px">
        <h3>${item.title}</h3>
        ${
          item.type === "music"
            ? `<audio controls src="${item.link}"></audio>`
            : `<a href="${item.link}" target="_blank"><button>مشاهده</button></a>`
        }
      </div>
    `;
  });

  renderManage();
}

/* ADMIN */

function openAdmin() {
  document.getElementById("adminPanel").style.display = "flex";
}

function closeAdmin() {
  document.getElementById("adminPanel").style.display = "none";
}

function loginAdmin() {
  if (document.getElementById("adminPass").value === "1234") {
    document.getElementById("adminContent").style.display = "block";
  } else {
    alert("رمز اشتباهه");
  }
}

function addItem() {
  const item = {
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    link: document.getElementById("link").value,
    category: document.getElementById("category").value,
    height: document.getElementById("height").value || 200,
    type: document.getElementById("type").value
  };

  data.push(item);
  save();
  render();
}

function renderManage() {
  const list = document.getElementById("manageList");
  list.innerHTML = "";

  data.forEach((item, index) => {
    list.innerHTML += `
      <div>
        ${item.title}
        <button onclick="deleteItem(${index})">❌</button>
      </div>
    `;
  });
}

function deleteItem(index) {
  data.splice(index,1);
  save();
  render();
}

/* SEARCH */

function searchItems() {
  let val = document.getElementById("search").value.toLowerCase();
  const container = document.getElementById("content");
  container.innerHTML = "";

  data.filter(i => i.title.toLowerCase().includes(val))
  .forEach(item => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.image}" style="height:${item.height}px">
        <h3>${item.title}</h3>
      </div>
    `;
  });
}

/* THEME */

const toggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme")==="light"){
  document.body.className="light";
  toggle.checked=false;
}else{
  document.body.className="dark";
  toggle.checked=true;
}

toggle.addEventListener("change",()=>{
  if(toggle.checked){
    document.body.className="dark";
    localStorage.setItem("theme","dark");
  }else{
    document.body.className="light";
    localStorage.setItem("theme","light");
  }
});

render();
