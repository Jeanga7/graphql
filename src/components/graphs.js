export { createSkillsGraph }

function createSkillsGraph(data) {
  const maxAmount = Math.max(...data.map(t => t.amount));
  const svgNS = "http://www.w3.org/2000/svg";
  const container = document.getElementById("graph-section");
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const margin = 0.05 * containerWidth;
  const availableWidth = containerWidth - 2 * margin;
  const barSpacing = 0.02 * availableWidth;
  const barWidth = (availableWidth - (data.length - 1) * barSpacing) / data.length;
  const maxBarHeight = 0.8 * containerHeight;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.position = "relative";

  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  tooltip.style.color = "white";
  tooltip.style.padding = "5px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.display = "none";
  tooltip.style.pointerEvents = "none";
  tooltip.style.zIndex = "10"
  container.appendChild(tooltip);

  let xPos = margin;
  data.forEach((transaction) => {
    const barHeight = (transaction.amount / maxAmount) * maxBarHeight;

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", xPos);
    rect.setAttribute("y", containerHeight - margin - barHeight);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("fill", getRandomColor());
    rect.setAttribute("class", "bar");

    rect.addEventListener("mouseover", function () {
      tooltip.style.display = "block";
      tooltip.textContent = `${transaction.type.replace("skill_", "")}: ${transaction.amount}%`;
    });

    rect.addEventListener("mousemove", function (event) {
      tooltip.style.left = event.pageX + 10 + "px";
      tooltip.style.top = event.pageY - 25 + "px";
    });

    rect.addEventListener("mouseout", function () {
      tooltip.style.display = "none";
    });

    svg.appendChild(rect);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", xPos + barWidth / 2);
    text.setAttribute("y", containerHeight - margin + 15);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "10");
    text.textContent = transaction.type.replace("skill_", "");

    svg.appendChild(text);

    xPos += barWidth + barSpacing;
  });

  container.appendChild(svg);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


/* function createSkillsGraph(data) {
  const graphContainer = document.getElementById('graph-section');

  // Création du conteneur SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100'); // Vue 100x100 pour le graphique réactif
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  // Calcul de la somme totale des compétences pour calculer les pourcentages
  const total = data.reduce((acc, skill) => acc + skill.amount, 0);

  // Initialisation de l'angle de départ
  let startAngle = 0;

  // Création des sections du camembert
  data.forEach(skill => {
      const angle = (skill.amount / total) * 360; // Calcul de l'angle de la section
      const endAngle = startAngle + angle; // Angle de fin de la section

      // Calcul des coordonnées des points du camembert
      const x1 = 50 + Math.cos((startAngle - 90) * Math.PI / 180) * 40;
      const y1 = 50 + Math.sin((startAngle - 90) * Math.PI / 180) * 40;
      const x2 = 50 + Math.cos((endAngle - 90) * Math.PI / 180) * 40;
      const y2 = 50 + Math.sin((endAngle - 90) * Math.PI / 180) * 40;

      // Création de la section
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M50,50 L${x1},${y1} A40,40 0 ${angle > 180 ? 1 : 0},1 ${x2},${y2} Z`);
      path.setAttribute('fill', getRandomColor()); // Couleur aléatoire
      path.setAttribute('stroke', '#fff'); // Bordure blanche
      path.setAttribute('stroke-width', '0');

      // Ajout de la section au graphique
      svg.appendChild(path);

      // Mise à jour de l'angle de départ pour la prochaine section
      startAngle = endAngle;
  });

  // Ajout du graphique au conteneur
  graphContainer.appendChild(svg);
}

// Fonction pour obtenir une couleur aléatoire
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


 */
/* =========== DIAGRAMME EN BARRE ============ */
/* function createSkillsGraph(data) {
  const maxAmount = Math.max(...data.map(t => t.amount));
  const svgNS = "http://www.w3.org/2000/svg";
  const container = document.getElementById("graph-section");
  const width = container.clientWidth;
  const height = container.clientHeight;
  const margin = 0.03 * width;
  const barWidth = 0.05 * width;
  const barSpacing = 0.01 * width;
  const maxBarHeight = 0.8 * height;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  data.forEach((transaction, index) => {
    const barHeight = (transaction.amount / maxAmount) * maxBarHeight;

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", margin + index * (barWidth + barSpacing));
    rect.setAttribute("y", height - margin - barHeight);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("class", "bar");

    svg.appendChild(rect);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", margin + index * (barWidth + barSpacing) + barWidth / 2);
    text.setAttribute("y", height - margin + 15);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "10");
    text.textContent = transaction.type.replace("skill_", "");

    svg.appendChild(text);

    const amountText = document.createElementNS(svgNS, "text");
    amountText.setAttribute("x", margin + index * (barWidth + barSpacing) + barWidth / 2);
    amountText.setAttribute("y", height - margin - barHeight - 10);
    amountText.setAttribute("text-anchor", "middle");
    amountText.setAttribute("class", "amount");
    amountText.textContent = transaction.amount+"%";

    svg.appendChild(amountText);
  });

  container.appendChild(svg);
} */