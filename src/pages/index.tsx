import Head from 'next/head';
import Image from 'next/image';
import { memo, useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExperienceSectionLottie } from '@/components/ExperienceSectionLottie';
import { MotionBackground } from '@/components/MotionBackground';
import { PortfolioNav } from '@/components/PortfolioNav';
import {
  BrainCircuit,
  Check,
  ChevronRight,
  Cloud,
  CloudLightning,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  FolderOpen,
  Github,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Server,
} from 'lucide-react';

const RESUME_URL = '/Saugat_Giri_Soft_Dev_Resume.pdf' as const;

const PROJECT_BEDROCK_RAG_THUMB =
  'https://cloudybarz.com/wp-content/uploads/2025/05/ChatGPT-Image-May-16-2025-10_19_25-PM-1170x780.jpg';

const PROJECT_INCIDENT_TRACKER_THUMB =
  'https://i.ytimg.com/vi/6e8ft-Ugz_I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAeGlwETlY9r7vy4Jvs0Z5SBAT71w';

/** Thumbnail: team & live collaboration (Unsplash) */
const PROJECT_WEBSOCKETS_THUMB =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';

/** Thumbnail: language / interpretation (Unsplash) — CCL Saathi */
const PROJECT_CCL_SAATHI_THUMB =
  'https://images.unsplash.com/photo-1706403615881-d83dc2067c5d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const PROJECT_CCL_SAATHI_GITHUB =
  'https://github.com/saugat-15/ccl-saathi' as const;

/** Canonical site origin (no trailing slash). Override with NEXT_PUBLIC_SITE_URL on Vercel when using a custom domain. */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://portfolio-saugat.vercel.app'
).replace(/\/$/, '');

const SEO_TITLE =
  'Saugat Giri — Full-Stack & Cloud Developer | Melbourne, Australia';

const SEO_DESCRIPTION =
  'Melbourne full-stack developer: React, TypeScript, Node.js, AWS and Azure. Production web apps, serverless backends, data workflows, and GenAI on Amazon Bedrock. Open to Melbourne and remote roles.';

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  location: string;
  dateRange: string;
  bullets: string[];
  tags: string[];
};

const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'data-foundry',
    company: 'The Data Foundry',
    role: 'Software Developer',
    location: 'Melbourne, VIC',
    dateRange: 'Mar 2025 — Present',
    bullets: [
      'Developed and maintained backend services using Node.js and AWS (Lambda, API Gateway, DynamoDB, ECS, AppSync) to support data ingestion and processing workflows.',
      'Built and deployed cloud-native applications focused on scalability, reliability, and security in a data engineering environment.',
      'Collaborated with data engineers and analysts to deliver production-ready features aligned with business reporting and analytics requirements.',
      'Implemented monitoring and logging using AWS CloudWatch, improving system observability and reducing issue resolution time.',
    ],
    tags: [
      'Node.js',
      'AWS Lambda',
      'API Gateway',
      'DynamoDB',
      'ECS',
      'AppSync',
      'CloudWatch',
    ],
  },
  {
    id: 'stormrake',
    company: 'Stormrake',
    role: 'Software Developer',
    location: 'Melbourne, VIC',
    dateRange: 'Feb 2024 — Mar 2025',
    bullets: [
      'Engineered on-chain analysis tooling with React, TypeScript, and Neo4j to flag risky wallets and curb fraudulent trades and unauthorized withdrawals — contributing to a material reduction in fraud (including ~30% in key flows).',
      'Developed a robust bookkeeping system using React and AWS Amplify to improve financial data integrity and management.',
      'Optimized the platform with Next.js and AWS services, supporting ~90% uptime and faster, more reliable delivery.',
      'Implemented React-based wallet verification for secure, accurate blockchain transactions; Web3 auth (Ethers.js, WalletConnect) improved transaction success by ~20%.',
      'Automated duplicate-wallet detection and controls, cutting duplicate usage by ~95% and strengthening compliance.',
    ],
    tags: [
      'React',
      'TypeScript',
      'Neo4j',
      'Next.js',
      'AWS Amplify',
      'Web3',
      'Ethers.js',
    ],
  },
  {
    id: 'simplot',
    company: 'Simplot Australia',
    role: 'Service Desk Analyst',
    location: 'Mentone, VIC',
    dateRange: 'Mar 2023 — Feb 2024',
    bullets: [
      'Resolved about 95% of support tickets within SLA, lifting user satisfaction.',
      'Authored troubleshooting guides that reduced repeat incidents by ~20%.',
      'Streamlined onboarding so setup time fell by ~40%, improving team efficiency.',
      'Partnered with global IT to roll out a unified service desk platform and smoother cross-functional support.',
    ],
    tags: ['ITIL', 'Service desk', 'Documentation', 'Training'],
  },
  {
    id: 'huddled',
    company: 'Huddled',
    role: 'Full Stack Developer Intern',
    location: 'Melbourne, VIC',
    dateRange: 'Dec 2022 — Mar 2023',
    bullets: [
      'Built UI features with Flutter and Dart to improve engagement and experience.',
      'Integrated APIs and databases with attention to performance and data reliability.',
      'Tuned infrastructure with AWS S3 and EC2 for more scalable backend support.',
      'Resolved technical issues end-to-end to keep releases stable.',
    ],
    tags: ['Flutter', 'Dart', 'AWS S3', 'AWS EC2', 'REST APIs'],
  },
];

type StoryCert = {
  cls: 'aws' | 'azure';
  icon: ReactNode;
  name: string;
  year: string;
};

const STORY_CERTS: StoryCert[] = [
  {
    cls: 'aws',
    icon: <CloudLightning strokeWidth={2} aria-hidden />,
    name: 'AWS Developer Associate',
    year: '2025',
  },
  {
    cls: 'aws',
    icon: <BrainCircuit strokeWidth={2} aria-hidden />,
    name: 'AWS AI Practitioner',
    year: '2026',
  },
  {
    cls: 'azure',
    icon: <Code2 strokeWidth={2} aria-hidden />,
    name: 'Azure Developer Associate',
    year: '2026',
  },
  {
    cls: 'azure',
    icon: <Database strokeWidth={2} aria-hidden />,
    name: 'Azure Data Fundamentals',
    year: '2026',
  },
  {
    cls: 'azure',
    icon: <Cpu strokeWidth={2} aria-hidden />,
    name: 'Azure AI Fundamentals',
    year: '2026',
  },
  {
    cls: 'azure',
    icon: <Cloud strokeWidth={2} aria-hidden />,
    name: 'Azure Fundamentals',
    year: '2026',
  },
];

/**
 * Framer's useReducedMotion reads `null` on the server but can be `true` immediately
 * on the client, which mismatches SSR markup (e.g. conditional hero Lottie) and can
 * cause hydration errors + dev reload loops. Until the client has mounted, act as if
 * reduced motion is off so server and first client paint match.
 */
function useMotionConfig() {
  const rawReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const reduceMotion = hydrated && Boolean(rawReducedMotion);

  const enter = (delay = 0) =>
    reduceMotion
      ? { duration: 0 }
      : { duration: 0.52, ease: EASE_SMOOTH, delay };
  const inView = (delay = 0) =>
    reduceMotion
      ? { duration: 0 }
      : { duration: 0.58, ease: EASE_SMOOTH, delay };
  return { reduceMotion, enter, inView };
}

const LINKEDIN_URL =
  'https://www.linkedin.com/in/saugat-giri-66011513b/' as const;
const GITHUB_PROFILE_URL = 'https://github.com/saugat-15' as const;

function Home() {
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  const activeExperience = EXPERIENCE[activeExperienceIndex];
  const { reduceMotion, enter, inView } = useMotionConfig();

  const hiddenY = { opacity: 0, y: 26 };
  const showY = { opacity: 1, y: 0 };

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.pf-project-card');
    const onMove = (e: MouseEvent, card: HTMLElement) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty(
        '--mx',
        `${((e.clientX - r.left) / r.width) * 100}%`
      );
      card.style.setProperty(
        '--my',
        `${((e.clientY - r.top) / r.height) * 100}%`
      );
    };
    const cleanups: (() => void)[] = [];
    cards.forEach((card) => {
      const fn = (e: MouseEvent) => onMove(e, card);
      card.addEventListener('mousemove', fn);
      cleanups.push(() => card.removeEventListener('mousemove', fn));
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  const view = {
    initial: reduceMotion ? undefined : hiddenY,
    whileInView: reduceMotion ? undefined : showY,
    viewport: { once: true, amount: 0.22, margin: '-48px' },
  };

  const canonicalUrl = `${SITE_URL}/`;
  const ogImage =
    typeof process.env.NEXT_PUBLIC_OG_IMAGE === 'string' &&
      process.env.NEXT_PUBLIC_OG_IMAGE.length > 0
      ? process.env.NEXT_PUBLIC_OG_IMAGE.startsWith('http')
        ? process.env.NEXT_PUBLIC_OG_IMAGE
        : `${SITE_URL}${process.env.NEXT_PUBLIC_OG_IMAGE.startsWith('/') ? '' : '/'}${process.env.NEXT_PUBLIC_OG_IMAGE}`
      : undefined;

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saugat Giri',
    url: canonicalUrl,
    jobTitle: 'Software Developer',
    description: SEO_DESCRIPTION,
    sameAs: [LINKEDIN_URL, GITHUB_PROFILE_URL],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
    knowsAbout: [
      'Full-stack development',
      'React',
      'TypeScript',
      'Node.js',
      'AWS',
      'Microsoft Azure',
      'Cloud computing',
    ],
  };

  return (
    <>
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <meta name="author" content="Saugat Giri" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Saugat Giri" />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="en_AU" />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        {ogImage ? (
          <meta property="og:image:alt" content="Saugat Giri — portfolio" />
        ) : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO_TITLE} />
        <meta name="twitter:description" content={SEO_DESCRIPTION} />
        {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
      </Head>

      <div className="portfolio-page">
        <ExperienceSectionLottie reduceMotion={reduceMotion} />
        <PortfolioNav />

        <section className="pf-hero" id="home">
          <MotionBackground />
          <div className="pf-hero-inner">
            <div className="pf-hero-layout pf-hero-layout--no-lottie">
              <div className="pf-hero-copy-top">
                <motion.h1
                  initial={reduceMotion ? false : hiddenY}
                  animate={showY}
                  transition={enter(0)}
                >
                  Fullstack Engineer specializing in{' '}
                  <span className="pf-headline-accent">React and AWS</span>
                </motion.h1>
                <motion.p
                  className="pf-hero-lead"
                  initial={reduceMotion ? false : hiddenY}
                  animate={showY}
                  transition={enter(0.08)}
                >
                  I build fast, scalable web applications with clean architecture
                  and real-world usability in mind.
                </motion.p>
                <motion.div
                  className="pf-hero-cred-badges"
                  initial={reduceMotion ? false : hiddenY}
                  animate={showY}
                  transition={enter(0.14)}
                >
                  <p className="pf-hero-cred-badge pf-hero-cred-badge--aws">
                    <CloudLightning strokeWidth={2} aria-hidden />
                    <span>AWS Certified Developer Associate</span>
                  </p>
                  <p className="pf-hero-cred-badge pf-hero-cred-badge--azure">
                    <Cloud strokeWidth={2} aria-hidden />
                    <span>Azure Certified Developer Associate</span>
                  </p>
                </motion.div>
              </div>
              <div className="pf-hero-copy-bottom">
                <motion.div
                  className="pf-hero-ctas"
                  initial={reduceMotion ? false : hiddenY}
                  animate={showY}
                  transition={enter(0.2)}
                >
                  <motion.a
                    href="#projects"
                    className="pf-btn-primary"
                    whileHover={
                      reduceMotion ? undefined : { y: -2, scale: 1.02 }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <FolderOpen strokeWidth={2} aria-hidden />
                    View Projects
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="pf-btn-ghost"
                    whileHover={
                      reduceMotion ? undefined : { y: -2, scale: 1.02 }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <Mail strokeWidth={2} aria-hidden />
                    Contact Me
                  </motion.a>
                </motion.div>
              </div>
              <motion.div
                className="pf-hero-meta"
                initial={reduceMotion ? false : hiddenY}
                animate={showY}
                transition={enter(0.28)}
              >
                <div
                  className="pf-hero-cred-strip"
                  aria-labelledby="hero-cred-heading"
                >
                  <div className="pf-hero-cred-strip__intro">
                    <div className="pf-hero-cred-strip__intro-text">
                      <p
                        className="pf-hero-cred-strip__label"
                        id="hero-cred-heading"
                      >
                        Certifications
                      </p>
                      <p className="pf-hero-cred-strip__sub">
                        Six credentials across AWS and Azure — full list in
                        About.
                      </p>
                    </div>
                    <a href="#about" className="pf-hero-cred-strip__link">
                      View credentials
                      <ChevronRight strokeWidth={2} aria-hidden />
                    </a>
                  </div>
                  <div className="pf-hero-cred-strip__grid" role="list">
                    <div
                      className="pf-hero-cred-item pf-hero-cred-item--aws"
                      role="listitem"
                    >
                      <div className="pf-hero-cred-item__icon" aria-hidden>
                        <CloudLightning strokeWidth={2} />
                      </div>
                      <div className="pf-hero-cred-item__body">
                        <span className="pf-hero-cred-item__provider">
                          Amazon Web Services
                        </span>
                        <span className="pf-hero-cred-item__stat">
                          2 certifications
                        </span>
                      </div>
                    </div>
                    <div
                      className="pf-hero-cred-item pf-hero-cred-item--azure"
                      role="listitem"
                    >
                      <div className="pf-hero-cred-item__icon" aria-hidden>
                        <Cloud strokeWidth={2} />
                      </div>
                      <div className="pf-hero-cred-item__body">
                        <span className="pf-hero-cred-item__provider">
                          Microsoft Azure
                        </span>
                        <span className="pf-hero-cred-item__stat">
                          4 certifications
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pf-section" id="projects">
          <div className="pf-wrap">
            <motion.p className="pf-section-label" {...view} transition={inView(0)}>
              Featured &amp; more
            </motion.p>
            <motion.h2 {...view} transition={inView(0.06)}>
              Projects
            </motion.h2>
            <div className="pf-projects-grid">
              <motion.article
                className="pf-project-card pf-project-card--highlight"
                {...view}
                transition={inView(0)}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <div className="pf-project-visual">
                  <motion.div
                    className="pf-project-visual-inner pf-vis-saathi"
                    whileHover={
                      reduceMotion ? undefined : { scale: 1.02 }
                    }
                    transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                  >
                    <Image
                      className="pf-project-thumb"
                      src={PROJECT_CCL_SAATHI_THUMB}
                      alt="Language and interpretation themed photograph for CCLSaathi"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 496px"
                      priority
                    />
                    <div className="pf-browser-dots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="pf-vis-shine" aria-hidden />
                  </motion.div>
                </div>
                <div className="pf-project-body">
                  <div className="pf-project-top">
                    <div className="pf-project-top-meta">
                      <span className="pf-project-num pf-project-num--featured">
                        Main highlight
                      </span>
                      <span className="pf-project-status-pill">
                        Actively in development
                      </span>
                    </div>
                    <a
                      href={PROJECT_CCL_SAATHI_GITHUB}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-project-link"
                      aria-label="CCLSaathi on GitHub"
                    >
                      <ExternalLink strokeWidth={2} aria-hidden />
                    </a>
                  </div>
                  <h3>CCLSaathi 🇳🇵</h3>
                  <p className="pf-project-lede pf-project-lede--compact">
                    NAATI CCL practice for Nepali-first candidates (5 PR
                    points): interpret exam-style dialogue, then get AI feedback.
                    Audio is <strong>segmented with FFmpeg</strong>, transcribed
                    with <strong>OpenAI Whisper</strong> (EN + NP), and scored
                    with <strong>Claude</strong>. Next.js on Amplify;
                    Cognito · AppSync · DynamoDB · S3 · Lambda · Stripe.
                  </p>
                  <div className="pf-project-tags">
                    <span>OpenAI Whisper</span>
                    <span>FFmpeg</span>
                    <span>Claude</span>
                    <span>Next.js</span>
                    <span>AWS Amplify</span>
                    <span>AppSync</span>
                    <span>DynamoDB</span>
                    <span>Lambda</span>
                    <span>Stripe</span>
                  </div>
                </div>
              </motion.article>

              <motion.article
                className="pf-project-card"
                {...view}
                transition={inView(0.08)}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <div className="pf-project-visual">
                  <motion.div
                    className="pf-project-visual-inner pf-vis-rag"
                    whileHover={
                      reduceMotion ? undefined : { scale: 1.02 }
                    }
                    transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                  >
                    <Image
                      className="pf-project-thumb"
                      src={PROJECT_BEDROCK_RAG_THUMB}
                      alt="Bedrock RAG Chatbot preview"
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 496px"
                      loading="lazy"
                    />
                    <div className="pf-browser-dots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="pf-vis-shine" aria-hidden />
                  </motion.div>
                </div>
                <div className="pf-project-body">
                  <div className="pf-project-top">
                    <span className="pf-project-num">02</span>
                    <a
                      href="https://github.com/saugat-15/bedrock-rag-chatbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-project-link"
                      aria-label="Bedrock RAG Chatbot on GitHub"
                    >
                      <ExternalLink strokeWidth={2} aria-hidden />
                    </a>
                  </div>
                  <h3>Bedrock RAG Chatbot</h3>
                  <p>
                    Full-stack RAG on AWS Bedrock with PDF uploads and
                    context-aware Q&amp;A — strong accuracy on domain queries,
                    React UI, Kendra-backed search, sub-2s responses.
                  </p>
                  <div className="pf-project-tags">
                    <span>AWS Bedrock</span>
                    <span>React</span>
                    <span>Lambda</span>
                    <span>Kendra</span>
                    <span>RAG</span>
                  </div>
                </div>
              </motion.article>

              <motion.article
                className="pf-project-card"
                {...view}
                transition={inView(0.12)}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <div className="pf-project-visual">
                  <motion.div
                    className="pf-project-visual-inner pf-vis-incident"
                    whileHover={
                      reduceMotion ? undefined : { scale: 1.02 }
                    }
                    transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                  >
                    <Image
                      className="pf-project-thumb"
                      src={PROJECT_INCIDENT_TRACKER_THUMB}
                      alt="AWS Amplify Incident Tracker preview"
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 496px"
                      loading="lazy"
                    />
                    <div className="pf-browser-dots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="pf-vis-shine" aria-hidden />
                  </motion.div>
                </div>
                <div className="pf-project-body">
                  <div className="pf-project-top">
                    <span className="pf-project-num">03</span>
                    <a
                      href="https://github.com/saugat-15/aws-amplify-incident-tracker"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-project-link"
                      aria-label="Incident tracker on GitHub"
                    >
                      <ExternalLink strokeWidth={2} aria-hidden />
                    </a>
                  </div>
                  <h3>AWS Amplify Incident Tracker</h3>
                  <p>
                    Real-time incident workflow cutting report-to-resolution time
                    ~40%. AppSync GraphQL + DynamoDB for hundreds of concurrent
                    users, Cognito RBAC.
                  </p>
                  <div className="pf-project-tags">
                    <span>Amplify</span>
                    <span>AppSync</span>
                    <span>GraphQL</span>
                    <span>Cognito</span>
                    <span>DynamoDB</span>
                  </div>
                </div>
              </motion.article>

              <motion.article
                className="pf-project-card"
                {...view}
                transition={inView(0.14)}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <div className="pf-project-visual">
                  <motion.div
                    className="pf-project-visual-inner pf-vis-socket"
                    whileHover={
                      reduceMotion ? undefined : { scale: 1.02 }
                    }
                    transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                  >
                    <Image
                      className="pf-project-thumb"
                      src={PROJECT_WEBSOCKETS_THUMB}
                      alt="Real-time chat with WebSockets preview"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 496px"
                      loading="lazy"
                    />
                    <div className="pf-browser-dots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="pf-vis-shine" aria-hidden />
                  </motion.div>
                </div>
                <div className="pf-project-body">
                  <div className="pf-project-top">
                    <span className="pf-project-num">04</span>
                    <a
                      href="https://github.com/saugat-15/websockets"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-project-link"
                      aria-label="WebSockets chat on GitHub"
                    >
                      <ExternalLink strokeWidth={2} aria-hidden />
                    </a>
                  </div>
                  <h3>Real-Time Chat (Socket.io)</h3>
                  <p>
                    Practice project: live messaging with Node.js and Socket.io —
                    rooms, events, and bidirectional updates in the browser.
                    Deployed demo on Netlify.
                  </p>
                  <div className="pf-project-tags">
                    <span>Node.js</span>
                    <span>Socket.io</span>
                    <span>JavaScript</span>
                    <span>Real-time</span>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <section
          className="pf-section pf-section-alt pf-section-exp-tabs"
          id="experience"
        >
          <div className="pf-wrap">
            <motion.h2
              className="pf-exp-heading"
              {...view}
              transition={inView(0)}
              id="experience-heading"
            >
              Experience<span className="pf-exp-heading-dot">.</span>
            </motion.h2>
            <div className="pf-exp-vtabs">
              <nav
                className="pf-exp-vtabs-nav"
                role="tablist"
                aria-labelledby="experience-heading"
              >
                {EXPERIENCE.map((job, index) => (
                  <button
                    key={job.id}
                    type="button"
                    role="tab"
                    id={`exp-tab-${job.id}`}
                    aria-selected={index === activeExperienceIndex}
                    aria-controls="exp-panel"
                    tabIndex={index === activeExperienceIndex ? 0 : -1}
                    className="pf-exp-vtabs-tab"
                    onClick={() => setActiveExperienceIndex(index)}
                  >
                    {job.company}
                  </button>
                ))}
              </nav>
              <div
                className="pf-exp-vtabs-panel"
                role="tabpanel"
                id="exp-panel"
                aria-labelledby={`exp-tab-${activeExperience.id}`}
              >
                <motion.div
                  key={activeExperience.id}
                  className="pf-exp-vtabs-panel-motion"
                  initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.28, ease: EASE_SMOOTH }}
                >
                  <h3 className="pf-exp-vtabs-title">
                    {activeExperience.role} @ {activeExperience.company}
                  </h3>
                  <p className="pf-exp-vtabs-meta">
                    {activeExperience.location} · {activeExperience.dateRange}
                  </p>
                  <ul className="pf-exp-vtabs-list">
                    {activeExperience.bullets.map((line, lineIndex) => (
                      <li key={`${activeExperience.id}-${lineIndex}`}>
                        <Check
                          className="pf-exp-vtabs-check"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  {activeExperience.tags.length > 0 ? (
                    <div className="pf-exp-vtabs-tags">
                      {activeExperience.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="pf-section" id="skills">
          <div className="pf-wrap">
            <motion.p className="pf-section-label" {...view} transition={inView(0)}>
              Toolbox
            </motion.p>
            <motion.h2 {...view} transition={inView(0.06)}>
              Skills
            </motion.h2>
            <div className="pf-skills-grid">
              {[
                {
                  icon: <Code2 strokeWidth={2} aria-hidden />,
                  title: 'Languages',
                  items: ['TypeScript', 'JavaScript', 'Python', 'C#'],
                },
                {
                  icon: <Layout strokeWidth={2} aria-hidden />,
                  title: 'Frontend',
                  items: [
                    'React — hooks, composition, scalable UI',
                    'Next.js — routing, SSR/Caching patterns',
                    'TypeScript-first components & hooks',
                    'Tailwind CSS & responsive layouts',
                    'Jest & React Testing Library',
                    'Accessibility & semantic HTML',
                  ],
                },
                {
                  icon: <Server strokeWidth={2} aria-hidden />,
                  title: 'Backend & cloud',
                  items: [
                    'Node.js & Express',
                    'Django',
                    'AWS Lambda, API Gateway, S3, DynamoDB',
                    'CloudWatch',
                    'Azure Functions & App Service',
                    'RBAC & Active Directory',
                  ],
                },
                {
                  icon: <Database strokeWidth={2} aria-hidden />,
                  title: 'Data & AI',
                  items: [
                    'MongoDB, Neo4j, MySQL, PostgreSQL',
                    'CosmosDB',
                    'Amazon Bedrock',
                    'LLM integration & RAG',
                    'Generative AI applications',
                  ],
                },
              ].map((block, index) => (
                <motion.div
                  key={block.title}
                  className="pf-skill-block"
                  {...view}
                  transition={inView(0.08 * index)}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                >
                  <h3>
                    {block.icon}
                    {block.title}
                  </h3>
                  <ul className="pf-skill-list">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="pf-section pf-section-alt" id="about">
          <div className="pf-wrap">
            <motion.p className="pf-section-label" {...view} transition={inView(0)}>
              A little more
            </motion.p>
            <motion.h2 {...view} transition={inView(0.06)}>
              My story
            </motion.h2>
            <div className="pf-story-grid">
              <motion.div
                className="pf-avatar-stack"
                {...view}
                transition={inView(0)}
                whileHover={reduceMotion ? undefined : { rotate: -1, scale: 1.02 }}
              >
                <div className="pf-avatar">
                  <Image
                    src="/profilephoto.jpg"
                    alt="Saugat Giri"
                    fill
                    sizes="(max-width: 768px) 160px, 174px"
                    className="pf-avatar-img"
                    priority={false}
                  />
                </div>
                <div className="pf-avatar-badge">
                  <MapPin strokeWidth={2} aria-hidden />
                  Melbourne
                </div>
              </motion.div>
              <div className="pf-prose">
                <motion.p {...view} transition={inView(0.04)}>
                  Fullstack engineer specializing in React, Node.js, and
                  cloud-native systems on AWS. I build applications that remain
                  fast, scalable, and observable as they grow.
                </motion.p>
                <motion.p {...view} transition={inView(0.1)}>
                  At Stormrake, I worked on on-chain analytics and Web3
                  interfaces; at The Data Foundry, I focus on serverless backends
                  and data pipelines.
                </motion.p>
                <motion.p {...view} transition={inView(0.16)}>
                  AWS/Azure Certified Developer with multiple cloud certifications, and
                  hands-on experience building GenAI features using LLMs and
                  Bedrock. I bring a balance of product thinking and strong
                  engineering fundamentals.
                </motion.p>
                <motion.div
                  className="pf-social"
                  {...view}
                  transition={inView(0.2)}
                >
                  <a
                    href={GITHUB_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github strokeWidth={2} aria-hidden />
                    GitHub
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin strokeWidth={2} aria-hidden />
                    LinkedIn
                  </a>
                  <a
                    href={SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink strokeWidth={2} aria-hidden />
                    Site
                  </a>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText strokeWidth={2} aria-hidden />
                    Resume
                  </a>
                  <a href="mailto:saugatgiri15@gmail.com">
                    <Mail strokeWidth={2} aria-hidden />
                    Email
                  </a>
                </motion.div>

                <div className="pf-certs">
                  <div className="pf-certs-glow" aria-hidden />
                  <div className="pf-certs-mesh" aria-hidden />
                  <div className="pf-certs-head">
                    <motion.h3 {...view} transition={inView(0)}>
                      Credentials
                    </motion.h3>
                    <motion.p
                      className="pf-certs-lede"
                      {...view}
                      transition={inView(0.04)}
                    >
                      Six certifications across Amazon Web Services and Microsoft
                      Azure — infra, data, and AI tracks.
                    </motion.p>
                    <motion.div
                      className="pf-certs-provider-strip"
                      {...view}
                      transition={inView(0.08)}
                      aria-label="Cloud providers"
                    >
                      <span className="pf-certs-provider-chip pf-certs-provider-chip--aws">
                        <span className="pf-certs-provider-dot" /> AWS
                      </span>
                      <span className="pf-certs-provider-arc" aria-hidden />
                      <span className="pf-certs-provider-chip pf-certs-provider-chip--azure">
                        <span className="pf-certs-provider-dot" /> Azure
                      </span>
                    </motion.div>
                  </div>

                  <div className="pf-certs-board">
                    <motion.div
                      className="pf-certs-lane pf-certs-lane--aws"
                      {...view}
                      transition={inView(0.12)}
                    >
                      <div className="pf-certs-lane-head">
                        <div
                          className="pf-certs-lane-mark pf-certs-lane-mark--aws"
                          aria-hidden
                        />
                        <div className="pf-certs-lane-titles">
                          <span className="pf-certs-lane-name">
                            Amazon Web Services
                          </span>
                          <span className="pf-certs-lane-tagline">
                            Serverless, CI/CD, &amp; AI on AWS
                          </span>
                        </div>
                      </div>
                      <div className="pf-certs-grid pf-certs-grid--lane">
                        {STORY_CERTS.filter((c) => c.cls === 'aws').map(
                          (cert, i) => (
                            <motion.div
                              key={cert.name}
                              className="pf-cert"
                              {...view}
                              transition={inView(0.04 + 0.05 * i)}
                              whileHover={
                                reduceMotion ? undefined : { y: -2 }
                              }
                            >
                              <div className={`pf-cert-icon ${cert.cls}`}>
                                {cert.icon}
                              </div>
                              <div className="pf-cert-meta">
                                <span className="pf-cert-name">{cert.name}</span>
                                <span className="pf-cert-year">{cert.year}</span>
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      className="pf-certs-lane pf-certs-lane--azure"
                      {...view}
                      transition={inView(0.16)}
                    >
                      <div className="pf-certs-lane-head">
                        <div
                          className="pf-certs-lane-mark pf-certs-lane-mark--azure"
                          aria-hidden
                        />
                        <div className="pf-certs-lane-titles">
                          <span className="pf-certs-lane-name">
                            Microsoft Azure
                          </span>
                          <span className="pf-certs-lane-tagline">
                            Azure apps, data &amp; AI fundamentals
                          </span>
                        </div>
                      </div>
                      <div className="pf-certs-grid pf-certs-grid--lane">
                        {STORY_CERTS.filter((c) => c.cls === 'azure').map(
                          (cert, i) => (
                            <motion.div
                              key={cert.name}
                              className="pf-cert"
                              {...view}
                              transition={inView(0.04 + 0.05 * i)}
                              whileHover={
                                reduceMotion ? undefined : { y: -2 }
                              }
                            >
                              <div className={`pf-cert-icon ${cert.cls}`}>
                                {cert.icon}
                              </div>
                              <div className="pf-cert-meta">
                                <span className="pf-cert-name">{cert.name}</span>
                                <span className="pf-cert-year">{cert.year}</span>
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pf-section" id="contact">
          <div className="pf-wrap">
            <motion.div
              className="pf-cta-band"
              {...view}
              transition={inView(0)}
              whileHover={
                reduceMotion ? undefined : { scale: 1.008 }
              }
            >
              <div className="pf-cta-inner">
                <h2>Interested in working together?</h2>
                <p>
                  Open to full-stack and cloud engineering roles in Melbourne or
                  remote. Tell me what you&apos;re building.
                </p>
                <div className="pf-cta-row">
                  <a href="mailto:saugatgiri15@gmail.com" className="pf-btn-primary">
                    <Mail strokeWidth={2} aria-hidden />
                    Email me
                  </a>
                  <a href="#projects" className="pf-btn-ghost">
                    <FolderOpen strokeWidth={2} aria-hidden />
                    See projects
                  </a>
                </div>
                <a
                  href="mailto:saugatgiri15@gmail.com"
                  className="pf-cta-email"
                >
                  <Send strokeWidth={2} aria-hidden />
                  saugatgiri15@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              className="pf-social pf-social--center"
              {...view}
              transition={inView(0.08)}
            >
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin strokeWidth={2} aria-hidden />
                LinkedIn
              </a>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github strokeWidth={2} aria-hidden />
                GitHub
              </a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                <FileText strokeWidth={2} aria-hidden />
                Resume
              </a>
              <a href="tel:0452654702">
                <Phone strokeWidth={2} aria-hidden />
                0452-654-702
              </a>
            </motion.div>
          </div>
        </section>

        <motion.footer
          className="pf-footer"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={inView(0)}
        >
          <div className="pf-footer-inner">
            <span>© 2026 Saugat Giri</span>
            <span className="pf-footer-loc">
              <MapPin strokeWidth={2} aria-hidden />
              Melbourne, VIC, Australia
            </span>
          </div>
        </motion.footer>
      </div>
    </>
  );
}

export default memo(Home);
