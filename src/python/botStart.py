from inicioSesion import main
import asyncio
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import time
import os

def configure_webdriver():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    chrome_driver_path = os.path.join(dir_path, 'chromedriver.exe')
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service)

def fillBoxes(xpath,req,driver):
    search_box = driver.find_element(By.XPATH, xpath)
    search_box.send_keys(req)


async def getCredencials():
    try:
        credencials = await main()

        driver = configure_webdriver()
        driver.get(credencials[5])
        # desired_content = claro_web_session(driver)
        fillBoxes('//*[@id="__input1-inner"]',credencials[2],driver)
        fillBoxes('//*[@id="__input2-inner"]',credencials[3],driver)

        search_box = driver.find_element(By.XPATH,'//*[@id="__button2-inner"]')
        search_box.click()
        time.sleep(5)

    except Exception as e:
        print(f"Se ha encontrado un error: {str(e)}")

    finally:
        driver.quit()

if __name__ == "__main__":
    asyncio.run(getCredencials())




      

