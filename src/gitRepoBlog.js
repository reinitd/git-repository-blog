//
//
// Copyright Here
//
//

var config;
var posts_url;
var comments_url;
var likes_url;

var blog_posts;
var blog_comments;
var blog_likes;

function checkUrl(string) {
    let givenURL;
    try {
        givenURL = new URL(string);

    } catch (error) {
        return false;
    }
    return true;
}


async function startGRB() {
    const configResponse = await fetch("./blogconfig.json");
    config = configResponse.json();
    let host = config.repository.link.split("/")[1].split(".");
    switch(host.toLowerCase()) {
        case "github.com":
            // https://github.com/QAEZZ/DSTP/blob/main/src/main.py
            let base = `${config.repository.link}/blob/${config.repository.branch}`;
            posts_url = `${base}/${config.paths.posts_json}`
            comments_url = `${base}/${config.paths.comments_json}`
            likes_url = `${base}/${config.paths.likes_json}`
            break;
        default:
            console.log(`Host '${host}' is not supported.`);
            return;
    }
    
}
await startGRB()
