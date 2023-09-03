 create database dbp_bot_claro;

-- -- alter table xxxxxx AUTO_INCREMENT=0;
 use dbp_bot_claro;
                        

-- Crear Base de Datos
create table tbl_rcontratacion(
  PKUSU_NCODIGO int not null auto_increment primary key, 
  USU_CFECHA_INGRESO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CEMPRESA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CMOTIVO_EVENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPLANTILLA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CNOMBRES varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CAPELLIDOS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CTRATO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CFECHA_NACIMIENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPAIS_NACIMIENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CDEPARTAMENTO_NACIMIENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCIUDAD_NACIMIENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CNOMBRE_USUARIO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPAIS_EXPEDICION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CTIPO_DOCUMENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CNUMERO_DOCUMENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CES_PRIMARIO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CFECHA_EXPEDICION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CDEPARTAMENTO_EXPEDICION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CGENERO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CESTADO_CIVIL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CNACIONALIDAD varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CLENGUA_NATIVA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCONFIGURACION_REGIONAL_PREDETERMINADA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CMODO_DESPLAZAMIENTO_CASA_TRABAJO_CASA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPAIS_REGION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CTIPO_DIRECCION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_PAIS_REGION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CDEPARTAMENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCIUDAD varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CESTRATO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CTIPO_VIVIENDA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPOSICION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CFECHA_INICIAL_POSICION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_EMPRESA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CDIRECCION_COMITE varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CDIRECCION_AREA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CGERENCIA_DIRECCION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CUBICACION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCENTRO_COSTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPAIS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CID_JEFE_INMEDIATO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CNIVEL_REMUNERACION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCODIGO_CARGO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CREGULAR_TEMPORAL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CESTADO_OCUPACION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CTIEMPO_COMPLETO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CAREA_PERSONAL varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CGRUPO_PERSONAL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPERFIL_TIEMPOS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CFECHA_FIN_PERIODO_PRUEBA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CAPLICA_RED_MAESTRA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CTIPO_OPERACION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCANAL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CSUBCANAL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CGV_REGION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCOMISION_SIN_COMISION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_DEPARTAMENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CIUDAD varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCLASIFICACION_BONO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CNIVEL_CARGO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CEPS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CAFP varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CARL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCAJA_COMPENSACION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCESANTIAS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CREGION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CAREA_NOMINA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CES_NUEVO_PERFIL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CES_ELEGIBLE_BENEFICIOS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPERTENECE_SINDICATO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CFIJO_VARIABLE varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPACTO_COLECTIVO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CINTEGRALES_SIN_FIRMA_PACTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CESTA_FLEXIBILIZADO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CTIPO_PLAN_BENEFICIOS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CPLAN_BENEFICIOS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CTIPO_SALARIO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCOMPENSACION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCONCEPTO_PAGO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CVALOR varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CMONEDA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CFRECUENCIA varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CESTADO varchar( 100) DEFAULT NULL    
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- create database dbp_bot_tuya;

create table tbl_rClaroUsers(
  PKUSU_NCODIGO int not null auto_increment primary key, 
  SS_URL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  SS_USER varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  SS_PASSWORD varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  SS_FECHA_REGISTRO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  SS_FECHA_MODIFICACION TIMESTAMP CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  USU_CESTADO varchar( 100) DEFAULT NULL,    
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -- alter table xxxxxx AUTO_INCREMENT=0;

-- use dbp_bot_tuya;

-- Tabla Administracion de Usuarios
create table tbl_rusuarios(
  PKUSU_NCODIGO int not null auto_increment primary key,    
  USU_CDOCUMENTO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CNOMBRES_APELLIDOS varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CUSUARIO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CROL varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CCARGO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CRESPONSABLE_GESTION varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  USU_CFECHA_REGISTRO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  USU_CFECHA_MODIFICACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  USU_CESTADO varchar( 100) DEFAULT NULL    
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


create table tbl_status(
  PKSTA_NCODIGO int not null auto_increment primary key,    
  STA_CEMPLEADO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  STA_CARCHIVO_CARGADO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  STA_CFECHA_REGISTRO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  STA_CESTADO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `tbl_rlog_detalle` (
  `PKLOG_NCODIGO` int NOT NULL AUTO_INCREMENT,
  `LOG_ERROR_LOG` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LOG_NAME_BOT` varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `LOG_CFECHA_REGISTRO` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `LOG_CFECHA_MODIFICACION` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `LOG_CDETALLE_REGISTRO` varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Registro inicial Bot',
  `LOG_CESTADO` varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'InActivo',
  PRIMARY KEY (`PKLOG_NCODIGO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tbl_rinfobip_users` (
  `PKINF_NCODIGO` int NOT NULL AUTO_INCREMENT,
  `INF_CNOMBRE_USER` varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `INF_CUSUARIO` varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `INF_CCONTRASEÑA` varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `INF_CRESPONSABLE` varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `INF_CCARGO` varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `INF_CFECHA_REGISTRO` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `INF_CFECHA_MODIFICACION` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `INF_CESTADO` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`PKINF_NCODIGO`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

create table tbl_rflujos(
  PKFLU_NCODIGO int not null auto_increment primary key,    
  FKFLU_NINF_NCODIGO int not null,
  FLU_CNOMBRE_FLUJO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  FLU_CFECHA_REGISTRO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  FLU_CFECHA_MODIFICACION TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  FLU_CRESPONSABLE varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  FLU_CCARGO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  FLU_CESTADO varchar( 100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `tbl_rflujos` VALUES (1,4,'MORA MEDIA','2023-05-20 23:52:05','2023-05-21 04:40:57','ROGER.RODRIGUEZ','Administrador','InActivo'),(2,4,'MORA TEMPRANA','2023-05-20 23:52:05','2023-05-21 04:40:57','ROGER.RODRIGUEZ','Administrador','InActivo'),(3,5,'MORA MEDIA','2023-05-20 23:52:05','2023-05-21 04:40:57','ROGER.RODRIGUEZ','Administrador','Activo'),(4,5,'MORA TEMPRANA','2023-05-20 23:52:05','2023-05-21 04:40:57','ROGER.RODRIGUEZ','Administrador','Activo');

INSERT INTO `tbl_rinfobip_users` VALUES (1,'Gerencia','Gerencia_Medellin','Ger-med*2020','ROGER.RODRIGUEZ','Administrador','2023-05-20 18:19:15','2023-05-23 20:20:50','Inactivo'),(2,'Gerencia_02','Gerencia_Medellin_02','C0ntacto20**','ROGER.RODRIGUEZ','Administrador','2023-05-20 18:19:16','2023-05-23 20:20:50','Inactivo'),(3,'Gerencia_06','Gerencia_Medellin_06','Contacto@2019','ROGER.RODRIGUEZ','Administrador','2023-05-20 18:19:16','2023-05-23 20:20:50','Inactivo'),(4,'Gerencia_07','Gerencia_Medellin_07','C0ntacto@2020','ROGER.RODRIGUEZ','Administrador','2023-05-20 18:19:16','2023-05-23 20:20:50','Inactivo'),(5,'Gerencia_09','Gerencia_Medellin_09','Contacto@2019','ROGER.RODRIGUEZ','Administrador','2023-05-20 18:19:16','2023-05-20 18:19:16','Activo');
