from inicioSesion import main
from Sentences import get_employes, ejecutar_consulta, delete_parentheses
import asyncio
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
        for index in range(i):
            actions.send_keys(Keys.ARROW_DOWN)
        time.sleep(0.2)
        actions.send_keys(Keys.RETURN)
    except Exception as e:
        print(f"Se ha encontrado un error en selectExecptions: {str(e)}")

def typing(xpath,driver,text):
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

async def rpa_main():
    try:
        credencials = await main()
        dataCredential ={
            "userName": credencials[2],
            "password": credencials[3],
            "urlClaro": credencials[5]
        }

        driver = configure_webdriver()
        urlClaro(dataCredential['urlClaro'],driver)

        # desired_content = claro_web_session(driver)
        fillBoxes('//*[@id="__input1-inner"]',dataCredential['userName'],driver)#input
        fillBoxes('//*[@id="__input2-inner"]',dataCredential['password'],driver)#input

        clickBoxes('//*[@id="__button2-inner"]',driver)
        time.sleep(3)
        #############################################################

        urlClaro('https://performancemanager8.successfactors.com/xi/ui/peopleprofile/pages/newhire.xhtml?&_s.crb=ZqyrEeSwE4E79Mlg%2fZnj24TSD9WzmnvEGkYupICuREQ%3d',driver)
     
        get_SQL_tbl_rcontratacion = await get_employes("SELECT * FROM tbl_rcontratacion WHERE USU_CESTADO = 'NO_INICIADO'")

        for i in range(len(get_SQL_tbl_rcontratacion)):
            print(get_SQL_tbl_rcontratacion[i].get('USU_CMOTIVO_EVENTO'))
            #primer stage
            fillBoxes('//*[@id="__picker1-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_INGRESO'),driver)#dd-mm-aa
            selectElement('//*[@id="__box0-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CEMPRESA'),driver)
            selectElement('//*[@id="__box1-inner"]','Nueva Contratación',driver)
            selectElement('//*[@id="__box2-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPLANTILLA'),driver)
            clickBoxes('//*[@id="__button1-BDI-content"]',driver)
            #información del nombre
            fillBoxes('//*[@id="__input0-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRES'),driver)
            fillBoxes('//*[@id="__input1-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAPELLIDOS'),driver)
            selectElement('//*[@id="__box6-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTRATO'),driver)
            #Información biografica
            fillBoxes('//*[@id="__picker3-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_NACIMIENTO'),driver)
            selectElement('//*[@id="__box7-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPAIS_NACIMIENTO'),driver)
            selectElement('//*[@id="__box8-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPARTAMENTO_NACIMIENTO'),driver)
            selectElement('//*[@id="__box9-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCIUDAD_NACIMIENTO'),driver)
            #Información del empleado
            fillBoxes('//*[@id="__input8-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRE_USUARIO'),driver)
            clickBoxes('//*[@id="__button26-BDI-content"]',driver)
            selectElement('//*[@id="__box10-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPAIS_EXPEDICION'),driver)
            selectElement('//*[@id="__box10-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_DOCUMENTO'),driver)
            fillBoxes('//*[@id="__input8-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'),driver)
            selectElement('//*[@id="__input11-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CES_PRIMARIO'),driver)
            fillBoxes('//*[@id="__picker4-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_EXPEDICION'),driver)
            selectElement('//*[@id="__box13-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPARTAMENTO_EXPEDICION'),driver)
            selectElement('//*[@id="__box13-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCIUDAD_EXPEDICION'),driver)
            clickBoxes('//*[@id="__button25-BDI-content"]',driver)
            #Informació personal
            selectElement('//*[@id="__box15-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CGENERO'),driver)
            selectElement('//*[@id="__box16-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTADO_CIVIL'),driver)     
            selectElement('//*[@id="__box17-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNACIONALIDAD'),driver)
            selectElement('//*[@id="__box18-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CLENGUA_NATIVA'),driver)
            clickBoxes('//*[@id="detailsBtn_0-BDI-content"]',driver)
            fillBoxes('//*[@id="__input14-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCONFIGURACION_REGIONAL_PREDETERMINADA'),driver)
            selectElement('//*[@id="__box23-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMODO_DESPLAZAMIENTO_CASA_TRABAJO_CASA'),driver)
            selectElement('//*[@id="__box24-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPAIS_REGION'),driver)
            #Información correo electrónico
            selectElement('//*[@id="__box42-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_CORREO'),driver)
            fillBoxes('//*[@id="__input36-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCORREO'),driver)
            selectElement('//*[@id="__box43-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_ES_PRIMARIO'),driver)
            #Información número de telefono
            clickBoxes('//*[@id="__button58-BDI-content"]',driver) 
            selectElement('//*[@id="__box38-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_TELEFONO'),driver)
            fillBoxes('//*[@id="__input29-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_TELEFONO'),driver)
            #Direcciones
            selectElement('//*[@id="__box28-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_DIRECCION'),driver)
            selectElement('//*[@id="__box29-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_PAIS_REGION'),driver)
            selectElement('//*[@id="__box30-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPARTAMENTO'),driver)
            selectElement('//*[@id="__box31-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCIUDAD'),driver)
            selectElement('//*[@id="__box32-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTRATO'),driver)
            selectElement('//*[@id="__box33-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_VIVIENDA'),driver)
            clickBoxes('//*[@id="__button53-content"]',driver)
            #Contacto de emergencia
            fillBoxes('//*[@id="__input33-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCONTACTO_EMERGENCIA'),driver) 
            selectElement('//*[@id="__box38-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPARENTESCO_EMERGENCIA'),driver)
            fillBoxes('//*[@id="__input34-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMOVIL_EMERGENCIA'),driver)
            clickBoxes('//*[@id="__button54-BDI-content"]',driver)
            #Información familiar
            fillBoxes('//*[@id="__input44-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRES_FAMILIAR'),driver)
            fillBoxes('//*[@id="__input45-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAPELLIDOS_FAMILIAR'),driver)
            selectElement('//*[@id="__box50-inner"]]',get_SQL_tbl_rcontratacion[i].get('USU_CPARENTESCO_FAMILIAR'),driver)
            selectElement('//*[@id="__box51-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CVIVE_USTED_FAMILIAR'),driver)
            selectElement('//*[@id="__box52-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPENDE_USTED_FAMILIAR'),driver)
            selectElement('//*[@id="__box53-inner"]','Ocupación',driver)
            selectElement('//*[@id="__box55-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTUDIA_FAMILIAR'),driver)
            selectElement('//*[@id="__box58-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDISCAPACIDAD_FAMILIAR'),driver)#discapacidad
            if get_SQL_tbl_rcontratacion[i].get('USU_CDISCAPACIDAD_FAMILIAR') == 'sí':#estado de discapacidad
                fillBoxes('//*[@id="__input47-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CLUGAR_EMISION'),driver)
                fillBoxes('//*[@id="__input48-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAUTORIDAD_EMISORA'),driver)     
                fillBoxes('//*[@id="__picker10-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_CADUCIDAD'),driver)  
            selectElement('//*[@id="__box59-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CGENERO_FAMILIAR'),driver)
            fillBoxes('//*[@id="__picker11-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_NACIMIENTO_FAMILIAR'),driver)
            clickBoxes('#//*[@id="__button55-BDI-content"]',driver)

            

            

            

            
            




            


            
            


            
           
           

            

            
            



            

            

            

            

            
            




            
            



        time.sleep(5)

    except Exception as e:
        print(f"Se ha encontrado un error en rpa_main, debido a: {str(e)}")

    finally:
        driver.quit()

# async def rpa_main():
#     driver = configure_webdriver()

if __name__ == "__main__":
    asyncio.run(rpa_main())




      

