import openai
import os

# Run this command to set the API key in the terminal:
# export OPENAI_API_KEY='your-api-key-here'
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_unique_coding_ideas(prompt, num_ideas=50):
    unique_ideas = set()
    while len(unique_ideas) < num_ideas:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=100,
            n=1,
            stop=None,
            temperature=0.7,
        )
        ideas = response.choices[0].text.strip().split("\n")
        for idea in ideas:
            unique_ideas.add(idea.strip())
        # Remove empty strings if any
        unique_ideas.discard("")
    return list(unique_ideas)[:num_ideas]


prompt = "Give me a random coding idea for an evening project that hasn't been mentioned before."
coding_ideas = get_unique_coding_ideas(prompt)

print("50 Unique Coding Ideas for an Evening:")
for i, idea in enumerate(coding_ideas, 1):
    print(f"{i}. {idea}")
