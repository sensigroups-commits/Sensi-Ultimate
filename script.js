fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("content");

    data.forEach(item => {
      container.innerHTML += `
        <div class="card">
          <a href="${item.link}" target="_blank">
            <img src="${item.image}">
            <h3>${item.title}</h3>
          </a>
        </div>
      `;
    });
  });
