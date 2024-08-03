
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.key);


const responseSchemaSteps ={
 
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the root element or milestone."
      },
      "details": {
        "type": "string",
        "description": "Details or description of the node."
      },
      "links": {
        "type": "array",
        "description": "List of links to learning resources related to this node.",
        "items": {
          "type": "string",
          "description": "URL of the learning resource."
        }
      },
      "children": {
        "type": "array",
        "description": "List of child elements, which can be milestones, tasks, or subtasks.",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the milestone, task, or subtask."
            },
            "details": {
              "type": "string",
              "description": "Details or description of the task or subtask."
            },
            "links": {
              "type": "array",
              "description": "List of links to learning resources related to this node.",
              "items": {
                "type": "string",
                "description": "URL of the learning resource."
              }
            },
            "children": {
              "type": "array",
              "description": "List of child elements for tasks and milestones, which can be subtasks or tasks.",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the child element (task or subtask)."
                  },
                  "details": {
                    "type": "string",
                    "description": "Details or description of the child task or subtask."
                  },
                  "links": {
                    "type": "array",
                    "description": "List of links to learning resources related to this node.",
                    "items": {
                      "type": "string",
                      "description": "URL of the learning resource."
                    }
                  }
                },
                "required": ["name"]
              }
            }
          },
          "required": ["name"]
        }
      }
    },
    "required": ["name", "children"]
  };
  

let model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
 
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema:responseSchemaSteps,
  }
});
let request = 0;

let oldprompt =null
let  treeData
app.post('/api/tree-data', async (req, res) => {
    try {
      const { frontendinput } = req.body;
  
      if (!frontendinput) {
        return res.status(400).json({ error: "Missing 'frontendinput' in request body" });
      }
  
      const prompt = `give me all the steps required to ${frontendinput} `;
    
      
        
      if ( (oldprompt !== prompt || request==0) && request < 3) {
        let result = await model.generateContent(prompt);
          treeData = result.response.text();
        console.log("treeData: " + treeData);
        request++;
        oldprompt = prompt;
      }
      
      console.log({oldprompt,prompt,request})
      if (request === 3) {
        console.log("all request used");
      }
  
      res.json(JSON.parse(treeData));
      console.log("tree data sent");
  
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
