//
//
// Copyright Here
//
//


var config;
var postData_url;

var postData;

function checkUrl(string) {
    let givenURL;
    try {
        givenURL = new URL(string);

    } catch (error) {
        return false;
    }
    return true;
}

async function getData(url) {
    const response = await fetch(url);
    if (response.status != 200) {
        resp = response.statusText;
    } else {
        resp = response.json();
    }

    return [response.status, resp];
}

function defaultLoadPosts(parentElementId) {
    var start = Date.now();
    var parentElement;
    parentElement = document.getElementById(parentElementId);

    if (parentElement === null) {
        console.log(`Parent Element with ID ${parentElementId} does not exist!`);
        return
    }

    postData = postData.posts;

    postData.sort(function (a, b) {
        return b.id - a.id;
    });

    parentElement.classList.add("grb-posts");

    for (var i = 0; i < postData.length; i++) {
        var post = postData[i];
        var postDiv = document.createElement('div');
        postDiv.classList.add('grb-post');

        var headerSpan = document.createElement('span');
        headerSpan.classList.add('grb-post-header');

        var titleLink = document.createElement('a');
        titleLink.href = post.titleLink;
        titleLink.target = "_blank";
        titleLink.classList.add("grb-post-title");
        titleLink.textContent = post.title;

        var postInfoDiv = document.createElement('div');
        postInfoDiv.classList.add('grb-post-info');
        var authorAvatar = document.createElement('img');
        authorAvatar.classList.add('grb-post-author-avatar');
        authorAvatar.setAttribute("src", post.author_avatar);

        // TODO: add vertical next to avatar:
        // TODO:                title - date
        // TODO:                author name

        postInfoDiv.appendChild(authorAvatar);

        var uidPortion = document.createElement('p');
        uidPortion.classList.add("grb-post-uid");
        uidPortion.textContent = `\nPost UID: ${post.uid}`;

        var postContent = document.createElement('p');
        postContent.classList.add("grb-post-content");
        postContent.textContent = post.content.replace("<!--start-edited-tag-->", "").replace("<!--end-edited-tag-->", "");

        var postStats = document.createElement('span');
        postStats.classList.add("grb-stats");

        var likeSpan = document.createElement('span');
        likeSpan.classList.add('grb-likes');
        var likeIcon = document.createElement('i');
        likeIcon.className = "bx bx-like"; // <i class='bx bx-like'></i>
        var likes = document.createElement('p');
        likes.textContent = post.likes;
        likeSpan.appendChild(likeIcon);
        likeSpan.appendChild(likes);

        var shareSpan = document.createElement('span');
        shareSpan.classList.add('grb-shares');
        var shareIcon = document.createElement('i');
        shareIcon.className = "bx bx-share"; // <i class='bx bx-share'></i>
        var shares = document.createElement('p')
        shares.textContent = post.shares;
        shareSpan.appendChild(shareIcon);
        shareSpan.appendChild(shares);

        postStats.appendChild(likeSpan);
        postStats.appendChild(shareSpan);

        headerSpan.appendChild(postInfoDiv);
        headerSpan.appendChild(uidPortion);

        postDiv.appendChild(headerSpan);
        postDiv.appendChild(postContent);
        postDiv.appendChild(postStats);
        // TODO: make a builder

        if (post.headline) {
            postDiv.classList.add("grb-post-pinned");
            parentElement.prepend(postDiv);
        } else {
            parentElement.appendChild(postDiv);
        }

        var timeTaken = Date.now() - start;
        console.log("Posts loaded in: " + timeTaken + " milliseconds");

    }
}

async function startGRB() {
    const configResponse = await fetch("./blogconfig.json");
    config = await configResponse.json();
    console.log(config);
    switch (config.repository.host.toString().toLowerCase()) {
        case "github":
            // https://raw.githubusercontent.com/The-Holy-Church-of-Terry-Davis/The-Holy-Church-of-Terry-Davis.github.io/main/js/loadposts.js
            let base = `https://raw.githubusercontent.com/${config.repository.repository}/${config.repository.branch}`;
            postData_url = `${base}/${config.paths.posts_json}`
            break;
        case "gitlab":
            console.log("GitLab is not yet supported.")
            return;
        case "custom":
            console.log("Custom hosts are not yet supported.");
            return;
        default:
            console.log(`Host '${host}' is not supported.`);
            return;
    }
    await getData(postData_url);
}

(async () => {
    await startGRB();
    postData = await getData(postData_url);
    if (postData[0] != 200) {
        console.log(`HTTP ${postData[0]} for blog.json with URL:\n${postData_url}`);
        return;
    }
    postData = await postData[1];
    console.log(postData);

    defaultLoadPosts("blog-posts");
})();
