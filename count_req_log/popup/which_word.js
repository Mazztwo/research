
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => 
    {
  
  
        // Functions that are called if appropirate button on popup is pushed
        function poof(tabs) 
        {
            browser.tabs.insertCSS({code: hidePage}).then(() => 
            {
                // Sends message to content script
                browser.tabs.sendMessage(tabs[0].id, 
                {
                    command: "highlight",
                    word: document.getElementById("word")
                });
            });
        }
  
        function reset(tabs) 
        {
            browser.tabs.removeCSS({code: hidePage}).then(() => 
            {
                // Sends message to content script
                browser.tabs.sendMessage(tabs[0].id, 
                    {
                        command: "reset",
                    });
            });
      }

  
        // Calls appropirate function based on which button was pressed
        if (e.target.classList.contains("poof_button")) 
        {   
            // Calls poof()
            browser.tabs.query({active: true, currentWindow: true}).then(poof);
        }
        else if (e.target.classList.contains("reset_button"))
        {
            // calls reset()
            browser.tabs.query({active: true, currentWindow: true}).then(reset);
        }
    });
}


// Load content script to access/modify webpage content
browser.tabs.executeScript({file: "/content_scripts/actions.js"}).then(listenForClicks).catch(reportExecuteScriptError);