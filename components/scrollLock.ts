// Bloqueo de scroll compartido por los overlays (splash, intro, cortina de
// navegación). Se usa un contador porque puede haber más de un overlay activo
// a la vez (p. ej. splash + intro trailer) y solo debe liberarse el scroll
// cuando el último termina.
let locks = 0;

export function lockScroll() {
  locks += 1;
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.style.overflow = "";
  }
}
