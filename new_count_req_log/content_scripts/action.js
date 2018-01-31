(function() 
{
    
    // Only loads content script once. 
    if (window.hasRun) 
    {
      return;
    }
    window.hasRun = true;
    



  
    function count(beastURL) 
    {

      console.log("I pushed a beast!");

      // Traverse dom and count word
      var word = "views";

      var numOccurances = 0;

      //var page = document.;

      // Stack of elements
      var arr = [];
      /*
      var loop = function(page) 
      {
            do 
            {
              // text nodes --> (nodeType = 3)
              if(page.nodeType == 3)
              {
                var regex = new RegExp(word);
                var count = (page.textContent.match(regex)).length;
                numOccurances += count;
              }

              // Add Node to stack
              arr.push(page);
              
              if(page.hasChildNodes())
              {
                loop(page.firstChild);
              }      
            }while (page = page.nextSibling);
      }

      loop(page);
      */

      console.log(numOccurances + " occurances of " + word);






      /*

      removeExistingBeasts();
      let beastImage = document.createElement("img");
      beastImage.setAttribute("src", beastURL);
      beastImage.style.height = "100vh";
      beastImage.className = "beastify-image";
      document.body.appendChild(beastImage);

      */
    }
  
    
    function removeExistingBeasts() 
    {
      let existingBeasts = document.querySelectorAll(".beastify-image");

      for (let beast of existingBeasts) 
      {
        beast.remove();
      }
    }
  
    // Listen for messages from the background script
    // & call appropirate
    browser.runtime.onMessage.addListener((message) => 
    {
      if (message.command === "count") 
      {
        count(message.beastURL);
      } 
      else if (message.command === "reset") 
      {
        removeExistingBeasts();
      }
    });
  
  })();