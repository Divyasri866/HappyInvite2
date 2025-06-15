function updatePreview() {
  const name = document.getElementById("nameInput").value;
  const message = document.getElementById("messageInput").value;

  document.getElementById("previewName").innerText = name || "To You";
  document.getElementById("previewMessage").innerText = message || "May your 2025 sparkle with joy and success! 🎇";
}

function downloadCard() {
  html2canvas(document.getElementById("cardPreview")).then(canvas => {
    const link = document.createElement("a");
    link.download = "newyear-card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

document.getElementById("nameInput").addEventListener("input", updatePreview);
document.getElementById("messageInput").addEventListener("input", updatePreview);
