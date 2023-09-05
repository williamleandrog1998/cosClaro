from Connection import conectar_db, cerrar_db
import mysql.connector
import asyncio

async def ejecutar_consulta(query):
    conexion = conectar_db()
    if conexion:
        cursor = None  # Inicializa cursor a None
        try:
            cursor = conexion.cursor()
            cursor.execute(query)
            resultados = cursor.fetchall()
            # Procesa los resultados según sea necesario
            for fila in resultados:
                print('')
        except mysql.connector.Error as err:
            print(f"Error al ejecutar la consulta: {str(err)}")
        finally:
            if cursor:
                cursor.close()
            cerrar_db(conexion)
    return fila


# Ejemplo de uso
# if(1==1):
#     consulta = "SELECT * FROM tbl_rclarousers"
#     ejecutar_consulta(consulta)
