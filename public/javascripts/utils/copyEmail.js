export function copyEmail() {
  const email = "pfd1795@gmail.com";

  navigator.clipboard.writeText(email).then(() => {
    const notification = document.querySelectorAll(".copy-notification");
    notification?.forEach(e => e.classList.add("show"));

    setTimeout(() => {
      notification?.forEach(e => e.classList.remove("show"));
    }, 2000);
  }).catch(err => {
    console.error("Error al copiar:", err);
  });
}