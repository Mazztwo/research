

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() 
{
  document.addEventListener("click", (e) => 
  {

  /**
  * Given the name of a beast, get the URL to the corresponding image.
  */
    function beastNameToURL(beastName) 
    {
      switch (beastName) 
      {
        case "Snake":
        return browser.extension.getURL("beasts/snake.jpg");
        case "Turtle":
        return browser.extension.getURL("beasts/turtle.jpg");
      }
    }

    // Function called if appropirate button on popup is pushed
    function action(tabs) 
    {
      let url = beastNameToURL(e.target.textContent);
      browser.tabs.sendMessage(tabs[0].id, 
      {
        command: "count",
        beastURL: url
      });
    }

    // Function called if appropirate button on popup is pushed   
    function reset(tabs) 
    {
      browser.tabs.sendMessage(tabs[0].id, 
      {
        command: "reset",
      });
    }

    // Log the error to the console.
    function reportError(error) 
    {
       console.error(`Could not beastify: ${error}`);
    }


    // Calls appropirate function based on which button was pressed
    if (e.target.classList.contains("beast")) 
    {
      browser.tabs.query({active: true, currentWindow: true}).then(action).catch(reportError);
    }
    else if (e.target.classList.contains("reset")) 
    {
      browser.tabs.query({active: true, currentWindow: true}).then(reset).catch(reportError);
    }

  });
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) 
{
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

// Load content script to access/modify webpage content
browser.tabs.executeScript({file: "/content_scripts/action.js"}).then(listenForClicks).catch(reportExecuteScriptError);