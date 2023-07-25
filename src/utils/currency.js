export function toVND(x) {
  return numberWithSpaces(
    x.toLocaleString("it-IT", { style: "currency", currency: "VND" })
  );
}

export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
