document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const dateInput = document.getElementById("dateInput");
  const messageInput = document.getElementById("messageInput");

  const previewName = document.getElementById("previewName");
  const previewDate = document.getElementById("previewDate");
  const previewMessage = document.getElementById("previewMessage");

  const bgImage = document.getElementById("bgImage");
  const templateSelect = document.getElementById("templateSelect");

  nameInput.addEventListener("input", () => {
    previewName.textContent = nameInput.value || "Rohan & Aisha";
  });

  dateInput.addEventListener("input", () => {
    previewDate.textContent = dateInput.value || "July 5, 2025";
  });

  messageInput.addEventListener("input", () => {
    previewMessage.textContent = messageInput.value || "Join us on our special day! 💐";
  });

  templateSelect.addEventListener("change", () => {
    const selected = templateSelect.value;
    if (selected === "1") {
      bgImage.src = "../assets/images/wedding1.jpg";
    } else if (selected === "2") {
      bgImage.src = "../assets/images/wedding2.jpg";
    } else if (selected === "3") {
      bgImage.src = "../assets/images/wedding3.jpg";
    } else {
      bgImage.src = ""; 
    }
  });

  const params = new URLSearchParams(window.location.search);
  const bg = params.get("bg");
  const title = params.get("title");

  if (bg) {
    bgImage.src = `../assets/images/${bg}`;
  }

  if (title) {
    document.title = `${title} - HappyInvite`;
  }

  
  function makeDraggable(el) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    el.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.position = "absolute";
      el.style.cursor = "move";
      el.style.zIndex = 999;
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      el.style.cursor = "default";
    });
  }

  makeDraggable(previewName);
  makeDraggable(previewDate);
  makeDraggable(previewMessage);
});


function downloadCard() {
  const card = document.getElementById("cardPreview");
  html2canvas(card).then(canvas => {
    const link = document.createElement("a");
    link.download = "wedding-card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
