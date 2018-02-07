
// On startup, connect to the "user_app" app.
var port = browser.runtime.connectNative("user_app");


// Prints html request info to log
function logURL(requestDetails) 
{ 
  console.log("EXTENSION: Sending webrequest info to python script.");
  port.postMessage(requestDetails.url);
}


// Listen for messages from the app.
port.onMessage.addListener((response) => 
{
  console.log(response);
});


/*
// On a click on the browser button, send the user_app a message.
browser.browserAction.onClicked.addListener(() => 
{
  console.log("Sending request details to python script.");
  port.postMessage(requestDetails.url);

  //port.postMessage("ping");
});
*/

// Listner for web requests, sends them to logURL
browser.webRequest.onBeforeRequest.addListener
(
    logURL,
    {urls: ["<all_urls>"]}
);



