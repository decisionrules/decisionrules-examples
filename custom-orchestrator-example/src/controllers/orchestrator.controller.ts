import express, {RequestHandler} from "express";
import {RuleService} from "../services/rule.service";
import {RuleMetadata} from "../models/ruleRequest";
import * as config from '../config.json'

export class OrchestratorController {
    public path = '/api';
    public router = express.Router();
    private ruleService: RuleService = new RuleService(config.apiKey);


    initRouter(): void {
        this.router.post("/solve", this.solveRule);
    }
    solveRule: RequestHandler = async (req, res, next: express.NextFunction) => {
        try {
            const rules = <RuleMetadata[]>config.rules;

            console.log('Solving ', + rules.length + ' rules');
            let responses = [];
            let promises: Array<Promise<any>> = []
            for (let i = 0; i < rules.length ; i++ ) {
                promises.push(this.ruleService.solveRule(rules[i], req.body));
            }

            // Splits all requests to chunks and tries to solve chunk at once

            let i,j, temporary, chunk = 30;
            for (i = 0,j = promises.length; i < j; i += chunk) {
                temporary = promises.slice(i, i + chunk);
                console.log('Processing chunk', i);
                responses.push(await Promise.all(temporary));
            }

            console.log('All responses:', responses);
            res.send(responses).status(200);
        } catch (exp) {
            console.log(exp);

        }
    }
}
