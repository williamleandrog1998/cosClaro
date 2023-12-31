from inicioSesion import main
import json
from Sentences import get_employes, sql_employers, excel_date_to_python_date
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

# a = 0;
#para linux
# def configure_webdriver():
#     dir_path = os.path.dirname(os.path.realpath(__file__))
#     chrome_driver_path = os.path.join(dir_path, 'chromedriver')
#     service = Service(chrome_driver_path)

#     # Configuración para iniciar Chrome en modo headless
#     chrome_options = Options()
#     chrome_options.add_argument('--headless')
#     chrome_options.add_argument('--no-sandbox')
#     chrome_options.add_argument('--disable-dev-shm-usage')

#     return webdriver.Chrome(service=service, options=chrome_options)

def configure_webdriver():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    chrome_driver_path = os.path.join(dir_path, 'chromedriver.exe')
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service)

def fillBoxes(xpath,req,driver):
    wait = WebDriverWait(driver, 20)
    input_element = wait.until(EC.presence_of_element_located((By.XPATH, xpath)))
    input_element.send_keys(Keys.CONTROL+'a') #selecciona todo
    time.sleep(1)
    input_element.send_keys(Keys.BACKSPACE)#borrar
    input_element.send_keys(req)

def clickBoxes(xpath,driver):
    wait = WebDriverWait(driver, 5)
    search_box = wait.until(EC.visibility_of_element_located((By.XPATH, xpath)))
    search_box.click()#click

def select(xpath,req,driver,xpath_pop_up):#funcion para elementos desplegables
    try:
        actions = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.XPATH, xpath)))
        actions.send_keys(Keys.CONTROL+'a') #selecciona todo
        actions.send_keys(Keys.BACKSPACE)#borrar
        actions.send_keys(req)
        actions = WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.XPATH, xpath_pop_up)))
        time.sleep(1.5)
        actions[0].click()
    except Exception as e:
        print(f"Se ha encontrado un error en select: {str(e)}")

def selectElement(xpath,req,driver):
    try:
        actions = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.XPATH, xpath)))
        actions.send_keys(Keys.CONTROL+'a') #selecciona todo
        actions.send_keys(Keys.BACKSPACE)#borrar
        actions.send_keys(req)
        time.sleep(2.5)
        actions.send_keys(Keys.ARROW_DOWN)
        time.sleep(2)
        actions.send_keys(Keys.RETURN)

    except Exception as e:
        print(f"Se ha encontrado un error en selectElement: {str(e)}")

def estrato(xpath, num, driver):
    actions = WebDriverWait(driver, 20).until(
        EC.visibility_of_element_located((By.XPATH, xpath)))
    actions.send_keys(Keys.ARROW_DOWN)
    stract = int(num)
    time.sleep(1)
    for _ in range(stract):  # Usamos range para repetir la acción stract veces
        actions.send_keys(Keys.ARROW_DOWN)
        time.sleep(0.5)
    actions.send_keys(Keys.RETURN)

def urlClaro(url,driver):
    driver.get(url)

async def error_in_process(driver,text,xpath):
    try:
        error_message_element = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, xpath)) # Reemplaza con el selector adecuado para el mensaje de error
        )
        error_message = error_message_element.text
        if text in error_message:
            return True
    except:
        return False


async def rpa_main():
    try:
         ##sentences
        insert_query = "INSERT INTO tbl_rlog_detalle (LOG_NAME_BOT, LOG_MENSSAJE) VALUES (%s,%s)"
        update_query = "UPDATE tbl_rcontratacion SET USU_CESTADO = %s WHERE PKUSU_NCODIGO = %s"
        update_status_bot ="UPDATE tbl_rbot_status SET BOT_STATUS = %s WHERE PKBOT_NCODIGO = %s"
        bot_id = ('ON',1)
        await sql_employers(update_status_bot, bot_id)

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
        if await error_in_process(driver,'Nombre de usuario o contraseña no válidos para ', '//*[@id="__html6"]'):  # Llama a la función y verifica su valor de retorno
            logs =('code01','Fallo inicio de sesión en la plataforma SuccessFactory')
            await sql_employers(insert_query, logs)
        else:
            logs =('code02','Correcto inicio de sesión en la plataforma SuccessFactory')
            await sql_employers(insert_query, logs)
            time.sleep(5)
            urlClaro('https://performancemanager8.successfactors.com/xi/ui/peopleprofile/pages/newhire.xhtml?&_s.crb=ZqyrEeSwE4E79Mlg%2fZnj24TSD9WzmnvEGkYupICuREQ%3d',driver)

            get_SQL_tbl_rcontratacion = await get_employes("SELECT * FROM tbl_rcontratacion WHERE USU_CESTADO = 'NO_INICIADO'")
                
            for i in range(len(get_SQL_tbl_rcontratacion)):
                x=False
                usu_id = ('EN_PROGRESO',get_SQL_tbl_rcontratacion[i].get('PKUSU_NCODIGO'))
                await sql_employers(update_query, usu_id)
                logs =('code03',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO')) + ' Inicio de registro')
                await sql_employers(insert_query, logs)
                    #primer stage
                fecha_ingreso = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_INGRESO'))
                fillBoxes('//*[@id="__picker1-inner"]',fecha_ingreso,driver)
                select('//*[@id="__box0-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CEMPRESA'),driver,'//*[@id="__box0-popup-cont"]')
                select('//*[@id="__box1-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMOTIVO_EVENTO'),driver,'//*[@id="__box1-popup-cont"]')
                select('//*[@id="__box2-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPLANTILLA'),driver,'//*[@id="__box2-popup-cont"]')
                time.sleep(1)
                clickBoxes('//*[@id="__button1-BDI-content"]',driver)
                #información del nombre
                fillBoxes('//*[@id="__input0-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRES'),driver)
                fillBoxes('//*[@id="__input1-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAPELLIDOS'),driver)
                selectElement('//*[@id="__box6-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTRATO'),driver)
                #Información biografica
                fecha_contratacion = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_NACIMIENTO'))
                fillBoxes('//*[@id="__picker3-inner"]',fecha_contratacion,driver)
                select('//*[@id="__box7-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPAIS_NACIMIENTO'),driver,'//*[@id="__box7-popup-cont"]')
                select('//*[@id="__box8-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPARTAMENTO_NACIMIENTO'),driver,'//*[@id="__box8-popup-cont"]')
                time.sleep(1)
                select('//*[@id="__box9-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCIUDAD_NACIMIENTO'),driver,'//*[@id="__box9-popup-cont"]')
                # # #Información del empleado
                fillBoxes('//*[@id="__input8-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRE_USUARIO'),driver)
                clickBoxes('//*[@id="__button26-BDI-content"]',driver)
                # # #Documento de identidad
                select('//*[@id="__box10-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPAIS_EXPEDICION'),driver,'//*[@id="__box10-popup-cont"]')
                time.sleep(1)
                select('//*[@id="__box11-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_DOCUMENTO'),driver,'//*[@id="__box11-popup-cont"]')
                fillBoxes('//*[@id="__input11-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'),driver)
                select('//*[@id="__box12-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CES_PRIMARIO'),driver,'//*[@id="__box12-popup-cont"]')
                fecha_expedicion = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_EXPEDICION'))
                fillBoxes('//*[@id="__picker4-inner"]',fecha_expedicion,driver)
                select('//*[@id="__box13-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPARTAMENTO_EXPEDICION'),driver,'//*[@id="__box13-popup-cont"]')
                time.sleep(1)
                select('//*[@id="__box14-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCIUDAD_EXPEDICION'),driver,'//*[@id="__box14-popup-cont"]')
                clickBoxes('//*[@id="__button25-BDI-content"]',driver)
                logs =('code31',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información biográfica y de empleado completada!')
                await sql_employers(insert_query, logs)

                if await error_in_process(driver,'El empleado o empleados siguientes coinciden con los datos que ha introducido en la Información de identificación.','//*[@id="__text25"]'):
                    logs =('code04',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO')) + ' coincide con la identificación de otro ya creado')
                    await sql_employers(insert_query, logs)
                    clickBoxes('//*[@id="__button31-BDI-content"]',driver)
                    x=True
                if x:
                    time.sleep(2)
                    select('//*[@id="__box16-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CGENERO'),driver,'//*[@id="__box16-popup-cont"]')

                    select('//*[@id="__box17-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTADO_CIVIL'),driver,'//*[@id="__box17-popup-cont"]')     
                    select('//*[@id="__box18-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNACIONALIDAD'),driver,'//*[@id="__box18-popup-cont"]')
                    select('//*[@id="__box20-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CLENGUA_NATIVA'),driver,'//*[@id="__box20-popup-cont"]')
                    clickBoxes('//*[@id="detailsBtn_0-BDI-content"]',driver)
                    
                    fillBoxes('//*[@id="__input14-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCONFIGURACION_REGIONAL_PREDETERMINADA'),driver)
                    select('//*[@id="__box24-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMODO_DESPLAZAMIENTO_CASA_TRABAJO_CASA'),driver,'//*[@id="__box24-popup-cont"]')
                    # #información global
                    select('//*[@id="__box25-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPAIS_REGION'),driver,'//*[@id="__box25-popup-cont"]')
                    # #Información correo electrónico
                    select('//*[@id="__box35-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_CORREO'),driver,'//*[@id="__box35-popup-cont"]')
                    fillBoxes('//*[@id="__input26-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCORREO'),driver)
                    select('//*[@id="__box36-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_ES_PRIMARIO'),driver,'//*[@id="__box36-popup-cont"]')
                    clickBoxes('//*[@id="__button57-BDI-content"]',driver) 
                    logs =('code32',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información personal y correo electronico completada!')
                    await sql_employers(insert_query, logs)
                    # #Información del telefono
                    select('//*[@id="__box37-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_TELEFONO'),driver,'//*[@id="__box37-popup-cont"]')
                    fillBoxes('//*[@id="__input29-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_TELEFONO'),driver)
                    select('//*[@id="__box38-inner"]','sí',driver,'//*[@id="__box38-popup-cont"]')
                    # #Direcciones
                    select('//*[@id="__box29-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_DIRECCION'),driver,'//*[@id="__box29-popup-cont"]')
                    select('//*[@id="__box30-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_PAIS_REGION'),driver,'//*[@id="__box30-popup-cont"]')
                    select('//*[@id="__box31-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPARTAMENTO'),driver,'//*[@id="__box31-popup-cont"]')
                    time.sleep(1.5)
                    select('//*[@id="__box32-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCIUDAD'),driver,'//*[@id="__box32-popup-cont"]')
                    # strat_num=int(strat)
                    estrato('//*[@id="__box33-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTRATO'),driver)
                    select('//*[@id="__box34-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_VIVIENDA'),driver,'//*[@id="__box34-popup-cont"]')
                    clickBoxes('//*[@id="__button52-content"]',driver)
                    logs =('code33',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información de telefono y direcciones completada!')
                    await sql_employers(insert_query, logs)
                    # #Contacto de emergencia
                    fillBoxes('//*[@id="__input33-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCONTACTO_EMERGENCIA'),driver) 

                    select('//*[@id="__box39-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPARENTESCO_EMERGENCIA'),driver,'//*[@id="__box39-popup-cont"]')
                    fillBoxes('//*[@id="__input34-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMOVIL_EMERGENCIA'),driver)
                    select('//*[@id="__box40-inner"]','sí',driver,'//*[@id="__box40-popup-cont"]')
                    clickBoxes('//*[@id="__button53-BDI-content"]',driver)
                    # #Información familiar
                    fillBoxes('//*[@id="__input37-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRES_FAMILIAR'),driver)
                    fillBoxes('//*[@id="__input38-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAPELLIDOS_FAMILIAR'),driver)
                    select('//*[@id="__box41-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPARENTESCO_FAMILIAR'),driver,'//*[@id="__box41-popup-cont"]')
                    select('//*[@id="__box42-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CVIVE_USTED_FAMILIAR'),driver,'//*[@id="__box42-popup-cont"]')
                    select('//*[@id="__box43-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPENDE_USTED_FAMILIAR'),driver,'//*[@id="__box43-popup-cont"]')
                    select('//*[@id="__box44-inner"]','Ocupación',driver,'//*[@id="__box44-popup-cont"]')
                    select('//*[@id="__box46-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTUDIA_FAMILIAR'),driver,'//*[@id="__box46-popup-cont"]')
                    select('//*[@id="__box49-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDISCAPACIDAD_FAMILIAR'),driver,'//*[@id="__box49-popup-cont"]')#discapacidad
                    time.sleep(3)
                    if get_SQL_tbl_rcontratacion[i].get('USU_CDISCAPACIDAD_FAMILIAR') == 'sí':#estado de discapacidad
                        fillBoxes('//*[@id="__input40-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CLUGAR_EMISION'),driver)
                        fillBoxes('//*[@id="__input41-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAUTORIDAD_EMISORA'),driver)     
                        fecha_caducidad = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_CADUCIDAD'))
                        fillBoxes('//*[@id="__picker8-inner"]',fecha_caducidad,driver)
                    select('//*[@id="__box50-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CGENERO_FAMILIAR'),driver,'//*[@id="__box50-popup-cont"]')
                    fecha_nacimiento = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_NACIMIENTO_FAMILIAR'))
                    fillBoxes('//*[@id="__picker9-inner"]',fecha_nacimiento,driver)
                    clickBoxes('//*[@id="__button54-BDI-content"]',driver) 
                    logs =('code34',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Contacto de emergencia e información familiar completada!')
                    await sql_employers(insert_query, logs)
                    #Posición destino
                    select('//*[@id="__box51-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPOSICION'),driver,'//*[@id="__box51-popup-cont"]')
                    time.sleep(3)
                    #Información organizativa
                    select('//*[@id="__box56-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CUBICACION'),driver,'//*[@id="__box56-popup-cont"]')
                    clickBoxes('//*[@id="detailsBtn_1-BDI-content"]',driver)#CLICK AÑADIR MAS
                    # #Información del puesto
                    time.sleep(2)
                    fecha_periodo_prueba = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_FIN_PERIODO_PRUEBA'))
                    fillBoxes('//*[@id="__picker11-inner"]',fecha_periodo_prueba,driver) 
                    select('//*[@id="__box69-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAPLICA_RED_MAESTRA'),driver,'//*[@id="__box69-popup-cont"]')
                    time.sleep(3)
                    select('//*[@id="__box71-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_OPERACION'),driver,'//*[@id="__box71-popup-cont"]')
                    select('//*[@id="__box72-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCANAL'),driver,'//*[@id="__box72-popup-cont"]')
                    time.sleep(3)
                    select('//*[@id="__box73-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CSUBCANAL'),driver,'//*[@id="__box73-popup-cont"]')
                    select('//*[@id="__box79-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CGV_REGION'),driver,'//*[@id="__box79-popup-cont"]')
                    select('//*[@id="__box87-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCOMISION_SIN_COMISION'),driver,'//*[@id="__box87-popup-cont"]')
                    select('//*[@id="__box88-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_DEPARTAMENTO'),driver,'//*[@id="__box88-popup-cont"]')
                    select('//*[@id="__box89-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CIUDAD'),driver,'//*[@id="__box89-popup-cont"]')
                    select('//*[@id="__box90-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCLASIFICACION_BONO'),driver,'//*[@id="__box90-popup-cont"]')
                    select('//*[@id="__box91-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNIVEL_CARGO'),driver,'//*[@id="__box91-popup-cont"]')
                    select('//*[@id="__box92-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_POSICION'),driver,'//*[@id="__box92-popup-cont"]')
                    select('//*[@id="__box96-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CEPS'),driver,'//*[@id="__box96-popup-cont"]')
                    select('//*[@id="__box97-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAFP'),driver,'//*[@id="__box97-popup-cont"]')
                    select('//*[@id="__box98-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CARL'),driver,'//*[@id="__box98-popup-cont"]')
                    select('//*[@id="__box99-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCAJA_COMPENSACION'),driver,'//*[@id="__box99-popup-cont"]')
                    time.sleep(2)
                    select('//*[@id="__box100-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCESANTIAS'),driver,'//*[@id="__box100-popup-cont"]')
                    select('//*[@id="__box104-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_CONTRATO'),driver,'//*[@id="__box104-popup-cont"]')
                    time.sleep(5)
                    select('//*[@id="__box105-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CREGION'),driver,'//*[@id="__box105-popup-cont"]')
                    # #Información de hora
                    selectElement('//*[@id="__box108-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPERFIL_TIEMPOS'),driver)
                    clickBoxes('//*[@id="__button85-BDI-content"]',driver)
                    #Relaciones del puesto
                    select('//*[@id="__box114-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_RELACION'),driver,'//*[@id="__box114-popup-cont"]')
                    select('//*[@id="__input90-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRE_RELACION'),driver,'//*[@id="__input90-popup-cont"]')
                    clickBoxes('//*[@id="__button84-BDI-content"]',driver)
                    logs =('code35',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información del puesto completada!')
                    await sql_employers(insert_query, logs)
                    # #Perfil de accesps/familia
                    select('//*[@id="__box117-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CES_NUEVO_PERFIL'),driver,'//*[@id="__box117-popup-cont"]')
                    clickBoxes('//*[@id="__button94-BDI-content"]',driver)
                    # #INFORMACION Conpensacion
                    select('//*[@id="__box120-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAREA_NOMINA'),driver,'//*[@id="__box120-popup-cont"]')
                    select('//*[@id="__box121-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CES_ELEGIBLE_BENEFICIOS'),driver,'//*[@id="__box121-popup-cont"]')
                    select('//*[@id="__box122-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPERTENECE_SINDICATO'),driver,'//*[@id="__box122-popup-cont"]')
                    time.sleep(2)
                    # 
                    select('//*[@id="__box123-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFIJO_VARIABLE'),driver,'//*[@id="__box123-popup-cont"]')
                    clickBoxes('//*[@id="detailsBtn_2-BDI-content"]',driver)

                    select('//*[@id="__box129-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPACTO_COLECTIVO'),driver,'//*[@id="__box129-popup-cont"]')
                    select('//*[@id="__box130-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CINTEGRALES_SIN_FIRMA_PACTO'),driver,'//*[@id="__box130-popup-cont"]')
                    select('//*[@id="__box131-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTA_FLEXIBILIZADO'),driver,'//*[@id="__box131-popup-cont"]')
                    time.sleep(2)
                    select('//*[@id="__box132-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_PLAN_BENEFICIOS'),driver,'//*[@id="__box132-popup-cont"]')
                    time.sleep(2)
                    select('//*[@id="__box133-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPLAN_BENEFICIOS'),driver,'//*[@id="__box133-popup-cont"]')
                    select('//*[@id="__box135-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_SALARIO'),driver,'//*[@id="__box135-popup-cont"]')
                    clickBoxes('//*[@id="__button101-BDI-content"]',driver)
                    #Compensación
                    select('//*[@id="__box136-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCONCEPTO_PAGO'),driver,'//*[@id="__box136-popup-cont"]')
                    time.sleep(3)
                    fillBoxes('//*[@id="__field0-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CVALOR'),driver)
                    select('//*[@id="__box137-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMONEDA'),driver,'//*[@id="__box137-popup-cont"]')
                    time.sleep(1)
                    select('//*[@id="__box138-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFRECUENCIA'),driver,'//*[@id="__box138-popup-cont"]')
                    logs =('code36',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información de compensación completada!')
                    await sql_employers(insert_query, logs)
                    time.sleep(5)
                    clickBoxes('//*[@id="__button100-BDI-content"]',driver)
                    if await error_in_process(driver,"Error : Está ingresando una fecha extemporánea, recuerde que los Ingresos o reingresos no se realizan en fechas posteriores al día de hoy",'//*[@id="__html17"]'):
                        time.sleep(1)
                        logs =('code05',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Fallo en fecha de ingreso, se esta ingresando una fecha posterior al día de hoy.')
                        await sql_employers(insert_query, logs)
                        clickBoxes('//*[@id="__mbox-btn-0-BDI-content"]',driver)#cerrar
                        usu_id = ('ERROR',get_SQL_tbl_rcontratacion[i].get('PKUSU_NCODIGO'))
                        await sql_employers(update_query, usu_id)
                        time.sleep(5)
                        urlClaro('https://performancemanager8.successfactors.com/xi/ui/peopleprofile/pages/newhire.xhtml?&_s.crb=ZqyrEeSwE4E79Mlg%2fZnj24TSD9WzmnvEGkYupICuREQ%3d',driver)
                        time.sleep(5)
                    else:
                        logs =('code011',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Se ha registrado correctamente.')
                        await sql_employers(insert_query, logs)
                        usu_id = ('COMPLETADO',get_SQL_tbl_rcontratacion[i].get('PKUSU_NCODIGO'))
                        await sql_employers(update_query, usu_id)
                        time.sleep(5)
                        urlClaro('https://performancemanager8.successfactors.com/xi/ui/peopleprofile/pages/newhire.xhtml?&_s.crb=ZqyrEeSwE4E79Mlg%2fZnj24TSD9WzmnvEGkYupICuREQ%3d',driver)
                        time.sleep(5)  
########################################################################################################################################################################################
                else:
                    select('//*[@id="__box15-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CGENERO'),driver,'//*[@id="__box15-popup-cont"]')
                    select('//*[@id="__box16-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTADO_CIVIL'),driver,'//*[@id="__box16-popup-cont"]')     
                    select('//*[@id="__box17-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNACIONALIDAD'),driver,'//*[@id="__box17-popup-cont"]')
                    select('//*[@id="__box19-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CLENGUA_NATIVA'),driver,'//*[@id="__box19-popup-cont"]')
                    clickBoxes('//*[@id="detailsBtn_0-BDI-content"]',driver)
                    fillBoxes('//*[@id="__input14-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCONFIGURACION_REGIONAL_PREDETERMINADA'),driver)
                    select('//*[@id="__box23-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMODO_DESPLAZAMIENTO_CASA_TRABAJO_CASA'),driver,'//*[@id="__box23-popup-cont"]')

                    select('//*[@id="__box24-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPAIS_REGION'),driver,'//*[@id="__box24-popup-cont"]')
                    # #Información correo electrónico
                    select('//*[@id="__box34-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_CORREO'),driver,'//*[@id="__box34-popup-cont"]')
                    fillBoxes('//*[@id="__input26-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCORREO'),driver)
                    select('//*[@id="__box35-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_ES_PRIMARIO'),driver,'//*[@id="__box35-popup-cont"]')
                    clickBoxes('//*[@id="__button54-BDI-content"]',driver) 

                    logs =('code32',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información personal y correo electronico completada!')
                    await sql_employers(insert_query, logs)
                    # #Información del telefono
                    select('//*[@id="__box36-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_TELEFONO'),driver,'//*[@id="__box36-popup-cont"]')
                    fillBoxes('//*[@id="__input29-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_TELEFONO'),driver)
                    select('//*[@id="__box37-inner"]','sí',driver,'//*[@id="__box37-popup-cont"]')
                    # #Direcciones
                    select('//*[@id="__box28-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_DIRECCION'),driver,'//*[@id="__box28-popup-cont"]')
                    select('//*[@id="__box29-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_PAIS_REGION'),driver,'//*[@id="__box29-popup-cont"]')
                    select('//*[@id="__box30-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPARTAMENTO'),driver,'//*[@id="__box30-popup-cont"]')
                    time.sleep(1.5)
                    select('//*[@id="__box31-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCIUDAD'),driver,'//*[@id="__box31-popup-cont"]')
                    estrato('//*[@id="__box32-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTRATO'),driver)
                    select('//*[@id="__box33-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_VIVIENDA'),driver,'//*[@id="__box33-popup-cont"]')
                    clickBoxes('//*[@id="__button49-content"]',driver)

                    logs =('code33',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información de telefono y direcciones completada!')
                    await sql_employers(insert_query, logs)
                    # #Contacto de emergencia
                    fillBoxes('//*[@id="__input33-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCONTACTO_EMERGENCIA'),driver) 
                    select('//*[@id="__box38-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPARENTESCO_EMERGENCIA'),driver,'//*[@id="__box38-popup-cont"]')
                    fillBoxes('//*[@id="__input34-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMOVIL_EMERGENCIA'),driver)
                    select('//*[@id="__box39-inner"]','sí',driver,'//*[@id="__box39-popup-cont"]')
                    clickBoxes('//*[@id="__button50-BDI-content"]',driver)
                    # #Información familiar
                    fillBoxes('//*[@id="__input37-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRES_FAMILIAR'),driver)
                    fillBoxes('//*[@id="__input38-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAPELLIDOS_FAMILIAR'),driver)
                    select('//*[@id="__box40-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPARENTESCO_FAMILIAR'),driver,'//*[@id="__box40-popup-cont"]')
                    select('//*[@id="__box41-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CVIVE_USTED_FAMILIAR'),driver,'//*[@id="__box41-popup-cont"]')
                    select('//*[@id="__box42-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDEPENDE_USTED_FAMILIAR'),driver,'//*[@id="__box42-popup-cont"]')
                    select('//*[@id="__box43-inner"]','Ocupación',driver,'//*[@id="__box43-popup-cont"]')
                    select('//*[@id="__box45-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTUDIA_FAMILIAR'),driver,'//*[@id="__box45-popup-cont"]')
                    select('//*[@id="__box48-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CDISCAPACIDAD_FAMILIAR'),driver,'//*[@id="__box48-popup-cont"]')#discapacidad
                    time.sleep(3)
                    if get_SQL_tbl_rcontratacion[i].get('USU_CDISCAPACIDAD_FAMILIAR') == 'sí':#estado de discapacidad
                        fillBoxes('//*[@id="__input40-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CLUGAR_EMISION'),driver)
                        fillBoxes('//*[@id="__input41-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAUTORIDAD_EMISORA'),driver)     
                        fecha_caducidad = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_CADUCIDAD'))
                        fillBoxes('//*[@id="__picker8-inner"]',fecha_caducidad,driver)
                    select('//*[@id="__box49-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CGENERO_FAMILIAR'),driver,'//*[@id="__box49-popup-cont"]')
                    fecha_nacimiento = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_NACIMIENTO_FAMILIAR'))
                    fillBoxes('//*[@id="__picker9-inner"]',fecha_nacimiento,driver)
                    clickBoxes('//*[@id="__button51-BDI-content"]',driver) 

                    logs =('code34',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Contacto de emergencia e información familiar completada!')
                    await sql_employers(insert_query, logs)
                    #Posición destino
                    select('//*[@id="__box50-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPOSICION'),driver,'//*[@id="__box50-popup-cont"]')
                    time.sleep(3)
                    #Información organizativa
                    select('//*[@id="__box55-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CUBICACION'),driver,'//*[@id="__box55-popup-cont"]')
                    clickBoxes('//*[@id="detailsBtn_1-BDI-content"]',driver)#CLICK AÑADIR MAS
                    # #Información del puesto
                    time.sleep(2)
                    fecha_periodo_prueba = await excel_date_to_python_date(get_SQL_tbl_rcontratacion[i].get('USU_CFECHA_FIN_PERIODO_PRUEBA'))
                    fillBoxes('//*[@id="__picker11-inner"]',fecha_periodo_prueba,driver) 
                    select('//*[@id="__box68-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAPLICA_RED_MAESTRA'),driver,'//*[@id="__box68-popup-cont"]')
                    time.sleep(3)
                    select('//*[@id="__box70-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_OPERACION'),driver,'//*[@id="__box70-popup-cont"]')
                    select('//*[@id="__box71-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCANAL'),driver,'//*[@id="__box71-popup-cont"]')
                    time.sleep(3)
                    select('//*[@id="__box72-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CSUBCANAL'),driver,'//*[@id="__box72-popup-cont"]')
                    select('//*[@id="__box78-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CGV_REGION'),driver,'//*[@id="__box78-popup-cont"]')
                    select('//*[@id="__box86-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCOMISION_SIN_COMISION'),driver,'//*[@id="__box86-popup-cont"]')
                    select('//*[@id="__box87-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_DEPARTAMENTO'),driver,'//*[@id="__box87-popup-cont"]')
                    select('//*[@id="__box88-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CIUDAD'),driver,'//*[@id="__box88-popup-cont"]')
                    select('//*[@id="__box89-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCLASIFICACION_BONO'),driver,'//*[@id="__box89-popup-cont"]')
                    select('//*[@id="__box90-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNIVEL_CARGO'),driver,'//*[@id="__box90-popup-cont"]')
                    select('//*[@id="__box91-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_POSICION'),driver,'//*[@id="__box91-popup-cont"]')
                    select('//*[@id="__box95-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CEPS'),driver,'//*[@id="__box95-popup-cont"]')
                    select('//*[@id="__box96-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAFP'),driver,'//*[@id="__box96-popup-cont"]')
                    select('//*[@id="__box97-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CARL'),driver,'//*[@id="__box97-popup-cont"]')
                    select('//*[@id="__box98-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCAJA_COMPENSACION'),driver,'//*[@id="__box98-popup-cont"]')
                    time.sleep(2)
                    select('//*[@id="__box99-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCESANTIAS'),driver,'//*[@id="__box99-popup-cont"]')
                    select('//*[@id="__box103-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_CONTRATO'),driver,'//*[@id="__box103-popup-cont"]')
                    time.sleep(5)
                    select('//*[@id="__box104-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CREGION'),driver,'//*[@id="__box104-popup-cont"]')
                    # #Información de hora
                    selectElement('//*[@id="__box107-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPERFIL_TIEMPOS'),driver)
                    clickBoxes('//*[@id="__button82-BDI-content"]',driver)
                    #Relaciones del puesto
                    select('//*[@id="__box113-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_RELACION'),driver,'//*[@id="__box113-popup-cont"]')
                    select('//*[@id="__input90-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CNOMBRE_RELACION'),driver,'//*[@id="__input90-popup-cont"]')
                    clickBoxes('//*[@id="__button81-BDI-content"]',driver)
                    logs =('code35',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información del puesto completada!')
                    await sql_employers(insert_query, logs)
                    # #Perfil de accesps/familia
                    select('//*[@id="__box116-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CES_NUEVO_PERFIL'),driver,'//*[@id="__box116-popup-cont"]')
                    clickBoxes('//*[@id="__button91-BDI-content"]',driver)
                    
                    # #INFORMACION Compensacion
                    select('//*[@id="__box119-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CAREA_NOMINA'),driver,'//*[@id="__box119-popup-cont"]')
                    select('//*[@id="__box120-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CES_ELEGIBLE_BENEFICIOS'),driver,'//*[@id="__box119-popup-cont"]')
                    select('//*[@id="__box121-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPERTENECE_SINDICATO'),driver,'//*[@id="__box121-popup-cont"]')
                    time.sleep(2)
                    # 
                    select('//*[@id="__box122-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFIJO_VARIABLE'),driver,'//*[@id="__box122-popup-cont"]')
                    clickBoxes('//*[@id="detailsBtn_2-BDI-content"]',driver)
                    select('//*[@id="__box128-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPACTO_COLECTIVO'),driver,'//*[@id="__box128-popup-cont"]')
                    select('//*[@id="__box129-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CINTEGRALES_SIN_FIRMA_PACTO'),driver,'//*[@id="__box129-popup-cont"]')
                    select('//*[@id="__box130-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CESTA_FLEXIBILIZADO'),driver,'//*[@id="__box130-popup-cont"]')
                    time.sleep(2)
                    select('//*[@id="__box131-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_PLAN_BENEFICIOS'),driver,'//*[@id="__box131-popup-cont"]')
                    time.sleep(2)
                    select('//*[@id="__box132-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CPLAN_BENEFICIOS'),driver,'//*[@id="__box132-popup-cont"]')
                    select('//*[@id="__box134-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CTIPO_SALARIO'),driver,'//*[@id="__box134-popup-cont"]')
                    clickBoxes('//*[@id="__button98-BDI-content"]',driver)
                    #Compensación
                    select('//*[@id="__box135-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CCONCEPTO_PAGO'),driver,'//*[@id="__box135-popup-cont"]')
                    time.sleep(3)
                    fillBoxes('//*[@id="__field0-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CVALOR'),driver)
                    select('//*[@id="__box136-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CMONEDA'),driver,'//*[@id="__box136-popup-cont"]')
                    time.sleep(1)
                    select('//*[@id="__box137-inner"]',get_SQL_tbl_rcontratacion[i].get('USU_CFRECUENCIA'),driver,'//*[@id="__box137-popup-cont"]')
                    logs =('code36',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Información de compensación completada!')
                    await sql_employers(insert_query, logs)
                    time.sleep(5)
                    clickBoxes('//*[@id="__button97-BDI-content"]',driver)
                    if await error_in_process(driver,"Error : Está ingresando una fecha extemporánea, recuerde que los Ingresos o reingresos no se realizan en fechas posteriores al día de hoy",'//*[@id="__html17"]'):
                        time.sleep(1)
                        logs =('code05','Fallo en fecha de ingreso, se esta ingresando una fecha posterior al día de hoy.')
                        await sql_employers(insert_query, logs)
                        clickBoxes('//*[@id="__mbox-btn-0-BDI-content"]',driver)
                        usu_id = ('ERROR',get_SQL_tbl_rcontratacion[i].get('PKUSU_NCODIGO'))
                        await sql_employers(update_query, usu_id)
                        time.sleep(5)
                        urlClaro('https://performancemanager8.successfactors.com/xi/ui/peopleprofile/pages/newhire.xhtml?&_s.crb=ZqyrEeSwE4E79Mlg%2fZnj24TSD9WzmnvEGkYupICuREQ%3d',driver)
                        time.sleep(5) 
                    else:
                        usu_id = ('COMPLETADO',get_SQL_tbl_rcontratacion[i].get('PKUSU_NCODIGO'))
                        await sql_employers(update_query, usu_id)
                        logs =('code011',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Se ha registrado correctamente.')
                        await sql_employers(insert_query, logs)
                        time.sleep(5)
                        urlClaro('https://performancemanager8.successfactors.com/xi/ui/peopleprofile/pages/newhire.xhtml?&_s.crb=ZqyrEeSwE4E79Mlg%2fZnj24TSD9WzmnvEGkYupICuREQ%3d',driver)
                        time.sleep(5)    

    except Exception as e:
        logs =('code012',str(get_SQL_tbl_rcontratacion[i].get('USU_CNUMERO_DOCUMENTO'))+' Ha salido algo mal, revise que este ingresando correctamente todos los parametros, esto incluye tildes, espacios etc.. ')
        await sql_employers(insert_query, logs)
        usu_id = ('ERROR',get_SQL_tbl_rcontratacion[i].get('PKUSU_NCODIGO'))
        await sql_employers(update_query, usu_id)
        print(f"Se ha encontrado un error en rap_main: {str(e)}")

    #     # a = 1;
        
    finally:
        logs =('code09',' Se ha finalizado con el registro de los colaboradores')
        await sql_employers(insert_query, logs)
        bot_id = ('OFF',1)
        await sql_employers(update_status_bot, bot_id)
        driver.quit()

if __name__ == "__main__":
    asyncio.run(rpa_main())

# if a == 1:
#     a = 0;
#     asyncio.run(rpa_main())


# El nombre del usuario ya existe. Introduzca un nuevo valor exclusivo.
# //*[@id="__html0"]