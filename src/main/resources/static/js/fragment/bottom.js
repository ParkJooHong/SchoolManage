function openMapModal() {
  const modalBody = document.querySelector('#modalBody');
  modalBody.innerHTML = '<div id="daumRoughmapContainer1686797538963" class="root_daum_roughmap root_daum_roughmap_landing"></div>';
  
  const map_modal = new bootstrap.Modal('#mapModal');
  map_modal.show();
  
  renderMap();
}

function renderMap() {
  new daum.roughmap.Lander({
    "timestamp": "1686797538963",
    "key": "2f6pz",
    "mapWidth": "760",
    "mapHeight": "600"
  }).render();
}
