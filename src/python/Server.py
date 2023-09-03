from flask import Flask, request, make_response
from waitress import serve
import subprocess
import json

app = Flask(__name__)

@app.route('/ejecutar-python-TTS', methods=['POST'])
def ejecutar_python_tts():
    data = request.get_json()
  
    script_path = data['scriptPath']
    nombre_proceso = data['nombreProceso']
    usuario_infobip = data['usuarioInfobip']
    flujo = data['flujo']
    proceso = data['proceso']
    insertId = data['insertId']

    print(script_path)
    print(nombre_proceso)
    print(usuario_infobip)
    print(flujo)
    print(proceso)
    print(insertId)

    try:
        proceso_python = subprocess.Popen(
            ['python', 'ProcesoCargueTTS.py', script_path, nombre_proceso, usuario_infobip, flujo, proceso, insertId],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdout, stderr = proceso_python.communicate()

        print(stdout)

        if stderr:
            return make_response(stderr, 500)
        else:
            return make_response(stdout, 200)

    except Exception as e:
        return make_response(str(e), 500)
    
@app.route('/ejecutar-python-BID', methods=['POST'])
def ejecutar_python_bid():
    data = request.get_json()
  
    script_path = data['scriptPath']
    nombre_proceso = data['nombreProceso']
    usuario_infobip = data['usuarioInfobip']
    flujo = data['flujo']
    proceso = data['proceso']
    insertId = data['insertId']
    fechaSeguimiento = data['fechaSeguimiento']

    print(script_path)
    print(nombre_proceso)
    print(usuario_infobip)
    print(flujo)
    print(proceso)
    print(insertId)
    print(fechaSeguimiento)

    try:
        proceso_python = subprocess.Popen(
            ['python', 'ProcesoCargueBID.py', script_path, nombre_proceso, usuario_infobip, flujo, proceso, insertId, fechaSeguimiento],
            stdout=subprocess.PIPE,            
            stderr=subprocess.PIPE
        )
        stdout, stderr = proceso_python.communicate()

        print(stdout)

        if stderr:
            return make_response(stderr, 500)
        else:
            return make_response(stdout, 200)

    except Exception as e:
        return make_response(str(e), 500)

if __name__ == "__main__":
    host = "localhost"
    port = 5540
    print("En linea en Host: ", host, " y Puerto: ", port)
    serve(app, host=host, port=port)