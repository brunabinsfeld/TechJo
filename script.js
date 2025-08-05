const canvas = document.getElementById("propertyMap");
const ctx = canvas.getContext("2d");

// Desenhar a área da propriedade (simples retângulo verde claro)
ctx.fillStyle = "#e6f5e9";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Adiciona pontos simulados de liberação
const points = [
  { x: 80, y: 60 },
  { x: 200, y: 100 },
  { x: 350, y: 90 },
  { x: 120, y: 200 },
  { x: 280, y: 180 },
  { x: 400, y: 250 },
  { x: 150, y: 300 },
  { x: 300, y: 330 },
];

ctx.fillStyle = "#38a169"; // cor verde escura para os pontos
points.forEach((point) => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
  ctx.fill();
});

// Legenda (opcional)
ctx.fillStyle = "#000";
ctx.font = "14px sans-serif";
ctx.fillText("● Ponto de Liberação", 20, canvas.height - 20);

function gerarMapaDistribuicao(qtdJoaninhas, hectares) {
  const totalBlocos = 25;
  const mapGrid = document.getElementById('map-grid');
  mapGrid.innerHTML = '';

  const blocosPorHectare = Math.ceil(totalBlocos / hectares);
  const joaninhasPorBloco = Math.floor(qtdJoaninhas / (hectares * blocosPorHectare));

  for (let i = 1; i <= totalBlocos; i++) {
    const bloco = document.createElement('div');
    bloco.className = "bg-white rounded shadow p-4 border min-w-[60px]";
    const joaninhasNesteBloco = i <= hectares * blocosPorHectare ? joaninhasPorBloco : 0;
    bloco.innerHTML = `<strong>P${i}</strong><br>Joaninhas: ${joaninhasNesteBloco}`;
    mapGrid.appendChild(bloco);
  }
}

function calcularJoaninhas() {
  const pestDensity = parseFloat(document.getElementById('densidade').value);
  const totalArea = parseFloat(document.getElementById('area').value);
  const desiredTime = parseFloat(document.getElementById('tempo').value);

  if (isNaN(pestDensity) || pestDensity <= 0) {
    alert('Por favor, informe uma densidade de pragas válida (maior que zero).');
    return;
  }
  if (isNaN(totalArea) || totalArea <= 0) {
    alert('Por favor, informe uma área total válida (maior que zero).');
    return;
  }
  if (isNaN(desiredTime) || desiredTime <= 0) {
    alert('Por favor, informe um tempo desejado válido (maior que zero).');
    return;
  }

  const predationCapacity = 50;
  const totalAreaM2 = totalArea * 10000;

  const ladybugsCount = Math.ceil((pestDensity * totalAreaM2) / (predationCapacity * desiredTime));
  gerarMapaDistribuicao(ladybugsCount, totalArea);

  document.getElementById('ladybugs-count').textContent = ladybugsCount.toLocaleString('pt-BR');
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}
