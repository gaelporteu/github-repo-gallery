// where your profile information will appear
const overviewDiv = document.querySelector(".overview");

// select the unordered list to display the repos list
const ulRepoList = document.querySelector(".repo-list")

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

// async function to fetch your repos
const fetchGithubRepos = async () => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);

    const data = await response.json();
    
    displayEachRepo(data);
}

fetchGithubRepos();

const displayEachRepo = repos => {
    repos.forEach(repo => {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `
            <h3>${repo.name}</h3>
        `
        ulRepoList.append(li)
    })
    
}

