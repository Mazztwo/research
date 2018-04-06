/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) 
{
  var queryInfo = 
  {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => 
  {
    var tab = tabs[0];

    var url = tab.url;

    callback(url);
  });
}

function changeBackgroundColor(color) 
{
  var script = 'document.body.style.backgroundColor="' + color + '";';
 
  chrome.tabs.executeScript({
    code: script
  });
}

document.addEventListener('DOMContentLoaded', () => 
{
  getCurrentTabUrl((url) => 
  {
    var dropdown = document.getElementById('dropdown');

    dropdown.addEventListener('change', () => 
    {
      changeBackgroundColor(dropdown.value);
      saveBackgroundColor(url, dropdown.value);
    });
  });
});
