// On startup, connect to the network_logger python script json located
// at /Library/Application Support/Google/Chrome/NativeMessagingHosts/USER_APP_NAME.json
var port = chrome.runtime.connectNative("request_to_file");

if(port)
{
  console.log("Sucessfully connectd to native app!");
}
else
{
  console.log("Failed to connect to native app.");
}


// Prints html request info to log via external application
function logURL(requestDetails) 
{ 
  console.log("EXTENSION: Sending network request info to network logger.");
  port.postMessage(requestDetails.url);
}


// Listner for web requests, sends them to logURL
chrome.webRequest.onBeforeRequest.addListener
(
    logURL,
    {urls: ["<all_urls>"]}
);

port.onMessage.addListener(function(msg) 
{
  console.log("Received" + msg);
});

/*
port.onDisconnect.addListener(function() 
{
  console.log("Native app disconncted.");
});
*/

port.onDisconnect.addListener((p) => 
{
  if (chrome.runtime.lastError) 
  {
    console.log(`Disconnected due to an error: ${chrome.runtime.lastError}`);
  }
  else
  {
    console.log("Native app disconncted without error.");
  }
}); 