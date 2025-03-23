async function fetchEvents() {
    try {
        const response = await fetch("http://localhost:3000/events");
        const events = await response.json();

        const eventList = document.getElementById("event-list");
        eventList.innerHTML = ""; // Clear previous data

        events.forEach(event => {
            const eventItem = document.createElement("div");
            eventItem.classList.add("event-item");

            eventItem.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p>${event.description}</p>
                ${event.imageUrl ? `<img src="${event.imageUrl}" alt="Event Image">` : ""}
            `;

            eventList.appendChild(eventItem);
        });

    } catch (error) {
        console.error("Error fetching events:", error);
    }
}


window.onload = fetchEvents;
