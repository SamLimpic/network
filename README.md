# CodeWorks Vue Starter

Smart Boi Tim's Tips
``` JS

// NOTE PostComponent is the name from the component page
// p is our banana word for posts => key is banana.id
// post-prop is the kebab-cased version of line 11's postProp
<PostComponent v-for="p in state.posts" :key="p.id" :post-prop="p" />

  name: 'PostComponent',
  props: {
    postProp: {
      type: Object,
      required: true
    }
  },
  ```

MAIN GOALS

<!-- Users Can Register, Login, and Logout
The Home page displays all posts, login not required
Clicking on a creator image navigates to that users Profile page
The Profile page shows all posts made by that user -->

<!-- Refreshing while on the profile page does not navigate the user home, and the profile page still shows its required content -->

<!-- On Home and Profile users can to navigate to 'older' or 'newer' posts if available -->
<!-- Users have a search form which navigates them to a Search Results page on submit -->

<!-- All posts render all post data (creator details, createdAt, body, like count) in adherence to the Mock
Each page shows at least 2 ads from api collection provided -->

<!-- Once logged in Users can Create Posts -->
<!-- Once logged in Users can Delete their Posts -->

<!-- Once logged in Users can Like/unlike Posts
Once logged in Users can Edit their Profile
Users can only modify/delete data they created (the UI should reflect this, disabled, hidden, etc.)
Application UI adheres to Phase I: Code Cleanup of the CodeWorks Design Doc -->

STRETCH GOALS
Likes have a popover showing the profiles who liked them
If you have not already done so include both the Users and the Posts in the search results
Use timeago.js or luxon.js to format the post time in the '2h' or '4d' format
Home and Search Results pages can use filter to only show alumni or non-alumni (graduated)
Once the project is graded, write the server yourself so you can deploy it as a full app!
Once graded create your own ads to show off your own projects that can be clicked to link to those projects
