function onTrackerClick(tracker) {
  // hide home
  document.getElementById("pageHome").style.display = "none";

  // show detail
  document.getElementById("pageDetail").style.display = "block";

  // set title
  document.getElementById("detailTitle").textContent = tracker.name;
}

function goHome() {
  document.getElementById("pageHome").style.display = "block";
  document.getElementById("pageDetail").style.display = "none";
}