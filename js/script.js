// where your profile information will appear
const overviewDiv = document.querySelector(".overview");

// select the unordered list to display the repos list
const ulRepoList = document.querySelector(".repo-list")

// where all my repo information appears
const sectionRepos = document.querySelector(".repos");

// where the individual repo data will appear
const sectionRepoData = document.querySelector(".repo-data")

// select the Back to Repo Gallery button
const buttonBack = document.querySelector(".view-repos");

// select the input with the “Search by name” placeholder
const filterInput = document.querySelector(".filter-repos");

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
    overviewDiv.appendChild(div)
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
        ulRepoList.appendChild(li)
    })
    
    filterInput.classList.toggle("hide");
}

// click event on the unordered list with a class of "repo-list"
ulRepoList.addEventListener("click", e => {
    if (e.target.matches("h3")) {

        // target the innerText where the event happens
        const repoName = e.target.innerText;
        getSpecificRepo(repoName);
    }

})

// async function to get specific repo information that accepts repoName as a parameter
const getSpecificRepo = async repoName => {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

    const repoInfo = await response.json();

    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url)

    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const lang in languageData){
        languages.push(lang);
    }

    console.log(languages);

    displayRepoInfo(repoInfo, languages);
}

const displayRepoInfo = (repoInfo, languages) => {
    sectionRepoData.innerHTML = "";

    const div = document.createElement("div");

    div.innerHTML = `
        <h3>${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a href="${repoInfo.html_url}" class="visit" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
    `
    sectionRepoData.appendChild(div)

    sectionRepoData.classList.toggle("hide");

    sectionRepos.classList.toggle("hide");

    buttonBack.classList.toggle("hide");

    filterInput.classList.toggle("hide")
}

buttonBack.addEventListener("click", () => {
    sectionRepos.classList.toggle("hide");
    sectionRepoData.classList.toggle("hide");
    buttonBack.classList.toggle("hide");
    filterInput.classList.toggle("hide")
})

filterInput.addEventListener("input", e => {
    const inputValue = e.target.value;

    const repos = document.querySelectorAll(".repo");
    
    const searchText = inputValue.toLowerCase();
    
    // console.log(searchText);
    for (let repo of repos) {
      
      const lowCaseRepo = repo.innerText.toLowerCase();
      
      if (lowCaseRepo.includes(searchText)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }
    }
})