document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".template-card");
  const popup = document.getElementById("previewPopup");
  const overlay = document.getElementById("overlay");
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const previewOpenBtn = document.getElementById("previewOpen");
  const previewCloseBtn = document.getElementById("previewClose");

 
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      cards.forEach(card => {
        if (category === "all" || card.classList.contains(category)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

 
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img").src;
      const title = card.querySelector("h3").innerText;
      const link = card.getAttribute("data-link");

      popupImage.src = img;
      popupTitle.innerText = title;
      previewOpenBtn.setAttribute("data-link", link);

      overlay.style.display = "block";
      popup.style.display = "block";
    });
  });


  previewOpenBtn.addEventListener("click", () => {
    const link = previewOpenBtn.getAttribute("data-link");
    window.location.href = link;
  });


  previewCloseBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  function closePopup() {
    overlay.style.display = "none";
    popup.style.display = "none";
  }
});


document.querySelectorAll(".image-option").forEach((img) => {
  img.addEventListener("click", () => {
    const selectedImg = img.getAttribute("src"); 
    localStorage.setItem("selectedBgImage", selectedImg); 
    window.location.href = "bd-editor.html"; 
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".template-card");
  const popup = document.getElementById("previewPopup");
  const overlay = document.getElementById("overlay");
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const previewOpen = document.getElementById("previewOpen");
  const previewClose = document.getElementById("previewClose");

  let selectedLink = "";
  let selectedImg = ""; 

  
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3");

      selectedImg = img.getAttribute("src");
      selectedLink = card.getAttribute("data-link");

      popupImage.src = selectedImg;
      popupTitle.textContent = title.textContent;

      popup.style.display = "block";
      overlay.style.display = "block";
    });
  });

  
  previewClose.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });

  
  previewOpen.addEventListener("click", () => {
    if (selectedImg && selectedLink) {
      localStorage.setItem("selectedBgImage", selectedImg);
      window.location.href = selectedLink;
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const saveButtons = document.querySelectorAll(".save-btn");

  saveButtons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      const imgPath = button.getAttribute("data-img");

      convertImgToBase64(imgPath, (base64Img) => {
        const newTemplate = {
          title: title,
          img: base64Img,
          time: new Date().toISOString()
        };

        const templates = JSON.parse(localStorage.getItem("todoTemplates")) || [];
        templates.push(newTemplate);
        localStorage.setItem("todoTemplates", JSON.stringify(templates));

        alert("✅ Template saved to To-Do List!");
      });
    });
  });
});


function convertImgToBase64(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result); 
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
