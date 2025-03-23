// signup.js - Corrected Version
document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page reload

    const fullname = document.getElementById("fullname").value; // Use 'fullname' as expected by backend
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorText = document.getElementById("password-error");

    if (password !== confirmPassword) {
        errorText.style.display = "block";
        return;
    } else {
        errorText.style.display = "none";
    }

    const signupData = { fullname, email, password };

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful! Redirecting to Sign In page...");
            window.location.href = "signin.html";
        } else {
            alert(data.message || "Signup failed. Try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Try again.");
    }
});

// server.js - Corrected Backend
