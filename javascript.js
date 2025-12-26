const modal = document.getElementById("modal");
const zoomImg = document.getElementById("zoomImg");
const fechar = document.getElementById("fechar");

let scale = 1;

// Variável para controlar se o zoom está ativo
let isZoomed = false;

zoomImg.addEventListener("click", (e) => {
  e.stopPropagation(); // Impede que o modal feche ao clicar na imagem
  
  isZoomed = !isZoomed; // Alterna entre verdadeiro e falso
  
  if (isZoomed) {
    zoomImg.classList.add("img-zoom");
  } else {
    zoomImg.classList.remove("img-zoom");
    zoomImg.style.transform = "scale(1)"; // Volta ao normal
  }
});

// Efeito de Lupa: A imagem segue o mouse quando estiver com zoom
modal.addEventListener("mousemove", (e) => {
  if (isZoomed) {
    const x = e.clientX - modal.offsetLeft;
    const y = e.clientY - modal.offsetTop;
    
    // Calcula a posição da "lupa"
    zoomImg.style.transformOrigin = `${(x / modal.offsetWidth) * 100}% ${(y / modal.offsetHeight) * 100}%`;
    zoomImg.style.transform = "scale(2.5)"; // Ajuste o nível do zoom aqui
  }
});

// Resetar o zoom ao fechar o modal
fechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
  zoomImg.classList.remove("img-zoom");
  zoomImg.style.transform = "scale(1)";
  isZoomed = false;
});
// Abrir modal
document.querySelectorAll(".mandala").forEach(img => {
  img.addEventListener("click", () => {
    zoomImg.src = img.dataset.zoom;
    scale = 1;
    zoomImg.style.transform = "scale(1)";
    modal.classList.add("ativo");
  });
});

// Scroll do mouse = zoom
modal.addEventListener("wheel", (e) => {
  e.preventDefault();
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(1, scale), 5);
  zoomImg.style.transform = `scale(${scale})`;
});

// Mover mouse = mover imagem
modal.addEventListener("mousemove", (e) => {
  const rect = zoomImg.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  zoomImg.style.transformOrigin = `${x}% ${y}%`;
});

// Fechar
fechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
  zoomImg.src = "";
});
