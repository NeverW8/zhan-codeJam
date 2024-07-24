from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

ideas_prompt = "Give me 10 unique and exciting coding project ideas that are fun, different, and a bit exotic. Each idea should be creative and avoid being mundane or conventional. Make sure no two ideas are the same."
# ideas_prompt = "give me a list of ten words"


def get_ideas():
    ideas = client.chat.completions.create(
        messages=[{"role": "user", "content": ideas_prompt}],
        model="gpt-3.5-turbo"
    )
    return ideas.choices[0].message.content
