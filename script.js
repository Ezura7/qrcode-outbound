function generateQRCodes() {
  const input = document.getElementById("inputText").value.trim();
  const lines = input.split('\n').filter(line => line.trim() !== "");
  const container = document.getElementById("qrcodeContainer");
  const logo = document.getElementById("logoImg");
  container.innerHTML = "";

  lines.forEach((text) => {
    const div = document.createElement("div");
    div.className = "qrcode-item";

    const label = document.createElement("p");
    label.innerText = text;

    const qrDiv = document.createElement("div");
    div.appendChild(label);
    div.appendChild(qrDiv);
    container.appendChild(div);

    const qr = new QRCode(qrDiv, {
      text: text,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff"
    });

    setTimeout(() => {
      const canvas = qrDiv.querySelector("canvas");
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      const qrImage = new Image();
      qrImage.src = canvas.toDataURL();

      qrImage.onload = () => {
        const logoImage = new Image();
        logoImage.src = logo.src;

        logoImage.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 0.2;
          ctx.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1.0;

          ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height);

          ctx.font = "10px Arial";
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.textAlign = "right";
          ctx.fillText("KrisnaAprian", canvas.width - 5, canvas.height - 5);
        };

        logoImage.onerror = () => {
          ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height);
          ctx.font = "10px Arial";
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.textAlign = "right";
          ctx.fillText("KrisnaAprian", canvas.width - 5, canvas.height - 5);
        };
      };
    }, 200);
  });
}