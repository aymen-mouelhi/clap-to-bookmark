/**
 * Track Page with Google Analytics
 * @param  {[type]} page [description]
 * @return {[type]}      [description]
 */
function trackPage(page) {
    chrome.runtime.sendMessage({
        page: page
    }, function(response) {
        // console.log(response.farewell);
    });
}

/**
 * Track Event with Google Analytics
 * @param  {[type]} category [description]
 * @param  {[type]} event    [description]
 * @param  {[type]} param    [description]
 * @return {[type]}          [description]
 */
function trackEvent(category, action, label, value) {
    chrome.runtime.sendMessage({
        category: category,
        action: action,
        label: label,
        value: value
    }, function(response) {
        // console.log(response.farewell);
    });
}


function isMediumArticle(){
  let meta = document.querySelector('meta[name="twitter:app:url:iphone"]')
  if (meta) {
    var postId = meta.content.replace('medium://p/', '');
    if(postId != ''){
      // console.log(`${location.href} is a medium article !`)
      return true;
    }
  }
  return false;
}


if (isMediumArticle()) {
  // Get post Id
  let postId =  document.querySelector('meta[name="twitter:app:url:iphone"]').content.replace('medium://p/', '');
  let isUpVoted =  false;

  trackPage('/view')

  var isBookmarked = document.querySelector('button[data-action-value="'+ postId +'"][data-action="remove-from-bookmarks"]')
  // console.log(`Article ${postId} is ${isBookmarked != null ? 'already' : 'not'} bookmarked`);

  function bookmark(){
    trackEvent('Article', 'Clap', 'Clap', postId);
    if(!isBookmarked){
      // click on button Bookmark
      document.querySelector('button[data-action-value="'+ postId +'"][data-action="add-to-bookmarks"]').click();
      isBookmarked =  true;
      trackEvent('Article', 'Bookmark', 'Bookmark', postId);
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
}
