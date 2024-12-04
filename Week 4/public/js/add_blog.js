$(document).ready(function () {
    // Handle form submission
    $('#projectForm').submit(function (e) {
        e.preventDefault();

        const first_name = $('#first_name').val();
        const last_name = $('#last_name').val();
        const title = $('#title').val();
        const image = $('#image').val();
        const description = $('#description').val();

        // Send the data to the backend
        $.ajax({
            url: '/api/blogs', // Your POST endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                first_name,
                last_name,
                title,
                image,
                description
            }),
            success: function (response) {
                alert('Blog added successfully!');
                $('#projectForm')[0].reset();  // Reset the form
            },
            error: function (error) {
                alert('Error adding blog');
            }
        });
    });
});
