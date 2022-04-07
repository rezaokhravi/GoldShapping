import {config} from "./index";
import path from 'path';

export const ormConfig={
    type: 'mssql',
    name: 'default',
    //port:Number(config.env.dbPort)||1433,
    host: config.env.dbServer||'',
    username: config.env.dbUser || '',
    password: config.env.dbPassword || '',
    database: config.env.dbName || '',
    synchronize: true,
    maxQueryExecutionTime:180000,
    logging: true,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    entities: [
        'entity/**/*.js',
        'src/entity/**/*.ts',
    ],
    migrations: [
        'migration/**/*.js',
        'src/migration/**/*.ts',
    ],
    subscribers: [
        'subscriber/**/*.js',
        'src/subscriber/**/*.ts',
    ]
}


export const  sqlConfig = {
    user: config.env.dbUser || '',
    password: config.env.dbPassword || '',
    server:config.env.dbServer||'',   // don't add tcp & port number
    database: config.env.dbName || '',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

