export default function ToVND(x) {
  return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
