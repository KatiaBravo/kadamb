from flask import Flask, request
from dotenv import load_dotenv
import openai
import os

load_dotenv()

openai_key = os.environ['OPENAI_KEY']
openai.api_key = openai_key

app = Flask(__name__)



def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]

async def converter(mathml):

  prompt = f"""
  convert the following text in mathml format to a LateX format. your output should
  only be latex. be sure you are displaying the same thing and only converting the format
  ```{mathml}```
  """
  response = get_completion(prompt)
  return response

def separate_steps(latex):
  return str(latex.replace("\n", '').split("\\"))

def compare(student,right):
  prompt = f"""

  Your task is to compare the student's solution with the answer key, both of which are delimited by triple backticks in LaTeX format.
  we want the professor to identify the unmathcing parts with so that they can quickly identify the correct sections without grading the entire paper.

    Follow these steps to modify the student's answers:

  1. Break down the student's solution into individual steps and expressions.
  2. For each step in the student's solution, check if it also exists in the answer key.
  3. If a step in the student's solution is exactly the same as any step in the answer key, leave it as is.
  4. If a step in the student's solution does not exist in the answer key or is slightly different, make that expression bold to flag it. meaning check for coefficient, powers, signs, power, and don't forget limits  and other math symbols. if any of these mathematical symbols are different, that expression should be bold.

  Repeat this process for each of the steps in the student's solution to identify all the missing or wrong ones ones. list all the mathematical differnces.

  based on the differences found, double check the modified version of student solution, and output the modified latex of the student. also output the mathematical difference you found not the formatting error however.

  Answer Key Response:
  ```{right}```

  Student Response:
  ```{student}```
  """
  response = get_completion(prompt)

  return response

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.post("/convert")
async def convertMathMlToLatex():
    body = request.get_json()
    mathml = body["mathml"]
    data = {}
    latex = await converter(mathml)
    data['latex'] = latex.replace("\n", "")
    return data


@app.post("/compare")
async def compareCorrectLatexWithStudets(): 
    body = request.get_json()
    correctLatex = body["correctLatex"]
    studentLatex = body["studentLatex"]
    steps = separate_steps(correctLatex)
    return compare(correctLatex, steps)

if __name__ == '__main__':
    app.run()
