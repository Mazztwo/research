
// On startup, connect to the network_logger python script json located
// at /Library/Application Support/Mozilla/NativeMessagingHosts/USER_APP_NAME.json
var port = browser.runtime.connectNative("network_logger");

// Prints html request info to log via external application
function logURL(requestDetails) 
{ 
  console.log("EXTENSION: Sending network request info to network logger.");
  port.postMessage(requestDetails.url);
}

// Listen for messages from the app.
port.onMessage.addListener((response) => 
{
  console.log(response);
});

// Listner for web requests, sends them to logURL
browser.webRequest.onBeforeRequest.addListener
(
    logURL,
    {urls: ["<all_urls>"]}
);



