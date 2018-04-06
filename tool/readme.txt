================================================================================
                            INSTRUCTIONS FOR SETUP
================================================================================

Please let me know ASAP if something here doesn't work. I gave everything a
test run and it worked on my end, but there could be corner cases that I i did
not encounter.

------
STEP 1
------

When Selenium creates an instance of Chrome, it creates a new default
profile. Even if you supply the object with a parameter path for a profile,
such as /path here/Profile 8/, it still creates an instance at
/path here/Profile 8/Default. The only way to fix this was to develop a
work around.

The first thing you need to do is create four individual profiles on Chrome.
You do not have to add any extensions to them, or add a Google account.

Next, on each profile of Chrome, navigate to "chrome://version" and copy the
Profile Path. Open the files se.py and build_profiles.py and change the
path sections indicated in both source code files.

------
STEP 2
------

Execute the command "python3 build_profiles.py"

This script will walk you through one profile at a time, and let you add the
extensions needed for each one. Carefully read through prompts in the terminal
and follow its directions.

The end result should be that extensions are now built into the Selenium
defaults of your individual profiles.

------
STEP 3
------

You can now execute "python3 se.py", the primary Selenium program. This program
takes time to get started because it needs to instantiate four different
instances of Chrome. It will then ask for an integer ID. Try to give a different
integer for each different website. If you use the same integer twice, the
information will be erased when a new file is created.

Be sure not to close any of the Chrome instances on your own, or the script will
crash. This is because I've written the script to clean up and close all of the
Chrome instances at the end of the script and it will crash if it tries to
reference something that is no longer there.

The final result is a file for each instance with all three of our data types.
