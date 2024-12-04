$(document).ready(function () {
    // Handle form submission
    $('#contact-form').submit(function (e) {
        e.preventDefault();

        const full_name = $('#full_name').val();
        const email = $('#email').val();
        const message = $('#message').val();


        // Send the data to the backend
        $.ajax({
            url: '/contact/addContact', // Your POST endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                full_name,
                email,
                message,

            }),
            success: function (response) {
                alert('Contact form submitted successfully!');
                $('#contact-form')[0].reset();  // Reset the form
            },
            error: function (error) {
                alert('Error while submitting the contact form');
            }
        });
    });
});
