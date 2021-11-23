import axios from 'axios';
import {RuleMetadata, RuleRequest, RuleResponse} from "../models/ruleRequest";
const config = require('../config.json');

export class RuleService {
    constructor(private apiKey: string) {
    }

    async solveRule(ruleMetadata: RuleMetadata, ruleRequest: RuleRequest): Promise<RuleResponse> {
        try {
            let url;
            if (!ruleMetadata.ruleVersion || ruleMetadata.ruleVersion === 'latest') {   // Call Latest version OR explicit version
                url = `${config.solverApiUrl}${ruleMetadata.ruleId}`;
            } else {
                url = `${config.solverApiUrl}${ruleMetadata.ruleId}/${ruleMetadata.ruleVersion}`;
            }

            console.log('Api Key', this.apiKey)
            console.log('Url', url);

            const response = await axios.post(url, JSON.stringify(ruleRequest),{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            return response?.data;
        } catch (exp) {
            console.log('Exception:', exp?.response?.data)
            throw(exp);
        }
    }
}

