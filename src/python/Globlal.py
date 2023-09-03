import os
import sys

# --------------------------------------------------------------------------------
# --------------------------------------------------------------------------------
# ----------------------------VARIABLES GLOBALES----------------------------------
# --------------------------------------------------------------------------------
# --------------------------------------------------------------------------------

# Path Software
def obtenerRutas():
    #ruta de este archivo .py, incluyendo el nombre de este archivo
    ejecutablePrograma = str(os.path.realpath(sys.argv[0]))
    #ruta contenedora de este archivo .py
    rutaEjecutablePrograma = str(os.path.dirname(os.path.realpath(sys.argv[0])))
    return {"ejecutablePrograma": ejecutablePrograma, "rutaEjecutablePrograma": rutaEjecutablePrograma}

# Path Default
comprobarRuta = str(os.path.dirname(sys.argv[0]))
if comprobarRuta.strip() == None:
    EjecutablePrograma = str(os.path.basename(sys.executable))
    RutaEjecutablePrograma = str(os.path.dirname(sys.executable))
elif comprobarRuta.strip() == '':
    EjecutablePrograma = str(os.path.basename(sys.executable))
    RutaEjecutablePrograma = str(os.path.dirname(sys.executable))
else:
    EjecutablePrograma = str(os.path.basename(sys.argv[0]))
    RutaEjecutablePrograma = str(os.path.dirname(sys.argv[0]))

# Nombre Programa
NombrePrograma = "bot_tuya_infobip"
# URL Principal
URL = "https://contactosms.contactosolutions.com/communications/?ivrflowsubmitted=true"  
URL2 = "https://contactosms.contactosolutions.com/people/persons"  