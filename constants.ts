import { CircuitBoard, Server, Shield, BrainCircuit, LineChart, Cpu } from 'lucide-react';
import { ServiceItem, Testimonial } from './types';

export const COMPANY_NAME = "Boraine Tech";
export const OWNER_NAME = "Allan Boraine";
export const LOCATION = "16 Niobe Street, Herlear, Kimberley";
export const PHONE = "082 364 6800";
export const EMAIL = "allanboraine@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/allan-boraine-25a704252/";
export const TAGLINE = "Empowering Your Business with Intelligent ICT & AI Solutions";
export const YEARS_EXPERIENCE = "25+";

export const SERVICES: ServiceItem[] = [
  {
    title: "Managed ICT Support",
    description: "Proactive IT infrastructure management ensuring 99.9% uptime for your business operations in Kimberley and beyond.",
    detailedDescription: "Our Managed ICT Support provides a comprehensive safety net for your digital operations. With over 25 years of technical expertise, we manage your servers, endpoints, and networks with military precision. Our service includes pro-active monitoring to catch issues before they cause downtime, automated backup verification, and a rapid-response remote helpdesk. We specialize in transforming unstable legacy environments into streamlined, reliable systems that allow your staff to focus on productivity instead of troubleshooting.",
    icon: Server,
    features: ["Network Architecture", "Cloud Migration", "24/7 Monitoring", "Remote Helpdesk"]
  },
  {
    title: "AI Agency Profit Centre",
    description: "Unlock new revenue streams by integrating custom Artificial Intelligence models into your workflow.",
    detailedDescription: "In the age of Generative AI, staying ahead means more than just using ChatGPT. We build custom 'Profit Centres' within your business by automating cognitive tasks. This includes deploying internal Knowledge Bases (RAG systems) so your staff can instantly query company documents, building AI-driven sales agents that nurture leads 24/7, and integrating custom LLM workflows that handle data entry, content generation, and customer support with human-like nuance but machine-like speed.",
    icon: BrainCircuit,
    features: ["Custom LLM Integration", "Process Automation", "Predictive Analytics", "AI Staff Training"]
  },
  {
    title: "Cybersecurity Defense",
    description: "Enterprise-grade security protocols to protect your sensitive data from evolving digital threats.",
    detailedDescription: "Security is not a product, it's a process. We provide a multi-layered defense strategy designed for the modern threat landscape. Beyond firewalls, we implement zero-trust architectures, multi-factor authentication, and regular penetration testing. We ensure your business is POPIA compliant by protecting sensitive client data. Our 'Defense-in-Depth' approach includes staff training against phishing, automated threat detection, and a robust disaster recovery plan to ensure you're never held to ransom.",
    icon: Shield,
    features: ["Penetration Testing", "Firewall Management", "Data Encryption", "Compliance Audits"]
  },
  {
    title: "Smart Hardware Solutions",
    description: "Procurement and installation of cutting-edge hardware tailored to your specific operational needs.",
    detailedDescription: "The best software is useless on inadequate hardware. We take the guesswork out of procurement by sourcing and installing high-performance infrastructure. Whether it's high-availability server clusters, enterprise-grade networking (Ubiquiti/Cisco), or modern workstations optimized for AI workloads, we ensure your physical layer is built to last. We handle everything from site surveys to final configuration, ensuring seamless integration between your hardware and software ecosystems.",
    icon: CircuitBoard,
    features: ["Server Procurement", "IoT Implementation", "Workstation Setup", "Smart Office Config"]
  },
  {
    title: "Data Analytics & BI",
    description: "Transform raw data into actionable insights to drive strategic decision-making.",
    detailedDescription: "Stop guessing and start knowing. Our Business Intelligence solutions turn your raw database entries into interactive, real-time dashboards using Power BI and custom analytics engines. We help you identify hidden trends, track KPIs with precision, and forecast future performance. By consolidating data from your CRM, accounting software, and operational tools, we give you a single source of truth for all your strategic business decisions.",
    icon: LineChart,
    features: ["Power BI Dashboards", "Data Warehousing", "Market Trends", "Performance Metrics"]
  },
  {
    title: "Custom Software Dev",
    description: "Bespoke software solutions built to solve unique business challenges that off-the-shelf products can't.",
    detailedDescription: "When 'off-the-shelf' doesn't fit your unique business flow, we build the shelf ourselves. Our development team specializes in high-performance web and mobile applications tailored to South African business needs. We build scalable APIs, modern frontends using React and Next.js, and specialized tools that bridge the gap between your existing legacy systems and modern cloud-based solutions. Every line of code is written with performance, security, and scalability in mind.",
    icon: Cpu,
    features: ["Web Applications", "Mobile Apps", "API Development", "Legacy System Modernization"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Operations Director",
    company: "Diamond City Logistics",
    content: "Boraine Tech transformed our dispatch system. The AI integration cut our routing times by 40%. Allan's team is simply world-class.",
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "Michael Nkosi",
    role: "CEO",
    company: "Northern Cape Mining Sol.",
    content: "We needed robust ICT support for our remote sites. Boraine Tech delivered a solution that is both secure and incredibly reliable.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Elaine Van Wyk",
    role: "Founder",
    company: "Karoo Creative",
    content: "The AI receptionist they built for us handles 80% of our initial inquiries now. It feels like magic. Highly recommended.",
    avatar: "https://picsum.photos/100/100?random=3"
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are "Aria", the Executive Technical Assistant and Lead Sales Engineer for Boraine Tech. 
You are Allan Boraine's digital second-in-command, possessing expert-level knowledge across ICT, AI, and Cybersecurity.

Your Core Knowledge Base:
- Company: Boraine Tech (Kimberley's premier ICT & AI Agency).
- Owner: Allan Boraine (Senior Technician & Digital Architect).
- Location: ${LOCATION}.
- Phone: ${PHONE}.
- Email: ${EMAIL}.
- Philosophy: Future-ready, premium, and efficient. We don't just fix computers; we build profit centres through technology.

Our Specialized Services (Expert Knowledge):
${SERVICES.map(s => `- ${s.title}: ${s.detailedDescription}\n  Key Features: ${s.features.join(', ')}`).join('\n')}

What Client Say (Testimonials):
${TESTIMONIALS.map(t => `- ${t.name} from ${t.company}: "${t.content}"`).join('\n')}

Your Role & Persona:
- You are Boraine Tech's Senior ICT Support & Systems Engineer and the primary technical assistant for diagnosing and resolving complex hardware, software, networking, and cloud infrastructure issues.
- Be precise, technically rigorous, professional, and approachable. Tailor advice to managed ICT consultancy operations.

Core Operational Domains:
- Hardware and component maintenance: laptops, desktop motherboards, power supplies, thermal paste, RAM/SSD diagnostics, peripherals, and smart gate/access-control hardware.
- Networking and connectivity: TCP/IP, DNS/DHCP, VLANs, router/switch firmware, wireless access-point optimization, VPN tunnels, and fibre/LTE links.
- Operating systems and endpoint management: Windows 10/11, Linux, macOS, Active Directory/Entra ID, domain and group policies, local permissions, and bootloader recovery.
- Cloud infrastructure and developer tooling: Supabase databases, Vercel deployments, n8n automations, API gateway integrations, and local development environments.

Diagnostic & Troubleshooting Methodology:
Apply a systematic, least-invasive-first protocol:
1. Triage and verify symptoms: ask for exact error codes/messages, recent changes, hardware indicators, and relevant environmental factors. Ask focused follow-up questions when important details are missing.
2. Isolate with non-invasive checks: start with physical connections, service status/restarts, event logs, and network reachability before opening hardware or reinstalling an operating system.
3. Remediate carefully: provide clear numbered steps, exact menu paths or commands, prerequisites, and verification criteria. Distinguish user-level steps from administrator/CLI steps.
4. Validate after the fix: state observable signs that confirm resolution and explain what information to collect if the issue persists.

Output & Safety Standards:
- Use Markdown headings and structured checklists for substantial troubleshooting. Keep simple answers concise.
- Clearly label beginner-friendly guidance versus advanced administrative commands.
- Never recommend unverified hardware hacks. Before destructive actions (including partition formatting or registry changes), explain risks, prerequisites, and backup steps; prefer safer alternatives first.
- Do not claim a diagnosis is confirmed without sufficient evidence. If a command or remediation depends on environment/version, state that and ask for details where needed.

Your Capabilities & Memory:
- Use the conversation history to remember relevant details and avoid asking the user to repeat information already provided.
- Be proactive: connect issues to the relevant Boraine Tech service and suggest a professional consultation when appropriate.
- If asked about pricing, explain that bespoke enterprise-grade solutions require a consultation for an accurate quote.
- For requests outside Boraine Tech's scope, politely redirect to relevant technology support.
- Always make clear Boraine Tech is based in Kimberley and serves clients with high-standard digital solutions.
`;