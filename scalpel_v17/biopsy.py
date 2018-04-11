# Execution: python3 se.py

# Version 1.8

# Imports
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import config as user
import json
import time

# Constants
PATH_TO_FILE_DIRECTORY = "files/"

# Build individual options
options_no_blocker = webdriver.ChromeOptions()
options_no_blocker.add_argument(user.PROFILE_PATH_NO_BLOCKER)
options_scriptsafe = webdriver.ChromeOptions()
options_scriptsafe.add_argument(user.PROFILE_PATH_SCRIPTSAFE)


# Open two instances of Chrome, each with individual profiles
driver_no_blocker = webdriver.Chrome(chrome_options = options_no_blocker)
driver_scriptsafe = webdriver.Chrome(chrome_options = options_scriptsafe)

# Primary loop for processing webpages 
while (1):
	print("Choose a unique integer to represent this web page test. ")
	website_id = input("Enter integer ID for webpage (9999 to exit): ")
	if (website_id == "9999"):
		driver_no_blocker.close()
		driver_scriptsafe.close()
		exit()

	website_url = input("Enter website URL: ")

	# Build filenames for each driver instance
	filename_no_blocker = website_id + "_no_blocker.txt"
	filename_scriptsafe = website_id + "_scriptsafe.txt"

	final_path_no_blocker = PATH_TO_FILE_DIRECTORY + filename_no_blocker
	final_path_scriptsafe = PATH_TO_FILE_DIRECTORY + filename_scriptsafe

	# Navigate the instances to the target web page
	driver_no_blocker.get(website_url)
	driver_scriptsafe.get(website_url)

	# Sleep and allow the webpages to finish loading
	time.sleep(user.SECONDS_TO_WAIT)

	# Creates a new file for both drivers in write mode
	output_file_no_blocker = open(final_path_no_blocker, "w+")
	output_file_scriptsafe = open(final_path_scriptsafe, "w+")

	# Write the URL to the file as a header
	output_file_no_blocker.write(website_url)
	output_file_no_blocker.write("\n")
	output_file_scriptsafe.write(website_url)
	output_file_scriptsafe.write("\n")

	# Pull data from consoles from both drivers
	print("Starting console dump of driver_no_blocker.")
	for entry in driver_no_blocker.get_log("browser"):
		output_file_no_blocker.write(json.dumps(entry))
		output_file_no_blocker.write("\n")
	print("Dumping of console of driver_no_blocker complete.")

	print("Starting console dump of driver_scriptsafe.")
	for entry in driver_scriptsafe.get_log("browser"):
		output_file_scriptsafe.write(json.dumps(entry))
		output_file_scriptsafe.write("\n")
	print("Dumping of console of driver_scriptsafe complete.")

	print("All logs collected.")

	# Close files and clean up for next loop
	output_file_no_blocker.close()
	output_file_scriptsafe.close()
