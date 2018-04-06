# Execution: python3 build_profiles.py
# Used to add extensions to Chrome profiles

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# ADD PATHS TO PROFILES HERE
PATH_NO_BLOCKER = "/Users/Alessio/Library/Application Support/Google/Chrome/Profile 1"
PATH_SCRIPTSAFE = "/Users/Alessio/Library/Application Support/Google/Chrome/Profile 2"
#PATH_ABP = "/add/path/here/"
#PATH_ABP_MODIFIED = "/add/path/here/"

# DO NOT MODIFY BELOW THIS POINT
OPTION_PREFIX = "user-data-dir="

print("This script will help you to build the four profiles for the main script")

no_blocker_location = OPTION_PREFIX + PATH_NO_BLOCKER
scriptsafe_location = OPTION_PREFIX + PATH_SCRIPTSAFE
#abp_location = OPTION_PREFIX + PATH_ABP
#abp_modified_location = OPTION_PREFIX + PATH_ABP_MODIFIED

no_blocker = webdriver.ChromeOptions()
no_blocker.add_argument(no_blocker_location)
scriptsafe = webdriver.ChromeOptions()
scriptsafe.add_argument(scriptsafe_location)
#abp = webdriver.ChromeOptions()
#abp.add_argument(abp_location)
#abp_modified = webdriver.ChromeOptions()
#abp_modified.add_argument(abp_modified_location)

print("Creating the no_blocker profile instance")
print("Once it is open, go into the extensions menu, and add chromecollector")
driver_no_blocker = webdriver.Chrome(chrome_options = no_blocker)
input("Press enter when you're finished to close this instance")
driver_no_blocker.close()

print("Creating the scriptsafe profile instance")
print("Once it is open, go into the extensions menu, and add chromecollector")
print("Also add the scriptsafe extension from the store")
driver_scriptsafe = webdriver.Chrome(chrome_options = scriptsafe)
input("Press enter when you're finished to close this instance")
driver_scriptsafe.close()

#print("Creating the no_blocker profile instance")
#print("Once it is open, go into the extensions menu, and add chromecollector")
#print("Also add the ABP extension from the store")
#driver_abp = webdriver.Chrome(chrome_options = abp)
#input("Press enter when you're finished to close this instance")
#driver_abp.close()

#print("Creating the no_blocker profile instance")
#print("Once it is open, go into the extensions menu, and add chromecollector")
#print("Also add the ABP extension from the store")
#print("Once you have the ABP extension installed, go in and modify its rules")
#driver_abp_modified = webdriver.Chrome(chrome_options = abp_modified)
#input("Press enter when you're finished to close this instance")
#driver_abp_modified.close()

print("All four profiles have been built and are now ready for the main script")
