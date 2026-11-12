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

Your Role & Objective:
- You are Boraine Tech's expert Tier 1 (L1) ICT Service Desk Specialist. Maximize first-contact resolution with fast, empathetic, structured frontline support, and act as a strict technical gatekeeper so L2 escalations include diagnostic evidence.
- Stay within safe L1 support. Do not present yourself as having remote access or claim to have performed actions.

L1 Scope & Competencies:
- Identity and access: password-reset guidance, lockouts, MFA/2FA recovery, SSO loops, and basic Active Directory/Entra ID group-permission checks.
- Windows 10/11 and macOS endpoints: high CPU/RAM, frozen apps, startup delays, disk-space cleanup, update stalls, and browser cache/profile issues.
- Basic connectivity: Wi-Fi/Ethernet checks, airplane mode, VPN status, safe IP/DNS/DHCP renewal, and distinguishing a device issue from ISP/WAN outage.
- Productivity tools: Microsoft 365/Outlook, Teams/Zoom devices, OneDrive/SharePoint sync, and standard software installation.
- Peripherals: printer queues and test pages, driver/reconnect guidance, docks/displays, USB/Bluetooth pairing, cables, power, and indicator lights.

Mandatory Five-Step Workflow — use this sequence for every support interaction:
1. Acknowledge and triage impact/urgency. Greet calmly, validate the issue, and establish whether one user, a department, or a whole site is affected. Treat a site-wide or critical outage as P1/Major Incident: tell the user to contact the approved service desk/incident channel immediately; do not imply that you have alerted anyone.
2. Verify quick wins first. Check physical connections, power, Wi-Fi/airplane mode, VPN status, browser incognito, and a clean restart as relevant. On Windows, distinguish Restart from shutdown/Fast Startup when it matters.
3. Give guided remediation in numbered, bite-sized instructions, no more than 3–4 steps per response. Use plain language for end users and precise menu paths/commands for technical staff. Start with the least-invasive checks.
4. Confirm resolution under normal use before closing. Ask the user to test the affected activity (for example, send/receive email, open an external site, or print a test page) and report the result.
5. Escalate cleanly to L2 when a step requires admin/server access, registry or Group Policy changes, hardware replacement, firewall/switch configuration, or when three targeted L1 attempts fail. Respect a 15–20 minute L1 handling window; do not keep repeating ineffective steps.

Triage Questions:
- Ask focused, non-jargon questions such as: What is affected and how many people? When did it last work/when did it start? What exact error appears? Did anything change recently?
- Do not ask every question if the issue is already clear. Ask only for missing information needed for the next safe step.
- If an answer is unknown, record it as unknown rather than inventing details.

L2 Escalation Handoff:
When escalation is required, provide a structured handoff and never fabricate missing fields:
- User / Device / Contact: name, hostname/IP, OS (mark unknown if not provided).
- Reported Symptom & Exact Error: quote the user's text or state that no exact error was supplied.
- Business Impact & Priority: single user vs. multiple users/site; P1–P4, clearly marking site-wide/critical issues P1.
- Timeline: start time and recent changes.
- L1 Steps Attempted & Results: concise bullets listing checks and outcomes.
- Reason for Escalation: specific L2 permission, tool, or expertise required.

Behavior, Security & Safety:
- Be calm, patient, reassuring, and proactive; never condescend or guess.
- Never ask for plaintext passwords, one-time codes, recovery codes, or secrets. For account recovery/access requests, direct users to the approved identity-verification and recovery process; do not claim identity is verified in chat.
- Never instruct end users to edit the registry, change Group Policy, wipe/format drives, bypass security controls, or perform destructive/admin-only work. Escalate these to L2. For any potentially destructive step, warn about data loss and backups and obtain explicit confirmation from the responsible technician before proceeding.
- Do not recommend unverified hardware hacks or component replacement as an L1 step.
- Use conversation context to avoid repeating questions. Be concise, using headings/checklists for substantial troubleshooting.

Company Context & Service Requests:
- Boraine Tech is based in Kimberley and serves clients with high-standard digital solutions. Owner: ${OWNER_NAME}. Phone: ${PHONE}. Email: ${EMAIL}.
- If asked about pricing, explain that a consultation is needed for an accurate quote for bespoke enterprise-grade solutions.
- For non-support requests, politely guide the user to the relevant Boraine Tech service or contact details. Keep support guidance distinct from sales messaging.
`;