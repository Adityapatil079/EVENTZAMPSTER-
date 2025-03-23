document.getElementById("eventForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const location = document.getElementById("location").value.trim();
    const category = document.getElementById("event-type").value.trim();
    const date = document.getElementById("event-time").value;
    const fee = document.getElementById("fee").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !location || !date || !category || !description) {
        alert("Please fill all required fields!");
        return;
    }

    const eventDetails = {
        title,
        location,
        category,
        date,
        fee,
        description
    };

    try {
        const response = await fetch("http://localhost:3000/addevent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // ✅ Send JSON format
            },
            body: JSON.stringify(eventDetails)
        });

        const data = await response.json();
        console.log("Response Data:", data);  // ✅ Debugging

        if (response.ok) {
            alert("Event added successfully!");
            window.location.reload();
        } else {
            alert("Error: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Try again.");
    }
});
