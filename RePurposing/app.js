// Declared variable `db` to hold the database instance once it's ready.
let db;

// Open the database. If the database doesn't exist, it will be created.
const request = indexedDB.open("RenoBayDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;

    const store = db.createObjectStore("requests", {
        keyPath: "id",
        autoIncrement: true
    });
};

// On success, we store the database instance in the `db` variable for later use.

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database ready");
    loadRequests();
};

// On error, we log the error to the console.

request.onerror = function() {
    console.log("Database error");
};

const submitBtn = document.getElementById("btn-submit-request");
if (submitBtn)  {
    submitBtn.addEventListener("click", function() {
        window.location.href = "requestForm.html";
    });
}

// This function loads all requests from the "requests" object store in IndexedDB and displays the newest request on the page.
// It retrieves all requests, sorts them by creation date, and updates the first request card with the details of the newest request.
function loadRequests() {

    // Creates a transaction to read from the "requests" object store and get all requests.
    const tx = db.transaction("requests", "readonly");
    // Access the "requests" object store and get all requests.
    const store = tx.objectStore("requests");
    // Request to get all requests from the store.
    const getRequests = store.getAll();

    // When the request to get all requests is successful, process the results to display the newest request on the page.
    getRequests.onsuccess = function() {

        const requests = getRequests.result;

        if (!requests.length) return;

        // Sort newest first
        requests.sort((a, b) => new Date(b.created) - new Date(a.created));

        const newest = requests[0];

        const grid = document.getElementById("requestGrid");
        if (!grid) return;

        const firstCard = grid.querySelector(".request-card");

        if (!firstCard) return;

        firstCard.querySelector(".card-title").textContent = newest.title;
        firstCard.querySelector(".card-description").textContent = newest.description;

        const contact = firstCard.querySelector(".contact-details");

        if (contact) {
            contact.innerHTML = `<p>Email: ${newest.email}</p>`;
        }

        const imageDiv = firstCard.querySelector(".card-image");

        if (newest.images.length > 0) {
            imageDiv.style.backgroundImage = `url(${newest.images[0]})`;
            imageDiv.style.backgroundSize = "cover";
            imageDiv.style.backgroundPosition = "center";
        }
    };
}
// Form submission handler to save the request data to IndexedDB.
// It also handles image uploads and converts them to base64 format for storage.

 // document.getElementById("requestForm").addEventListener("submit", async function(e){
const form = document.getElementById("requestForm");
if (form) {
    form.addEventListener("submit", async function(e){
    // Prevent the default form submission behavior to handle it with JavaScript.
    e.preventDefault();

    // Collect form data from the input fields.
    const title = document.getElementById("title").value;
    const zip = document.getElementById("zip").value;
    const email = document.getElementById("email").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    // Handle image uploads. We allow a maximum of 2 images, and convert them to base64 format for storage in IndexedDB.
    const files = document.getElementById("images").files;

    // Check if more than 2 images are uploaded and alert the user if so.
    if(files.length > 2){
        alert("Maximum 2 images allowed");
        return;
    }

    // Array to hold the base64 representations of the uploaded images.
    const images = [];

    // Loop through the uploaded files, convert each to base64, and store in the `images` array.
    for(let file of files){
        const base64 = await toBase64(file);
        images.push(base64);
    }

    // Create a data object to hold all the request information, including the title, zip code, email, category, description, images, and the creation date.
    const data = {
        title,
        zip,
        email,
        category,
        description,
        images,
        created: new Date()
    };

    // Call the `saveRequest` function to save the request data to IndexedDB.
    saveRequest(data);

});
}

// Below is the IndexedDB code to save the request data, and a helper function to convert images to base64 format for storage.

// IndexedDB
// This function takes the request data object and saves it to the "requests" object store in IndexedDB. It uses a transaction to perform the operation, and handles success and error cases to provide feedback to the user.
function saveRequest(data){

    const tx = db.transaction("requests", "readwrite");
    const store = tx.objectStore("requests");

    store.add(data);

    tx.oncomplete = function(){
        document.getElementById("status").innerText = "Request successfully saved!";
        document.getElementById("requestForm").reset();
    };

    tx.onerror = function(){
        document.getElementById("status").innerText = "Error saving request.";
    };

}
const contactBtns = document.querySelectorAll(".btn-contact");
contactBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
        const details = this.nextElementSibling;
        if(details.style.display === "none"){
            details.style.display = "block";
            this.textContent = "Hide Contact";
        } else {
            details.style.display = "none";
            this.textContent = "Contact";
        }
    });
});

// Convert images to base64
// This function takes a file object (representing an uploaded image) and returns a Promise that resolves to the base64 representation of the file. It uses the FileReader API to read the file as a data URL, which is a base64 encoded string that can be stored in IndexedDB.
function toBase64(file){

    return new Promise((resolve,reject)=>{

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);

    });

}

// This function clears all requests from the "requests" object store in IndexedDB.
// Use clearRequests(); to clear all requests from the database.
function clearRequests() {

    const tx = db.transaction("requests", "readwrite");
    const store = tx.objectStore("requests");

    const clearRequest = store.clear();

    clearRequest.onsuccess = function() {
        console.log("All requests cleared");
    };

}