## DecisionRules Simple Rule Orchestrator Example

### How it works
This simple example shows how to call dozens or even hundreds of rules in parallel.
Example is written in NodeJs.

### How to make it work
Requirements: Install Nodejs from https://nodejs.org/en/download/

1. Clone from GitHub
2. Move to "custom-orchestrator-example"
3. Run `npm install`
4. Insert Solver API Key to `config.json` file
5. Insert list of rules to `config.json` file
6. Run application in console using `npm run dev`
7. Call app on http://localhost:8080 with dummy request: `curl -X POST http://localhost:8080/api/solve  -H "Accept: application/json" -d '{}'`

#### Example config.json file

    {  
      "apiKey": "YOUR_API_KEY",  
      "solverApiUrl": "https://api.decisionrules.io/rule/solve/",  
      "rules": [  
        {  
          "ruleId": "1df309db-d6b6-310f-d172-968aca074a92",  
      "ruleVersion": 1  
      },  
      {  
          "ruleId": "968aca074a92-d6b6-310f-d172-968aca074a92",  
      "ruleVersion": "latest"  
      }  
      ]  
    }
