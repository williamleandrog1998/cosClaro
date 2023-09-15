
const insertInfo = require('../routes/tuya/routProcesos')

async function validateData(req) {
    try {
        const expectedKeys = [
            'empresa', 'motivodelevento', 'plantilla', 'nombres',
            'apellidos', 'trato', 'fechadenacimiento', 'paisdenacimiento',
            'departamentodenacimiento', 'ciudaddenacimiento', 'nombredeusuario',
            'paisdeexpedicion', 'tipodedocumento', 'numerodedocumento', 'esprimario',
            'fechadeexpedicion', 'departamentodeexpedicion', 'ciudaddeexpedicion', 'genero', 'estadocivil',
            'nacionalidad', 'lenguanativa', 'configuracionregionalpredeterminada',
            'mododedesplazamientocasatrabajocasa', 'pais/region', 'tipodecorreo', 'correo', 'esprimario_1', 'tipodetelefono', 'numerodetelefono', 'tipodedireccion',
            'pais/region_1', 'departamento', 'ciudad', 'estrato', 'tipodevivienda', 'contactodeemergencia', 'parentesco', 'movil',
            'nombresdelfamiliar', 'apellidosdelfamiliar', 'parentescodelfamiliar', 'viveconusted',
            'dependedeusted', 'estudiaactualmente', 'estadodediscapacidad', 'generodelfamiliar',
            'fechadenacimientodelfamiliar', 'posicion', 'fechainicialdeposicion', 'empresa_1', 'direccioncomite',
            'direccionarea', 'gerencia/direccion', 'ubicacion', 'centrodecosto',
            'pais', 'idjefeinmediato', 'nivelderemuneracion', 'codigocargo',
            'regular/temporal', 'estadodeocupacion', 'tiempocompleto', 'grupodepersonal',
            'areadepersonal', 'perfildetiempos', 'fechafinperiododeprueba',
            'aplicaredmaestra', 'tipodeoperacion', 'canal', 'subcanal', 'gv-region',
            'comision/sincomision', 'departamento_1', 'ciudad_1', 'clasificacionbono',
            'niveldelcargo', 'tipodeposicion', 'eps', 'afp', 'arl', 'cajadecompensacion', 'cesantias', 'tipodecontrato',
            'region', 'esnuevoperfil', 'areadenomina', 'eseligibleparabeneficios',
            'perteneceasindicato', 'fijo/variable', 'pactocolectivo',
            'integralessinfirmapacto', 'estaflexibilizado', 'tipoplanbeneficios',
            'plandebeneficios', 'tiposalario', 'compensacion', 'conceptodepago',
            'valor', 'moneda', 'tipoderelacion', 'nombrerelacion', 'frecuencia'
        ];

        function normalizeString(str) { //2
                return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remover tildes
                .replace(/[^\w\s]/gi, '') // Remover caracteres especiales
                .toLowerCase() // Convertir a minúsculas
                .replace(/\s+/g, ''); // Remover espacio
        }

        const jsonData = req.map(obj => //1
            Object.fromEntries(Object.entries(obj).map(([key, value]) => [normalizeString(key), value]))
        );


        if (!Array.isArray(jsonData)) {//3
            return {
                isValid: false,
                missingKeys: expectedKeys
            };
        }

        const invalidObjects = [];

        for (let i = 0; i < jsonData.length; i++) {//4
            const actualKeys = Object.keys(jsonData[i]);
            const normalizedActualKeys = actualKeys.map(normalizeString);
            var missingKeys = expectedKeys.filter(key => !normalizedActualKeys.includes(normalizeString(key)));

            if (missingKeys.length > 0) {
                invalidObjects.push({
                    index: i,
                    missingKeys: missingKeys
                });
            }
        } 

        if (invalidObjects.length > 0) {

            return {
                isValid: false,
                invalidObjects: invalidObjects,
            };
        }
    
        return {
            isValid: true,
            data: jsonData
        };
    } catch (error) {
        throw error;
    }
}

// Uso de la función
// const isValid = await validateData(req);
// console.log(isValid); // Mostrará true si todos los objetos en el arreglo tienen las claves esperadas, false si no

async function prepareData(req){

    try{
               
        const dataToInsert = {
            // USU_CFECHA_INGRESO: req['fechadeingreso'],
            USU_CEMPRESA: req.empresa,
            USU_CMOTIVO_EVENTO: req['motivodelevento'],
            USU_CPLANTILLA: req.plantilla, 
            USU_CNOMBRES: req.nombres, 
            USU_CAPELLIDOS: req.apellidos, 
            USU_CTRATO: req.trato, 
            USU_CFECHA_NACIMIENTO: req['fechadenacimiento'], 
            USU_CPAIS_NACIMIENTO: req['paisdenacimiento'],
            USU_CDEPARTAMENTO_NACIMIENTO: req['departamentodenacimiento'], 
            USU_CCIUDAD_NACIMIENTO: req['ciudaddenacimiento'],
            USU_CNOMBRE_USUARIO: req['nombredeusuario'], 
            USU_CPAIS_EXPEDICION: req['paisdeexpedicion'], 
            USU_CTIPO_DOCUMENTO: req['tipodedocumento'], 
            USU_CNUMERO_DOCUMENTO: req['numerodedocumento'], 
            USU_CES_PRIMARIO: req['esprimario'], 
            USU_CFECHA_EXPEDICION: req['fechadeexpedicion'], 
            USU_CDEPARTAMENTO_EXPEDICION: req['departamentodeexpedicion'], 
            USU_CCIUDAD_EXPEDICION: req['ciudaddeexpedicion'], 
            USU_CGENERO: req['genero'],  
            USU_CESTADO_CIVIL: req['estadocivil'],  
            USU_CNACIONALIDAD: req.nacionalidad,  
            USU_CLENGUA_NATIVA: req['lenguanativa'],  
            USU_CCONFIGURACION_REGIONAL_PREDETERMINADA: req['configuracionregionalpredeterminada'],  
            USU_CMODO_DESPLAZAMIENTO_CASA_TRABAJO_CASA: req['mododedesplazamientocasatrabajocasa'],
            USU_CPAIS_REGION: req['paisregion'],  
            USU_CTIPO_CORREO: req['tipodecorreo'],  
            USU_CCORREO: req['correo'],  
            USU_ES_PRIMARIO: req['esprimario_1'],
            USU_CTIPO_TELEFONO: req['tipodetelefono'],
            USU_CNUMERO_TELEFONO: req['numerodetelefono'],
            USU_CTIPO_DIRECCION: req['tipodedireccion'],  
            USU_PAIS_REGION: req['paisregion_1'],
            USU_CDEPARTAMENTO: req.departamento,  
            USU_CCIUDAD: req.ciudad,  
            USU_CESTRATO: req.estrato,  
            USU_CTIPO_VIVIENDA: req['tipodevivienda'], 
            USU_CCONTACTO_EMERGENCIA: req['contactodeemergencia'],
            USU_CPARENTESCO_EMERGENCIA: req['parentesco'],
            USU_CMOVIL_EMERGENCIA: req['movil'],
            USU_CNOMBRES_FAMILIAR: req['nombresdelfamiliar'],
            USU_CAPELLIDOS_FAMILIAR: req['apellidosdelfamiliar'],
            USU_CPARENTESCO_FAMILIAR: req['parentescodelfamiliar'],
            USU_CVIVE_USTED_FAMILIAR: req['viveconusted'],
            USU_CDEPENDE_USTED_FAMILIAR: req['dependedeusted'],
            USU_CESTUDIA_FAMILIAR: req['estudiaactualmente'],
            USU_CDISCAPACIDAD_FAMILIAR: req['estadodediscapacidad'],
            USU_CLUGAR_EMISION: req['lugardeemision'],
            USU_CAUTORIDAD_EMISORA: req['autoridademisora'],
            USU_CFECHA_CADUCIDAD: req['fechadecaducidad'],
            USU_CGENERO_FAMILIAR: req['generodelfamiliar'],
            USU_CFECHA_NACIMIENTO_FAMILIAR: req['fechadenacimientodelfamiliar'],
            USU_CPOSICION: req['posicion'],  
            USU_CFECHA_INICIAL_POSICION:  req['fechainicialdeposicion'],   
            USU_EMPRESA: req.empresa,  
            USU_CDIRECCION_COMITE: req['direccioncomite'],   
            USU_CDIRECCION_AREA: req['direccionarea'], 
            USU_CGERENCIA_DIRECCION: req['gerenciadireccion'],   
            USU_CUBICACION: req['ubicacion'], 
            USU_CCENTRO_COSTO: req['centrodecosto'],   
            USU_CPAIS: req['pais'],  
            USU_CID_JEFE_INMEDIATO: req['idjefeinmediato'],  
            USU_CNIVEL_REMUNERACION: req['nivelderemuneracion'],  
            USU_CCODIGO_CARGO: req['codigocargo'],   
            USU_CREGULAR_TEMPORAL: req['regulartemporal'],   
            USU_CESTADO_OCUPACION: req['estadodeocupacion'],   
            USU_CTIEMPO_COMPLETO: req['tiempocompleto'],   
            USU_CGRUPO_PERSONAL: req['grupodepersonal'],
            USU_CAREA_PERSONAL: req['areadepersonal'],  
            USU_CPERFIL_TIEMPOS: req['perfildetiempos'],    
            USU_CFECHA_FIN_PERIODO_PRUEBA: req['fechafinperiododeprueba'],  
            USU_CAPLICA_RED_MAESTRA: req['aplicaredmaestra'],  
            USU_CTIPO_OPERACION: req['tipodeoperacion'],  
            USU_CCANAL: req.canal,  
            USU_CSUBCANAL: req.subcanal,  
            USU_CGV_REGION: req['gvregion'],  
            USU_CCOMISION_SIN_COMISION: req['comisionsincomision'],  
            USU_DEPARTAMENTO: req.departamento,  
            USU_CIUDAD: req.ciudad, 
            USU_CCLASIFICACION_BONO: req['clasificacionbono'],  
            USU_CNIVEL_CARGO: req['niveldelcargo'],  
            USU_CTIPO_POSICION: req['tipodeposicion'],
            USU_CEPS: req['eps'],  
            USU_CAFP: req['afp'],  
            USU_CARL: req['arl'],  
            USU_CCAJA_COMPENSACION: req['cajadecompensacion'],  
            USU_CCESANTIAS: req['cesantias'], 
            USU_CTIPO_CONTRATO: req['tipodecontrato'], 
            USU_CREGION: req['region'],  
            USU_CES_NUEVO_PERFIL: req['esnuevoperfil'],
            USU_CAREA_NOMINA: req['areadenomina'],  
            USU_CES_ELEGIBLE_BENEFICIOS: req['eseligibleparabeneficios'],  
            USU_CPERTENECE_SINDICATO: req['perteneceasindicato'],  
            USU_CFIJO_VARIABLE: req['fijovariable'],  
            USU_CPACTO_COLECTIVO: req['pactocolectivo'],  
            USU_CINTEGRALES_SIN_FIRMA_PACTO: req['integralessinfirmapacto'],  
            USU_CESTA_FLEXIBILIZADO: req['estaflexibilizado'],  
            USU_CTIPO_PLAN_BENEFICIOS: req['tipoplanbeneficios'],  
            USU_CPLAN_BENEFICIOS: req['plandebeneficios'],  
            USU_CTIPO_SALARIO: req['tiposalario'],
            USU_CCOMPENSACION: req['compensacion'],  
            USU_CCONCEPTO_PAGO: req['conceptodepago'],  
            USU_CVALOR: req.valor,  
            USU_CMONEDA: req.moneda, 
            USU_CTIPO_RELACION: req['tipoderelacion'],
            USU_CNOMBRE_RELACION: req['nombrerelacion'], 
            USU_CFRECUENCIA: req.frecuencia,  
            USU_CESTADO: "NO_INICIADO" 
        }

        return dataToInsert;
        
    }catch(err){
        throw err
    }
}
module.exports= {
    prepareData,
    validateData
}
