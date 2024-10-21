

// Select all images with the class 'demo-cart'
var cartImages = document.querySelectorAll(".cart, .portal");

// Function to handle the click, hover, and release behavior
function setupImageEvents(img) {
  var isClicked = false; // To track if the image is clicked
  
  // Set the default image on page load
  img.src = img.dataset.default;
  
  // Hover effect (when the mouse moves over the image)
  img.addEventListener("mouseover", function() {
    if (!isClicked) {
      img.src = img.dataset.hover; // Use the hover image from the dataset
    }
  });

  // Revert to not hovered state when the mouse leaves the image
  img.addEventListener("mouseout", function() {
    if (!isClicked) {
      img.src = img.dataset.default; // Use the default image from the dataset
    }
  });

  // Clicked state (when the mouse is pressed)
  img.addEventListener("mousedown", function() {
    isClicked = true;
    img.src = img.dataset.click; // Use the clicked image from the dataset

    if (img.classList.contains('portal'))
    {
      if (img.classList.contains('email-link'))
      {
        //open external link
        var email = "Kevin@Coalmineraudio.com";
        var subject = "Audio Interest";
        
        // Create the mailto link
        var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject);
        
        // Use window.location.href to trigger the email client
        window.location.href = mailtoLink;
      }

      else{
        //do other logic
        window.open(img.dataset.url, '_blank');
      }
    }

    if (img.classList.contains('cart'))
    {
      //scroll to the intended icon
      var targetSection = document.querySelector(img.dataset.target);
      if(targetSection)
      {
        targetSection.scrollIntoView(
          {
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          }
        )
      }
    }
  });


  // Global mouseup event to detect mouse release anywhere on the page
  document.addEventListener("mouseup", function() {
    if (isClicked) {
      isClicked = false;
      // Check if the mouse is still over the image
      var isHovering = img.matches(':hover');
      if (isHovering) {
        img.src = img.dataset.hover; // Revert to hover image
      } else {
        img.src = img.dataset.default; // Revert to default image
      }
    }
  });

    // Detect when the user switches back to the tab and reset the clicked state
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === 'visible') {
        isClicked = false; // Reset the clicked state when coming back to the tab
        img.src = img.dataset.default; // Reset the image to the default state
      }
    });
}

// Loop through each image and apply the event listeners
cartImages.forEach(function(img) {
  setupImageEvents(img);
});


// Select all div elements with the class 'interactive-div'
var divElements = document.querySelectorAll(".circle-link, .youtube-vid");

// Shared border properties for all divs
var defaultOutline = "2px solid black";               // Default no border/outline
var hoverOutline = "5px solid white";       // Hover state outline
var clickedOutline = "5px solid black";      // Clicked state outline

// Function to handle the hover, click, and release behavior
function setupDivEvents(div) {
  var isClicked = false; // To track if the div is clicked
  
  // Set the default outline on page load
  div.style.outline = defaultOutline;
  
  // Hover effect (when the mouse moves over the div)
  div.addEventListener("mouseover", function() {
    if (!isClicked) {
      div.style.outline = hoverOutline; // Apply hover outline
    }
  });

  // Revert to default outline when the mouse leaves the div
  div.addEventListener("mouseout", function() {
    if (!isClicked) {
      div.style.outline = defaultOutline; // Revert to default outline
    }
  });

  // Clicked state (when the mouse is pressed)
  div.addEventListener("mousedown", function() {
    isClicked = true;
    div.style.outline = clickedOutline; // Apply clicked outline
  });

  // Global mouseup event to detect mouse release anywhere on the page
  document.addEventListener("mouseup", function() {
    if (isClicked) {
      isClicked = false;
      // Check if the mouse is still over the div
      var isHovering = div.matches(':hover');
      if (isHovering) {
        div.style.outline = hoverOutline; // Revert to hover outline
      } else {
        div.style.outline = defaultOutline; // Revert to default outline
      }
    }
  });
}

// Loop through each div and apply the event listeners
divElements.forEach(function(div) {
  setupDivEvents(div);
});

// IMAGE ROTATION
let currentStep = 0; // 0: to 2 o'clock, 1: back to 12 o'clock, 2: to 10 o'clock, 3: back to 12 o'clock
const images = document.querySelectorAll('.small-icon, .jam-icon');

function rotateImages() {
  images.forEach(image => {
    if (currentStep === 0) {
      // Rotate to 2 o'clock (60 degrees)
      image.style.transform = 'rotate(30deg)';
    } else if (currentStep === 1) {
      // Rotate back to 12 o'clock (0 degrees)
      image.style.transform = 'rotate(0deg)';
    } else if (currentStep === 2) {
      // Rotate to 10 o'clock (300 degrees)
      image.style.transform = 'rotate(-30deg)';
    } else if (currentStep === 3) {
      // Rotate back to 12 o'clock (0 degrees)
      image.style.transform = 'rotate(0deg)';
    }
  });

  // Update the current step
  currentStep = (currentStep + 1) % 4; // Loop through 0, 1, 2, 3
}

// Start the rotation sequence when the page loads
window.addEventListener('DOMContentLoaded', function() {
  // Start the first rotation to 2 o'clock
  rotateImages();
  // Set intervals for subsequent rotations
  setInterval(rotateImages, 2000); // Adjust the timing as needed (2000ms = 2 seconds)
});

// Get modal element
var modal = document.getElementById("myModal");
var toolbar = document.getElementById("toolbar")
var span = document.getElementsByClassName("close")[0];

// Add event listeners to all icons with class "openModalIcon"
document.querySelectorAll('.circle-link').forEach(function(icon) {
  icon.onclick = function() {
    if (icon.classList.contains('jam-icon'))
    {
      var url = icon.getAttribute('data-url');
      window.open(url, '_blank');
    }

    else
    {
    var fileToLoad = this.getAttribute('data-file'); // Get the file name from data-file attribute
    
    // Fetch and load the HTML content into the modal
    fetch(fileToLoad)
      .then(response => response.text())
      .then(data => {
        document.getElementById("modalBody").innerHTML = data; // Inject the content
        modal.style.display = "flex"; // Show the modal (using flexbox)
        toolbar.style.display = "none";
      })
      .catch(error => console.error('Error loading the content:', error));
    }
  };
});

// When the close button is clicked, hide the modal
span.onclick = function() {
  modal.style.display = "none";
  toolbar.style.display = "flex";
};

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


