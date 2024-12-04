$(document).ready(function () {
    // Show loader before the AJAX call starts
    $('#loader').show();
    $('#empty-container').show();
    // Fetch all blogs when the page loads
    $.ajax({
        url: '/api/blogs', // The endpoint for retrieving all blogs
        method: 'GET',
        success: function (blogs) {
            // Hide loader once the data is successfully fetched
            $('#loader').hide();
            $('#empty-container').hide();
            if (blogs.length === 0) {
                $('#blogs-container').html('<p>No blogs available</p>');
                return;
            }

            // Loop through each blog and append it to the container
            blogs.forEach(function (blog) {
                const maxDescriptionLength = 60; // Number of characters to display
                let shortDescription = blog.description;

                // Truncate the description if it's longer than the max length
                if (blog.description.length > maxDescriptionLength) {
                    shortDescription = blog.description.substring(0, maxDescriptionLength) + '...';
                }
                const blogHTML = `
                               
    
        <div class="card col" style="padding-left:10px">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${blog.image}" alt="Blog Image" style="height:200px; width:500px">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${blog.title}<i class="material-icons right">more_vert</i></span>
                <p>By ${blog.first_name} ${blog.last_name}</p>
                <p>${shortDescription}</p>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${blog.title}<i class="material-icons right">close</i></span>
                <p>By ${blog.first_name} ${blog.last_name}</p>
                <p>${blog.description}</p>
            </div>
        </div>

                `;
                $('#blogs-container').append(blogHTML);
            });
        },
        error: function (error) {
            console.error('Error fetching blogs:', error);
            $('#blogs-container').html('<p>Failed to load blogs. Please try again later.</p>');
        }
    });
});

