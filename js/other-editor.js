function updatePreview() {
  const name = document.getElementById("nameInput").value;
  const message = document.getElementById("messageInput").value;

  document.getElementById("previewName").innerText = name || "Dear Friend";
  document.getElementById("previewMessage").innerText = message || "Thank you for being amazing! 💐";
}

function downloadCard() {
  html2canvas(document.getElementById("cardPreview")).then(canvas => {
    const link = document.createElement("a");
    link.download = "greeting-card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

document.getElementById("nameInput").addEventListener("input", updatePreview);
document.getElementById("messageInput").addEventListener("input", updatePreview);
