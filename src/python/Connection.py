import pymysql
from Encrypt_Decrypt import *

# Server
# IPServidor = '41785A3245774C6D41775232446D4C3441784C335A6D7030' #Localhost
# UsuarioServidor = '41775A324577706D41484C325A6D706C4178443D'
# ContrasenaServidor = '417770324147706D416D443242474D5441784832416D4C31417848324147706C41775232446D4C6D41784C335A6D414F5A6D566D5A515A6C5A6D4E3D'
# BaseDatosServidor = '417744325A77706A41484C325A774D54416D443145777030416D483342474C6B'

# LocalHost
IPServidor = '41785A3245774C6D41775232446D4C3441784C335A6D7030'
UsuarioServidor = '416D563245774D54416D443D'
ContrasenaServidor = '41515A3245774D5141784C3245514C6C417778325A475A6C5A6D563D'
BaseDatosServidor = '417744325A77706A41484C325A774D54416D443145777030416D483342474C6B'

# Conexión a base de datos
def conntDB():
    try:    
        connectionMySQL = pymysql.connect(host=DeCrypt(IPServidor), user=DeCrypt(UsuarioServidor), password=DeCrypt(
            ContrasenaServidor), db=DeCrypt(BaseDatosServidor), charset='utf8', cursorclass=pymysql.cursors.DictCursor)
        connectionMySQL.autocommit(True)  
        print('Hola Roger - Conectado a la base de datos!!!')  
        return connectionMySQL
    except Exception as e:
        print('Sin conexión a la base de datos', e)