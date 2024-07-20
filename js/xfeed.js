document.addEventListener('DOMContentLoaded', function() {
    const username = '{{ site.x_username }}';
    const bearerToken = 'YOUR_BEARER_TOKEN';

    // Step 1: Get User ID
    fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
        headers: {
            "Authorization": `Bearer ${bearerToken}`
        }
    })
    .then(response => response.json())
    .then(userData => {
        if (!userData.data) {
            console.error('Error fetching user data', userData);
            return;
        }
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
            if (!postData.data) {
                console.error('Error fetching post data', postData);
                return;
            }
            postData.data.forEach(post => {
                let postElement = document.createElement('li');
                postElement.className = 'x-post';
                postElement.innerHTML = `<p>${post.text}</p>`;
                postContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
    })
    .catch(error => console.error('Error fetching user ID:', error));
});
