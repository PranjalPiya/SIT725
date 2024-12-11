const addCards = (items) => {
    items.forEach(blog => {
        console.log(blog);
        let shortDescription = blog.description.length > 100 ? blog.description.substring(0, 100) + '...' : blog.description;

        let itemToAppend =
            ` <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${blog.image}" alt="Blog Image" style="height:350px; fit: cover">
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
        </div>`;
        $("#blogs-container").append(itemToAppend);
    });

}



const blogSubmit = () => {
    let formData = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        title: $('#title').val(),
        image: $('#image').val(),
        description: $('#description').val()
    };

    //  validation
    if (!formData.first_name || !formData.last_name || !formData.title || !formData.description) {
        alert("Please fill out all required fields.");
        return;
    }
    console.log(formData);
    postingBlog(formData);
};


function postingBlog(blog) {
    $.ajax({
        url: '/api/blog',
        type: 'POST',
        data: JSON.stringify(blog), // Convert to JSON string
        contentType: 'application/json',
        success: (result) => {
            if (result.statusCode === 201 || result.statusCode === 200) {
                alert('Blog submitted successfully');
                location.reload();
            } else {
                alert('Blog submission failed');
            }
        },
        error: (err) => {
            console.error('Error:', err);
            alert('An error occurred while submitting the blog');
        }
    });
}

const contactSubmit = () => {
    let formData = {
        full_name: $('#full_name').val(),
        email: $('#email').val(),
        message: $('#message').val()
    };

    //  validation
    if (!formData.full_name || !formData.email || !formData.message) {
        alert("Please fill out all required fields.");
        return;
    }
    console.log(formData);
    postingContact(formData);
};
// for submitting the contact
function postingContact(contact) {
    $.ajax({
        url: '/api/contact',
        type: 'POST',
        data: JSON.stringify(contact),  // Convert to JSON string
        contentType: 'application/json',  // Ensure the data is sent as JSON
        success: (result) => {
            if (result.statusCode === 201 || result.statusCode === 200) {
                alert('Contact submitted successfully');
                location.reload();
            } else {
                alert('Contact submission failed');
            }
        },
        error: (err) => {
            console.error('Error submitting contact:', err);
        }
    });
}


function gettingAllBlogs() {
    $('#loader').show();
    $('#empty-container').show();
    $.get('/api/blogs', (result) => {

        if (result.statusCode === 200) {
            $('#loader').hide();
            $('#empty-container').hide();
            addCards(result.data);
        } else {
            console.log('Error fetching blogs:', result);
        }
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log('Request failed: ', textStatus, errorThrown);
    });
}






$(document).ready(function () {
    $('#addBlog').click(() => {
        blogSubmit();
    });
    $('#addContact').click(() => {
        contactSubmit();
    });
    gettingAllBlogs();
});