if (navigator.clipboard) {
  console.log("Support du presse papier")
  document.querySelectorAll('[data-clipboard]').forEach(($clipboardEl) => {
    const $button = document.createElement('button');
    $button.innerHTML = 'Copier';
    $clipboardEl.parentNode.append($button);
  });
} else {
  console.warn("Pas de support")
}

$button.addEventListener(
  'click',
  copyToClipboard.bind(this, $clipboardEl, $button)
);

function copyToClipboard($clipboardEl, $button) {
  console.log('Click !');
}