const projects = [
  {
    id: 2,
    title: "Juego de Clicker",
    description: "Un juego interactivo para medir la velocidad de reacción del usuario. Incluye un sistema de ranking que guarda las mejores puntuaciones y permite competir con otros jugadores.",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=500&fit=crop",
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "CSS Vanilla"],
    link: "/game"
  }
];

export function GridProjects() {
  const container = document.querySelector(".zone-projects");

  if (container) {
    const grid = container.querySelector(".grid-projects");
    grid.innerHTML = "";

    projects.forEach((project) => {
      const article = document.createElement("article");
      article.className = "card-projects";

      article.innerHTML = `
        <div class="card-image">
          <img src="${project.image}" alt="${project.title}" />
          <div class="card-overlay"></div>
        </div>
        <div class="card-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" class="card-button">
            Ver Proyecto
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      `;

      grid.appendChild(article);
    });
  }
}

export default function HomeController() {
  console.log("todo bien")
  GridProjects();
}