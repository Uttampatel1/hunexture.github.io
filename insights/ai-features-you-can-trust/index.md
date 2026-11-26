# How we ship AI features you can trust: evals, guardrails and human review

> AI can be wrong. This is how we test it, limit it and keep people in the loop before it talks to your customers.

Canonical URL: https://hunexture.com/insights/ai-features-you-can-trust/

By Team Hunexture. AI Quality. Published 26 November 2026. 5 minute read. Examples are illustrative, not client results.

## AI makes mistakes. Plan for it.

An AI feature can sound sure and still be wrong. It can make up a price, misread a question, or answer something it should not. This is normal behaviour for these models, not a rare bug.

So the job is not to find a perfect model. The job is to build a system around it that catches mistakes before they reach your customer. We use three tools: evals, guardrails and human review.

## Evals: a test set before launch

An eval is a list of real questions with the answers we expect. We run the AI against the list and check how often it gets them right. Think of it as an exam.

We build the list with you, from your real chats, forms or documents. We include hard cases and tricky ones, not only easy ones.

- We run the exam before launch and again after every change.
- If a change makes results worse, we do not ship it.
- We keep the list growing as new cases appear.

## Guardrails: clear limits

Guardrails are rules around the AI. They decide what it may do and what it must refuse.

For example, a support assistant for a shop could be limited to answer only from the shop's own product and policy pages. If the answer is not there, it says so and offers a person.

- Answer only from approved sources.
- Refuse topics outside the job, such as medical or legal advice.
- Never share private customer data.
- Check outputs for format and risky content before sending.
- Limit actions, like refunds, to small safe steps.

## Human review: a person for the risky parts

Some decisions should not be left to AI alone. We decide with you which ones. Usually these are money, contracts, complaints and anything that is hard to undo.

In those cases the AI prepares a draft and a person approves it. Over time, as the numbers show the AI is reliable on a task, we can reduce review for that task. Not before.

## Watching it after launch

Launch is the start. Real customers ask things nobody planned for. We keep logs, with privacy in mind, and review a sample regularly.

We also set up a simple way to flag a bad answer, and a fallback to a person. If something goes wrong, the system should fail safely, not quietly.

- Track wrong answers and hand-offs to people.
- Review a sample each week at first.
- Update the test list from real mistakes.
- Have a switch to turn the feature off fast.

## Be honest about limits

We will not promise 100 percent accuracy. No one honest can. We will tell you what the AI is good at, where it struggles, and what we do about it.

If a task needs certainty, such as exact calculations, we use normal software for that part and let AI handle the language part.

## A small example

Take a support assistant for an online shop. A customer asks, "Is this available in blue, and when will it reach Pune?"

Without limits, the AI may guess. With our setup, it looks up stock and delivery rules from the shop's own data. If it cannot find a clear answer, it says so and hands the chat to a person. Evals check this exact kind of question before launch, and review checks a sample after.

The customer gets a fast answer or a fast hand-off. Either is better than a confident wrong reply.

## Questions to ask any AI vendor

Whoever builds your AI feature, including us, should be able to answer these in plain words.

- How do you test it before launch, and can I see the results?
- What is it not allowed to do?
- When does a person step in?
- Where does my customer data go, and who can see it?
- How do I switch it off if something goes wrong?

## What we'd do

We would pick one narrow task and build the test list with you first. Then add limits and a review step for anything risky. We launch to a small group, watch the results, and widen only when the numbers hold up.

You see the test results at each step, in plain language, so the decision to go further is yours.
