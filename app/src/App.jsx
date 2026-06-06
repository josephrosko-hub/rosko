import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Copy,
  Headphones,
  Mail,
  MessageSquareText,
  PhoneCall,
  Route,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const prospect = {
  business: 'Alpha 1 Heating & Cooling',
  website: 'https://alpha1hvac.com/',
  phone: '484-838-6888',
  market: 'Montgomery County, PA',
  services: ['Cooling', 'Heating', 'Air Quality', 'Free Quotes', 'Maintenance Plans'],
};

const demoScenarios = [
  {
    title: 'Emergency AC repair',
    icon: AlertTriangle,
    customer: 'My AC stopped working and it is really hot in the house. Can someone come out today?',
    ai: 'Thanks for calling Alpha 1 Heating & Cooling. I can help get this routed. Are you in Montgomery County, and is the system completely off or blowing warm air?',
    summary: 'Urgent cooling lead. Customer needs same-day AC repair, service area confirmed, contact details collected, dispatch summary ready for the Alpha 1 team.',
    tag: 'High intent',
  },
  {
    title: 'Free replacement quote',
    icon: ClipboardCheck,
    customer: 'I want a quote to replace my old central AC system before summer.',
    ai: 'Absolutely. Alpha 1 provides clear written pricing before HVAC work begins. I can collect a few details and request a quote appointment for you.',
    summary: 'Replacement quote lead. Existing AC system is aging, homeowner wants pre-summer estimate, preferred appointment window captured.',
    tag: 'Sales lead',
  },
  {
    title: 'Heating service',
    icon: ShieldCheck,
    customer: 'My furnace keeps turning on and off. I need someone to look at it.',
    ai: 'I can help with heating repair. Is there any burning smell, carbon monoxide alarm, or no-heat emergency right now?',
    summary: 'Heating repair intake. Furnace short cycling, safety questions asked, urgency level set, booking request prepared.',
    tag: 'Qualified job',
  },
];

const capabilities = [
  {
    icon: PhoneCall,
    title: 'Answers every call',
    text: 'Picks up instantly for call-now traffic, after-hours requests, and quote seekers.',
  },
  {
    icon: Route,
    title: 'Routes by need',
    text: 'Separates AC emergencies, heating repairs, air quality questions, quotes, and plan inquiries.',
  },
  {
    icon: CalendarCheck,
    title: 'Books or hands off',
    text: 'Collects the right details and either books a slot or sends a clean dispatch summary.',
  },
  {
    icon: MessageSquareText,
    title: 'Texts confirmation',
    text: 'Sends confirmation messages and catches missed callers while they are still ready to buy.',
  },
];

const buildSteps = [
  'Use one reusable AI receptionist platform for many HVAC and plumbing companies.',
  'Store each company profile: name, service area, hours, services, emergency rules, and transfer numbers.',
  'Connect phone calls through Twilio or a voice-agent platform, then load the right business profile for each number.',
  'Start with summaries and booking requests, then add calendar, CRM, and dispatch integrations as customers pay.',
];

const emailPitch = `Subject: Quick idea for Alpha 1's HVAC calls

Hey Alpha 1 team,

I came across your site and saw you serve Montgomery County with cooling, heating, air quality, free quotes, maintenance plans, and 24/7 emergency AC repair.

We are building an AI receptionist for HVAC companies that answers calls instantly, qualifies whether the customer needs AC repair, heating service, air quality help, or a quote, then sends your team a clean summary or booking request.

The goal is simple: help emergency and quote calls get captured before the homeowner calls another HVAC company.

I put together a quick Alpha 1-specific demo flow around your services. Would you be open to seeing it? It should only take a few minutes.

Best,
[Your Name]`;

function App() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [copied, setCopied] = useState(false);
  const scenario = demoScenarios[activeScenario];
  const ScenarioIcon = scenario.icon;

  const copyPitch = async () => {
    await navigator.clipboard.writeText(emailPitch);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#22c55e33,transparent_34%),radial-gradient(circle_at_top_right,#f9731633,transparent_30%),linear-gradient(135deg,#020617,#0f172a_52%,#111827)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-8 lg:px-10">
          <nav className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                <Headphones size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">HVAC AI Demo Kit</p>
                <h1 className="text-xl font-black">DispatchLift</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <a className="rounded-full border border-white/10 px-4 py-2 hover:border-emerald-300" href={prospect.website}>
                View prospect site
              </a>
              <a className="rounded-full bg-white px-4 py-2 font-bold text-slate-950" href={`tel:${prospect.phone}`}>
                {prospect.phone}
              </a>
            </div>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                <Zap size={16} />
                Alpha 1-ready demo and outreach pitch
              </div>
              <h2 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Capture HVAC calls before homeowners call the next company.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A reusable AI receptionist concept customized for {prospect.business}. It answers call-now traffic,
                qualifies emergencies, captures quote requests, and sends the team a clean dispatch summary.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {['24/7 pickup', 'Emergency triage', 'Quote capture'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="mb-3 text-emerald-300" />
                    <p className="font-bold">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] bg-slate-950 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Mock live call</p>
                    <h3 className="text-2xl font-black">{scenario.title}</h3>
                  </div>
                  <div className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-bold text-orange-200">
                    {scenario.tag}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-4 text-slate-950">
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Caller says</p>
                    <p className="text-lg font-semibold">"{scenario.customer}"</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-200">AI replies</p>
                    <p className="text-lg font-semibold">"{scenario.ai}"</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-emerald-200">
                      <ScenarioIcon size={18} />
                      <p className="text-sm font-bold uppercase tracking-widest">Team summary</p>
                    </div>
                    <p className="text-slate-300">{scenario.summary}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  {demoScenarios.map((item, index) => (
                    <button
                      className={`rounded-2xl px-3 py-3 text-left text-sm font-bold transition ${
                        activeScenario === index
                          ? 'bg-emerald-400 text-slate-950'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                      key={item.title}
                      onClick={() => setActiveScenario(index)}
                      type="button"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-slate-950 p-3 text-white">
              <Building2 />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Prospect</p>
              <h3 className="text-2xl font-black">{prospect.business}</h3>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <p><strong>Website:</strong> {prospect.website}</p>
            <p><strong>Phone:</strong> {prospect.phone}</p>
            <p><strong>Market:</strong> {prospect.market}</p>
            <div>
              <p className="mb-2 font-bold">Services to train the AI on:</p>
              <div className="flex flex-wrap gap-2">
                {prospect.services.map((service) => (
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold" key={service}>
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-950">
            <p className="font-black">Why they are a fit</p>
            <p className="mt-2 text-sm leading-6">
              They already push Call Now, Free Quote, emergency AC service, financing, and maintenance plans. That means
              their website traffic is built around phone calls and booked jobs.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6" key={capability.title}>
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                  <Icon />
                </div>
                <h3 className="text-xl font-black">{capability.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{capability.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-4 lg:grid-cols-2 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Clock3 className="text-orange-300" />
            <h3 className="text-2xl font-black">How this becomes a real product</h3>
          </div>
          <div className="space-y-4">
            {buildSteps.map((step, index) => (
              <div className="flex gap-4 rounded-2xl bg-white/5 p-4" key={step}>
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-400 font-black text-slate-950">
                  {index + 1}
                </div>
                <p className="leading-7 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-emerald-300/30 bg-emerald-300/10 p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mail className="text-emerald-200" />
              <h3 className="text-2xl font-black">Email pitch to send</h3>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950"
              onClick={copyPitch}
              type="button"
            >
              <Copy size={16} />
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-slate-200">
            {emailPitch}
          </pre>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="rounded-[2rem] bg-white p-6 text-slate-950 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[0.24em] text-emerald-700">Next build target</p>
              <h3 className="text-3xl font-black">Turn the demo into a working MVP.</h3>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                The next version should connect an inbound phone number, store company settings, generate transcripts,
                send SMS confirmations, and post every lead to an owner dashboard.
              </p>
            </div>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 font-black text-white"
              href={`mailto:?subject=${encodeURIComponent("Quick idea for Alpha 1's HVAC calls")}&body=${encodeURIComponent(emailPitch)}`}
            >
              Open email
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
