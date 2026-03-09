// app.js

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
};

// On error, we log the error to the console.

request.onerror = function() {
    console.log("Database error");
};

// Form submission handler to save the request data to IndexedDB.
// It also handles image uploads and converts them to base64 format for storage.

document.getElementById("requestForm").addEventListener("submit", async function(e){

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