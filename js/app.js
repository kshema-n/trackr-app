let selectedTracker = null;

function saveTrackers() {
  localStorage.setItem("trackers", JSON.stringify(trackers));
}

window.onload = function () {
  const saved = localStorage.getItem("trackers");

  if (saved) {
    trackers = JSON.parse(saved);
  }

  renderTrackers();
};