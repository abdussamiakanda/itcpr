document.getElementById("newsletter").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let formData = new FormData();
    formData.append("entry.818826994", email);

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSdaa_6_iDSpFcERvqBxY8nu6kHHKBtfE0R158phIbVzJhjivQ/formResponse", {
        method: "POST",
        body: formData,
        mode: "no-cors"
    })
    .then(() => {
        document.getElementById("newsletter").innerHTML = '<p>You have subscribed to the ITCPR Newsletter!</p>';
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("newsletter").innerHTML = '<p style="color: red;">Error submitting form. Please try again.</p>';
    });
});