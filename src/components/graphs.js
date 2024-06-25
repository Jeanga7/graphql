export {
  createSkillsGraph,
  createDonutChart,
  createProjectsTimeline
}
/* ++++++++++ SKILLS GRAPH ++++++++++ */
function createSkillsGraph(data) {
  const maxAmount = Math.max(...data.map(t => t.amount));
  const svgNS = "http://www.w3.org/2000/svg";
  const container = document.getElementById("graph-section");
  container.innerHTML = '';

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
  tooltip.classList.add("tooltip");
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

/* ++++++++++ PROJECTS DONE ++++++++++ */
function createDonutChart(completedProjects, totalProjects) {
  const svgNS = "http://www.w3.org/2000/svg";
  const container = document.getElementById("xp-board-graph");
  container.innerHTML = "";

  const width = container.clientWidth;
  const height = container.clientHeight;
  const radius = Math.min(width, height) / 2.3;
  const center = { x: width / 2, y: height / 2 };

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "85%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const totalAngle = 2 * Math.PI;
  const completedAngle = (completedProjects / totalProjects) * totalAngle;

  // Background circle for the total projects
  const backgroundCircle = document.createElementNS(svgNS, "circle");
  backgroundCircle.setAttribute("cx", center.x);
  backgroundCircle.setAttribute("cy", center.y);
  backgroundCircle.setAttribute("r", radius);
  backgroundCircle.setAttribute("fill", "none");
  backgroundCircle.setAttribute("stroke", "#ffae00");
  backgroundCircle.setAttribute("stroke-width", radius / 2);
  svg.appendChild(backgroundCircle);

  // Arc for the completed projects
  const arcPath = document.createElementNS(svgNS, "path");
  const largeArcFlag = completedAngle > Math.PI ? 1 : 0;
  const endX = center.x + radius * Math.cos(completedAngle - Math.PI / 2);
  const endY = center.y + radius * Math.sin(completedAngle - Math.PI / 2);
  const d = `
    M ${center.x} ${center.y - radius}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
  `;
  arcPath.setAttribute("d", d);
  arcPath.setAttribute("fill", "none");
  arcPath.setAttribute("stroke", "#ff5e00");
  arcPath.setAttribute("stroke-width", radius / 2);
  svg.appendChild(arcPath);

  // Inner circle for the donut chart
  const innerCircle = document.createElementNS(svgNS, "circle");
  innerCircle.setAttribute("cx", center.x);
  innerCircle.setAttribute("cy", center.y);
  innerCircle.setAttribute("r", radius / 2);
  innerCircle.setAttribute("fill", "#fff");
  svg.appendChild(innerCircle);

  // Text for completed projects
  const completedText = document.createElementNS(svgNS, "text");
  completedText.setAttribute("x", center.x);
  completedText.setAttribute("y", center.y - 10);
  completedText.textContent = `${completedProjects} / ${totalProjects}`;
  svg.appendChild(completedText);

  // Text for percentage
  const percentageText = document.createElementNS(svgNS, "text");
  percentageText.setAttribute("x", center.x);
  percentageText.setAttribute("y", center.y + 10);
  percentageText.textContent = `${((completedProjects / totalProjects) * 100).toFixed(2)}%`;
  svg.appendChild(percentageText);

  container.appendChild(svg);

  // Tooltip element
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);
  backgroundCircle
  arcPath.addEventListener("mouseenter", () => {
    tooltip.style.display = "block";
    tooltip.textContent = `Completed Projects: ${completedProjects}`;
  });

  arcPath.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

  arcPath.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  backgroundCircle.addEventListener("mouseenter", () => {
    tooltip.style.display = "block";
    tooltip.textContent = `Incompleted Projects: ${126 - completedProjects}`;
  });
  backgroundCircle.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

  backgroundCircle.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

}

/* ++++++++++++    ++++++++++++ */
function createProjectsTimeline(projects) {
  // Convertir les données des projets au format accepté par Vis.js
  const items = projects.map(project => ({
    id: project.createdAt,
    content: project.object.name,
    start: project.createdAt
  }));

  const container = document.getElementById('graph-section');
  container.innerHTML =''
  const options = {
    width: '95%',
    height: '95%',
    margin: {
      item: 10
    },
    // zoomKey: 'ctrlKey',
    // horizontalScroll: true,
    // zoomFriction: 10
  };

  const timeline = new vis.Timeline(container, items, options);
}
