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
def compare(student,right):
  prompt = f"""
  your job is to compare the students solution and the correct answer that are
  delimited by triple backsticks.

  your output should the modified version of the students solution which follows the steps below
  you should also give a total percentage of similarity

  you should follow this steps:

  1. find the total number of steps in the correct answer.
  2. for each of the steps in the correct answer, see if the expression exist in the student's solutions
  3. if that expression to good extent, let's say 90% same, similiar to the correct answer, make the that part of student's solutions bold
  4. the total percentage of similarity should be calculated by

  student response:```{mathml}```
  correct response:```{right}```
  """
  response = get_completion(prompt)
  return

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.post("/convert")
async def convert():
    body = request.get_json()
    mathml = body["mathml"]
    data = {}
    data['latex'] = await converter(mathml)
    print(data)
    return data


# @app.route("/compare")
# def compare():
#     return "<p>Hello, World!</p>"

if __name__ == '__main__':
    app.run()
