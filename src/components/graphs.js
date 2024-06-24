export { createSVGDiagram }

/* =========== DIAGRAMME EN BARRE ============ */
function createSVGDiagram(data) {
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
    amountText.textContent = transaction.amount;

    svg.appendChild(amountText);
  });

  container.appendChild(svg);
}