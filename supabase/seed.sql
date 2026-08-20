-- ============================================================
-- Nyaama — seed content
-- Idempotent: safe to re-run after editing copy.
--
-- Software Engineering is the demo path and gets full module coverage.
-- The other four paths ship with a complete roadmap, one authored module
-- and a real project brief — enough that a learner recommended into them
-- lands somewhere real, not a dead end.
-- ============================================================

-- ------------------------------------------------------------
-- CAREER PATHS
-- ------------------------------------------------------------

insert into public.career_paths (id, name, tagline, description, icon, sort, skills, stages) values

('software_engineering', 'Software Engineering',
 'Build the things people use every day.',
 'Software engineers turn ideas into working products — websites, apps and tools that solve real problems. The work is changing rather than disappearing: the next decade belongs to developers who build AI-powered applications, connect systems through APIs, and spend more of their time understanding a business problem than typing every line by hand.',
 'code', 1,
 array['HTML','CSS','JavaScript','Problem solving','Responsive design','Git','APIs','AI-assisted development',
       'Analytical thinking','Learning how to learn','Communication','Creative thinking','Systems thinking',
       'Emotional intelligence','Entrepreneurship','Personal branding','Leadership','Financial literacy','Domain expertise'],
 $json$[
  {"n":1,"title":"Foundations","summary":"Understand how computers, the internet and software actually work before you write a line of code — and how to break a problem down far enough to solve it.","skills":["How the web works","Problem solving","Analytical thinking","Learning how to learn"],"effort":"6–8 hours","moduleIds":["se-how-web-works","se-core-analytical","se-core-learning"]},
  {"n":2,"title":"Web Fundamentals","summary":"HTML and CSS — the two languages every website in the world is built from — plus the ability to explain what you built to someone who did not watch you build it.","skills":["HTML","CSS","Responsive design","Communication","Creative thinking"],"effort":"12–14 hours","moduleIds":["se-html-basics","se-css-basics","se-core-communication","se-core-creative"]},
  {"n":3,"title":"Programming","summary":"JavaScript: making pages think, respond and remember. And learning to see the wider system your code sits inside.","skills":["Variables","Functions","Logic","APIs","Systems thinking","Emotional intelligence"],"effort":"16–19 hours","moduleIds":["se-javascript-basics","se-what-is-an-api","se-core-systems","se-core-emotional"]},
  {"n":4,"title":"Build with AI","summary":"Put it together into complete applications — including ones powered by AI models you call rather than build.","skills":["Projects","Debugging","AI-assisted development","Entrepreneurship","Personal branding"],"effort":"20–26 hours","moduleIds":["se-your-first-build","se-ai-powered-apps","se-core-entrepreneurship","se-core-branding"]},
  {"n":5,"title":"Real-World Work","summary":"Build for actual businesses and organisations. This is what turns skill into evidence — and evidence into income.","skills":["Requirements","Client work","Leadership","Financial literacy","Domain expertise"],"effort":"Ongoing","moduleIds":["se-core-leadership","se-core-money","se-core-domain"]}
 ]$json$::jsonb),

('artificial_intelligence', 'Artificial Intelligence',
 'Teach machines to solve problems with you.',
 'AI is about building systems that learn from data and assist people. It rewards curiosity and patience with maths, and it is changing what a small team can build.',
 'brain-circuit', 2,
 array['Python','Data handling','Maths foundations','Prompt engineering','APIs','Model evaluation',
       'Analytical thinking','Learning how to learn','Communication','Creative thinking','Systems thinking',
       'Emotional intelligence','Entrepreneurship','Personal branding','Leadership','Financial literacy','Domain expertise'],
 $json$[
  {"n":1,"title":"Foundations","summary":"What AI actually is, what it is not, and where it genuinely helps — plus how to think clearly about a problem before reaching for a model.","skills":["AI literacy","Problem framing","Analytical thinking","Learning how to learn"],"effort":"6–8 hours","moduleIds":["ai-what-is-ai","ai-core-analytical","ai-core-learning"]},
  {"n":2,"title":"Programming with Python","summary":"Python is the language most AI is built in. Start here — and learn to explain what your code does to someone who does not code.","skills":["Python","Logic","Data types","Communication","Creative thinking"],"effort":"14–17 hours","moduleIds":["ai-core-communication","ai-core-creative"]},
  {"n":3,"title":"Working with Data","summary":"Loading, cleaning and understanding data before any model touches it — and seeing the system that produced it.","skills":["Data cleaning","Analysis","Systems thinking","Emotional intelligence"],"effort":"12–15 hours","moduleIds":["ai-core-systems","ai-core-emotional"]},
  {"n":4,"title":"Build with AI","summary":"Use existing models through APIs to build something genuinely useful — and something people can actually find.","skills":["APIs","Prompt engineering","Product thinking","Entrepreneurship","Personal branding"],"effort":"14–18 hours","moduleIds":["ai-core-entrepreneurship","ai-core-branding"]},
  {"n":5,"title":"Real-World Work","summary":"Solve a real problem for a real organisation using AI.","skills":["Evaluation","Ethics","Leadership","Financial literacy","Domain expertise"],"effort":"Ongoing","moduleIds":["ai-core-leadership","ai-core-money","ai-core-domain"]}
 ]$json$::jsonb),

('data_analytics', 'Data Analytics',
 'Find the story hidden in the numbers.',
 'Analysts turn raw data into decisions. Every business, clinic, NGO and ministry collects data; very few can yet explain what it means.',
 'bar-chart-3', 3,
 array['Excel','SQL','Data cleaning','Visualisation','Statistics','Reporting',
       'Analytical thinking','Learning how to learn','Communication','Creative thinking','Systems thinking',
       'Emotional intelligence','Entrepreneurship','Personal branding','Leadership','Financial literacy','Domain expertise'],
 $json$[
  {"n":1,"title":"Foundations","summary":"What data analysis is, the questions worth asking of data, and how to turn a vague request into one you can actually answer.","skills":["Data literacy","Asking good questions","Analytical thinking","Learning how to learn"],"effort":"6–8 hours","moduleIds":["da-what-is-analysis","da-core-analytical","da-core-learning"]},
  {"n":2,"title":"Spreadsheets","summary":"Excel and Google Sheets properly — still the most-used analysis tool on earth — and presenting what they tell you.","skills":["Formulas","Pivot tables","Charts","Communication","Creative thinking"],"effort":"12–14 hours","moduleIds":["da-core-communication","da-core-creative"]},
  {"n":3,"title":"SQL","summary":"Ask questions of real databases, and understand the system that produced the rows you are querying.","skills":["SELECT","Joins","Aggregation","Systems thinking","Emotional intelligence"],"effort":"14–17 hours","moduleIds":["da-core-systems","da-core-emotional"]},
  {"n":4,"title":"Visualisation","summary":"Show findings so a decision-maker acts on them — and so people know whose work it was.","skills":["Charts","Dashboards","Storytelling","Entrepreneurship","Personal branding"],"effort":"12–15 hours","moduleIds":["da-core-entrepreneurship","da-core-branding"]},
  {"n":5,"title":"Real-World Work","summary":"Analyse a genuine local dataset and present what you found.","skills":["Reporting","Presentation","Leadership","Financial literacy","Domain expertise"],"effort":"Ongoing","moduleIds":["da-core-leadership","da-core-money","da-core-domain"]}
 ]$json$::jsonb),

('cybersecurity', 'Cybersecurity',
 'Protect the systems people depend on.',
 'Security professionals find weaknesses before attackers do. As more Gambian services move online, the people who can secure them become essential.',
 'shield-check', 4,
 array['Networking','Linux','Threat awareness','Security tools','Incident response',
       'Analytical thinking','Learning how to learn','Communication','Creative thinking','Systems thinking',
       'Emotional intelligence','Entrepreneurship','Personal branding','Leadership','Financial literacy','Domain expertise'],
 $json$[
  {"n":1,"title":"Foundations","summary":"How attacks actually happen, why most of them are not sophisticated, and how to reason your way through a problem under pressure.","skills":["Security literacy","Threat awareness","Analytical thinking","Learning how to learn"],"effort":"6–8 hours","moduleIds":["cy-security-basics","cy-core-analytical","cy-core-learning"]},
  {"n":2,"title":"Networking","summary":"How data moves, because you cannot defend what you cannot picture — and how to write up what you find so someone acts on it.","skills":["TCP/IP","DNS","Ports","Communication","Creative thinking"],"effort":"14–16 hours","moduleIds":["cy-core-communication","cy-core-creative"]},
  {"n":3,"title":"Systems & Linux","summary":"Operating systems, permissions and the command line — and the people who use them, who are the real attack surface.","skills":["Linux","Permissions","Systems thinking","Emotional intelligence"],"effort":"16–19 hours","moduleIds":["cy-core-systems","cy-core-emotional"]},
  {"n":4,"title":"Defence & Testing","summary":"Find weaknesses safely and legally, and fix them. Then make sure the right people know you can.","skills":["Vulnerability basics","Hardening","Entrepreneurship","Personal branding"],"effort":"19–24 hours","moduleIds":["cy-core-entrepreneurship","cy-core-branding"]},
  {"n":5,"title":"Real-World Work","summary":"Assess and improve the security of a real system, with permission.","skills":["Reporting","Ethics","Leadership","Financial literacy","Domain expertise"],"effort":"Ongoing","moduleIds":["cy-core-leadership","cy-core-money","cy-core-domain"]}
 ]$json$::jsonb),

('graphic_design', 'Graphic Design',
 'Make ideas people can see and trust.',
 'Designers shape how a business looks and feels. It is one of the fastest paths from skill to income in The Gambia, because every business needs an identity.',
 'palette', 5,
 array['Typography','Colour','Layout','Brand identity','Design tools','Client work',
       'Analytical thinking','Learning how to learn','Communication','Creative thinking','Systems thinking',
       'Emotional intelligence','Entrepreneurship','Personal branding','Leadership','Financial literacy','Domain expertise'],
 $json$[
  {"n":1,"title":"Foundations","summary":"The principles behind every good design — hierarchy, contrast, space — and how to take a brief apart before you open a design tool.","skills":["Design principles","Visual hierarchy","Analytical thinking","Learning how to learn"],"effort":"6–8 hours","moduleIds":["gd-design-foundations","gd-core-analytical","gd-core-learning"]},
  {"n":2,"title":"Typography & Colour","summary":"The two decisions that make work look professional or amateur — and how to explain them when a client disagrees.","skills":["Typography","Colour theory","Communication","Creative thinking"],"effort":"12–14 hours","moduleIds":["gd-core-communication","gd-core-creative"]},
  {"n":3,"title":"Tools","summary":"Figma and the craft of actually producing the work, inside the system it will be used in.","skills":["Figma","Layout","Systems thinking","Emotional intelligence"],"effort":"14–17 hours","moduleIds":["gd-core-systems","gd-core-emotional"]},
  {"n":4,"title":"Brand Identity","summary":"Build a complete identity — logo, colours, type, application — and a body of work people can find.","skills":["Branding","Logo design","Entrepreneurship","Personal branding"],"effort":"16–20 hours","moduleIds":["gd-core-entrepreneurship","gd-core-branding"]},
  {"n":5,"title":"Real-World Work","summary":"Design for a real business and see your work in use.","skills":["Client work","Briefs","Leadership","Financial literacy","Domain expertise"],"effort":"Ongoing","moduleIds":["gd-core-leadership","gd-core-money","gd-core-domain"]}
 ]$json$::jsonb)

on conflict (id) do update set
  name = excluded.name, tagline = excluded.tagline,
  description = excluded.description, icon = excluded.icon,
  sort = excluded.sort, skills = excluded.skills, stages = excluded.stages;

-- ------------------------------------------------------------
-- LEARNING MODULES
-- ------------------------------------------------------------

insert into public.learning_modules
  (id, path_id, stage, title, summary, body, simple_body, practice, skills, minutes, sort) values

('se-how-web-works', 'software_engineering', 1,
 'How the web actually works',
 'Before you build for the web, understand what happens when someone opens a website.',
 $md$When you type a website address into your phone and press go, a conversation happens in under a second.

Your phone asks a **server** — a computer somewhere in the world that never sleeps — for a page. The server answers by sending back files. Your browser reads those files and draws what you see.

That is the whole thing. Three parts:

**The client** is your phone or laptop. It asks for things and displays them.

**The server** is the computer that holds the website and answers requests.

**The request and response** is the conversation between them.

When you build a website, you are writing the files that the server will send back. When you become a software engineer, you learn to control both sides of that conversation.

Everything else — every framework, every tool you will ever hear about — is a way of making these three parts easier to work with.$md$,
 $md$Imagine sending someone a message asking for a photo, and they send it back.

Your phone is the one asking. A computer far away, called a server, is the one answering. It sends back files, and your browser turns those files into the page you see.

That is all a website is. You ask. A computer answers. Your browser draws the answer.

When you build a website, you are making the files that get sent back.$md$,
 'Open any website you use often. Right-click and choose "View Page Source" (or "View Source"). What you are looking at is exactly what the server sent back. You do not need to understand it yet — just see that it is only text.',
 array['How the web works','Problem solving'], 8, 1),

('se-html-basics', 'software_engineering', 2,
 'What is HTML?',
 'HTML is how you tell a browser what things are. Every website you have ever used is built on it.',
 $md$HTML is not a programming language. It does not make decisions or do maths. HTML does one job: it labels content so the browser knows what each piece **is**.

A heading is a heading. A paragraph is a paragraph. A button is a button.

You label things using **tags**, which come in pairs:

```html
<h1>Nyaama</h1>
<p>Find your way.</p>
```

`<h1>` opens a top-level heading and `</h1>` closes it. Everything between them is the heading. The `<p>` pair does the same for a paragraph.

A simple page looks like this:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Fatou's Kitchen</h1>
    <p>Traditional Gambian food in Serrekunda.</p>
    <a href="tel:+2201234567">Call us</a>
  </body>
</html>
```

That is a real, working website. Save it as `index.html`, open it in a browser, and it works.

Notice there is no styling here — no colours, no fonts, no layout. That is deliberate. HTML says *what things are*. CSS, which comes next, says *what they look like*. Keeping those two jobs separate is one of the oldest and best ideas in web development.

**Why labelling matters beyond appearance:** a screen reader used by a blind learner announces `<h1>` as a heading and skips between them. A search engine reads your tags to understand the page. Using the right tag is not decoration — it is how your page becomes usable by everyone.$md$,
 $md$HTML is how you tell the browser what each part of your page is.

You wrap text in tags. A tag has an opening and a closing part:

`<h1>My title</h1>` means "this is a big title".
`<p>Some words.</p>` means "this is a paragraph".

The browser reads these labels and shows the title big and the paragraph normal.

HTML only says what things ARE. It does not say what colour they are — that is CSS, which you learn next.$md$,
 'Write a page for a business you know — a shop, a tailor, a restaurant near you. Use one `<h1>` for the name, one `<p>` describing what they do, and one `<a>` link with their phone number. Save it as index.html and open it in your browser.',
 array['HTML','Layout'], 12, 2),

('se-css-basics', 'software_engineering', 2,
 'What is CSS?',
 'CSS is how you decide what everything looks like — colour, size, spacing, layout.',
 $md$If HTML says *what things are*, CSS says *how they should look*.

You write CSS as a set of rules. Each rule picks something on the page and changes it:

```css
h1 {
  color: #F6C447;
  font-size: 48px;
}
```

That says: find every `<h1>`, make it yellow, make it 48 pixels tall.

A rule has two parts. The **selector** (`h1`) chooses what to style. The **declarations** inside the braces say what to change.

**Spacing is most of design.** Beginners reach for colour first, but the thing that makes a page look professional is usually space:

```css
p {
  margin-bottom: 16px;
  line-height: 1.6;
}
```

`margin` is space outside an element, pushing other things away. `padding` is space inside it, between its edge and its content. Confusing these two is the most common early mistake, and once it clicks, layout gets much easier.

**Making it work on phones.** Most people who visit your site will be on a phone. You handle that with a media query:

```css
@media (max-width: 640px) {
  h1 { font-size: 32px; }
}
```

That says: when the screen is narrower than 640 pixels, shrink the heading. Everything else stays as it was.$md$,
 $md$CSS decides how your page looks.

You pick something, then say what to change about it:

```
h1 {
  color: yellow;
  font-size: 48px;
}
```

This finds every big title and makes it yellow and large.

The most important thing in CSS is not colour — it is space. `margin` is space outside a box. `padding` is space inside it. Getting spacing right is what makes a page look good.$md$,
 'Take the page you built for the last module. Add a `<style>` section and give it a background colour, change the heading colour, and add space under the paragraph. Change one thing at a time and refresh to see what it did.',
 array['CSS','Layout','Responsive design'], 15, 3),

('se-javascript-basics', 'software_engineering', 3,
 'What is JavaScript?',
 'JavaScript is how a page thinks — responding, calculating and remembering.',
 $md$HTML is structure. CSS is appearance. **JavaScript is behaviour.**

It is the first real programming language you will learn here, which means it can make decisions.

**Variables** remember things:

```js
let name = "Fatou";
let ordersToday = 12;
```

**Functions** are instructions you can reuse:

```js
function greet(person) {
  return "Welcome back, " + person;
}

greet("Fatou");   // "Welcome back, Fatou"
```

**Conditions** make decisions:

```js
if (ordersToday > 10) {
  console.log("Busy day");
} else {
  console.log("Quiet day");
}
```

**Reacting to people** is where it becomes a website rather than an exercise:

```js
const button = document.querySelector("button");

button.addEventListener("click", function () {
  alert("Thank you for your order");
});
```

That last piece — listening for something a person does, then responding — is the foundation of every interactive application ever built. A button that opens a menu, a form that checks your email, a page that loads more posts as you scroll. All of it is this pattern.

**You will get errors.** Every engineer does, permanently. Open your browser's developer tools, look at the Console tab, and read the message. It usually tells you the line number and roughly what went wrong. Learning to read errors calmly is a bigger skill than memorising syntax.$md$,
 $md$JavaScript makes your page do things.

You store information in variables:
`let name = "Fatou";`

You write instructions you can reuse, called functions.

You make decisions with `if`:
`if (orders > 10) { ... }`

And you respond when someone clicks:
`button.addEventListener("click", ...)`

That last one is the important one. Someone does something, your code responds. Every app works this way.

You will see error messages often. That is normal. Open the Console in your browser and read what it says.$md$,
 'Add a button to your page. When someone clicks it, show a message. Then make it change the page text instead of showing an alert. If it breaks, open the Console and read the error before changing anything.',
 array['JavaScript','Variables','Functions','Logic'], 20, 4),

('se-what-is-an-api', 'software_engineering', 3,
 'What is an API?',
 'APIs are how programs talk to each other. Once this clicks, a lot of software stops being mysterious.',
 $md$An API is a way for one program to ask another program for something.

Think of a restaurant. You do not walk into the kitchen and cook. You tell the waiter what you want, the waiter takes it to the kitchen, and food comes back. You never see how the kitchen works — you just need to know how to order.

The **waiter is the API**. It is an agreed way of asking, so the kitchen can change completely without you having to learn anything new.

In code, it looks like this:

```js
const response = await fetch("https://api.weather.com/banjul");
const data = await response.json();

console.log(data.temperature);   // 31
```

Your program asked another program for the weather in Banjul. That program answered with data. You did not need to know how it measures temperature.

**Why this matters for what you build:** you do not have to build everything yourself. Payments, maps, sending messages, AI — all of these are other people's programs that you can ask. A small team in Serrekunda can build something serious because most of the hard parts are available through APIs.

Nyaama itself works this way. When your career coach asks you a question, this application sends your answers to an AI service through an API and gets a structured answer back.

**The shape of a request:** you send an address (the URL), a method (`GET` to fetch something, `POST` to send something), and sometimes a key that proves you are allowed to ask. You get back data — usually JSON, which is just text arranged in a structure both programs understand.$md$,
 $md$An API is how one program asks another program for something.

Think of ordering food. You tell the waiter what you want. The waiter goes to the kitchen. Food comes back. You never see the kitchen.

The waiter is the API.

In code:
`fetch("https://api.weather.com/banjul")`

Your program asked another program for the weather. It sent back the answer.

This means you do not have to build everything yourself. Maps, payments, AI — you can just ask other programs for them.$md$,
 'Open a free public API in your browser — try `https://api.github.com/users/octocat`. What comes back is JSON: a program''s answer, in text. Find the `name` and `location` fields. That is exactly what your code would receive.',
 array['APIs','JavaScript','Problem solving'], 15, 5),

('se-your-first-build', 'software_engineering', 4,
 'Putting it together',
 'How to go from separate skills to a finished thing someone can actually use.',
 $md$You now know enough to build something real. The gap between here and a finished project is not more knowledge — it is method.

**Start with the smallest version that works.** Not the site you imagine. One page, with the business name and a phone number. Get that working and open in a browser. Then add one thing. Then another.

This matters because a half-finished ambitious project teaches you far less than a finished simple one. Finishing is the skill.

**Work in this order:**

1. Write the content first, in plain text. What does the page need to say?
2. Mark it up with HTML. Structure only, no styling.
3. Style it with CSS. Spacing first, then colour.
4. Add behaviour with JavaScript, only where it genuinely helps.
5. Open it on your phone and fix what is broken.

**Save your work with Git.** Every time something works, commit it. That gives you a point you can return to when you break something later — and you will break something later. Every engineer does.

**Put it online.** A project on your laptop cannot be shown to anyone. Free hosting takes minutes and turns your work into a link you can send to a business, an employer, or a judge.

That link is the difference between "I am learning to code" and "here is something I built."$md$,
 $md$You know enough to build something now. What you need is a method.

Start with the smallest thing that works. One page. The business name and a phone number. Make it work, then add one more thing.

Finishing something small teaches you more than half-building something big.

Work in this order:
1. Write the words first
2. Add HTML structure
3. Add CSS styling
4. Add JavaScript only if needed
5. Check it on your phone

Save your work often with Git. Then put it online so you can send people the link.$md$,
 'Plan your restaurant project on paper before you write code. List every piece of information the page must show. That list is your checklist — you are done when every item is on the page and it looks right on your phone.',
 array['Projects','Debugging','Git','Responsive design'], 15, 6),
('se-ai-powered-apps', 'software_engineering', 4,
 'Building an app that uses AI',
 'You will not train a model. You will call one — and the hard part is everything around the call.',
 $md$Every list of the skills that will matter between now and 2035 puts the same thing near the top: developers who build **AI-powered applications**. Notice the wording. Not developers who build AI. Developers who build applications that **use** it.

That distinction is the whole lesson. Training a model needs a research team and a great deal of money. Calling one needs an internet connection and about fifteen lines of code. Almost all the value being created right now is in the second thing.

**An AI feature is just an API call.**

You already met APIs. An AI API is one more: you send text, you get text back.

```js
const res = await fetch("https://api.example.com/v1/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
  body: JSON.stringify({
    model: "small-fast-model",
    messages: [{ role: "user", content: "Summarise this in one sentence: " + text }],
  }),
});
const data = await res.json();
```

That is the easy part. It is also the part everyone stops at, which is why most AI demos fall apart the moment a real person touches them.

**The four things that make it an actual product.**

**The key stays on the server.** Your API key is a password that spends your money. If it appears anywhere in code the browser downloads, it is public, and someone will find it. AI calls belong on the server, always, with the key in an environment variable and never in the repository.

**It will be slow.** A model can take several seconds. Design for that: show a loading state, keep the button disabled while it works, and never leave a blank screen. On a Gambian mobile connection this matters more, not less.

**It will fail.** The service goes down, the request times out, the response comes back in a shape you did not expect. Every AI call needs an answer to "what does the user see when this fails?" — and that answer should almost never be an error message. Nyaama itself is built this way: every AI feature has a plain, written-in-advance fallback, so the app still works when the model does not.

**It will sometimes be wrong.** Models produce confident, fluent, incorrect text. Ask what happens when the output is wrong. If the answer is "someone takes bad medical advice", you need a human checking. If it is "a first-draft product description is a bit dull", you can ship it.

**The real skill is choosing the problem.**

Anyone can wire up a chatbot. The developers who become valuable are the ones who look at a business and see the specific, boring, repeated task that AI removes — retyping handwritten receipts, translating a notice into Wolof, turning ten voice notes into a summary — and build the small thing that removes it.

That is what "solving business problems rather than writing every line manually" actually means. The code gets easier every year. Knowing which code is worth writing does not.$md$,
 $md$You are not going to build an AI. You are going to use one that already exists.

Using it is easy. You send some text to an API. It sends text back. That is it — about fifteen lines of code.

The hard part is everything around it:

**Keep your key secret.** Your API key spends your money. Never put it in code the browser can see. Keep it on the server.

**It is slow.** It can take a few seconds. Show a loading message so people know it is working.

**It will fail sometimes.** The service goes down. Decide now what the user sees when that happens. Nyaama does this — every AI feature has a normal, written answer ready for when the AI does not work.

**It is sometimes wrong.** The AI sounds confident even when it is wrong. Ask yourself: if this answer is wrong, does someone get hurt? If yes, a person must check it.

The real skill is picking the right problem. Find one boring job someone does again and again, and use AI to remove it.$md$,
 'Pick one task a person near you repeats every week — copying receipt totals into a book, writing the same kind of customer reply, translating a notice. Write three sentences: what the task is, what you would send the AI, and what the user should see if the AI fails. Do not write code yet. Choosing well is the skill being practised.',
 array['APIs','AI-assisted development','Product thinking','Error handling'], 18, 7),

('ai-what-is-ai', 'artificial_intelligence', 1,
 'What is AI, really?',
 'Beyond the hype: what these systems do, what they cannot do, and where they genuinely help.',
 $md$Most software follows rules a person wrote. If the order is over 5000 dalasi, apply a discount. Someone decided that, and the computer obeys.

**AI works differently.** Instead of being given the rules, it is shown many examples and works out the patterns itself.

Show a system thousands of photos labelled "cassava leaf with disease" and "healthy cassava leaf", and it learns to tell them apart — including on a photo it has never seen. Nobody wrote a rule describing the disease. The pattern was learned.

**Large language models**, the kind behind tools you have used, learned patterns from an enormous amount of text. They are extremely good at predicting what text should come next, which turns out to be enough to summarise, translate, explain and write code.

**What they cannot do**, and this matters more than what they can:

They do not know whether something is true. They produce what is *likely*, and likely is often correct — but not always. A confident wrong answer looks exactly like a confident right one.

They do not understand the way you do. They have no experience of a Serrekunda market.

They inherit the biases of what they learned from.

**Where this leaves you.** The valuable skill is not "using AI" — it is knowing which problems suit it, and checking its output where being wrong would cost something. A doctor using AI to draft notes is using it well. A doctor letting it diagnose unchecked is not.

For a learner in The Gambia, the opportunity is specific: problems here have less existing software than problems in London or Lagos. Local knowledge plus AI tools is a genuinely strong position.$md$,
 $md$Normal software follows rules a person wrote.

AI is different. Instead of rules, you show it many examples and it finds the patterns itself.

Show it thousands of photos of sick and healthy plants, and it learns to tell them apart — even in photos it has never seen.

Important: AI does not know what is true. It gives you what is likely. That is often right, but not always, and a wrong answer looks just as confident as a right one.

So always check important answers. The skill is knowing when to trust it.$md$,
 'Ask an AI tool a question about somewhere you know well — your neighbourhood, a local business, a Gambian dish. Check the answer against what you know. Where was it right? Where was it confidently wrong? That gap is the thing to remember.',
 array['AI literacy','Problem framing'], 12, 1),

('da-what-is-analysis', 'data_analytics', 1,
 'What data analysis actually is',
 'Turning rows of numbers into a decision someone can act on.',
 $md$Data analysis is answering a question with evidence instead of opinion.

A shop owner thinks Saturdays are busiest. An analyst checks. Sometimes the answer confirms the hunch; often it does not, and that difference is worth money.

**The work is four steps.**

**Ask a real question.** "Look at the sales data" is not a question. "Which day should we order extra stock for?" is. A vague question produces a vague answer nobody uses.

**Clean the data.** This is most of the job — genuinely, most of it. Real data has dates written three different ways, missing entries, the same customer spelled two ways. Analysts spend more time here than anywhere else, and skipping it produces confident nonsense.

**Analyse.** Group it, count it, compare it. Often simple counting answers the question. Reach for complicated methods only when simple ones fall short.

**Communicate.** A finding nobody acts on is worthless. One clear sentence and one clear chart beat a spreadsheet with forty tabs.

**Why this matters here.** Clinics, schools, NGOs and ministries in The Gambia all collect data. Far fewer can yet say what it means. Someone who can take a messy spreadsheet and return a clear answer is immediately useful — and that person does not need a degree in statistics to start.$md$,
 $md$Data analysis means answering a question with evidence instead of guessing.

A shop owner thinks Saturday is busiest. You check the numbers and find out for sure.

Four steps:
1. Ask a clear question
2. Clean the data — this takes the most time
3. Count, group and compare
4. Explain what you found, simply

Most of the job is cleaning messy data. Real data always has mistakes, missing entries and things written in different ways.$md$,
 'Find any real list of numbers — your own phone expenses, sales from a family business, match scores. Write one question you want answered. Then answer it by counting. Notice how much time you spend tidying versus analysing.',
 array['Data literacy','Asking good questions'], 12, 1),

('cy-security-basics', 'cybersecurity', 1,
 'How attacks actually happen',
 'Most breaches are not sophisticated. Understanding why is the beginning of defending against them.',
 $md$Films show hackers typing furiously to break encryption. Real attacks are usually far more boring, and that is the useful part.

**Most successful attacks start with a person, not a computer.** Someone receives a message that looks like it is from their bank, their boss or their network provider. They enter their password. That is it. This is called **phishing**, and it remains the most common way organisations are breached anywhere in the world.

**The other common routes:**

**Reused passwords.** One website is breached, and the attacker tries that same email and password everywhere else. This works constantly because most people reuse passwords.

**Software that was never updated.** A weakness is found and publicly announced. A fix is released. Systems that never install it stay open — sometimes for years.

**Too much access.** Someone who only needs to read records can also delete them. When their account is compromised, the damage is far larger than it needed to be.

**What this tells you about the work.** Security is less about clever tricks and more about doing unglamorous things reliably: updating systems, limiting access, using different passwords, and helping people recognise a fake message.

**The rule that comes before every technique:** you may only test systems you own or have written permission to test. Not "probably fine". Written permission. Curiosity without permission is a crime in most countries, including The Gambia — and the professional community will not defend you. The same skill is a career or a conviction depending entirely on that one thing.$md$,
 $md$Real attacks are usually simple, not clever.

Most start with a person. Someone gets a fake message that looks real, types in their password, and the attacker is in. This is called phishing.

Other common ways:
- People reuse the same password everywhere
- Software is never updated, so known weaknesses stay open
- People have more access than they need

So security is mostly doing boring things well: update your systems, use different passwords, limit who can do what.

One rule above all: only test systems you own or have written permission to test. Without permission it is a crime.$md$,
 'Check your own accounts. Do any share a password? Visit haveibeenpwned.com and enter your email to see whether it has appeared in a known breach. This is defensive work on a system you own — exactly the right place to practise.',
 array['Security literacy','Threat awareness'], 12, 1),

('gd-design-foundations', 'graphic_design', 1,
 'Why some designs just work',
 'Hierarchy, contrast and space — the three principles behind almost every good design.',
 $md$Good design is not decoration. It is making something easy to understand at a glance.

**Hierarchy: what should they see first?**

Every design has an order of importance. A poster for a shop opening: the shop name matters most, the date next, the address after that. Show that order through size, weight and position, and someone gets the message in a second.

When everything is equally large and bold, nothing stands out — and the viewer has to work out the order themselves. Most amateur design has this problem.

**Contrast: is it clearly different?**

Contrast is what makes hierarchy visible. Big against small. Dark against light. Serif against sans-serif. If two things have different importance, make them *clearly* different — not slightly. Timid contrast reads as a mistake.

It is also an accessibility requirement: pale grey text on white excludes anyone with imperfect eyesight, which eventually includes everyone.

**Space: what can you remove?**

Beginners fill the page. Professionals leave room. Space around an element is what makes it feel important, and space between groups is what tells the eye which things belong together.

If a design feels cluttered, the fix is almost never a better font. It is less content and more space.

**How to practise.** Look at something designed well — a book cover, a good poster, an app you enjoy. Ask three questions: what did they want me to see first? What is clearly different from what? Where did they leave space? You will start seeing the decisions rather than just the result.$md$,
 $md$Good design makes things easy to understand quickly.

Three things do most of the work:

**Hierarchy** — decide what people should see first. Make it bigger. If everything is big, nothing stands out.

**Contrast** — make different things clearly different, not slightly different. Big against small, dark against light.

**Space** — leave empty room. Beginners fill the whole page. Space around something is what makes it look important.

If your design feels messy, the answer is usually less content and more space, not a different font.$md$,
 'Find a poster or flyer near you — a shop sign, a church notice, an advert. Ask: what did they want me to see first? Did it work? Redraw it on paper making the most important thing much larger and removing anything unnecessary.',
 array['Design principles','Visual hierarchy'], 12, 1)

on conflict (id) do update set
  path_id = excluded.path_id, stage = excluded.stage, title = excluded.title,
  summary = excluded.summary, body = excluded.body,
  simple_body = excluded.simple_body, practice = excluded.practice,
  skills = excluded.skills, minutes = excluded.minutes, sort = excluded.sort;

-- ------------------------------------------------------------
-- CORE SKILLS — cross-cutting
--
-- The Future Skills 2026–2035 research ranks eleven durable human skills
-- alongside the technical ones. They are deliberately not a sixth career
-- path: a learner who picked Cybersecurity should meet communication and
-- financial literacy inside cybersecurity, not be sent somewhere else for
-- them. "Five directions. One of them is yours" has to keep being true.
--
-- So each core lesson is authored once here and cross-joined onto all five
-- paths, producing a copy per path with its own id — se-core-communication,
-- da-core-communication, and so on. That keeps buildStages and
-- getModuleAccess untouched: a core lesson is an ordinary module of the
-- learner's own path, sitting in a real stage, locking and unlocking like
-- any other. One edit below changes the lesson everywhere.
--
-- Core lessons sort at 20+ so they always follow the path's own lessons
-- within a stage.
-- ------------------------------------------------------------

insert into public.learning_modules
  (id, path_id, stage, title, summary, body, simple_body, practice, skills, minutes, sort)
select p.prefix || '-' || c.slug, p.path_id, c.stage, c.title, c.summary,
       c.body, c.simple_body, c.practice, c.skills, c.minutes, c.sort
from (values
  ('se', 'software_engineering'),
  ('ai', 'artificial_intelligence'),
  ('da', 'data_analytics'),
  ('cy', 'cybersecurity'),
  ('gd', 'graphic_design')
) as p(prefix, path_id)
cross join (values

-- ---------- Stage 1 ----------

('core-analytical', 1,
 'Breaking a problem into pieces',
 'The single most-requested skill on earth, and the one nobody teaches directly.',
 $md$When employers are surveyed about what they need, analytical thinking comes first almost every year. Not a tool. Not a language. The ability to take something confusing and make it small enough to act on.

Most people, faced with a big problem, feel it as one solid block: *the shop is losing money*, *the website is broken*, *nobody comes to our events*. A block cannot be solved. It can only be worried about.

**Step one: write the problem as a question.**

"The shop is losing money" is a complaint. "Why did our profit fall between January and March?" is a question. Questions have answers; complaints do not.

**Step two: split it until the pieces are checkable.**

Profit falls for exactly two reasons: money coming in went down, or money going out went up. That is already two smaller questions. Money coming in splits again — fewer customers, or the same customers spending less. Keep splitting until you reach something you could actually go and check today.

You will usually find that a problem that felt enormous is four small questions, and that three of them are already answered.

**Step three: decide what evidence would change your mind.**

This is the step people skip, and it is the one that separates analysis from opinion. Before you look, say what you expect and what would prove you wrong. If nothing could prove you wrong, you are not analysing — you are defending an answer you already chose.

**Step four: check the cheapest thing first.**

Not the most interesting thing. The cheapest. If counting yesterday's customers takes ten minutes and analysing three months of receipts takes two days, count first. Very often the ten-minute check ends the investigation.

**Why this matters more now, not less.** AI will happily produce an answer to any question you type. It cannot tell you whether you asked the right one. The person who can frame the question, split it, and know what evidence would settle it, is the person directing the tool rather than being impressed by it.$md$,
 $md$Analytical thinking means taking a big confusing problem and cutting it into small pieces you can check.

Most people see a problem as one big lump: "the shop is losing money". A lump cannot be solved.

Do this instead:

1. Turn it into a question. Not "the shop is losing money" but "why did we make less money in March than in January?"
2. Cut the question into smaller ones. Money went down means either less money came in, or more money went out. That is already two smaller questions.
3. Keep cutting until each piece is something you can go and check today.
4. Check the cheapest and quickest thing first.

Also decide, before you look, what would prove you wrong. If nothing could prove you wrong, you are not thinking — you are just defending your first idea.

AI can answer any question you type. It cannot tell you if it was the right question. That part is your job.$md$,
 $md$Take a real problem near you — money, time, a group that stopped meeting, something that keeps going wrong at home or at work. Write it as one question. Then write the two smaller questions it splits into, and the two those split into. Stop when a piece is something you could go and check in ten minutes. Then go and check that one.$md$,
 array['Analytical thinking','Problem solving'], 14, 20),

('core-learning', 1,
 'How to learn something hard',
 'The only skill that keeps every other skill from expiring.',
 $md$Everything technical you learn on this path has a shelf life. Tools change, frameworks are replaced, whole job titles appear and disappear. The people who stay employable are not the ones who learned the right thing in 2026 — they are the ones who can learn the next thing in 2029 without being told how.

That is a skill in itself, and it is mostly about knowing which effort works.

**Recall beats re-reading.** Reading a page again feels productive because it feels easy. Closing the page and writing what you remember feels bad, because you discover how little stuck. The bad-feeling one is the one that works. Every time you pull something out of your memory, you make it easier to pull out next time.

**Spacing beats cramming.** Six hours in one day is worth far less than one hour on six days. Sleep is part of learning, not a pause in it.

**Confusion is the work, not a sign you are failing.** The moment something stops making sense is the moment you are at the edge of what you know. Most people retreat there and go back to material they have already mastered, because it feels better. Stay ten minutes longer.

**Learn it to use it.** Information you never apply fades. Information you used once to build something small stays. This is why every lesson here ends with a practice, and why the projects matter more than the lessons.

**Explain it to someone.** If you cannot say it in plain words to a person who does not know the subject, you do not know it yet. You know the words. That is not the same thing.

**A note on using AI to learn.** A model will explain anything at any level, instantly and patiently. That is genuinely one of the largest changes to learning in a generation, and you should use it. But be careful of the trap: reading a clear AI explanation produces the *feeling* of understanding without the effort that creates it. Use it to get unstuck, then close it and rebuild the explanation from memory in your own words. If you cannot, you did not learn it — you watched someone else know it.

**How to know it is working.** Not "this feels easy". The signals are: you can explain it without notes, you can use it on a problem you have not seen before, and you can say where it does *not* apply.$md$,
 $md$Everything you learn about tools will go out of date. The one skill that does not is being able to learn the next thing.

What actually works:

**Test yourself, do not re-read.** Reading again feels good but does very little. Close the book and write what you remember. It feels harder because it is doing more.

**Spread it out.** One hour on six days beats six hours in one day.

**Being confused is normal.** When something stops making sense, that is the exact place where learning happens. Stay there ten more minutes instead of going back to the easy part.

**Use it or lose it.** Build something small with it. That is why every lesson here has a practice.

**Explain it to someone.** If you cannot say it in simple words to someone who knows nothing about it, you do not know it yet.

**About AI:** it will explain anything to you, and you should use it. But reading a clear explanation feels like understanding without being understanding. After it explains, close it and say it again in your own words. If you cannot, you have not learned it.$md$,
 $md$Take the last lesson you finished. Without opening it, write down everything you remember on paper — five minutes, no looking. Then open it and mark what you missed. What you missed is what you actually need to study. Tomorrow, do the same five minutes again before starting anything new.$md$,
 array['Learning how to learn','Adaptability'], 14, 21),

-- ---------- Stage 2 ----------

('core-communication', 2,
 'Explaining your work so people act',
 'Skill that cannot be explained is invisible. This is the multiplier on everything else you learn.',
 $md$There are two people with the same ability. One can explain what they did and why it matters. The other cannot. Over ten years those two have completely different careers, and the difference had nothing to do with skill.

This is not about speaking beautiful English. It is about being understood by a specific person who is busy.

**Start with what they need to do, not what you did.**

The instinct is to tell the story in order: first I tried this, then that failed, then I found the real cause. That is the order you discovered it in, not the order they need it in. Lead with the conclusion and what you want from them. The story goes underneath, for whoever wants it.

Compare: "I looked through the sales records for three months and checked each supplier and found some things" against "We are losing D4,000 a month on one supplier. I would like approval to switch. Details below."

The second one gets a decision. The first one gets "OK, thanks."

**Write for one named person.**

Not "the client". Not "management". Picture one actual person and ask: what do they already know, what do they care about, what will they do with this? A message written for everybody is written for nobody.

**Cut the words that are protecting you.**

"I just wanted to quickly check whether it might possibly be worth considering..." is six words of fear before any content. Fear of taking up space. Say the thing: "Can we move Thursday's meeting to Friday?" Directness is not rudeness — it is respect for someone's time.

**Say what you do not know.**

Beginners hide uncertainty, thinking it makes them look weak. It does the opposite. "This will take two weeks, but if the data is messier than I expect it could be three — I will know by Friday" builds far more trust than false confidence, especially when Friday comes.

**Speaking is the same, with less time.**

Nobody remembers your third point. Decide before you open your mouth what the one sentence is that must survive. Say it first. Say it again at the end. Everything in between is support.

**And listening is half of it.** The most useful sentence in professional life is "so what I am hearing is — is that right?" It costs you eight seconds and catches the misunderstanding before it costs two weeks.$md$,
 $md$Two people can have the same skill. The one who can explain their work will do much better. This is not about perfect English. It is about being clear to one busy person.

**Say the conclusion first.** Do not tell the whole story in order. Start with what you found and what you want them to do. Put the details after.

Weak: "I checked the records for three months and found some things."
Strong: "We are losing D4,000 every month on one supplier. Can I switch? Details below."

**Write to one real person.** Think of an actual person. What do they already know? What do they care about?

**Cut the extra words.** "I just wanted to quickly ask if maybe..." — say the thing directly. Being direct is not rude. It respects their time.

**Say what you do not know.** "It will take two weeks, maybe three if the data is messy. I will know by Friday." People trust that more than false confidence.

**When speaking:** decide the one sentence that matters most. Say it first, and again at the end.

**Listen too.** Ask: "So what I am hearing is... is that right?" It takes eight seconds and stops big misunderstandings.$md$,
 $md$Find the last long message you sent — WhatsApp, email, anything. Rewrite it in three sentences: what you want, why, and what you need from them. Compare the two. Then, for your next real message, write the short version first and only add detail if it is genuinely needed.$md$,
 array['Communication','Writing','Presentation'], 15, 20),

('core-creative', 2,
 'Where good ideas actually come from',
 'AI can generate a thousand ideas in a second. Deciding which one matters is the human job.',
 $md$Creativity has a bad reputation as something you are born with. It is not. It is a set of habits, and the habits are learnable.

This matters more now than it did five years ago, for a specific reason. Generating options used to be the expensive part — coming up with fifty names for a business, twenty layouts, a hundred opening lines. A model does that in seconds now. What it cannot do is know which one is right for *this* business, *this* street, *this* person. Judgement became the scarce thing.

**Ideas are combinations, not visions.**

Almost nothing is invented from nothing. Mobile money is a phone plus a bank. A ride app is a taxi plus a map plus a payment. The reliable way to have ideas is to hold two things you know in mind at once and ask what happens if they meet.

Which means the quality of your ideas depends on how many different things you know about. This is an argument for curiosity outside your field — the developer who also understands farming will see software nobody else sees.

**Quantity first, judgement second — and never both at once.**

The most common mistake is judging an idea while producing it. That stops the flow before anything unusual arrives. Do twenty bad ideas fast, without evaluating. Then, separately, be ruthless.

The first five ideas anyone has are the obvious ones everybody has. The interesting ones start around number twelve, after the obvious has been used up.

**Constraints help. Removing them does not.**

"Design anything" produces nothing. "Design a shop sign, two colours, readable from across the road, costs under D500" produces work. When you are stuck, add a constraint rather than removing one.

**Find the problem, not the solution.**

The best creative work usually comes from noticing a problem other people had stopped noticing — the queue everyone accepts, the form everyone fills in twice. Walk somewhere familiar and look for what people have simply got used to. That is where the ideas are.

**Steal the structure, not the surface.** Copying how something looks makes an imitation. Working out *why* it works — the structure underneath — and applying that to your own problem is how everyone good actually learns.$md$,
 $md$Creativity is not something you are born with. It is a set of habits.

It matters more now because AI can produce a hundred ideas in seconds. What it cannot do is know which idea is right for this business, this street, this person. Choosing is the human job.

**Ideas are two things joined together.** Mobile money is a phone plus a bank. A taxi app is a taxi plus a map plus payment. So the more different things you know about, the more ideas you get.

**Make many ideas first, judge them after.** Never at the same time. Write twenty bad ideas quickly without stopping. Then choose. Your first five ideas are the ones everybody has. The good ones come later.

**Rules help.** "Design anything" gives you nothing. "Design a shop sign, two colours, readable from across the road, under D500" gives you work. When stuck, add a rule.

**Look for problems, not solutions.** Walk somewhere you know well. Look for the thing everyone has just got used to. That is where good ideas hide.

**Copy why, not what.** Do not copy how something looks. Work out why it works, then use that on your own problem.$md$,
 $md$Pick something people near you accept as normal but complain about — a queue, a form, a wait, a thing that always breaks. Write twenty ways it could be different. Do not stop to judge any of them, and do not stop before twenty. Then circle the three you would actually want to exist, and note what they have in common.$md$,
 array['Creative thinking','Innovation','Product thinking'], 14, 21),

-- ---------- Stage 3 ----------

('core-systems', 3,
 'Seeing how the whole thing connects',
 'Most fixes fail because they treat one part of a system that pushes back.',
 $md$Most people, given a problem, look at the part that is visibly broken. Systems thinking is the habit of looking at what that part is connected to — and it is the difference between a fix that holds and one that quietly creates the next problem.

**The parts are rarely the problem. The connections are.**

A clinic has long queues. The obvious fix is to hire another nurse. But the queue may exist because records are on paper and each patient's file takes nine minutes to find. Another nurse means two people waiting on the same filing cabinet. Nothing improves, and now there is a bigger wage bill.

The question that opens this up is always: *what has to happen just before this, and just after?*

**Watch for the loop that comes back.**

Systems push back. A shop cuts prices to win customers; more customers come; service gets slower; the regulars leave. Every effect eventually becomes a cause. Before you change something, ask what your change will cause that comes back around to you.

**The delay is what fools people.**

Consequences arrive late. Skipped maintenance is free for a year. Technical shortcuts are free until the week you need to change that code. Because the reward is immediate and the cost is distant, people repeat the mistake — and by the time the cost lands, nobody connects it to the decision.

When something works surprisingly well with no downside, ask when the bill arrives.

**Look for the constraint.**

In any system one thing is the bottleneck. Improving anything else changes nothing at all. A faster computer will not help if you are waiting for someone's approval. Find the one thing everything queues behind, fix that, and then look again — because the constraint moves.

**Where this shows up in your work.** It is the difference between fixing a bug and asking why that class of bug keeps appearing. Between a chart that answers the question asked and one that answers the question behind it. Between a design that looks good alone and one that works in the row of shop signs it will actually hang in.

The report calls this the founder's skill. It is really the skill of anyone who wants their work to still be working next year.$md$,
 $md$When something is broken, most people look at the broken part. Systems thinking means looking at what that part is connected to.

**Example:** a clinic has long queues, so they hire another nurse. But the real reason is that patient files are on paper and take nine minutes to find. Now two nurses wait at the same cabinet. Nothing improved, and the wages went up.

Ask: what happens just before this, and just after?

**Things come back around.** A shop lowers prices. More people come. Service gets slow. The old customers leave. Every result becomes a new cause.

**Costs arrive late.** Skipping repairs is free for a year. Then it is not. When something seems to work with no downside, ask when the bill comes.

**Find the one slow part.** In any system, one thing holds everything up. Fixing anything else changes nothing. Find that one thing. Then look again, because it moves.

This is the difference between fixing one bug and asking why the same kind of bug keeps happening.$md$,
 $md$Pick something that keeps going wrong around you and has been "fixed" before. Draw it: boxes for the parts, arrows for what affects what. Then find one arrow that loops back to where it started. Write one sentence on what the last fix actually changed, and why the problem returned.$md$,
 array['Systems thinking','Problem solving'], 15, 20),

('core-emotional', 3,
 'The part of the work AI cannot do',
 'Empathy, trust and reading a room are becoming more valuable, not less.',
 $md$It is worth being precise about why this belongs in a technical curriculum.

As machines get better at the parts of work that are pure information, the parts that are not pure information become the differentiator. A model can write the code, draft the report and produce the design. It cannot sit with a worried client, notice that the real objection was never mentioned, and earn enough trust that they say it. Everything that runs on trust stays human, and trust is built out of these skills.

**Notice your own state before it makes decisions for you.**

The person who cannot tell they are angry is being driven by anger. There is a gap between something happening and how you respond, and the whole skill lives in that gap. Learning to feel it — the tight chest before the sharp reply — is what makes the gap usable.

Practically: when a message makes your chest tighten, that is exactly the message not to answer for an hour. Nothing good has ever been written in that state.

**Assume there is a reason you cannot see.**

Someone is late, short with you, ignoring your messages. The instinct is to explain it with their character: they are unreliable, they are rude. Almost always the real explanation is their situation — something at home, three other deadlines, a fear they have not said out loud.

You will be wrong about people's motives far more often than you expect. Holding your explanation loosely costs nothing and prevents most conflict.

**Listen for what is underneath.**

"Can you make the logo bigger" usually is not about the logo. It usually means "I am worried people will not notice us". Take the instruction literally and you get a bigger logo and an unhappy client. Ask what they are worried about and you can solve the real problem — which might be a completely different design.

The question that unlocks this: **what are you hoping this will do?**

**Criticism is information, and it arrives badly wrapped.**

Feedback usually comes clumsy, badly timed, or with more edge than intended. The skill is separating the content from the delivery. Ask "what specifically would make it better?" — that turns an attack into a task, and it works even when the person meant it as an attack.

**Trust is built in small, boring, repeated ways.** Doing what you said. Saying when you cannot. Admitting the mistake before it is discovered. There is no shortcut and no substitute, and it is the most valuable thing you will build in any career.$md$,
 $md$As machines get better at the information part of work, the human part becomes more valuable — not less.

AI can write the code, the report, the design. It cannot sit with a worried client, notice what they are not saying, and build enough trust that they finally say it. Work that runs on trust stays human.

**Know your own feelings.** Someone who cannot tell they are angry is controlled by anger. There is a small gap between something happening and how you react. That gap is the whole skill.
Simple rule: if a message makes your chest tight, do not answer it for one hour.

**Assume there is a reason you cannot see.** Someone is late or rude. You think: they are a bad person. Usually it is their situation — trouble at home, too much work, a fear they have not said. You will be wrong about people's reasons more often than you think.

**Listen for the real thing.** "Make the logo bigger" usually means "I am afraid people will not notice us". Ask: what are you hoping this will do?

**Criticism is useful even when it is rude.** Separate what they said from how they said it. Ask: what exactly would make it better? That turns an attack into a job you can do.

**Trust is built in small boring ways.** Do what you said. Say when you cannot. Admit mistakes first.$md$,
 $md$Think of the last time someone frustrated you. Write down the explanation you gave yourself at the time — probably about the kind of person they are. Now write three explanations based on their situation instead, ones you have no way of ruling out. You are not deciding which is true. You are practising not being certain.$md$,
 array['Emotional intelligence','Communication','Client work'], 14, 21),

-- ---------- Stage 4 ----------

('core-entrepreneurship', 4,
 'Thinking like an owner, wherever you work',
 'You may never start a company. You still need to understand how one survives.',
 $md$Entrepreneurial thinking is not the same as starting a business. It is understanding where money comes from, who decides to part with it, and why — and that understanding makes you better at your job whether you own the place or not.

Two people build the same thing. One says "I built the booking page". The other says "the booking page cut no-shows by a third, which is about D8,000 a month". They did identical work. Only one of them is going to be paid more next year.

**Everything starts with a person and a problem.**

Not an idea. A specific person with a specific problem they are already trying to solve badly. If nobody is currently working around the problem — paying someone, doing it by hand, tolerating it — it is probably not a problem worth solving.

The test: can you name one real person, who you could call today, who has this problem? Not "small businesses". A name.

**Go and ask, and ask about the past.**

"Would you use an app that does X?" gets a polite yes that means nothing. People are kind. Ask about what already happened instead: *How do you handle this now? When did you last do it? What did that cost you? What have you tried?*

Past behaviour is evidence. Predicted behaviour is conversation.

**Sell before you build, if you can.**

The most useful thing you can hear early is "no". A description, a single page, a mock-up — anything that lets someone say yes or no before you spend three months. Founders who skip this build beautiful things nobody wanted, and find out at the end.

**Know your numbers.**

Three questions, and most people who call themselves entrepreneurs cannot answer them: What does it cost to get one customer? What does one customer pay you over time? How long until money runs out?

If the first number is bigger than the second, more customers make things worse, not better. This is not advanced finance. It is arithmetic, and it decides who survives.

**Start narrow.**

"A platform for African businesses" is not a business, it is a wish. "Booking pages for hair salons in Serrekunda" is a business — small enough to actually reach, specific enough to be obviously better than the alternative, and big enough to grow from once it works.

**Where this pays off if you never start anything.** You will understand why your employer makes decisions that look strange. You will pick the projects that visibly matter. And when you eventually price your own freelance work, you will price it against the value it creates rather than the hours it took.$md$,
 $md$Entrepreneurship does not mean starting a company. It means understanding where money comes from and why people pay it. That makes you better at any job.

Two people build the same thing. One says "I built the booking page". The other says "the booking page stopped people missing appointments, and saved about D8,000 a month". Same work. Only one gets paid more.

**Start with a person, not an idea.** Can you name one real person with this problem, someone you could call today? Not "small businesses" — a name. If nobody is already struggling with it, it may not be worth solving.

**Ask about the past, not the future.** "Would you use this?" gets a polite yes that means nothing. Ask instead: How do you do this now? When did you last do it? What did it cost you?

**Try to sell it before you build it.** Hearing "no" early saves you three months.

**Know three numbers:** What does it cost to get one customer? How much does one customer pay you? How long before the money runs out? If the first is bigger than the second, more customers make it worse.

**Start small and specific.** "A platform for African businesses" is a wish. "Booking pages for hair salons in Serrekunda" is a business.$md$,
 $md$Choose one thing you have built or could build. Name one real person who has the problem it solves. Go and ask them three questions: how do you handle this now, when did you last do it, and what did it cost you in time or money? Write down their answers word for word. Do not pitch anything.$md$,
 array['Entrepreneurship','Customer research','Product thinking'], 15, 20),

('core-branding', 4,
 'Being findable',
 'Work nobody knows about cannot be hired. This is the difference between skill and opportunity.',
 $md$There is an uncomfortable fact about how work actually gets given out: it goes to the person who came to mind, not the person who was best. Being remembered is a skill, and it is one you can practise without becoming somebody you would dislike.

Personal branding sounds like posturing. It is not. It is making it possible for someone with a problem to find out that you can solve it.

**Be one clear thing.**

"I do web design, video editing, photography, and I also sell shoes" makes you unmemorable, because there is nothing to remember. "I build websites for small restaurants" is narrow, and narrow is what gets recommended, because a person hearing it immediately thinks of someone.

You are allowed to be more than one thing. Lead with one.

**Show the work, not claims about the work.**

"Hard-working and passionate" is what everyone writes and nobody believes. A link to a thing you made ends the argument. One finished, real project is worth more than any description of your qualities.

This is exactly why Nyaama makes you build things and keeps them on your profile. The projects are not practice for the job. They are the evidence you will be hired on.

**Work in public while you learn.**

You do not need to be an expert to post. "Here is what I learned building this, including what went wrong" is genuinely useful to the many people one step behind you, and it is far more convincing than expertise you do not yet have. Post the messy middle.

A small consistent habit beats a burst: one post a week for a year makes you a known quantity in your field locally. Almost nobody does it, which is why it works.

**Own an address you control.**

Social platforms change their rules and their reach. A simple page with your name, what you do, three pieces of work and how to contact you is a permanent thing that belongs to you. Everything else should point at it.

**Say what you want.**

People cannot refer work they do not know you want. "I am looking for my first paid website project" is not begging; it is information. Most opportunities are lost to nobody knowing you were available.

**One warning.** A brand built on things you cannot actually do collapses the first time someone hires you. Everything above is about making real skill visible. It is not a substitute for having it.$md$,
 $md$Work goes to the person people remember, not always the best person. Being remembered is a skill you can learn.

**Be one clear thing.** "I do web design, video, photos, and I sell shoes" — nobody remembers that. "I build websites for small restaurants" — people remember that, and they think of you when a restaurant asks. You can do other things. Just lead with one.

**Show work, not words.** "Hard-working and passionate" is what everyone says. A link to something you made ends the argument. One finished real project beats any description of yourself.

This is why Nyaama makes you build projects and keeps them on your profile. They are the proof you get hired on.

**Post while you are still learning.** You do not have to be an expert. "Here is what I learned building this, and what went wrong" helps everyone one step behind you. One post a week for a year makes people know your name.

**Have one page that is yours.** Your name, what you do, three things you made, how to contact you. Social apps change. Your page does not.

**Say what you want.** "I am looking for my first paid website job" is not begging. People cannot send you work if they do not know you want it.

**Warning:** never claim skills you do not have. It falls apart the first time someone hires you.$md$,
 $md$Write one sentence: "I build ___ for ___." Make it narrow enough that a stranger could immediately think of someone to send you. Then put it, plus links to two things you have actually made, in your WhatsApp bio and one other profile people can find. That is a starting brand, and it took ten minutes.$md$,
 array['Personal branding','Communication','Entrepreneurship'], 14, 21),

-- ---------- Stage 5 ----------

('core-leadership', 5,
 'Leading before anyone gives you the title',
 'Leadership is not a position. It is what happens when you take responsibility nobody assigned you.',
 $md$Most people wait to be made a leader. The ones who get made leaders were already behaving like one — which is a slightly annoying fact, but a useful one, because it means you can start now.

**Leadership begins as ownership.**

The person who notices a problem nobody has claimed and says "I will handle this" has led, regardless of their job title. That single sentence, said in a room where everyone is looking at the floor, is most of it.

The opposite habit — "not my job", technically correct, silently corrosive — is the clearest signal that someone will not be promoted.

**Clarity is the main service you provide.**

Groups fail from vagueness far more often than from laziness. Everyone leaves the meeting with a different idea of what was decided, and two weeks later nothing has happened and nobody is at fault.

The fix is unglamorous: before anyone leaves, say who is doing what by when. Write it down. Send it. You do not need authority to do this — you need to be the person willing to ask the awkward question while everyone else is packing up.

**Decide with incomplete information.**

You will rarely have enough to be certain. Waiting is itself a decision, usually a worse one. Decide, say what you decided and why, and say what would make you change your mind. That last part is what lets you reverse without losing trust.

**Give credit specifically, correct privately.**

"Fatou found the bug that was costing us two hours a day" is worth more than any bonus, and it costs nothing. Vague praise — "great work everyone" — is worth almost exactly nothing.

Correction goes the other way: never in front of the group, always about the work rather than the person, and always with what should happen instead.

**Conflict handled early is a conversation. Handled late it is a crisis.**

Two people quietly resenting each other will cost a project more than any technical problem. The move is to get the disagreement into the open while it is still small and still about the work. "It seems like we want different things here — can we say what each of us is actually optimising for?"

**Take the blame, share the credit.** When it goes wrong, the leader says "we got this wrong, here is what we are changing". When it goes right, the leader names who did it. Do it the other way round and people will work for you exactly once.$md$,
 $md$Leadership is not a job title. It is what you do before anyone gives you one.

**It starts with taking responsibility.** When there is a problem nobody has claimed, the person who says "I will handle this" has led. Saying "not my job" is the clearest sign someone will never be promoted.

**Your main job is making things clear.** Groups fail because nobody is sure what was decided. Before people leave the room, say out loud: who is doing what, by when. Write it down and send it. You do not need permission to do this.

**Decide even when you are not sure.** Waiting is also a decision, usually a worse one. Say what you decided, why, and what would make you change your mind.

**Praise with names, correct in private.** "Fatou found the bug that was costing us two hours a day" means something. "Good work everyone" means nothing. Never correct someone in front of others.

**Deal with conflict early.** Two people quietly angry with each other will damage a project more than any technical problem. Say it while it is still small: "It looks like we want different things here — can we each say what we actually want?"

**When it goes wrong, take the blame. When it goes right, name the people.** Do it the other way and nobody works with you twice.$md$,
 $md$In the next group you are part of — work, family, church, mosque, a football team — wait for the moment where a decision is made but nobody says who will do it. Then say it: who is doing what, by when. Write it down and send it to everyone. Notice what changes.$md$,
 array['Leadership','Communication','Emotional intelligence'], 15, 20),

('core-money', 5,
 'Getting paid, and keeping it',
 'The skill that decides whether your other skills turn into a life.',
 $md$People with valuable skills stay broke all the time. It is not usually because they earn too little. It is because nobody ever taught them the handful of things below, and there is no shame in that — these things are simply not taught.

**Know what you actually earn.**

For one month, write down everything that comes in and everything that goes out. Not from memory — memory is generous about income and forgetful about spending. The number at the end is almost always a surprise, and you cannot manage what you have never measured.

**Pay yourself first.**

The plan "I will save whatever is left" produces nothing left, every month, forever. Reverse it: take a fixed amount out the day money arrives, before anything else, and treat it as gone. Ten percent that actually happens beats thirty percent that never does.

**Build the buffer before anything else.**

Before investing, before expanding, before any clever idea: three months of your basic costs, kept somewhere boring and reachable. This one thing is what separates a bad month from a disaster. It is also what lets you refuse work that is wrong for you, which is worth more than the money.

**Freelance income is not salary.**

If you work for yourself, your rate has to cover the weeks with no work, your own equipment, your own data, your own sick days, and tax. Charging a "salary-equivalent" hourly rate is how freelancers quietly lose money for years.

And price the value, not the hours. A website that brings a restaurant twenty extra customers a month is not worth "three days of work". It is worth a fraction of what it earns them.

**Separate the business from you.**

Even for one-person work, keep the money apart — different account, or at minimum a different record. Mixing them makes it impossible to know whether the work is actually profitable, and profitable-feeling is not the same as profitable.

**Get paid properly.** Half up front for new clients. Write down what is included and what is not, before starting. "Scope creep" — the job that quietly grows and grows for the same money — is the single most common way skilled people are underpaid, and it is prevented entirely by one paragraph written at the beginning.

**Debt and investing, briefly.** Clear expensive debt before investing anything; no investment reliably beats what a high interest rate takes. And be direct about this: anything promising guaranteed high returns is a scheme, and the person telling you about it is either lying or has been lied to.$md$,
 $md$People with good skills stay poor all the time. Usually it is not because they earn too little. It is because nobody taught them these things.

**Know your real numbers.** For one month, write down every dalasi in and out. Not from memory. The total will surprise you.

**Save first, not last.** "I will save what is left" leaves nothing, every month. Take a fixed amount out the day the money arrives, before you spend anything. Ten percent that happens beats thirty percent that does not.

**Build a buffer first.** Three months of basic costs, saved, before any other plan. This is what turns a disaster into a bad month. It also lets you say no to bad work.

**Working for yourself is not a salary.** Your price must cover the weeks with no work, your equipment, your data, sick days and tax.
And charge for the value, not the hours. A website that brings a restaurant twenty new customers is not worth "three days of work".

**Keep business money separate** from your own, even for one-person work. Otherwise you cannot tell if you are actually making money.

**Get paid properly.** Half the money up front from new clients. Write down what is included before you start — otherwise the job grows and the money does not.

**Two rules:** pay off expensive debt before investing anything. And anything promising guaranteed big returns is a scam.$md$,
 $md$Write down every dalasi you spent in the last seven days — check your mobile money history rather than trusting memory. Add it up and multiply by four. Compare that number to what you thought you spent in a month. Then choose one fixed amount, however small, to move aside the next time money arrives.$md$,
 array['Financial literacy','Entrepreneurship'], 15, 21),

('core-domain', 5,
 'Know one field deeply',
 'AI rewards people who understand something the model has never seen.',
 $md$Here is the position most people are heading into: they know a tool, and so does everybody else, and so does the machine. Technical skill alone is becoming a commodity. What is not a commodity is knowing how a particular part of the world actually works.

**The valuable combination is technical skill plus one field.**

A developer is competing with every other developer. A developer who genuinely understands how Gambian clinics record patients — the paper forms, the staff shortages, what happens when the power goes — is competing with almost nobody, and can build things no outsider would think of.

This is the report's last point and its most practical one: **combine deep domain knowledge with AI.** The technology is available to everyone now. The understanding of a specific messy real-world process is not.

**Fields worth knowing, especially here.**

Agriculture, health, education, finance, logistics, tourism, fisheries, government services. Every one of these is under-served by technology in The Gambia, and every one of them is full of processes that only make sense once you have watched them.

**Your background is an asset, not a delay.**

People who come to technology from somewhere else often treat their previous life as wasted time. It is the opposite. If you worked in a pharmacy, you know things about stock, expiry and prescriptions that no bootcamp teaches. If you helped on a farm, you know what a season actually looks like. That knowledge plus new technical skill is a rare pair.

**How to build depth on purpose.**

Choose one field and stay with it for a year. Talk to people who do the work — not once, repeatedly, and mostly listening. Learn the vocabulary they use, because using the wrong word marks you as an outsider instantly. Find out what they measure and what they worry about. Take on projects in that field even when a different one pays slightly better.

**How you know you have it.** You can predict what will go wrong before it does. You know which rules get bent in practice and why. You can tell when someone confident is talking nonsense about the field. That is the point where your work becomes hard to replace — by another person, and by a model that has only ever read about it.$md$,
 $md$Soon, everyone will know the tools. Machines know them too. What machines do not know is how one particular part of the real world actually works.

**The valuable mix is: a technical skill plus one field you know deeply.**

A developer competes with every other developer. A developer who really understands how Gambian clinics keep patient records — the paper forms, the staff shortages, what happens when the power cuts — competes with almost nobody.

**Good fields here:** farming, health, education, money, transport, tourism, fishing, government services. All of them need technology. All of them have details you only learn by watching.

**Your past work is useful, not wasted.** If you worked in a pharmacy, you know things about stock and expiry dates that no course teaches. Add technical skill to that and you are rare.

**How to build it:** pick one field and stay with it for a year. Talk to the people who do the work, again and again, and mostly listen. Learn the words they use. Find out what they worry about. Take projects in that field even when another pays a little more.

**You will know you have it** when you can guess what will go wrong before it does, and when you can tell that a confident person is talking nonsense about that field.$md$,
 $md$Name one field you already know something about that most people in technology do not — from family work, a previous job, or where you grew up. Write down three things that are true about how it really works that an outsider would get wrong. Those three things are the start of something valuable. Keep the list and add to it.$md$,
 array['Domain expertise','Analytical thinking','Product thinking'], 14, 22)

) as c(slug, stage, title, summary, body, simple_body, practice, skills, minutes, sort)

on conflict (id) do update set
  path_id = excluded.path_id, stage = excluded.stage, title = excluded.title,
  summary = excluded.summary, body = excluded.body,
  simple_body = excluded.simple_body, practice = excluded.practice,
  skills = excluded.skills, minutes = excluded.minutes, sort = excluded.sort;

-- ------------------------------------------------------------
-- PROJECTS
-- ------------------------------------------------------------

insert into public.projects (id, path_id, title, brief, requirements, practices, difficulty) values

('se-restaurant-site', 'software_engineering',
 'Build a website for a Gambian restaurant',
 $md$Choose a real restaurant near you — one you have actually eaten at. Build the website they do not have yet.

This is a starter project, but it is not a fake one. When it is finished you will have a link you can send to that restaurant. Some learners find their first paid work exactly this way.

Keep it to one page. One finished page beats five unfinished ones.$md$,
 $json$[
  {"id":"name","label":"The business name, clearly visible first"},
  {"id":"description","label":"A short description of what they serve"},
  {"id":"menu","label":"A menu or list of their main dishes"},
  {"id":"contact","label":"A phone number that can be tapped to call"},
  {"id":"location","label":"Where to find them"},
  {"id":"whatsapp","label":"A WhatsApp link, since that is how most people will get in touch"},
  {"id":"mobile","label":"Works properly on a phone screen"}
 ]$json$::jsonb,
 array['HTML','CSS','Layout','Responsive design','User experience'], 'starter'),

('ai-simple-tool', 'artificial_intelligence',
 'Build a simple AI-powered tool',
 $md$Build one small tool that uses an AI API to solve a specific problem for someone you know.

Not a chatbot. Something narrow and genuinely useful: summarising long WhatsApp messages, translating a shop notice, turning voice notes into text.

The skill being practised is choosing a problem small enough to finish and real enough to matter.$md$,
 $json$[
  {"id":"problem","label":"A clearly stated problem, and who has it"},
  {"id":"api","label":"Uses an AI API to do the actual work"},
  {"id":"input","label":"A person can give it input without reading instructions"},
  {"id":"output","label":"Shows a useful result"},
  {"id":"failure","label":"Handles the case where the AI is slow or fails"},
  {"id":"tested","label":"One real person has used it and given feedback"}
 ]$json$::jsonb,
 array['APIs','Prompt engineering','Product thinking','Error handling'], 'core'),

('da-real-dataset', 'data_analytics',
 'Analyse a real dataset and present what you found',
 $md$Find real data about something you care about — Gambian population figures, rainfall, football results, prices at your local market recorded over two weeks.

Ask one clear question. Answer it with evidence. Present it so someone who has never seen the data understands in thirty seconds.

Collecting the data yourself is not a shortcut — market prices recorded by hand for two weeks is a genuinely good dataset.$md$,
 $json$[
  {"id":"question","label":"One specific question, written before you start"},
  {"id":"source","label":"A real dataset, with its source stated"},
  {"id":"cleaning","label":"A note on what you had to clean or fix"},
  {"id":"analysis","label":"The analysis that answers your question"},
  {"id":"chart","label":"One clear chart a stranger could read"},
  {"id":"finding","label":"Your finding in a single plain sentence"}
 ]$json$::jsonb,
 array['Data cleaning','Analysis','Visualisation','Reporting'], 'core'),

('cy-security-challenge', 'cybersecurity',
 'Complete a security challenge and write it up',
 $md$Work through a beginner challenge on a legal practice platform built for this — TryHackMe or PicoCTF. These systems exist to be tested. Nothing else does.

Then write up what you did: what you were looking for, what you found, how it would be fixed. The write-up is the real deliverable. In security, the ability to explain a finding clearly is worth as much as finding it.$md$,
 $json$[
  {"id":"platform","label":"Challenge completed on a legal practice platform"},
  {"id":"approach","label":"What you tried, including what did not work"},
  {"id":"finding","label":"The weakness you found, explained plainly"},
  {"id":"impact","label":"What an attacker could do with it"},
  {"id":"fix","label":"How you would fix it"},
  {"id":"ethics","label":"A note confirming you had permission to test"}
 ]$json$::jsonb,
 array['Threat awareness','Tooling','Reporting','Ethics'], 'core'),

('gd-business-identity', 'graphic_design',
 'Create a visual identity for a real business',
 $md$Choose a real small business near you that has no consistent look — a tailor, a barber, a shop, a food seller.

Design their identity: a logo, two colours, chosen fonts, and one thing they could actually use tomorrow — a shop sign, a price list, or a social media post.

Then show it to the owner. Their reaction teaches you more than any tutorial.$md$,
 $json$[
  {"id":"business","label":"A real business, named, with what they do"},
  {"id":"logo","label":"A logo that works small and in one colour"},
  {"id":"colours","label":"Two or three colours, with where each is used"},
  {"id":"type","label":"Chosen fonts for headings and body"},
  {"id":"application","label":"One real piece they could use tomorrow"},
  {"id":"feedback","label":"Shown to the owner, with their response noted"}
 ]$json$::jsonb,
 array['Branding','Logo design','Typography','Colour','Client work'], 'core')

on conflict (id) do update set
  path_id = excluded.path_id, title = excluded.title, brief = excluded.brief,
  requirements = excluded.requirements, practices = excluded.practices,
  difficulty = excluded.difficulty;
