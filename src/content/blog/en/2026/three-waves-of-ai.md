---
title: "Of Three Waves, and One Resume"
pubDatetime: 2026-06-07
description: "From browser-bound chatbots to autonomous agents updating your LinkedIn — a personal look at the AI revolution through our daily routines."
tags: ["AI", "Agents", "Vibe Coding", "Tech"]
lang: "en"
translationKey: "three-waves-of-ai"
draft: false
---

A lot of friends have been asking me lately: *"But what's the actual difference? What does it matter if I'm using Gemini, ChatGPT, Claude Code, or even OpenClaw like Shaul Amsterdamski talks about? Why is everyone losing their minds over this lately? It's just a chat interface returning text..."*

My go-to answer avoids the dry technical jargon. Instead, I prefer to look at it through the [evolution of capabilities](https://www.cloudflare.com/learning/ai/evolution-of-ai/) and how we actually interact with the machine on a daily basis. As of today, this story breaks down into three distinct waves.

### The First Wave: It All Started with a Tweet (Browser Chatbots)

The first wave is the internet chatbots. Gemini, ChatGPT, and the rest of the tools we've learned to love (and develop a slightly alarming dependency on) in our daily lives. It all started for most of us back in late 2022. Sam Altman published a [simple tweet on X](https://x.com/sama/status/1598038815599661056) inviting the public to try out ChatGPT.

That system crossed 100 million users in just two months. The adoption rate of this technology into daily life is the fastest in human history. For comparison, the World Wide Web took about 7 years to reach 50 million users, and mobile phones like the iPhone took close to 3 years—and we are talking about a dizzying acceleration, which only amplifies as developing nations gain widespread access, driving up usage—and consequently, the pace of production and development.

These chatbots became our "everything":
* Quick lookups instead of exhausting Google searches and scrolling through old forums.
* Comparing prices or looking up places to hang out.
* Your late-night relationship advisor: *"What should I text her next?"* paired with screenshots from three hours ago.

We consume them in two primary ways: via their official web apps or through dedicated apps on our phones and desktops. This wave gave us, as humans, our first real taste of what's coming. But it has one major limitation: it cannot leave the boundaries of the specific conversation.

Sure, companies are pushing more integrations into external services (like fetching data from your email or generating images), but the model won't act unless you actively prompt it. It cannot perform "unexpected" actions on our machine. This layer simulates "memory" (sometimes Gemini will remind me of a topic I researched months ago), but it remains entirely passive.

### The Second Wave (and Wave 2.5): From Code Autocomplete to "Vibe Coding"

The second wave—which I sometimes call Wave 2.5, because it is still actively hitting us right now—started as code autocomplete software around 2021-2023. The premise was simple: if an AI can predict the next word in a sentence using statistical probability, you can apply that exact same logic to writing code, and train the model how to do it right.

It started with tools like GitHub Copilot (and later, focused solutions from Amazon and Google). These were assistive tools where the code was still the center of gravity of the interface. They helped us avoid writing boilerplate code from scratch, debugged a closing bracket on line 2,000, or tracked down a specific variable. It accelerated developer velocity incredibly, but it didn't trickle down to the general public just yet.

The real leap arrived with wave 2.5, currently epitomized by tools like Anthropic’s Claude Code and Codex, and what changed the paradigm for many (including myself).

This is where we reached a beautifully simple yet deeply complex principle: *"[Just talk to it](https://steipete.me/posts/just-talk-to-it)"*. Describe your idea, drop in a few reference screenshots, explain your intent as you go—and boom, you have a functional output.

> These are applications we download directly onto our machines. We decide what permission levels to grant them—ranging from letting them run freely across all our local files, to the existential dread of them accidentally wiping the OS.

This is the wave where the concept of "Vibe Coding" took off. The code itself is no longer the center of gravity (the chat UI is at the center, not the text file of the code). The primary skill here is your ability to communicate your ideas and intentions clearly and coherently, leaving the software to handle the execution. Understanding broad systems architecture becomes highly valuable; understanding every single line of code? Not so much. This is the true democratization of development.

Unlike the first wave, the AI’s capabilities here go far beyond the chat window: files and folders are written, edited, and moved autonomously. Models have gained native computer control (Computer Use) and browser interaction via extensions (showing your friends how Codex logs into the browser and puts on a Netflix series for you is an experience in itself). Add to this protocols like MCP (Model Context Protocol), plugins, and skills, and you get a weekly feature release cycle that’s nearly impossible to keep up with. Recently, session-linking to phones was introduced: as long as my computer at home is running, I can keep controlling it, generating code, and working on features right from the bus, between meetings, or during a random "shower thought."

### The Third Wave: Autonomous Agents (Closing the Loop)

And then we arrived at the third wave—Agents.

While marketing teams love to slap the "AI Agent" label on everything from the previous waves, only this current stage genuinely justifies the title. The two biggest open-source heavyweights right now are **[OpenClaw](https://github.com/openclaw/openclaw)** (which showed the world what semi-conscious software looks and feels like) and **[Hermes Agent](https://github.com/nousresearch/hermes-agent)** (its biggest competitor, which in my opinion surpasses it in many capabilities and architectural design). Together, these two projects command nearly 600,000 stars on GitHub, are used by millions, and being open-source means anyone can pull them down, tweak them, and build on top of them.

What sets this category apart is the blurring of lines between the digital realm and our physical reality. In all previous stages, the interaction ended at our active consumption—we asked, it answered, and it stopped there.

The real fun begins when you spin up your "partner" for the first time. The most critical file in this setup is professionally known as **[`soul` (soul)](https://soul.md/)**—a configuration file where we define the agent’s character, behavior, and specific personality traits. From there, we configure an API key, link it to our everyday messaging apps (like WhatsApp or Telegram), and as long as the machine is on—the agent is there. Available, listening, and ready.

These agents are "closing the loop":
* If I talk to Hermes about how important it is for me to work out in the evenings, it will proactively check in later to see if I actually did it, and suggest an updated workout plan.
* Did I receive my weekly shift schedule as a screenshot? I just forward it to its WhatsApp, and it autonomously updates my Google Calendar with the correct days and times.
* Want to add it to a group chat with friends just to mess around? It jumps right in and understands the inside jokes (though, be careful with that!).

A true agent operates proactively; it initiates, remembers, and acts. It’s a consistent personal assistant—an ongoing, evolving chat with a partner that knows and can execute almost anything. This wave is revolutionary, and we are only scraping the surface of its potential, but organizations are already integrating these capabilities to [drive productivity to insane levels](https://www.kan.org.il/content/kan/podcasts/p-8127/1024104/). Looking at this alongside the rapid evolution of physical robotics, it's clear we are at the absolute beginning of a fascinating era.

### A Small Example to Wrap Up - How it works in practice

Recently, I decided it was time to overhaul my resume. Anyone who has gone through this knows it’s a tedious nightmare: you need to update LinkedIn, review similar industry profiles, tweak phrasing—pure busywork.

Instead of doing it manually, I had a conversation about it with Codex. We researched together which points to highlight, what to write, and what to omit. Once the analysis phase was done, I gave it access to my browser. It simply took the wheel: it logged in, edited, and updated my entire LinkedIn profile from end to end. Then, it moved over to my local resume file and rebuilt it from scratch—in both Hebrew and English. The entire process, end to end, took less than an hour.

Seeing how well it worked, I created a [new dedicated open-source Skill](https://github.com/omribz156/vault/tree/main/skills/career/career-profile-overhaul), so anyone else can take this exact workflow and use it for themselves.

I hope this overview brings some clarity to where we currently stand in this fast-moving world (for now). See you in the next post!
