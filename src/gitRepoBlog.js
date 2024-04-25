//
//
// Copyright Here
//
//


var config;
var postData_url;

var postData;

// https://stackoverflow.com/a/54524040/14363702
function unixToNormal(unixTimestamp) {
    return new Date(unixTimestamp * 1000).toISOString().slice(0, 19).replace('T', ' ')
}

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
        titleLink.href = post.title_link;
        titleLink.target = "_blank";
        titleLink.classList.add("grb-post-title");
        titleLink.textContent = `${post.author} • ${post.title}`;

        var postInfoDiv = document.createElement('div');
        postInfoDiv.classList.add('grb-post-info');
        var authorAvatar = document.createElement('img');
        authorAvatar.classList.add('grb-post-author-avatar');
        authorAvatar.setAttribute("src", post.author_avatar);

        var postDetailsDiv = document.createElement('div');
        postDetailsDiv.classList.add('grb-post-details');

        var postCreationDate = document.createElement('p');
        postCreationDate.classList.add('grb-post-creation-date');
        postCreationDate.textContent = unixToNormal(post.creation_timestamp);
        
        postDetailsDiv.appendChild(titleLink);
        postDetailsDiv.appendChild(postCreationDate);

        postInfoDiv.appendChild(authorAvatar);
        postInfoDiv.appendChild(postDetailsDiv);

        var uidPortion = document.createElement('p');
        uidPortion.classList.add("grb-post-uid");
        uidPortion.textContent = `\nPost UID: ${post.uid}`;

        var postContent = document.createElement('p');
        postContent.classList.add("grb-post-content");
        postContent.textContent = post.content;
        var postStats = document.createElement('span');
        postStats.classList.add("grb-post-stats");

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

        var interactionsSpan = document.createElement('span');
        interactionsSpan.classList.add('grb-post-interactions');
        interactionsSpan.appendChild(likeSpan);
        interactionsSpan.appendChild(shareSpan);

        if (post.comments.length > 0) {
            var commentDetails = document.createElement('details');
            var commentSummary = document.createElement('summary');
            commentSummary.classList.add('grb-post-summary');
            commentSummary.textContent = `Click to View Comments (${post.comments.length})`;
            
            commentDetails.appendChild(commentSummary);

            // {
            //     "id": 0,
            //     "uid": 1234,
            //     "author": "Comment Author",
            //     "author_avatar": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
            //     "comment_content": "Comment content here.",
            //     "comment_timestamp": 1713273446,
            //     "likes": 0
            // }
            
            for (let i = 0; i < post.comments.length; i++) {
                var commentDiv = document.createElement('div');
                commentDiv.classList.add('grb-comment');

                var commentHeader = document.createElement('span');
                commentHeader.classList.add('grb-comment-header');
                var commentInfo = document.createElement('div');
                commentInfo.classList.add('grb-comment-info');
                var commentAuthor = document.createElement('p');
                commentAuthor.classList.add('grb-comment-title');
                commentAuthor.textContent = post.comments[i].author;
                var commentCreation = document.createElement('p');
                commentCreation.classList.add('grb-comment-creation-date');
                commentCreation.textContent = unixToNormal(post.comments[i].comment_timestamp);

                var commentContent = document.createElement('p');
                commentContent.classList.add('grb-comment-content');
                commentContent.textContent = post.comments[i].comment_content;

                var commentUid = document.createElement('p');
                commentUid.classList.add('grb-comment-uid');
                commentUid.textContent = `UID: ${post.comments[i].uid}`;

                var likeSpan = document.createElement('span');
                likeSpan.classList.add('grb-comment-likes');
                var likeIcon = document.createElement('i');
                likeIcon.className = "bx bx-like"; // <i class='bx bx-like'></i>
                var likes = document.createElement('p');
                likes.textContent = post.comments[i].likes;
                likeSpan.appendChild(likeIcon);
                likeSpan.appendChild(likes);

                commentInfo.appendChild(commentAuthor);
                commentInfo.appendChild(commentCreation)
                commentInfo.appendChild(commentUid);

                commentHeader.appendChild(commentInfo);
                
                commentDiv.appendChild(commentHeader);
                commentDiv.appendChild(commentContent);
                commentDiv.appendChild(likeSpan);


                commentDetails.appendChild(commentDiv);
            }

            // var commentTextNode = document.createTextNode('Comments here.');
            // commentDetails.appendChild(commentTextNode);
        
            postStats.appendChild(commentDetails);
        }

        postStats.append(interactionsSpan);

        headerSpan.appendChild(postInfoDiv);
        headerSpan.appendChild(uidPortion);

        postDiv.appendChild(headerSpan);
        if (post.edited_timestamp != null) {
            var editedTimestamp = document.createElement('p');
            editedTimestamp.classList.add('grb-post-edited-timestamp');
            editedTimestamp.textContent = `Edited on: ${unixToNormal(post.edited_timestamp)}`;
            postDiv.appendChild(editedTimestamp);
        }
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
    let host = config.repository.host.toString().toLowerCase();
    console.log(config);
    switch (host) {
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
    var authNoticeDiv = document.createElement('div');
    authNoticeDiv.classList.add('grb-auth-notice');
    
    var authNoticeMessage = document.createElement('p');
    authNoticeMessage.classList.add('grb-auth-notice-message');
    authNoticeMessage.textContent = `Please authenticate with ${host.toUpperCase()} inorder to interact with blog posts and comments.`;

    var authNoticeButton = document.createElement('button');
    authNoticeButton.classList.add('grb-auth-notice-button');
    authNoticeButton.textContent = "Authenticate";

    authNoticeDiv.appendChild(authNoticeMessage);
    authNoticeDiv.appendChild(authNoticeButton);
    document.body.prepend(authNoticeDiv);
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
