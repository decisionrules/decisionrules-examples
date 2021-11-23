import express from "express";
import {OrchestratorController} from "./controllers/orchestrator.controller";
import bodyParser from "body-parser";


export var app: express.Application = express();
app.use(bodyParser.json())
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`# Custom Orchestrator is listening on the port ${port}`);
});


const controller: OrchestratorController = new OrchestratorController();
controller.initRouter();
app.use(controller.path, controller.router);










