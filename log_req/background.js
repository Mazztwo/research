
// Prints html request info to log
function logURL(requestDetails) 
{
    console.log("Loading: " + requestDetails.url);
}
  
// Listner for web requests, sends them to logURL function
browser.webRequest.onBeforeRequest.addListener
(
    logURL,
    {urls: ["<all_urls>"]}
);