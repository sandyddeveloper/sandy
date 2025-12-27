import dynamic from "next/dynamic"
import { Database, Server, GitBranch, Boxes } from "lucide-react"

/* ================= ICONS ================= */

const ReactIcon = dynamic(() => import("react-icons/fa").then(m => m.FaReact), { ssr: false })
const HtmlIcon = dynamic(() => import("react-icons/fa").then(m => m.FaHtml5), { ssr: false })
const CssIcon = dynamic(() => import("react-icons/fa").then(m => m.FaCss3Alt), { ssr: false })
const JsIcon = dynamic(() => import("react-icons/fa").then(m => m.FaJs), { ssr: false })
const PythonIcon = dynamic(() => import("react-icons/fa").then(m => m.FaPython), { ssr: false })

const TsIcon = dynamic(() => import("react-icons/si").then(m => m.SiTypescript), { ssr: false })
const NextIcon = dynamic(() => import("react-icons/si").then(m => m.SiNextdotjs), { ssr: false })
const TwIcon = dynamic(() => import("react-icons/si").then(m => m.SiTailwindcss), { ssr: false })
const DjangoIcon = dynamic(() => import("react-icons/si").then(m => m.SiDjango), { ssr: false })
const FlaskIcon = dynamic(() => import("react-icons/si").then(m => m.SiFlask), { ssr: false })
const MysqlIcon = dynamic(() => import("react-icons/si").then(m => m.SiMysql), { ssr: false })
const DockerIcon = dynamic(() => import("react-icons/si").then(m => m.SiDocker), { ssr: false })
const ViteIcon = dynamic(() => import("react-icons/si").then(m => m.SiVite), { ssr: false })
const VercelIcon = dynamic(() => import("react-icons/si").then(m => m.SiVercel), { ssr: false })
const FigmaIcon = dynamic(() => import("react-icons/si").then(m => m.SiFigma), { ssr: false })
const CanvaIcon = dynamic(() => import("react-icons/si").then(m => m.SiCanva), { ssr: false })
const PostmanIcon = dynamic(() => import("react-icons/si").then(m => m.SiPostman), { ssr: false })
const JwtIcon = dynamic(() => import("react-icons/si").then(m => m.SiJsonwebtokens), { ssr: false })
const BootstrapIcon = dynamic(() => import("react-icons/si").then(m => m.SiBootstrap), { ssr: false })
const MotionIcon = dynamic(() => import("react-icons/si").then(m => m.SiFramer), { ssr: false })

/* ================= TECH STACK ================= */

export const techStackData = [
  /* ---------- FRONTEND ---------- */
  {
    id: 1,
    name: "React",
    category: "frontend",
    description: "Component-based frontend library for building interactive and scalable using hooks and reusable patterns.",
    icon: ReactIcon,
  },
  {
    id: 2,
    name: "Next.js",
    category: "frontend",
    description: "React framework for server-side rendering, routing, and full-stack web applications with excellent performance.",
    icon: NextIcon,
  },
  {
    id: 3,
    name: "JavaScript",
    category: "frontend",
    description: "Core scripting language for building dynamic, interactive web applications across browsers.",
    icon: JsIcon,
  },
  {
    id: 4,
    name: "TypeScript",
    category: "frontend",
    description: "Strongly typed superset of JavaScript that improves maintainability and reduces runtime errors.",
    icon: TsIcon,
  },
  {
    id: 5,
    name: "HTML5",
    category: "frontend",
    description: "Semantic markup language used to structure modern, accessible, and SEO-friendly web pages.",
    icon: HtmlIcon,
  },
  {
    id: 6,
    name: "CSS3",
    category: "frontend",
    description: "Styling language for layouts, animations, responsive design, and modern UI effects.",
    icon: CssIcon,
  },
  {
    id: 7,
    name: "Tailwind CSS",
    category: "frontend",
    description: "Utility-first CSS framework for rapidly building responsive and consistent user interfaces.",
    icon: TwIcon,
  },
  {
    id: 8,
    name: "Bootstrap",
    category: "frontend",
    description: "CSS framework for building responsive layouts with prebuilt components and grid system.",
    icon: BootstrapIcon,
  },
  {
    id: 9,
    name: "Framer Motion",
    category: "frontend",
    description: "Animation library for React used to create smooth, performant UI transitions and interactions.",
    icon: MotionIcon,
  },

  /* ---------- BACKEND ---------- */
  {
    id: 10,
    name: "Python",
    category: "backend",
    description: "High-level programming language used for backend development, automation, and API services.",
    icon: PythonIcon,
  },
  {
    id: 11,
    name: "Django",
    category: "backend",
    description: "Full-featured Python web framework for building secure, scalable, and maintainable backend systems.",
    icon: DjangoIcon,
  },
  {
    id: 12,
    name: "Flask",
    category: "backend",
    description: "Lightweight Python micro-framework for building REST APIs and small backend services.",
    icon: FlaskIcon,
  },
  {
    id: 13,
    name: "REST API",
    category: "backend",
    description: "Architectural style for designing scalable APIs using HTTP methods and stateless communication.",
    icon: Server,
  },
  {
    id: 14,
    name: "JWT Authentication",
    category: "backend",
    description: "Token-based authentication mechanism used to secure APIs and manage user sessions.",
    icon: JwtIcon,
  },

  /* ---------- DATABASE ---------- */
  {
    id: 15,
    name: "PostgreSQL",
    category: "database",
    description: "Advanced open-source relational database known for performance, reliability, and scalability.",
    icon: Database,
  },
  {
    id: 16,
    name: "MySQL",
    category: "database",
    description: "Popular relational database system widely used for web applications and backend services.",
    icon: MysqlIcon,
  },

  /* ---------- TOOLING / DEVOPS ---------- */
  {
    id: 17,
    name: "Git",
    category: "tooling",
    description: "Distributed version control system for managing code history and collaborative workflows.",
    icon: GitBranch,
  },
  {
    id: 18,
    name: "Docker",
    category: "tooling",
    description: "Containerization platform used to package applications with their dependencies for consistent deployment.",
    icon: DockerIcon,
  },
  {
    id: 19,
    name: "Vite",
    category: "tooling",
    description: "Modern frontend build tool offering fast development server and optimized production builds.",
    icon: ViteIcon,
  },
  {
    id: 20,
    name: "Vercel",
    category: "tooling",
    description: "Cloud platform for deploying frontend and full-stack applications with CI/CD and edge features.",
    icon: VercelIcon,
  },
  {
    id: 21,
    name: "Postman",
    category: "tooling",
    description: "API development and testing tool used to design, test, and debug RESTful services.",
    icon: PostmanIcon,
  },
  {
    id: 22,
    name: "Figma",
    category: "tooling",
    description: "UI/UX design tool for creating wireframes, prototypes, and collaborative design systems.",
    icon: FigmaIcon,
  },
  {
    id: 23,
    name: "Canva",
    category: "tooling",
    description: "Design tool used for creating visuals, banners, visiting card and marketing graphics quickly.",
    icon: CanvaIcon,
  },
  {
    id: 24,
    name: "ShadCN UI",
    category: "tooling",
    description: "Modern, accessible component library built on Tailwind CSS for clean and consistent UI design.",
    icon: Boxes,
  },
] as const

export type TechItem = typeof techStackData[number]

/* ================= EDUCATION ================= */

export const educationData = [
  {
    id: 1,
    degree: "BCA – Bachelor of Computer Applications",
    institution: "Agurchand Manmull Jain College",
    year: "2024",
    description:
      "Focused on computer science fundamentals, web development, software engineering, databases, and practical project work. Graduated with CGPA 8.4.",
  },
  {
    id: 2,
    degree: "HSC – Computer Science",
    institution: "St. John’s Matriculation Higher Secondary School",
    year: "2021",
    description:
      "Studied Computer Science, Mathematics, and Physics with emphasis on programming basics and logical problem solving.",
  },
] as const

export type EducationItem = typeof educationData[number]
