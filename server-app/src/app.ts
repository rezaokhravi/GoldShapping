import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from "express-fileupload";
import {config} from './config';
import {routes} from "./routes";
import path from 'path';
import {createConnection} from 'typeorm'
import {ormConfig} from "./config/db";
import {checkToken, decryptData} from "./utilites";


// @ts-ignore
const connection = createConnection(ormConfig);

connection
    .then(async () => {
        let app = express();

        app.use(bodyParser.urlencoded({extended: true}));
        app.use(fileUpload({
            limits: {fileSize: 50 * 1024 * 1024},
        }));
        app.use(bodyParser.json());
        app.use(express.static(process.cwd() + "/client-app"));
        app.use(config.cors);
        app.use(checkToken);
        app.use('/api', routes);


        app.get('/', (req, res) => {
            res.sendFile("index.html")
        });

        app.get("/*", function (req, res, next) {
            next("Could not find page");
        });

        app.listen(config.env.port, () => {
            console.log(`Server Listening at http://${config.env.host}:${config.env.port}`)
        });
    })
    .catch(error => console.log('Uh-oh 😿', error));
