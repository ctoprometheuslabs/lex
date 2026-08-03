// Bloqueo de scroll compartido por los overlays (splash, intro, cortina de
// navegación). Se usa un contador porque puede haber más de un overlay activo
// a la vez (p. ej. splash + intro trailer) y solo debe liberarse el scroll
// cuando el último termina.
let locks = 0;
let restorePaddingRight = "";

export function lockScroll() {
  if (locks === 0) {
    // Compensa el ancho de la scrollbar al ocultarla: sin esto, el
    // contenido (y el Topbar fijo) da un salto lateral perceptible en el
    // instante en que se bloquea/desbloquea el scroll.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    restorePaddingRight = document.body.style.paddingRight;
    if (scrollbarWidth > 0) {
      const current = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${current + scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
  }
  locks += 1;
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = restorePaddingRight;
  }
}
