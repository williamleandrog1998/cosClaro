const router = require("express").Router();
const pool = require('../../database');
const { isLoggedIn } = require("../../lib/auth");
const { exec } = require('child_process');
const { spawn } = require("child_process");
const axios = require('axios');


// En el enrutador de Express
router.post("/inicioBot", async (req, res) => {
    try {
        const responseData = {
            message: 'Éxito', // Puedes personalizar este mensaje
        };
        res.status(200).json(responseData);

        const pythonScript = './src/python/botStart.py';
        exec(`python ${pythonScript}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar el archivo Python: ${error}`);
                return res.status(200).json({ message: 'final' });
            }
        });

    } catch (error) {
        res.status(401).json({ message: 'Error interno del servidor' });
    }
});
router.post("/bottonBot", async (req, res) => {
    try {
        const encolados = await pool.query('SELECT * FROM tbl_rcontratacion WHERE USU_CESTADO = "NO_INICIADO"');
        const botStatus = await pool.query('SELECT * FROM tbl_rbot_status')
        const responseData = {
            encolados: encolados.length,
            botStatus: botStatus[0].BOT_STATUS
        };
        res.status(200).json(responseData);
    } catch (error) {
        res.status(401).json({ message: 'Error interno del servidor' });
    }
});


module.exports = router;