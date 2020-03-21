if (navigator.clipboard) {
  console.log("Support du presse papier")
  document.querySelectorAll('[data-clipboard]')
} else {
  console.warn("Pas de support")
}