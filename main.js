document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".sign-in").addEventListener("click", function () {
        window.location.href = "signin.html";
    });

    document.querySelector(".sign-up").addEventListener("click", function () {
        window.location.href = "signup.html";
    });


        document.getElementById("explore-event").addEventListener("click", function () {
            alert("You haven't logged in.");
        });
        document.getElementById("add-event").addEventListener("click", function () {
            alert("You haven't logged in.");
        });
    });
    

