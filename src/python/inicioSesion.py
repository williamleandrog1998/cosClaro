from Sentences import ejecutar_consulta
import asyncio

async def connection_db():
    try:
        query = "SELECT * FROM tbl_rclarousers"
        res = await ejecutar_consulta(query)
        return res
    except Exception as e:
        print(f"se ha producido un error: {str(e)}")

async def main():
    try:

        inicio = await connection_db()
        # print(inicio)

    except Exception as e:
        print(f"Se ha encontrado un error: {str(e)}")

    return inicio
    

asyncio.run(main())