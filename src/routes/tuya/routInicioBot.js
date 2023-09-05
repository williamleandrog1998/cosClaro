const router = require("express").Router();
const pool = require('../../database');
const { isLoggedIn } = require("../../lib/auth");
const { exec } = require('child_process');
const { spawn } = require("child_process");
const axios = require('axios');


router.post("/inicioBot", async (req, res) => {
    try {
        const pythonScript = './src/python/botStart.py';
        exec(`python ${pythonScript}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el archivo Python: ${error}`);
            return res.status(200).json({ message: 'final' });
                    }
        console.log(`Salida del archivo Python botStart.py: ${stdout}`);
        });
    } catch (error) {
        res.render('401');
    }
});
module.exports = router;