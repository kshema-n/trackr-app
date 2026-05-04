function onTrackerClick(tracker) {
  // hide home
  document.getElementById("pageHome").style.display = "none";
  // show detail
  document.getElementById("pageDetail").style.display = "block";
  // set title
  document.getElementById("detailTitle").textContent = tracker.name;
  // set streak
  document.getElementById("detailStreak").textContent =
  "Streak: " + tracker.streak + " days";
}

function goHome() {
  document.getElementById("pageHome").style.display = "block";
  document.getElementById("pageDetail").style.display = "none";
}

function onTrackerClick(tracker) {
  selectedTracker = tracker;
  document.getElementById("pageHome").style.display = "none";
  document.getElementById("pageDetail").style.display = "block";
  document.getElementById("detailTitle").textContent = tracker.name;
  document.getElementById("detailDescription").textContent = tracker.description || "No description yet";
}

function increaseStreak() {
  selectedTracker.streak += 1;
  saveTrackers();
  document.getElementById("detailStreak").textContent = "Streak: " + selectedTracker.streak + " days";
  renderTrackers();
}

function addTracker() {
  const input = document.getElementById("newTrackerName");
  const name = input.value.trim();

  if (name === "") {
    alert("Please enter a tracker name");
    return;
  }

  trackers.push({
    name: name,
    description: "No description yet",
    streak: 0
  });
  saveTrackers();
  input.value = "";
  renderTrackers();
}