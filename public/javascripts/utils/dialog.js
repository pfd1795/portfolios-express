export function ModalDialog(content = "contenido...") {
  const dialog = document.querySelector(".modal-dialog");
  const modalBody = document.querySelector(".modal-body");

  if (!dialog || !modalBody) return;

  modalBody.innerHTML = "";

  if (content instanceof HTMLElement || content instanceof DocumentFragment) {
    modalBody.appendChild(content);
  } else {
    modalBody.innerHTML = content;
  }

  if (!dialog.open) dialog.showModal();
}

export function CloseModalDialog() {
  const dialog = document.querySelector(".modal-dialog");
  if (!dialog) return;

  if (dialog.open) dialog.close();
}

function InitModalDialog() {
  // const dialog = document.querySelector(".modal-dialog");
  // const btnClose = document.querySelector(".modal-content .btn");

  // btnClose?.addEventListener("click", CloseModalDialog);

  // dialog?.addEventListener("click", (e) => {
  //   const rect = (e.target).getBoundingClientRect();
  //   const clickedInside =
  //     e.clientX >= rect.left &&
  //     e.clientX <= rect.right &&
  //     e.clientY >= rect.top &&
  //     e.clientY <= rect.bottom;

  //   if (!clickedInside) CloseModalDialog();
  // });
}

document.addEventListener("DOMContentLoaded", InitModalDialog);