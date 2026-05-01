function renderTrackers() {
  const container = document.getElementById("trackerList");
  container.innerHTML = "";

  trackers.forEach(tracker => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = tracker.name;

    //on click event of trackers
    div.onclick = function () {
      onTrackerClick(tracker);
    };

    container.appendChild(div);
  });
}