export {
  getFooterYear
}


function getFooterYear() {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
}
