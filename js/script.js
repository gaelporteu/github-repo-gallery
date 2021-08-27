// where your profile information will appear
const overviewDiv = document.querySelector(".overview");

// my personal github username
const username = "gaelporteu";

// async function to fetch information from your GitHub profile
const fetchGithubProfile = async () => {
    
    // Target the “users” endpoint and use a template literal to add the global username variable to the endpoint
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    // resolve the JSON response
    const data = await response.json();
    
    // send data to the function
    displayUserInfo(data);

    // log out the data response
    console.log(data);
}

// call your function to see your results
fetchGithubProfile();

// display the fetched user information on the page
const displayUserInfo = data => {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img src=${data.avatar_url} alt="user avatar" />
        </figure>
        <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overviewDiv.append(div)
}
