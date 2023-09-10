from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import time
import os

def configure_webdriver():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    chrome_driver_path = os.path.join(dir_path, 'chromedriver.exe')
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service)

def fillBoxes(xpath,req,driver):
    wait = WebDriverWait(driver, 50)
    input_element = wait.until(EC.presence_of_element_located((By.XPATH, xpath)))
    input_element.send_keys(Keys.CONTROL+'a') #selecciona todo
    input_element.send_keys(Keys.BACKSPACE)#borrar
    input_element.send_keys(req)

def clickBoxes(xpath,driver):
    wait = WebDriverWait(driver, 50)
    search_box = wait.until(EC.visibility_of_element_located((By.XPATH, xpath)))
    search_box.click()#click

def selectExecptions(xpath,i,driver):
    try:
        actions = WebDriverWait(driver, 50).until(
            EC.visibility_of_element_located((By.XPATH, xpath)))
        actions.click()#click
        time.sleep(3)
        # for index in range(i):
        #     actions.send_keys(Keys.ARROW_DOWN)
        # time.sleep(1)
        # actions.send_keys(Keys.RETURN)
    except Exception as e:
        print(f"Se ha encontrado un error en selectExecptions: {str(e)}")

def xxx(xpath,driver,text):
    try:
        actions = WebDriverWait(driver, 50).until(
            EC.visibility_of_element_located((By.XPATH, xpath)))
        for letra in text:
            actions.send_keys(letra)
            time.sleep(0.1)
        time.sleep(1)
        actions.send_keys(Keys.ARROW_DOWN)
        actions.send_keys(Keys.RETURN)

    except Exception as e:
        print(f"Se ha encontrado un error en xxx: {str(e)}")

def selectElement(xpath,req,driver):#funcion para elementos desplegables
    try:
        actions = WebDriverWait(driver, 50).until(
            EC.visibility_of_element_located((By.XPATH, xpath)))
        actions.send_keys(Keys.CONTROL+'a') #selecciona todo
        actions.send_keys(Keys.BACKSPACE)#borrar
        actions.send_keys(req)
        time.sleep(5)
        actions.send_keys(Keys.ARROW_DOWN)
        time.sleep(3)
        actions.send_keys(Keys.RETURN)
        time.sleep(3)

    except Exception as e:
        print(f"Se ha encontrado un error en selectElement: {str(e)}")
   

def urlClaro(url,driver):
    driver.get(url)

def main():
    try:
        driver = configure_webdriver()
        driver.get('https://performancemanager8.successfactors.com/login?bplte_logout=1&company=comunicaci&_s.crb=YymjiH25c9N4BSEROdeHmCeys2xA8Jujx2O0K%252flv%252b0I%253d#/login')

        # desired_content = claro_web_session(driver)
        fillBoxes('//*[@id="__input1-inner"]','EC2454G',driver)#input
        fillBoxes('//*[@id="__input2-inner"]','Holanda21*',driver)#input

        clickBoxes('//*[@id="__button2-inner"]',driver)
        time.sleep(3)
        #############################################################
        driver.get('https://performancemanager8.successfactors.com/xi/ui/peopleprofile/pages/newhire.xhtml?&_s.crb=ZqyrEeSwE4E79Mlg%2fZnj24TSD9WzmnvEGkYupICuREQ%3d')

        #primer stage
        fillBoxes('//*[@id="__picker1-inner"]','070923',driver)#dd-mm-aa
        selectElement('//*[@id="__box0-inner"]','COLOMBIAN OUTSOURCING SOLUTIONS',driver)
        selectElement('//*[@id="__box1-inner"]','Nueva Contratación',driver)
        selectElement('//*[@id="__box2-inner"]','Contratación Claro',driver)
        clickBoxes('//*[@id="__button1-BDI-content"]',driver)
        #segundo stage

        time.sleep(5)

        # fillBoxes('//*[@id="ui5wc_14-inner"]','añadir nuevo colaborador',driver)#buscar
        # clickBoxes('/html/body/ui5-static-area/ui5-static-area-item-sf-header[2]//ui5-responsive-popover-sf-header/ui5-list-sf-header/ui5-li-suggestion-item-sf-header[1]/div/div/div[1]/span/b',driver)

    except Exception as e:
        print(f"Se ha encontrado un error en rpa_main, debido a: {str(e)}")

    finally:
        driver.quit()

# async def rpa_main():
#     driver = configure_webdriver()
if __name__ == '__main__':
    main()