// Prints html request info to log

function logURL(requestDetails) 
{
  //chrome.extension.getBackgroundPage().console.log('foo');
  console.log("YAY Request was made! Loading details: " + requestDetails.url);
    
}
  
// Listner for web requests, sends them to logURL
chrome.webRequest.onBeforeRequest.addListener
(
    logURL,
    {urls: ["<all_urls>"]}
);

