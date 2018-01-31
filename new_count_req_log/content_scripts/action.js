(function() 
{
    
    var numOccurances = 0;


    // Only loads content script once. 
    if (window.hasRun) 
    {
      return;
    }
    window.hasRun = true;
    


    function textNodesUnder(node)
    {
      var all = [];
      for (node=node.firstChild;node;node=node.nextSibling)
      {
        if (node.nodeType==3) all.push(node);
        else all = all.concat(textNodesUnder(node));
      }
      return all;
    }


    function countText(node)
    {
      // If we have text node, count instances of our word in content
      if (node.nodeType === Node.TEXT_NODE) 
      {
        var content = node.textContent;
        var regex = new RegExp(word);
        var count = (textNodes[i].textContent.match(regex)).length;
        numOccurances += count;
      }
      else 
      {
        // This node contains more than just text, call countText() on each
        // of its children.
        for (let i = 0; i < node.childNodes.length; i++) 
        {
          replaceText(node.childNodes[i]);
        }    
      }
    }

  
    function count(beastURL) 
    {

      console.log("I pushed a button!");

      // Traverse dom and count word
      var word = "views";
      
      //var allWords = document.body.textContent.split(' ');
      var allWords = document.body.innerText.split(' ');


      var regex = new RegExp(word);

      var count = (document.body.innerText.match(regex)).length;
      numOccurances += count;

      console.log(numOccurances + " occurances of " + word);
      


      //countText(document.body);
      

      /*

      var textNodes = textNodesUnder(document.body);
      var len = textNodes.length;

      for(var i = 0; i < len; i++)
      {
        var regex = new RegExp(word);
        var count = (textNodes[i].textContent.match(regex)).length;
        numOccurances += count;
      }
      */

      /*
      var n, a=[], walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
      while(n=walk.nextNode()) a.push(n);
    
      for(var i = 0; i < a.length; i++)
      {
        var regex = new RegExp(word);
        var count = (a[i].textContent.match(regex)).length;
        numOccurances += count;
      }
      */
      //var page = document.getElementsByTagName("*");
      /*
      var numElements = page.length;

      for (var i=0; i < numElements; i++) 
      {
        var regex = new RegExp(word);
        var count = (page.textContent.match(regex)).length;
        numOccurances += count;
      }
      */

      /*
      // Stack of elements
      var arr = [];
      var page = document.body;

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