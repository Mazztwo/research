from selenium import webdriver
import time
driver = webdriver.Chrome() # Opens a Chrome instance
time.sleep(5) # make the script sleep for 5 seconds so you can see it work
driver.close() # Closes the Chrome instance