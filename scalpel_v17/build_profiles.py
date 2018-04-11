# Execution: python3 build_profiles.py
# Used to add extensions to Chrome profiles

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import config as user

print("This script will help you to build the two profiles for the main script")

no_blocker_location = user.PROFILE_PATH_NO_BLOCKER
scriptsafe_location = user.PROFILE_PATH_SCRIPTSAFE

no_blocker = webdriver.ChromeOptions()
no_blocker.add_argument(no_blocker_location)
scriptsafe = webdriver.ChromeOptions()
scriptsafe.add_argument(scriptsafe_location)

print("Creating the no_blocker profile instance")
print("Once it is open, go into the extensions menu, and add Scalpel")
driver_no_blocker = webdriver.Chrome(chrome_options = no_blocker)
input("Press enter when you're finished to close this instance")
driver_no_blocker.close()

print("Creating the scriptsafe profile instance")
print("Once it is open, go into the extensions menu, and add Scalpel")
print("Also add the scriptsafe extension from the store")
driver_scriptsafe = webdriver.Chrome(chrome_options = scriptsafe)
input("Press enter when you're finished to close this instance")
driver_scriptsafe.close()

print("Both profiles have been built and are now ready for the Biopsy script!")
print("You may need to close Chrome manually if any extra tabs were opened.")
