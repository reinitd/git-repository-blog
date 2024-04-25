# Git Repository Blog

### Not Done!

## How does this work?

The script fetches data from a GitHub repo: the blog posts, comments, shares, likes, etc. The user authenticates with GitHub (GitLab and BitBucket coming soon) to interact with the blog (likes, shares, posts, comments, etc.). It's terrible for SEO, but turns a statically hosted site, such as a site hosted with GitHub pages, into a dynamic blog site.

## Instructions

Create a `blogconfig.json` file in the site's root directory:
```json
{
  "repository": {
    "host": "github",
    "repository": "octocat/example",
    "branch": "main"
  },
  "paths": {
    "posts_json": "data/blog.json"
  }
}
```

Create a `posts.json` file anywhere in a publicly accessible place in the project directory, it's recommended that you create a new repository just for the blog's data, so other users wont have access to the site's main repository. You can leave this blank, here is an example of what it will look like:
```json
{
  "last_updated_timestamp": 1713358687,
  "posts": [
    {
      "id": 0,
      "uid": 4321,
      "headline": false,
      "title": "Blog Post Title",
      "title_link": "https://github.com",
      "author": "John Doe",
      "author_avatar": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
      "content": "Blog post content here.",
      "creation_timestamp": 1712927166,
      "edited_timestamp": null,
      "likes": 0,
      "shares": 0,
      "comments": [
        {
          "id": 0,
          "uid": 1234,
          "author": "Comment Author",
          "author_avatar": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
          "comment_content": "Comment content here.",
          "comment_timestamp": 1713273446,
          "likes": 0
        }
      ]
    }
  ]
}
```

Add the JS:
```html
<script type="text/JavaScript" src="soon"></script>
```

### To-do
- [ ] Report function
- [ ] User profile
- [ ] Make a builder for document elements.
- [ ] Authenticate with GitHub to allow for administrative/member actions.
- [ ] Add support for GitLab and (maybe) Bitbucket.
- [ ] Add support for GitLab instances (subdomains).
