/**
 * JS file for CRUD
 */

/**
 * @typedef {{
 *  title: string,
 *  date: date, 
 *  summary: string 
 * }} BlogPost
 */

/** LEARNING CORNER
 * 
 * Typing /** will give you this type of comments
 * 
 * var variable = variable  ||  {} ; <- curly braces mean empty object
 * https://stackoverflow.com/questions/15844213/what-does-variable-variable-mean-in-javascript
 * 
 * The keyword "export" is kinda like public class, meaning you can access it
 * if you don't have it, you basically cannot link the script tag in html to this .js
 */

// These classes were inside defineBlogElements but bring them out shield them from
// exposure, don't really need the 'export' at the front
export class PostArticle extends HTMLDivElement {}
export class PostTitle extends HTMLElement {}
export class PostSummary extends HTMLElement {}

/**
 * Defines the custom elements used for blogpost.
 */
export function defineBlogElements() {
    console.info("Registering custom elements... ");
    customElements.define("post-article", PostArticle, {extends: 'div'});
    customElements.define("post-title", PostTitle, {extends: 'div'});
    customElements.define("post-summary", PostSummary, {extends: 'div'});
}; /* defineBlogElements */

/**
 * Create a random ID
 */
export function generateId() {
    return crypto.randomUUID();
}; /* generateId */

export const examplePosts = [
    {
        "title": "How to arrange/sort post by date?",
        "date": "07/25/2022",
        "summary": "Look at the dates of all the posts. Right now they are displayed in JSON order. But can we make it so that if we input a new blog post with past date, it will be put in sequential order?"
    },
    {
        "title": "Post validation!?",
        "date": "07/22/2022",
        "summary": "Right now, JS validates true when the user input ANYTHING in ANY field, meaning a post with only title, or only date, or only summary could still be published. Can weakly secure this by required attribute, but again, CLIENT side is WEAK!!!"
    },
    {
        "title": "Potentially make this suitable for your Project and Others Page?",
        "date": "07/23/2022",
        "summary": "This is the first thing I thought when doing this exercise. Projects and Others page could widely improve upon using CRUD. Should also take a look at how to populate CSS as well cause doing grid manually is painful!!!"
    }
];

export const examplePost = {
    "title": "Do you know CRUD?",
    "date": "07/20/2022",
    "summary": "When we are building APIs, we want our models to provide four basic types of functionality. The model must be able to Create, Read, Update, and Delete resources. Computer scientists often refer to these functions by the acronym CRUD. A model should have the ability to perform at most these four functions in order to be complete. If an action cannot be described by one of these four operations, then it should potentially be a model of its own. - CodeAcademy"
};

/**
 * Returns the number of posts in the DB
 */
export function countBlogPosts() {
    let blogPosts = loadBlogPosts();
    return Object.keys(blogPosts).length;
} /* countBlogPosts */


/**
 * @param {string} [blogPostId]
 * @param {BlogPost} [blogPost] 
 * @ return {PostArticle} not really make any diff
 * ^ return type of PostArticle, DocumentFragment, HTMLElement what's the difference?
 * Look at the console, it's different every time you refresh the page
 * they're either <post-article> ... </post-article> with easy looking HTML tag style 
 * or post-article with [[Prototype]]: HTMLElement
 * Weird...
 * 
 * The return type is not really the problem, it might be about some event timing issues
 */
export function renderBlogPost(blogPostId, blogPost) {
    // Get the template
    const template = document.getElementById('blog-template');
    // Create a copy of the template
    const postElement = template.content.cloneNode(true);
    // Set a data- attribute with the value of ID
    postElement.children[0].dataset.blogPostId = blogPostId;
    // Get & set the blogpost.elements
    const titleH2 = postElement.querySelector('post-title > h2');
    titleH2.textContent = blogPost.title;
    const postDate = postElement.querySelector('post-title > p');
    postDate.textContent = blogPost.date;
    const postSummary = postElement.querySelector('post-summary > p');
    postSummary.textContent = blogPost.summary;

    //console.log(postElement.children[0]);
    
    const deleteButton = postElement.querySelector('post-article > button');
    deleteButton.addEventListener ('click', (ev) => {  // you can check out ev.path
        deletePost(blogPostId);
        let selectedPost = ev.path[1];
        selectedPost.remove();
        //window.location.reload();   // this might be weird in the future when working with DB API but it works now
    });

    
    return postElement;
} /* renderBlogPost */

/**
 * @param {string} [blogPostId]
 * @param {BlogPost} [blogPost] 
 * @param {HTMLElement} [container]
 */
export function displayBlogPost(blogPostId, blogPost, container) {
    const postElement = renderBlogPost(blogPostId, blogPost);

    // Good to have some type of checking whether an existing post was
    // unchanged compared to the one we'd be replacing it with to
    // avoid unnecessary changes to the DOM.

    const existingPost = container.querySelector(`[data-blog-post-id="${blogPostId}"]`);
    if (existingPost) {
        existingPost.remove();
    }

    /**
     * Check if the user input anything
     * Should enhance more, this will accept an input with only 
     * one field defined (only title or only date still create
     * a new post)
     */
    if (blogPost) {
        container.appendChild(postElement);
    }
} /* displayBlogPost */

/**
 * Displaying all blog posts
 */
export function displayAllBlogPosts (container) {
    const blogPosts = selectAllPosts();

    for (const [id, post] of Object.entries(blogPosts)) {
        displayBlogPost(id, post,container);
    }
} /* displayAllBlogPosts */

/* Storage Layer
 * ============================================================== */

/**
 * return the JSON map of posts from local storage.
 */
function loadBlogPosts() {
    return JSON.parse(localStorage.getItem('blogPosts')) || {};
} /* loadPosts */


/**
 * @param {{string: BlogPost}} blogPosts a JSON map of id->post to put into local storage.
 */
function storeBlogPosts(blogPosts) {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
} /* storePosts */


/* Crud Operations Layer
 * ============================================================== */

/**
 * (CREATE)
 * @param {BlogPost} [blogPost] the post to be added to the DB.
 * @returns {String} the generated UUID for this post in the DB.
 */
export function createPost(blogPost) {
    const blogPosts = loadBlogPosts();
    const postId = generateId();

    console.log(`postId: ${postId}`);

    blogPosts[postId] = blogPost;
    storeBlogPosts(blogPosts);
    
    return postId;
} /* createPost */

/**
 * (READ) Read a specific post from DB.
 * @param {string} [blogPostId] the id of the book to look up. 
 * @returns {BlogPost | undefined} the post found, or undefined if not found.
 */
export function selectOnePost(blogPostId) {
    const blogPosts = loadBlogPosts();
    return blogPosts[blogPostId];
} /* selectOnePost */

/**
 * (READ) Return _all_ posts from the DB.
 * @returns {{str: BlogPost}}
 */
 export function selectAllPosts() {
    const blogPosts = loadBlogPosts();
    return blogPosts;
} /* selectAllPosts */

/**
 * (UPDATE)
 */

/**
 * (DELETE)
 * @param {string} [postID] ID of the post selected to be delete
 * @returns {bool} true if we deleted an element, false if not.
 */
 export function deletePost(postID) {
    const blogPosts = loadBlogPosts();

    // If it's not there, just return false. If it is there, delete it.
    if (!(postID in blogPosts)) return false;
    delete blogPosts[postID];

    storeBlogPosts(blogPosts);
    return true;
}
