
$(document).ready(function () {
    $('.modal').modal();
});

$(document).ready(function () {
    $(".dropdown-trigger").dropdown();

})



// Floating action button query

$(document).ready(function () {
    $('.fixed-action-btn').floatingActionButton();
});


//slider 
$(document).ready(function () {
    $('.slider').slider({
        height: 450
    });
});


//parallax scrolling
$(document).ready(function () {
    $('.parallax').parallax();  // Initialize the parallax effect
});

//for media zoon

$(document).ready(function () {
    $('.materialboxed').materialbox();
});

// for form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent form from submitting
    alert('The form was submitted Successfully!')
});