document.addEventListener('DOMContentLoaded', function() {
    const username = '{{ site.x-username }}';
    const bearerToken = 'YOUR_BEARER_TOKEN';

    // Step 1: Get User ID
    fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
        headers: {
            "Authorization": `Bearer ${bearerToken}`
        }
    })
    .then(response => response.json())
    .then(userData => {
        const userId = userData.data.id;

        // Step 2: Get Posts
        fetch(`https://api.twitter.com/2/users/${userId}/tweets`, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        })
        .then(response => response.json())
        .then(postData => {
            let postContainer = document.getElementById('xfeed');
            postData.data.forEach(post => {
                let postElement = document.createElement('li');
                postElement.className = 'post';
                postElement.innerHTML = `<p>${post.text}</p>`;
                postContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
    })
    .catch(error => console.error('Error fetching user ID:', error));
});
