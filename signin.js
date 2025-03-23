document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signin-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.querySelector("input[type='email']").value.trim();
        const password = document.querySelector("input[type='password']").value.trim();

        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }

        const loginData = { email, password };

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // ✅ Fix: Ensure token is stored
                alert("Login successful!");
                window.location.href = "dashboard.html"; // ✅ Redirect after login
            } else {
                alert(data.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Try again.");
        }
    });
});

