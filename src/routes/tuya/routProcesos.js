const router = require("express").Router();
const pool = require("../../database");
const path = require("path");
const fs = require("fs");
const { isLoggedIn } = require("../../lib/auth");
const { spawn } = require("child_process");
const xlsx = require("xlsx");
const fileUpload = require("express-fileupload");
const axios = require('axios');
const file_upload = fileUpload();
const sentences = require('../../queries/main.query');

router.post("/cargar", isLoggedIn, file_upload, async (req, res) => {
    if (!req.files || !req.files.archivos_excel) {
        return res.status(400).json({ error: 'No se cargó ningún archivo.' });
    } else {
        const archivo = req.files.archivos_excel;
        const filePath = __dirname + `/${archivo.name}`;

        if (!archivo.name.match(/\.(xlsx|xls)$/i)) {
            return res.status(400).json({ message: 'Formato incorrecto. Por favor, selecciona un archivo Excel válido.' });
        }

        archivo.mv(filePath, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else {
                try {
                    const workbook = xlsx.readFile(filePath);
                    const sheetName = workbook.SheetNames[0];
                    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

                    const isValid = await sentences.validateData(data);
                    console.log(isValid.isValid)
                    if (!isValid.isValid) {
                        return res.status(400).json({message: isValid.invalidObjects[0]});
                        // return res.status(400).json({message: `error en las columnas: ${isValid.invalidObjects[0]}`});
                    }
                    // return res.status(400).json({message: `error en las columnas: ${isValid.invalidObjects[0]}`});
                    const nextStep = await insertInfo(isValid.data);
                    if (nextStep) {
                        return res.status(200).json({ message: 'El archivo se ha subido satisfactoriamente.' });
                    }else{
                        return res.status(500).json({ message: 'Error al cargar el archivo, verifica que sea el apropiado.' });
                    } 

                } catch (err) {
                    console.error('error en carga del excel, debido a: ' + err);
                    res.status(500).json({ error: 'Error en la carga del archivo Excel.' });
                }
            }
        });
    }
});


async function insertInfo(data) {
    try {
  
        const insertPromises = [];

        if(data.length == 0){
            return false
        }

        for (let i = 0; i < data.length; i++) {
            const dataInsert = await sentences.prepareData(data[i]);
            const query = "INSERT INTO tbl_rcontratacion SET ?";
            const insertPromise = new Promise((resolve, reject) => {
                console.log('inseertPromise')
                pool.query(query, dataInsert, (error, results) => {
                    if (error) {
                        console.error("Error al ejecutar la consulta:", error);
                        resolve(false);
                    } else {
                        console.log("Inserción exitosa:", results);
                        resolve(true);
                    }
                });
            });
            insertPromises.push(insertPromise);
        }
        
        const insertResults = await Promise.all(insertPromises);
        return insertResults.includes(false) ? false : true;
    } catch (error) {
        console.error(`error en insertInfo debido a: ${error}`);
        return false;
    }
}

router.post("/cargarexceltts", isLoggedIn, file_upload, async (req, res) => {
    try {
        
        const File_Base = req.files ? req.files.File : null;
        // console.log("Aca estoy", File_Base);
        let Carpeta = Date.now();
        // mueve el adjunto al servidor en caso que lo envien
        if (File_Base) {
            let format_type = File_Base.mimetype.split("/");
            console.log(format_type);
            let archivo_formato = format_type[1];
            console.log("El formato del archivo es: ", archivo_formato);
            if (
                archivo_formato ===
                "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
                let nombreExcel = `${File_Base.name}`;
                console.log(nombreExcel);
                let nameFile = nombreExcel.split(".").slice(0, -1).join(".");
                let carpetaRuta = path.resolve(`src/public/doc/base/${Carpeta}`);
                if (!fs.existsSync(carpetaRuta)) {
                    fs.mkdirSync(carpetaRuta);
                    fs.chmodSync(carpetaRuta, 0o755);
                }
                console.log("Cargando...");
                let rutaExcel = await path.resolve(
                    `src/public/doc/base/${Carpeta}/${nombreExcel}`
                );
                console.log(rutaExcel);
                await File_Base.mv(rutaExcel, async (err) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    } else {
                        try {
                            let valFormato = validarColumnasTTS(rutaExcel)
                            if (valFormato) {
                                const registros = cantidadRegistros(rutaExcel);
                                const download = `doc/base/${Carpeta}/${nombreExcel}`;
                                let usuarioInfobip = req.body.usuarioInfobip;
                                let proceso = req.body.proceso;
                                let flujo = req.body.flujo;
                                const newCargue = {
                                    STA_CNOMBRE_PROCESO: proceso,
                                    STA_CUSUARIO_INFOBIP: usuarioInfobip,
                                    STA_CNOMBRE_ARCHIVO: nameFile,
                                    STA_CNOMBRE_FLUJO: flujo,
                                    STA_CARCHIVO_CARGADO: download,
                                    STA_CCANTIDAD_REGISTROS: registros,
                                    STA_CREQ_SEGUIMIENTO: "N/A",
                                    STA_CFECHA_SEGUIMIENTO: "N/A",
                                    STA_CRESPONSABLE: req.user.USU_CUSUARIO,
                                    STA_CCARGO: req.user.USU_CROL,
                                    STA_CESTADO: "En ejecución",
                                };
                                const sql = await pool.query("INSERT INTO tbl_status set ?", [newCargue]);
                                let insertId = sql.insertId;
                                const procesoPython1 = await modificarExcel(rutaExcel, insertId, Carpeta)
                                console.log(procesoPython1)
                                if (procesoPython1){
                                    const select = "SELECT STA_CPATH_RESULTANTE FROM tbl_status WHERE PKSTA_NCODIGO = " + insertId + ";";
                                    const consulta = await pool.query(select);
                                    pathFileConvert = consulta[0].STA_CPATH_RESULTANTE;
                                    res.json({ result: 1 });
                                    cargarExcelTts(pathFileConvert, nameFile, usuarioInfobip, flujo, proceso, insertId);
                                }
                                else {
                                    res.json({ result: 0 });   
                                }                             
                            } else {
                                res.json({ result: 4 });
                            }
                        } catch (err) {
                            console.log(err);
                            res.json({ result: 0 });
                        }
                    }
                });
            } else {
                res.json({ result: 2 });
            }
        } else {
            res.json({ result: 3 });
        }
    } catch (error) {
        console.log(error);
        res.json({ result: 0 });
    }
});

// Cargar Excel BIDIRECCIONAL
router.post("/cargarexcelbidireccional", isLoggedIn, file_upload, async (req, res) => {
    try {
        const File_Base = req.files ? req.files.File : null;
        //   console.log("Aca estoy", File_Base);
        let Carpeta = Date.now();
        // mueve el adjunto al servidor en caso que lo envien
        if (File_Base) {
            let format_type = File_Base.mimetype.split("/");
            console.log(format_type);
            let archivo_formato = format_type[1];
            console.log("El formato del archivo es: ", archivo_formato);
            if (
                archivo_formato ===
                "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
                let nombreExcel = `${File_Base.name}`;
                console.log(nombreExcel);
                let nameFile = nombreExcel.split(".").slice(0, -1).join(".");
                let carpetaRuta = path.resolve(`src/public/doc/base/${Carpeta}`);
                if (!fs.existsSync(carpetaRuta)) {
                    fs.mkdirSync(carpetaRuta);
                    fs.chmodSync(carpetaRuta, 0o755);
                }
                console.log("Cargando...");
                let rutaExcel = await path.resolve(
                    `src/public/doc/base/${Carpeta}/${nombreExcel}`
                );
                console.log(rutaExcel);
                await File_Base.mv(rutaExcel, async (err) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    } else {
                        try {
                            let valFormato = validarColumnasBID(rutaExcel)
                            if (valFormato) {
                                const registros = cantidadRegistros(rutaExcel);
                                const download = `doc/base/${Carpeta}/${nombreExcel}`;
                                const usuarioInfobip = req.body.usuarioInfobip;
                                const proceso = req.body.proceso;
                                const flujo = req.body.flujo;
                                const seguimiento = req.body.seguimiento;
                                const fechaSeguimiento = req.body.fechaSeguimiento
                                const newCargue = {
                                    STA_CNOMBRE_PROCESO: proceso,
                                    STA_CUSUARIO_INFOBIP: usuarioInfobip,
                                    STA_CNOMBRE_ARCHIVO: nameFile,
                                    STA_CNOMBRE_FLUJO: flujo,
                                    STA_CARCHIVO_CARGADO: download,
                                    STA_CCANTIDAD_REGISTROS: registros,
                                    STA_CREQ_SEGUIMIENTO: seguimiento,
                                    STA_CFECHA_SEGUIMIENTO:
                                        fechaSeguimiento !== null &&
                                            fechaSeguimiento !== undefined &&
                                            fechaSeguimiento !== ""
                                            ? fechaSeguimiento
                                            : "N/A",
                                    STA_CARCHIVO_RESULTANTE: 'N/A',
                                    STA_CRESPONSABLE: req.user.USU_CUSUARIO,
                                    STA_CCARGO: req.user.USU_CROL,
                                    STA_CESTADO: "En ejecución",
                                };
                                const sql = await pool.query("INSERT INTO tbl_status set ?", [newCargue]);
                                let insertId = sql.insertId;
                                res.json({ result: 1 });
                                cargarExcelBid(rutaExcel, nameFile, usuarioInfobip, flujo, proceso, insertId, fechaSeguimiento );
                            } else {
                                res.json({ result: 4 });
                            }
                        } catch (err) {
                            console.log(err);
                            res.json({ result: 0 });
                        }
                    }
                });
            } else {
                res.json({ result: 2 });
            }
        } else {
            res.json({ result: 3 });
        }
    } catch (error) {
        console.log(error);
        res.json({ result: 0 });
    }
});

function validarColumnasTTS(rutaArchivo) {
    const rutaArchivoExcel = path.resolve(rutaArchivo);
    const workbook = xlsx.readFile(rutaArchivoExcel);
    const nombrePrimeraHoja = workbook.SheetNames[0];
    const hoja = workbook.Sheets[nombrePrimeraHoja];
    const encabezadosRequeridos = [
        "NOMBRE",
        "CELULAR",
        "PRODUCTO",
        "VALOR",
        "FECHA"
    ];
    const encabezadosObtenidos = Object.keys(hoja)
        .filter(key => key.endsWith('1'))
        .map(key => hoja[key].v);

    const encabezadosValidos = encabezadosRequeridos.every(encabezado => encabezadosObtenidos.includes(encabezado));
    if (encabezadosValidos) {
        console.log('Los encabezados son válidos.');
        return true;
    } else {
        console.log('Los encabezados no son válidos.');
        return false;
    }
}

function validarColumnasBID(rutaArchivo) {
    const rutaArchivoExcel = path.resolve(rutaArchivo);
    const workbook = xlsx.readFile(rutaArchivoExcel);
    const nombrePrimeraHoja = workbook.SheetNames[0];
    const hoja = workbook.Sheets[nombrePrimeraHoja];
    const encabezadosRequeridos = [
        "CELULAR",
        "MENSAJE"
    ];
    const encabezadosObtenidos = Object.keys(hoja)
        .filter(key => key.endsWith('1'))
        .map(key => hoja[key].v);

    const encabezadosValidos = encabezadosRequeridos.every(encabezado => encabezadosObtenidos.includes(encabezado));
    if (encabezadosValidos) {
        console.log('Los encabezados son válidos.');
        return true;
    } else {
        console.log('Los encabezados no son válidos.');
        return false;
    }
}

function cantidadRegistros(rutaArchivo) {
  // Ruta completa del archivo Excel
  const rutaArchivoExcel = path.resolve(rutaArchivo);
  // Carga el archivo Excel
  const workbook = xlsx.readFile(rutaArchivoExcel);
  // Obtiene el nombre de la primera hoja
  const nombrePrimeraHoja = workbook.SheetNames[0];
  // Obtiene la primera hoja del libro
  const primeraHoja = workbook.Sheets[nombrePrimeraHoja];
  // Convierte la hoja a formato JSON
  const registros = xlsx.utils.sheet_to_json(primeraHoja);
  // Cuenta el número de registros
  const cantidadRegistros = registros.length;
  return cantidadRegistros;
}

function modificarExcel(scriptPath, insertId, Carpeta) {
    return new Promise((resolve, reject) => {
        const procesoPython = spawn('python', ['-u', path.resolve('src/python/ConvertExcel.py'), scriptPath, insertId, Carpeta]);

        procesoPython.stdout.on("data", (datos) => {
            console.log(`stdout: ${datos}`);
        });

        procesoPython.stderr.on("data", (error) => {
            console.error("Error en el script de Python:", error.toString());
            reject(false);
        });

        procesoPython.on("close", (codigo) => {
            if (codigo === 0) {
                console.log(`Proceso de Python finalizado con código de salida ${codigo}`);
                resolve(true);
            } else {
                console.log(`Proceso de Python finalizado con código de salida ${codigo}`);
                reject(false);
            }
        });
    });
}

function cargarExcelTts(scriptPath, nombreProceso, usuarioInfobip, flujo, proceso, insertId) {
    console.log(scriptPath)
    console.log(nombreProceso)
    console.log(usuarioInfobip)
    console.log(flujo)
    console.log(proceso)
    console.log(insertId)
    const url = 'http://localhost:5540/ejecutar-python-TTS';
    const data = {
        scriptPath: scriptPath,
        nombreProceso: nombreProceso,
        usuarioInfobip: usuarioInfobip,
        flujo: flujo,
        proceso: proceso,
        insertId: insertId.toString()
    };

    axios.post(url, data)
        .then(response => {
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes realizar las acciones necesarias con la respuesta del servidor
        })
        .catch(async error => {
            console.error('Error en la solicitud:', error);
                // Aquí puedes manejar el error de la solicitud
            try {                
                const update = "UPDATE tbl_status SET STA_CESTADO = 'Server' WHERE PKSTA_NCODIGO = " + insertId + ";";
                await pool.query(update);
            } catch (error) {
                console.error('Error al ejecutar la consulta de actualización:', error);
                // Manejar el error de la consulta de actualización
            }
        });
}

function cargarExcelBid(scriptPath, nombreProceso, usuarioInfobip, flujo, proceso, insertId, fechaSeguimiento) {
    console.log(scriptPath)
    console.log(nombreProceso)
    console.log(usuarioInfobip)
    console.log(flujo)
    console.log(proceso)
    console.log(insertId)
    console.log(fechaSeguimiento)
    const url = 'http://localhost:5540/ejecutar-python-BID';
    const data = {
        scriptPath: scriptPath,
        nombreProceso: nombreProceso,
        usuarioInfobip: usuarioInfobip,
        flujo: flujo,
        proceso: proceso,
        insertId: insertId.toString(),
        fechaSeguimiento: fechaSeguimiento !== null &&
        fechaSeguimiento !== undefined &&
        fechaSeguimiento !== ""
        ? fechaSeguimiento
        : "N/A"
    };

    axios.post(url, data)
        .then(response => {
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes realizar las acciones necesarias con la respuesta del servidor
        })
        .catch(async error => {
            console.error('Error en la solicitud:', error);
                // Aquí puedes manejar el error de la solicitud
            try {                
                const update = "UPDATE tbl_status SET STA_CESTADO = 'Server' WHERE PKSTA_NCODIGO = " + insertId + ";";
                await pool.query(update);
            } catch (error) {
                console.error('Error al ejecutar la consulta de actualización:', error);
                // Manejar el error de la consulta de actualización
            }
        });
}

module.exports = router;
