


// Prints html request info to log
function logURL(requestDetails) 
{
    console.log("YAY Request was made! Loading details: " + requestDetails.url);
    
}
  
// Listner for web requests, sends them to logURL
browser.webRequest.onBeforeRequest.addListener
(
    logURL,
    {urls: ["<all_urls>"]}
);

    