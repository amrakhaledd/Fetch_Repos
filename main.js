// Main Variables
let theInput = document.querySelector(".get-repo input");
let getButton = document.querySelector(".get-repo .get-button");
let reposData = document.querySelector(".show-data");
let reposCount = document.querySelector(".repos-count");

getButton.onclick = function () {
  getRepos();
  if (theInput.value === "") {
    reposCount.style.display = "none";
  } else {
    reposCount.style.display = "block";
  }
};

//Get Repos Function
function getRepos() {
  if (theInput.value === "") {
    //if value is empty
    reposData.innerHTML = `<span>Please Write Github Username.</span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((result) => result.json())

      .then((repos) => {
        //Add Number Of Repo
        reposCount.innerHTML = "";
        let reposCountText = document.createTextNode(
          `Number Of Repos : ${repos.length}`
        );
        reposCount.appendChild(reposCountText);

        //Empty The Container
        reposData.innerHTML = "";
        //Loop On Repos
        repos.forEach((repo) => {
          //Create Main Div Element
          let mainDiv = document.createElement("div");
          let innerDiv = document.createElement("div");

          //Create Repo Name Text
          let repoName = document.createTextNode(repo.name);

          //Append Text To Main Div
          mainDiv.appendChild(repoName);

          //Create Repo Url
          let theUrl = document.createElement("a");

          //Append Repo Url Text To Anchor Tag
          theUrl.textContent = "Visit";

          //Add href to Anchor Tag
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          //Set Attribute Blank
          theUrl.setAttribute("target", "_blank");

          //Append Anchor tag To inner Div
          innerDiv.appendChild(theUrl);

          //Create span of count of watchers
          let theWatchers = document.createElement("span");
          theWatchers.innerHTML = `Watchers ${repo.watchers}`;
          innerDiv.appendChild(theWatchers);

          //Create span of count of size
          let theSize = document.createElement("span");
          theSize.innerHTML = `Size  ${repo.size}`;
          innerDiv.appendChild(theSize);

          //Create Stars Count Span
          let starsSpan = document.createElement("span");

          //Create Stars Count Text
          let starsText = document.createTextNode(
            `Starts ${repo.stargazers_count}`
          );

          //Add Text To Stars
          starsSpan.appendChild(starsText);

          //Append Stars tag To inner Div
          innerDiv.appendChild(starsSpan);

          //Add Class To Main Div
          mainDiv.className = "repo-box";

          //Append Main Div To Container
          mainDiv.appendChild(innerDiv);
          reposData.appendChild(mainDiv);
        });
      });
  }
}
