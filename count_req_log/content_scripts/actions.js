(function() {
    
    // Only loads content script once. 
    if (window.hasRun) 
    {
      return;
    }
    window.hasRun = true;
  
    /**
     * Highlight all given instances of word typed in popup textbox.
     */
    function highlight(beastURL) 
    {
      removeExistingBeasts();
      let beastImage = document.createElement("img");
      beastImage.setAttribute("src", beastURL);
      beastImage.style.height = "100vh";
      beastImage.className = "beastify-image";
      document.body.appendChild(beastImage);
    }
  
    /**
     * Remove highlights from page
     */
    function resetHighlight() 
    {
      let existingBeasts = document.querySelectorAll(".beastify-image");
      for (let beast of existingBeasts) {
        beast.remove();
      }
    }
  
    /**
     * Listen for messages from the background script.
     * Call appropirate functions
    */
    browser.runtime.onMessage.addListener((message) => 
    {
      if (message.command === "highlight") 
      {
        highlight(message.word);
      } 
      else if (message.command === "reset") 
      {
        resetHighlight();
      }
    });
  
  })();