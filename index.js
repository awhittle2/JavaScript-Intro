/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Abigail Whittle
 * Email: whittlea@oregonstate.edu
 */

// Function to add current posts to the posts array
function initializePosts() {
    // Initial size of the array
    let size = document.getElementById("posts").childElementCount;
    // Temp var to store the current post
    let currentPost;
    // Loops through all existing posts and puts them into the global post array
    for(let i = 0; i < size; i++) {
        if(i === 0) {
            // If its the first post grab the first child of the div posts
            currentPost = document.getElementById("posts").firstElementChild;
        } else {
            // If there's a previous post, just grab the next sibling
            currentPost = currentPost.nextElementSibling;
        }
        // Push the post
        posts.push(currentPost);
    }
}

// Creates a global array to store all posts (for filtering section)
let posts = [];
initializePosts();
// + button
let sellSomethingButton = document.getElementById("sell-something-button");
let modalBackdrop = document.getElementById("modal-backdrop");
let sellSomethingModal = document.getElementById("sell-something-modal");

// Function to unhide modal
sellSomethingButton.addEventListener('click', function() {
    modalBackdrop.classList.remove("hidden");
    sellSomethingModal.classList.remove("hidden");
})

// X button
let modalClose = document.getElementById("modal-close");
// Cancel button
let modalCancel = document.getElementById("modal-cancel");
// Text input fields (used to null the values)
let pText = document.getElementById("post-text-input");
let pPhoto = document.getElementById("post-photo-input");
let pPrice = document.getElementById("post-price-input");
let pCity = document.getElementById("post-city-input");

// Function to hide modal and null input values
function closeAndNull() {
    // Hide the modals
    modalBackdrop.classList.add("hidden");
    sellSomethingModal.classList.add("hidden");
    // Null the text values
    pText.value = null;
    pPhoto.value = null;
    pPrice.value = null;
    pCity.value = null;
    // Null the radio values
    postNew = document.getElementById("post-condition-new");
    postNew.checked = true;
}

// When x is clicked on modal
modalClose.addEventListener('click', function() {
    closeAndNull();
})

// When cancel is clicked on modal
modalCancel.addEventListener('click', function() {
    closeAndNull();
})

// Check to see what radio button is clicked
function getRadio() {
    // If new is clicked
    if(document.getElementById("post-condition-new").checked === true) {
        return "new";
    // If excellent is clicked
    } else if(document.getElementById("post-condition-excellent").checked === true) {
        return "excellent";
    // If good is clicked
    } else if(document.getElementById("post-condition-good").checked === true) {
        return "good";
    // If fair is clicked
    } else if(document.getElementById("post-condition-fair").checked === true) {
        return "fair";
    // If poor is clicked
    } else if(document.getElementById("post-condition-poor").checked === true) {
        return "poor";
    }
}

// Function to create post and apply classes to it
function createPost(postText, postPhoto, postPrice, postCity) {
    /* <div class="post" data-price="{{price}}" data-city="{{city}}" data-condition="{{condition}}">
        <div class="post-contents">
            <div class="post-image-container">
            <img src="{{photoURL}}" alt="{{itemDescription}}">
            </div>
            <div class="post-info-container">
            <a href="#" class="post-title">{{itemDescription}}</a> <span class="post-price">${{price}}</span> <span class="post-city">({{city}})</span>
            </div>
        </div>
    </div> */ 
    // Create first div with classes and data
    let div1 = document.createElement("div");
    div1.classList.add("post");
    div1.setAttribute("data-price", postPrice);
    div1.setAttribute("data-city", postCity);
    div1.setAttribute("data-condition", getRadio());
    // Create second div with classes
    let div2 = document.createElement("div");
    div2.classList.add("post-contents");
    div1.appendChild(div2);
    // Create third div with classes
    let div3 = document.createElement("div");
    div3.classList.add("post-image-container");
    div2.appendChild(div3);
    // Create image
    let img1 = document.createElement("img");
    img1.setAttribute("src", postPhoto);
    img1.setAttribute("alt", postText);
    // img1.alt = postText;
    div3.appendChild(img1);
    // Create fourth div with classes
    let div4 = document.createElement("div");
    div4.classList.add("post-info-container");
    div2.appendChild(div4);
    // Create a tag with classes
    let a1 = document.createElement("a");
    a1.href = "#";
    a1.classList.add("post-title");
    a1.textContent = postText;
    div4.appendChild(a1);
    // Create a span with classes
    let span1 = document.createElement("span");
    span1.classList.add("post-price");
    span1.textContent = "$" + postPrice;
    div4.appendChild(span1);
    // Create a span with classes
    let span2 = document.createElement("span");
    span2.classList.add("post-city");
    span2.textContent = "(" + postCity + ")";
    div4.appendChild(span2);
    // Add the new post to the DOM
    let postSection = document.getElementById("posts");
    postSection.appendChild(div1);
    // Push the new post to the global array of posts
    posts.push(div1);
    return;
}

// Function to check if all inputs are empty
function checkIsEmpty(postText, postPhoto, postPrice, postCity) {
    // If text is an empty string
    if(postText === '') {
        return false
    // If photo URL is an empty string
    } else if(postPhoto === '') {
        return false
    // If price is an empty string
    } else if(postPrice === '') {
        return false
    // If city is an empty string
    } else if(postCity === '') {
        return false
    // If all inputs are filled in return true
    } else {
        return true
    }
}

// When create post is clicked on modal
let modalAccept = document.getElementById("modal-accept");

modalAccept.addEventListener('click', function() {
    // Text input fields
    let postText = document.getElementById("post-text-input").value;
    let postPhoto = document.getElementById("post-photo-input").value;
    let postPrice = document.getElementById("post-price-input").value;
    let postCity = document.getElementById("post-city-input").value;
    // Makes sure that the user can see the modal
    if(!modalBackdrop.classList.contains("hidden") && !sellSomethingModal.classList.contains("hidden")) {
        if(checkIsEmpty(postText, postPhoto, postPrice, postCity)) {
            createPost(postText, postPhoto, postPrice, postCity) // Create the post
            closeAndNull() // Null the data
        } else {
            alert("Please fill out all entries before making a post") // Send alert if not all fields are entered
        }      
    }
})

// When update button is clicked
let filterUpdate = document.getElementById("filter-update-button");

// Function that returns what city the user wants to filter by
function getFilterCity() {
    let filterCity = document.getElementById("filter-city");
    // Get the number of cities
    let citySize = filterCity.childElementCount;
    // Go through each city option and see which one is selected
    for(let i = 0; i < citySize; i++) {
        if(filterCity.children[i].selected) {
            return filterCity.children[i].text; // Return selected city
        }
    }
}

// Function that returns what conditions the user wants to filter by
function getFilterCondition() {
    // Blank array to hold conditions
    let filterConditions = [];
    // If new is checked
    if(document.getElementById("filter-condition-new").checked) {
        filterConditions.push("new");
    }
    // If excellent is checked
    if(document.getElementById("filter-condition-excellent").checked) {
        filterConditions.push("excellent");
    }  
    // If good is checked
    if(document.getElementById("filter-condition-good").checked) {
        filterConditions.push("good");
    }
    // If fair is checked
    if(document.getElementById("filter-condition-fair").checked) {
        filterConditions.push("fair");
    }
    // If poor is checked
    if(document.getElementById("filter-condition-poor").checked) {
        filterConditions.push("poor");
    }
    // Return an array
    return filterConditions;
}

// Function to add everything to the dom
function addDOM(postSection, postSize) {
    // Function to first wipe the dom
    for(let i = 0; i < postSize; i++) {
        posts[i].remove();
    }
    // Function to add everything back to the dom
    for(let i = 0; i < posts.length; i++) {
        postSection.appendChild(posts[i]);
    }
}

// Function to check and see if the filter text matches the post title
function hasText(filterText, currText) {
    // If filter text is empty
    if(filterText === "") {
        return true;
    } else {
        // Set both texts to lower case
        cText = currText.toLowerCase();
        fText = filterText.toLowerCase();
        // See if filter text is in current post text
        if(cText.search(fText) != -1) {
            return true;
        } else {
            return false;
        }
    }
}

// Function to check if current post price is over or equal to filter price
function isOverMin(filterMin, currPrice) {
    // If filter min price is empty
    if(filterMin === "") {
        return true;
    } else {
        // Convert both values to ints and compare
        if(parseInt(currPrice) >= parseInt(filterMin)) {
            return true;
        } else {
            return false;
        }
    }
}

// Function to check if current post price is under or equal to filter price
function isUnderMax(filterMax, currPrice) {
    // If filter max price is empty
    if(filterMax === "") {
        return true;
    } else {
        // Convert both values to ints and compare
        if(parseInt(currPrice) <= parseInt(filterMax)) {
            return true;
        } else {
            return false;
        }
    }
}

// Function to check if the filter city and the current post city are equal
function hasCity(filterCity, currCity) {
    // If city is blank
    if(filterCity === "" || filterCity.toLowerCase() === "any") {
        return true;
    } else {
        // Compare the lowercase filter city to the lower case current post city
        if(filterCity.toLowerCase() === currCity.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }
}

// Function to check if the current post has one of the filter conditions
function hasCondition(filterCondition, currCondition) {
    // If the filter condition array is empty
    if(filterCondition.length === 0) {
        return true;
    } else {
        let hasCon = false;
        // Check each condition and compare it to the current post condition
        for(let i = 0; i < filterCondition.length; i++) {
            let current = filterCondition[i];
            // If there is a match, break, and return true
            if(current === currCondition) {
                hasCon = true;
                break;
            }
        }
    
        if(hasCon) {
            return true;
        } else {
            return false;
        }
    }
}

function filterDOM() {
    // Filter values
    let filterText = document.getElementById("filter-text").value;
    let filterMin = document.getElementById("filter-min-price").value;
    let filterMax = document.getElementById("filter-max-price").value;
    let filterCity = getFilterCity();
    let filterCondition = [];
    filterCondition = getFilterCondition();
    // Post section and size
    let postSection = document.getElementById("posts");
    let postSize = postSection.children.length;

    // Adds all posts to the dom
    addDOM(postSection, postSize);

    // Go through all posts and add them back if they match filter values
    for(let i = 0; i < postSize; i++) {
        // Temp var for current post
        let currPost = posts[i];
        // Current post info
        let currText = currPost.firstElementChild.lastElementChild.firstElementChild.text;
        let currPrice = currPost.getAttribute("data-price");
        let currCity = currPost.getAttribute("data-city");
        let currCondition = currPost.getAttribute("data-condition");
        // If data does not match, remove the post
        if(!(hasText(filterText, currText) && isOverMin(filterMin, currPrice) && isUnderMax(filterMax, currPrice) && hasCity(filterCity, currCity) && hasCondition(filterCondition, currCondition))) {
            currPost.remove();
        }
    }
}

// Attaches a listener to the update button
filterUpdate.addEventListener("click", function() {
    filterDOM();
})
