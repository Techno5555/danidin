// JavaScript source code
function sendMessage() {
    let message = "שלום עולם";
    // Use the correct international format for WhatsApp
    let phoneNumber = "972534378742";
    let url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(url, '_blank');
}
function displayImage() {
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');

    // Check if any file is selected
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        // Set up onload event for FileReader
        reader.onload = function (e) {
            // Set the src attribute of the image element
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';

            // Store the uploaded image URL for sharing
            uploadedImageUrl = e.target.result;

            // Show the "Send to WhatsApp" button
            //document.getElementById('send-button').style.display = 'inline-block';
            const phoneNumber = "972534378742";  // Replace with the actual number

            // Since we can't send the actual image, send the preview image data URL as a message
            const message = `Check out this image: ${uploadedImageUrl}`;

            // WhatsApp URL with the prefilled message
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp link in a new tab
            window.open(whatsappUrl, '_blank');
        }
        imagePreview.style.opacity = 1;
        // Read the file as Data URL
        reader.readAsDataURL(fileInput.files[0]);

        reader.addEventListener("load", () => {
            // Retrieve the current list of images from localStorage
            let images = JSON.parse(localStorage.getItem("image-list")) || [];

            // Add the new image to the list
            if (images.includes(reader.result)) {
                console.log("The picture is already in the list")
            }
            else {
                images.push(reader.result);
                localStorage.setItem("image-list", JSON.stringify(images));

                // Update the preview and image list display
              //  saveImages(images);
            }

            // Save the updated list back to localStorage
        });
        
        
    }
}

function removeImage() {
    const imagePreview = document.getElementById('imagePreview');
   // const fileInput = document.getElementById('fileInput');

    // Reset the image source and hide the preview
    imagePreview.src = "";
    imagePreview.style.opacity = 0;
    // Clear the image list in localStorage if you are using it
    localStorage.removeItem("image-list");
}











function toggleObjects(button) {
    // Get the target group name from the button's data-target attribute
    const targetGroup = button.getAttribute('data-target');

    // Toggle the answer block (object-group)
    const textElement = document.querySelector(`.object-group.${targetGroup}`);
    if (textElement) {
        textElement.style.display = (textElement.style.display === 'block') ? 'none' : 'block';
    }

    // Toggle the arrow image (only the one next to the button)
    const parent = button.parentElement;
    if (parent) {
        const image = parent.querySelector(`img.${targetGroup}`);
        if (image) {
            image.classList.toggle('rotated');
        }
    }
}

//smooth
function fastSmoothScroll(targetPosition, speed) {
    const currentPosition = window.scrollY;
    const distance = targetPosition - currentPosition;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const scrollStep = Math.min(progress / speed, 1); // Faster with smaller speed value

        window.scrollTo(0, currentPosition + distance * scrollStep);

        if (scrollStep < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}
// Scroll to sections with smooth scrolling
document.querySelectorAll('.small-conetnt').forEach(function (element) {
    element.addEventListener('click', function () {
        // Get the target section ID
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        const offset = -340; // Adjust this offset value as needed
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;

        // Scroll to the calculated position
        fastSmoothScroll(targetPosition, 300);
    });
});


window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const objects = document.querySelectorAll('.small-conetnt');

    objects.forEach(function (obj) {
        const from = parseInt(obj.getAttribute('data-change-from'), 10);
        const to = parseInt(obj.getAttribute('data-change-to'), 10);

        if (scrollPosition >= from && scrollPosition <= to) {
            obj.classList.add('changed');
        } else {
            obj.classList.remove('changed');
        }
    });
});


function placeRegistration()
{
    const greenObject = document.getElementById('background-disappear');
    greenObject.style.right = "0%";
}
function placeConnection()
{
    const greenObject = document.getElementById('background-disappear');
    greenObject.style.right = "50%";
}






