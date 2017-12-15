// Get post Id
let postId =  document.querySelector('meta[name="twitter:app:url:iphone"]').content.replace('medium://p/', '');
let isUpVoted =  false;

var isBookmarked = document.querySelector('button[data-action-value="'+ postId +'"][data-action="remove-from-bookmarks"]')
console.log(`Article ${postId} is ${isBookmarked != null ? 'already' : 'not'} bookmarked`);

function bookmark(){
  if(!isBookmarked){
    // click on button Bookmark
    document.querySelector('button[data-action-value="'+ postId +'"][data-action="add-to-bookmarks"]').click();
    isBookmarked =  true;
  }
}

// Listen to clap button events
var votes = document.querySelectorAll('button[data-action-value="'+ postId +'"][data-action="multivote"]');

votes.forEach(function(button){
  button.addEventListener('click', function(event) {
    bookmark()
    // TODO: Add options page to know whether to bookmark also in browser (under which folder?)
  });
});
