document.addEventListener("DOMContentLoaded", function () {
    const eventContainer = document.getElementById("eventContainer");
    const locationFilter = document.getElementById("locationFilter");
    const dateFilter = document.getElementById("dateFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const applyFiltersBtn = document.getElementById("applyFilters");

    async function fetchEvents() {
        try {
            const response = await fetch("http://localhost:3000/events");
            const events = await response.json();
            displayEvents(events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    function displayEvents(events) {
        eventContainer.innerHTML = "";

        if (events.length === 0) {
            eventContainer.innerHTML = "<p>No events found.</p>";
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.className = "event-card";
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Fee:</strong> ${event.fee || 'Free'}</p>
            `;
            eventContainer.appendChild(eventCard);
        });
    }

    function applyFilters() {
        const locationValue = locationFilter.value.toLowerCase();
        const dateValue = dateFilter.value;
        const categoryValue = categoryFilter.value;

        fetch("http://localhost:3000/events")
            .then(response => response.json())
            .then(events => {
                const filteredEvents = events.filter(event => {
                    const eventDate = new Date(event.date).toISOString().split('T')[0];

                    return (
                        (locationValue === "" || event.location.toLowerCase().includes(locationValue)) &&
                        (dateValue === "" || eventDate === dateValue) &&
                        (categoryValue === "all" || event.category.toLowerCase() === categoryValue)
                    );
                });

                displayEvents(filteredEvents);
            })
            .catch(error => console.error("Error filtering events:", error));
    }

    applyFiltersBtn.addEventListener("click", applyFilters);
    fetchEvents();  // Fetch events on page load
});
