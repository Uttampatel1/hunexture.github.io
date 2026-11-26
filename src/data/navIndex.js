// Slim index of the data the always-loaded UI (navbar, home sections) needs.
// Full records live in the *Data.js files and load only with their route chunks.
import { FaBalanceScale, FaBasketballBall, FaBrain, FaBullhorn, FaChartLine, FaCloud, FaCode, FaCodeBranch, FaCogs, FaCreditCard, FaDatabase, FaEye, FaGraduationCap, FaHardHat, FaHeartbeat, FaIndustry, FaInstagram, FaLayerGroup, FaMagic, FaMicrochip, FaMobile, FaNetworkWired, FaPaintBrush, FaPlane, FaProjectDiagram, FaRobot, FaShieldAlt, FaShoppingBag, FaShoppingCart, FaSpa, FaStar, FaStore, FaTruck, FaVideo, FaWifi } from 'react-icons/fa'

export const industriesNav = [
  { slug: "healthcare", name: "Healthcare", shortDescription: "Digital transformation for modern healthcare", icon: FaHeartbeat },
  { slug: "legal", name: "Legal", shortDescription: "Technology solutions for law firms", icon: FaBalanceScale },
  { slug: "logistics", name: "Logistics", shortDescription: "Smart solutions for supply chain management", icon: FaTruck },
  { slug: "education", name: "Education", shortDescription: "EdTech solutions for modern learning", icon: FaGraduationCap },
  { slug: "media-ott", name: "Media & OTT", shortDescription: "Streaming and content delivery platforms", icon: FaVideo },
  { slug: "travel", name: "Travel", shortDescription: "Digital solutions for travel and hospitality", icon: FaPlane },
  { slug: "retail", name: "Retail", shortDescription: "E-commerce and retail technology", icon: FaShoppingBag },
  { slug: "construction", name: "Construction", shortDescription: "Construction management solutions", icon: FaHardHat },
  { slug: "sports", name: "Sports", shortDescription: "Sports technology and fan engagement", icon: FaBasketballBall },
  { slug: "marketplace", name: "Marketplace", shortDescription: "Multi-vendor marketplace platforms", icon: FaStore },
  { slug: "finance", name: "Finance", shortDescription: "FinTech and banking solutions", icon: FaCreditCard },
  { slug: "social-media", name: "Social Media", shortDescription: "Social networking and community platforms", icon: FaInstagram },
  { slug: "insurance", name: "Insurance", shortDescription: "Insurance technology solutions", icon: FaShieldAlt },
  { slug: "manufacturing", name: "Manufacturing", shortDescription: "Industry 4.0 and smart manufacturing", icon: FaIndustry },
  { slug: "it-telecom", name: "IT & Telecom", shortDescription: "Telecom and IT infrastructure solutions", icon: FaWifi },
  { slug: "beauty-lifestyle", name: "Beauty & Lifestyle", shortDescription: "Beauty and wellness technology", icon: FaSpa },
  { slug: "on-demand", name: "On Demand", shortDescription: "On-demand service platforms", icon: FaStar },
  { slug: "ecommerce", name: "E-Commerce", shortDescription: "Full-stack e-commerce solutions", icon: FaShoppingCart },
]

export const aiNav = [
  { slug: "custom-ai-services", name: "Custom AI Services", shortDescription: "Tailored AI solutions for your specific business needs.", icon: FaRobot },
  { slug: "nlp-solutions", name: "NLP Solutions", shortDescription: "Advanced Natural Language Processing systems.", icon: FaLayerGroup },
  { slug: "computer-vision-services", name: "Computer Vision Services", shortDescription: "Empowering machines to see and understand visual data.", icon: FaEye },
  { slug: "generative-ai-solutions", name: "Generative AI Solutions", shortDescription: "Create new content, designs, and code with AI.", icon: FaMagic },
  { slug: "data-science-analytics", name: "Data Science & Analytics", shortDescription: "Turn your raw data into actionable business intelligence.", icon: FaChartLine },
  { slug: "ai-tech-stack", name: "AI Tech Stack", shortDescription: "Optimized infrastructure for AI workloads.", icon: FaCodeBranch },
  { slug: "ai-agents", name: "AI Agents", shortDescription: "Autonomous agents capable of complex tasks.", icon: FaCogs },
  { slug: "ai-operations", name: "AI Operations (AI Ops)", shortDescription: "Streamline the lifecycle of your AI models.", icon: FaProjectDiagram },
  { slug: "machine-learning", name: "Machine Learning", shortDescription: "Core ML model development and deployment.", icon: FaBrain },
  { slug: "ai-ml-overview", name: "AI & ML Overview", shortDescription: "Strategic consulting and roadmap development for AI.", icon: FaNetworkWired },
  { slug: "transform-business", name: "Transform Business", shortDescription: "Enterprise-wide digital transformation with AI.", icon: FaMicrochip },
  { slug: "ai-ml-models", name: "AI & ML Models", shortDescription: "Pre-trained and custom model hosting.", icon: FaDatabase },
]

export const servicesNav = [
  { slug: "ai-solutions", title: "AI Solutions", shortDescription: "Custom ML models and intelligent automation solutions", features: ["Machine Learning","Neural Networks","Predictive Analytics","Computer Vision"], icon: FaBrain },
  { slug: "web-development", title: "Web Development", shortDescription: "High-performance web applications with modern frameworks", features: ["React/Vue/Angular","Full-Stack Development","Progressive Web Apps","API Integration"], icon: FaCode },
  { slug: "app-development", title: "App Development", shortDescription: "Native and cross-platform mobile experiences", features: ["iOS & Android","React Native","Flutter","Native Performance"], icon: FaMobile },
  { slug: "cloud-integration", title: "Cloud Integration", shortDescription: "Scalable cloud-native solutions and DevOps", features: ["AWS/Azure/GCP","Microservices","DevOps & CI/CD","Serverless Architecture"], icon: FaCloud },
  { slug: "uiux-design", title: "UI/UX Design", shortDescription: "Beautiful, intuitive user experiences", features: ["User Research","Prototyping","Design Systems","Usability Testing"], icon: FaPaintBrush },
  { slug: "digital-marketing", title: "Digital Marketing", shortDescription: "Data-driven marketing strategies that deliver results", features: ["SEO & SEM","Social Media Marketing","Content Marketing","Analytics & Reporting"], icon: FaBullhorn },
]

export const portfolioNav = [
  { id: 1, slug: "ai-powered-analytics-platform", title: "AI-Powered Analytics Platform", category: "ai", categoryLabel: "AI Solutions", shortDescription: "Enterprise-level analytics platform with machine learning predictions and real-time insights.", tags: ["Python","TensorFlow","React","AWS"] },
  { id: 2, slug: "ecommerce-mobile-app", title: "E-Commerce Mobile App", category: "mobile", categoryLabel: "Mobile Apps", shortDescription: "Cross-platform shopping app with AR product visualization and seamless checkout experience.", tags: ["React Native","Node.js","MongoDB","Stripe"] },
  { id: 3, slug: "cloud-infrastructure-dashboard", title: "Cloud Infrastructure Dashboard", category: "cloud", categoryLabel: "Cloud Services", shortDescription: "Comprehensive monitoring and management dashboard for multi-cloud environments.", tags: ["Vue.js","Docker","Kubernetes","Azure"] },
  { id: 4, slug: "healthcare-management-system", title: "Healthcare Management System", category: "web", categoryLabel: "Web Apps", shortDescription: "HIPAA-compliant patient management platform with telemedicine capabilities.", tags: ["React","GraphQL","PostgreSQL","WebRTC"] },
  { id: 5, slug: "smart-home-iot-platform", title: "Smart Home IoT Platform", category: "ai", categoryLabel: "AI Solutions", shortDescription: "Intelligent home automation system with voice control and predictive learning.", tags: ["IoT","Python","MQTT","React"] },
  { id: 6, slug: "financial-trading-app", title: "Financial Trading App", category: "mobile", categoryLabel: "Mobile Apps", shortDescription: "Real-time trading platform with advanced charting and portfolio management.", tags: ["Flutter","WebSocket","Redis","Golang"] },
  { id: 7, slug: "ecommerce-digital-marketing-campaign", title: "E-Commerce Digital Marketing Campaign", category: "marketing", categoryLabel: "Digital Marketing", shortDescription: "Multi-channel marketing campaign that drove 300% revenue growth for online retailer.", tags: ["SEO","Google Ads","Social Media","Content Marketing"] },
  { id: 8, slug: "fintech-trading-dashboard", title: "FinTech Alpha Dashboard", category: "web", categoryLabel: "Web Apps", shortDescription: "Real-time cryptocurrency and options trading dashboard with dark-mode optimized charts.", tags: ["React","TypeScript","WebSockets","Tailwind"] },
  { id: 9, slug: "ai-supply-chain", title: "Smart Supply Chain Optimizer", category: "ai", categoryLabel: "AI Solutions", shortDescription: "Computer vision and predictive modeling system for automated warehouse logistics.", tags: ["Python","Docker","OpenCV","GCP"] },
  { id: 10, slug: "rag-knowledge-assistant", title: "Enterprise Knowledge Assistant (RAG)", category: "ai", categoryLabel: "AI Solutions", shortDescription: "Chat assistant that answers from company documents with cited sources and role-based access.", tags: ["Python","LangChain","pgvector","OpenAI"] },
  { id: 11, slug: "ai-agent-support-copilot", title: "Support Copilot with AI Agents", category: "ai", categoryLabel: "AI Solutions", shortDescription: "Agents that triage tickets, draft replies and take approved actions in the help desk.", tags: ["Python","Agents","Guardrails","AWS"] },
  { id: 12, slug: "telehealth-fhir-app", title: "Telehealth App with FHIR Records", category: "mobile", categoryLabel: "Mobile Apps", shortDescription: "Patient app for video visits, prescriptions and records, built on HL7 FHIR.", tags: ["React Native","FHIR","WebRTC","AWS"] },
  { id: 13, slug: "saas-billing-platform", title: "Multi-tenant SaaS Billing Platform", category: "web", categoryLabel: "Web Apps", shortDescription: "Usage-based billing, invoicing and a customer portal for a B2B software product.", tags: ["React","Node.js","Stripe","PostgreSQL"] },
  { id: 14, slug: "platform-engineering-finops", title: "Kubernetes Platform and FinOps Dashboard", category: "cloud", categoryLabel: "Cloud Solutions", shortDescription: "Internal platform with self-service environments and cloud cost visibility per team.", tags: ["Kubernetes","Terraform","GitOps","AWS"] },
  { id: 15, slug: "ai-seo-content-engine", title: "AI-assisted SEO and Content Engine", category: "marketing", categoryLabel: "Digital Marketing", shortDescription: "Topic research, briefs and a publishing workflow that keeps human editors in charge.", tags: ["SEO","Analytics","Python","GA4"] },
  { id: 16, slug: "visual-quality-inspection", title: "Visual Quality Inspection on the Line", category: "ai", categoryLabel: "AI Solutions", shortDescription: "Camera-based defect detection for a packaging line, running on edge devices.", tags: ["Python","OpenCV","TensorFlow","Edge"] },
  { id: 17, slug: "voice-agent-appointments", title: "Voice Agent for Appointment Booking", category: "ai", categoryLabel: "AI Solutions", shortDescription: "Phone assistant that books, moves and cancels appointments in English and Hindi.", tags: ["Python","Speech AI","WebRTC","Redis"] },
  { id: 18, slug: "b2b-wholesale-marketplace", title: "B2B Wholesale Marketplace", category: "web", categoryLabel: "Web Apps", shortDescription: "Ordering portal with tiered pricing, credit terms and reorder in one click.", tags: ["Next.js","TypeScript","PostgreSQL","Stripe"] },
  { id: 19, slug: "contract-lifecycle-portal", title: "Contract Lifecycle Portal", category: "web", categoryLabel: "Web Apps", shortDescription: "Request, review, sign and track contracts with clause search and renewal alerts.", tags: ["React","Node.js","Search","e-Sign"] },
  { id: 20, slug: "driver-app-proof-of-delivery", title: "Driver App with Proof of Delivery", category: "mobile", categoryLabel: "Mobile Apps", shortDescription: "Offline-first app for routes, scanning, photos and signatures.", tags: ["Flutter","Offline","Maps","Node.js"] },
  { id: 21, slug: "fitness-habit-app", title: "Fitness and Habit Coaching App", category: "mobile", categoryLabel: "Mobile Apps", shortDescription: "Training plans, wearable sync and coach chat in one subscription app.", tags: ["React Native","HealthKit","Stripe","Firebase"] },
  { id: 22, slug: "data-lakehouse-analytics", title: "Cloud Data Lakehouse and BI", category: "cloud", categoryLabel: "Cloud Solutions", shortDescription: "One governed data platform feeding dashboards, forecasts and AI features.", tags: ["AWS","Spark","dbt","Terraform"] },
  { id: 23, slug: "conversion-rate-optimisation", title: "Conversion Rate Optimisation Program", category: "marketing", categoryLabel: "Digital Marketing", shortDescription: "Research-led testing program for a lead-generation website.", tags: ["GA4","A/B Testing","Analytics","UX Research"] },
]

// Hand-picked Lab posts for the home teaser (kept tiny so the main bundle
// doesn't pull in the full blogData).
export const featuredLab = [
  { slug: 'gradient-descent', title: 'Gradient Descent Visualizer', category: 'Machine Learning', description: 'Watch the algorithm follow the gradient downhill to the minimum of the loss.', art: 'descent' },
  { slug: 'logistic-regression-3d', title: 'Logistic Regression', category: 'Machine Learning', description: 'See how the sigmoid turns a linear score into a probability.', art: 'sigmoid' },
  { slug: '3d-dot-product', title: '3D Dot Product', category: 'Linear Algebra', description: 'Visualize how the angle between two vectors drives their dot product.', art: 'vectors' },
]
