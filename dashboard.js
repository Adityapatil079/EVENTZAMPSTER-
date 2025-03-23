document.addEventListener("DOMContentLoaded", function () {
    const exploreBtn = document.getElementById("explore-event");
    const advertiseBtn = document.getElementById("advertise-btn");

    if (exploreBtn) {
        exploreBtn.addEventListener("click", function () {
            window.location.href = "explore.html";  // Redirect to explore events page
        });
    }

    if (advertiseBtn) {
        advertiseBtn.addEventListener("click", function () {
            window.location.href = "addevent.html";  // Redirect to add event page
        });
    }
});
