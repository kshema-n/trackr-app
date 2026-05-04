function renderTrackers() {
  const container = document.getElementById("trackerList");
  container.innerHTML = "";

  trackers.forEach(tracker => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${tracker.name}</h3>
      <p>${tracker.description}</p>
      <small>Streak: ${tracker.streak} days</small>
    `;

    //on click event of trackers
    div.onclick = function () {
      onTrackerClick(tracker);
    };

    container.appendChild(div);
  });
}