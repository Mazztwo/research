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
    function highlight(word) 
    {
         // Grab entire webpage body as a queue
        var currPage = [document.body];
        var currNode;

        resetHighlight();

        // While there are still elements left in page
        while( currNode = currPage.pop() )
        {
            // For every element in the page, visit all child Nodes
            for (var i = 0; i < curr.childNodes.length; ++i) 
            {
                // If node type is a text node, aka contains text
                if(curr.childNodes[i].nodeType === Node.TEXT_NODE)
                {
                    if (curr.childNodes[i].textContent.indexOf(word)) 
                    {
                        
                    }
                }
                else if(curr.childNodes[i].nodeType === Node.ELEMENT_NODE)
                {
                    currPage.push(curr.childNodes[i]);
                }
            }
        }
    
      
    }
  
    /**
     * Remove highlights from page
     */
    function resetHighlight() 
    {
        // Remove all instances of highlight class from words on page
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
        console.log("Poof!");
        highlight(message.word);
      } 
      else if (message.command === "reset") 
      {
        console.log(Reset);
        resetHighlight();
      }
    });
  
  })();