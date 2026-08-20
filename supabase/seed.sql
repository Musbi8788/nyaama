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
 'Software engineers turn ideas into working products — websites, apps and tools that solve real problems. It is the widest door into technology, and the one with the most local demand.',
 'code', 1,
 array['HTML','CSS','JavaScript','Problem solving','Responsive design','Git','APIs'],
 $json$[
  {"n":1,"title":"Foundations","summary":"Understand how computers, the internet and software actually work before you write a line of code.","skills":["How the web works","Files and folders","Problem solving"],"effort":"3–4 hours","moduleIds":["se-how-web-works"]},
  {"n":2,"title":"Web Fundamentals","summary":"HTML and CSS — the two languages every website in the world is built from.","skills":["HTML","CSS","Layout","Responsive design"],"effort":"8–10 hours","moduleIds":["se-html-basics","se-css-basics"]},
  {"n":3,"title":"Programming","summary":"JavaScript: making pages think, respond and remember.","skills":["Variables","Functions","Logic","Data structures"],"effort":"12–15 hours","moduleIds":["se-javascript-basics","se-what-is-an-api"]},
  {"n":4,"title":"Build","summary":"Put it together into complete applications you can show people.","skills":["Projects","Debugging","Git"],"effort":"15–20 hours","moduleIds":["se-your-first-build"]},
  {"n":5,"title":"Real-World Work","summary":"Build for actual businesses and organisations. This is what turns skill into evidence.","skills":["Requirements","Client work","Deployment"],"effort":"Ongoing","moduleIds":[]}
 ]$json$::jsonb),

('artificial_intelligence', 'Artificial Intelligence',
 'Teach machines to solve problems with you.',
 'AI is about building systems that learn from data and assist people. It rewards curiosity and patience with maths, and it is changing what a small team can build.',
 'brain-circuit', 2,
 array['Python','Data handling','Maths foundations','Prompt engineering','APIs','Model evaluation'],
 $json$[
  {"n":1,"title":"Foundations","summary":"What AI actually is, what it is not, and where it genuinely helps.","skills":["AI literacy","Problem framing"],"effort":"3–4 hours","moduleIds":["ai-what-is-ai"]},
  {"n":2,"title":"Programming with Python","summary":"Python is the language AI is built in. Start here.","skills":["Python","Logic","Data types"],"effort":"12–15 hours","moduleIds":[]},
  {"n":3,"title":"Working with Data","summary":"Loading, cleaning and understanding data before any model touches it.","skills":["Data cleaning","Analysis","Visualisation"],"effort":"10–12 hours","moduleIds":[]},
  {"n":4,"title":"Build with AI","summary":"Use existing models through APIs to build something genuinely useful.","skills":["APIs","Prompt engineering","Product thinking"],"effort":"12–15 hours","moduleIds":[]},
  {"n":5,"title":"Real-World Work","summary":"Solve a real problem for a real organisation using AI.","skills":["Evaluation","Ethics","Deployment"],"effort":"Ongoing","moduleIds":[]}
 ]$json$::jsonb),

('data_analytics', 'Data Analytics',
 'Find the story hidden in the numbers.',
 'Analysts turn raw data into decisions. Every business, clinic, NGO and ministry collects data; very few can yet explain what it means.',
 'bar-chart-3', 3,
 array['Excel','SQL','Data cleaning','Visualisation','Statistics','Reporting'],
 $json$[
  {"n":1,"title":"Foundations","summary":"What data analysis is, and the questions worth asking of data.","skills":["Data literacy","Asking good questions"],"effort":"3–4 hours","moduleIds":["da-what-is-analysis"]},
  {"n":2,"title":"Spreadsheets","summary":"Excel and Google Sheets properly — still the most-used analysis tool on earth.","skills":["Formulas","Pivot tables","Charts"],"effort":"8–10 hours","moduleIds":[]},
  {"n":3,"title":"SQL","summary":"Ask questions of real databases.","skills":["SELECT","Joins","Aggregation"],"effort":"10–12 hours","moduleIds":[]},
  {"n":4,"title":"Visualisation","summary":"Show findings so a decision-maker acts on them.","skills":["Charts","Dashboards","Storytelling"],"effort":"8–10 hours","moduleIds":[]},
  {"n":5,"title":"Real-World Work","summary":"Analyse a genuine local dataset and present what you found.","skills":["Reporting","Presentation"],"effort":"Ongoing","moduleIds":[]}
 ]$json$::jsonb),

('cybersecurity', 'Cybersecurity',
 'Protect the systems people depend on.',
 'Security professionals find weaknesses before attackers do. As more Gambian services move online, the people who can secure them become essential.',
 'shield-check', 4,
 array['Networking','Linux','Threat awareness','Security tools','Incident response'],
 $json$[
  {"n":1,"title":"Foundations","summary":"How attacks actually happen, and why most of them are not sophisticated.","skills":["Security literacy","Threat awareness"],"effort":"3–4 hours","moduleIds":["cy-security-basics"]},
  {"n":2,"title":"Networking","summary":"How data moves, because you cannot defend what you cannot picture.","skills":["TCP/IP","DNS","Ports"],"effort":"10–12 hours","moduleIds":[]},
  {"n":3,"title":"Systems & Linux","summary":"Operating systems, permissions and the command line.","skills":["Linux","Permissions","Shell"],"effort":"12–15 hours","moduleIds":[]},
  {"n":4,"title":"Defence & Testing","summary":"Find weaknesses safely and legally, and fix them.","skills":["Vulnerability basics","Tooling","Hardening"],"effort":"15–20 hours","moduleIds":[]},
  {"n":5,"title":"Real-World Work","summary":"Assess and improve the security of a real system, with permission.","skills":["Reporting","Ethics","Incident response"],"effort":"Ongoing","moduleIds":[]}
 ]$json$::jsonb),

('graphic_design', 'Graphic Design',
 'Make ideas people can see and trust.',
 'Designers shape how a business looks and feels. It is one of the fastest paths from skill to income in The Gambia, because every business needs an identity.',
 'palette', 5,
 array['Typography','Colour','Layout','Brand identity','Design tools','Client work'],
 $json$[
  {"n":1,"title":"Foundations","summary":"The principles behind every good design: hierarchy, contrast, space.","skills":["Design principles","Visual hierarchy"],"effort":"3–4 hours","moduleIds":["gd-design-foundations"]},
  {"n":2,"title":"Typography & Colour","summary":"The two decisions that make work look professional or amateur.","skills":["Typography","Colour theory"],"effort":"8–10 hours","moduleIds":[]},
  {"n":3,"title":"Tools","summary":"Figma and the craft of actually producing the work.","skills":["Figma","Layout","Export"],"effort":"10–12 hours","moduleIds":[]},
  {"n":4,"title":"Brand Identity","summary":"Build a complete identity: logo, colours, type, application.","skills":["Branding","Logo design","Consistency"],"effort":"12–15 hours","moduleIds":[]},
  {"n":5,"title":"Real-World Work","summary":"Design for a real business and see your work in use.","skills":["Client work","Briefs","Delivery"],"effort":"Ongoing","moduleIds":[]}
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

*Reused passwords.* One website is breached, and the attacker tries that same email and password everywhere else. This works constantly because most people reuse passwords.

*Software that was never updated.* A weakness is found and publicly announced. A fix is released. Systems that never install it stay open — sometimes for years.

*Too much access.* Someone who only needs to read records can also delete them. When their account is compromised, the damage is far larger than it needed to be.

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
