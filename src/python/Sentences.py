from Connection import conectar_db, cerrar_db
import mysql.connector
import re
import asyncio

async def ejecutar_consulta(query):
    conexion = conectar_db()
    if conexion:
        cursor = None  # Inicializa cursor a None
        try:
            cursor = conexion.cursor()
            cursor.execute(query)
            results = cursor.fetchall()
            # Procesa los resultados según sea necesario
            for fila in results:
                print('')
        except mysql.connector.Error as err:
            print(f"Error al ejecutar la consulta: {str(err)}")
        finally:
            if cursor:
                cursor.close()
            cerrar_db(conexion)
    return fila

async def get_employes(query):

    try:
        conexion = conectar_db()
        
        if conexion:
            cursor = None
            try:
                cursor = conexion.cursor()  # Usamos dictionary=True para obtener resultados como diccionarios
                cursor.execute(query)
                results = cursor.fetchall()
                results_array = []
                for row in results:
                    result_dict = {}
                    for i, column_name in enumerate(cursor.column_names):
                        result_dict[column_name] = row[i]
                    results_array.append(result_dict)
                # return results_array
                res = await delete_parentheses(results_array)
                return res
            except mysql.connector.Error as err:
                print(f"Error al ejecutar la consulta: {str(err)}")
            finally:
                if cursor:
                    cursor.close()
                cerrar_db(conexion)
    except Exception as err:
        print(f"Error en get_employes: {str(err)}")


async def delete_parentheses(req):
    try:
        new_data = []
        for dictionary in req:
            new_dict = {}
            for key, value in dictionary.items():
                if isinstance(value, str):
                    # Usar expresiones regulares para eliminar los paréntesis y su contenido
                    new_value = re.sub(r'\([^)]*\)', '', value)
                    new_dict[key] = new_value
                else:
                    new_dict[key] = value  # Mantener otros tipos de valores sin cambios
            new_data.append(new_dict)

        return new_data
    except Exception as err:
        print(f"Error en delete_parentheses_from_dict_list: {str(err)}")







