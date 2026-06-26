import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { Compass, Layers, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CardStack } from "@/components/ui/card-stack"
import { TestimonialsSection } from "@/components/ui/testimonial-v2"
import { SpotlightDotBackground } from "@/components/ui/spotlight-dot-background"

function Home() {
  const navigate = useNavigate()
  const [showGrid, setShowGrid] = useState(true)
  const [currentView, setCurrentView] = useState("work") // "work" or "about"
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: ""
  })

  const shouldReduceMotion = useReducedMotion()

  const customTransition = {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1]
  }

  const revealVariants = (shouldReduce) => ({
    hidden: { opacity: 0, y: shouldReduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: customTransition
    }
  })

  const titleLineVariants = (shouldReduce) => ({
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  })

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  }

  // Keyboard listener to toggle vertical grid lines with 'g' key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setShowGrid((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save to local storage for the dashboard stats
    const existing = JSON.parse(localStorage.getItem("growaz_inquiries") || "[]")
    const newInquiry = { ...formData, service: selectedService, date: new Date().toISOString() }
    localStorage.setItem("growaz_inquiries", JSON.stringify([...existing, newInquiry]))

    setFormSubmitted(true)
    setTimeout(() => {
      setIsDialogOpen(false)
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: "", email: "", details: "" })
        setSelectedService("")
      }, 300)
    }, 2000)
  }

  const handleNavClick = (viewName, scrollToId = null) => {
    if (currentView !== viewName) {
      setCurrentView(viewName)
      if (scrollToId) {
        setTimeout(() => {
          const element = document.getElementById(scrollToId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 120)
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      if (scrollToId) {
        const element = document.getElementById(scrollToId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  const services = [
    {
      id: "service-brand",
      number: "01",
      title: "Brand Strategy",
      tags: ["Development", "Brand Guidelines", "Analysis", "Rebranding Services"]
    },
    {
      id: "service-web",
      number: "02",
      title: "Web Design",
      tags: ["Development", "Custom Website", "Web Solutions", "Responsive Web"]
    },
    {
      id: "service-digital",
      number: "03",
      title: "Digital Marketing",
      tags: ["Email Marketing", "Pay-Per-Click", "SEO", "Social Media"]
    },
    {
      id: "service-ui",
      number: "04",
      title: "UI/UX Design",
      tags: ["User Interface", "Wireframing", "Analysis", "Mobile App UI"]
    }
  ]

  const base = import.meta.env.BASE_URL

  const galleryItems = [
    {
      id: "gallery-1",
      title: "Kinetic Forms Poster",
      description: "Poster design research exploring typographic architecture, Zurich Neue Moderne.",
      tag: "Typographic Poster Research",
      imageSrc: `${base}gallery_project_1.png`,
      href: `${base}gallery_project_1.png`
    },
    {
      id: "gallery-2",
      title: "Modernist Columns Study",
      description: "Structural modernist form and concrete support research, Munich Brutalist Exhibition.",
      tag: "Brutalist Form Exploration",
      imageSrc: `${base}gallery_project_2.png`,
      href: `${base}gallery_project_2.png`
    },
    {
      id: "gallery-3",
      title: "Bold Editorial Layout",
      description: "A high-contrast conceptual Swiss layout design for a digital publication canvas.",
      tag: "Conceptual UI Grid",
      imageSrc: `${base}project_direction_a.png`,
      href: `${base}project_direction_a.png`
    },
    {
      id: "gallery-4",
      title: "Calm & Premium Interface",
      description: "A serene, gallery-like architecture portfolio layout emphasizing asymmetric margins.",
      tag: "Architecture Web Design",
      imageSrc: `${base}project_direction_b.png`,
      href: `${base}project_direction_b.png`
    },
    {
      id: "gallery-5",
      title: "High-Energy Kinetic Web Portal",
      description: "Motion-forward digital experience featuring saturated glow outlines and marquee loops.",
      tag: "Interactive Design Layout",
      imageSrc: `${base}project_direction_c.png`,
      href: `${base}project_direction_c.png`
    }
  ]

  return (
    <>
      <SpotlightDotBackground />
      {/* ═══════════════════════════════════════════════════
           VISIBLE GRID OVERLAY
           ═══════════════════════════════════════════════════ */}
      {showGrid && (
        <div className="grid-overlay" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} />
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
           NAVIGATION BAR
           ═══════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-rule mb-16">
        <nav className="max-w-[var(--container-max)] mx-auto px-[var(--container-pad)] flex justify-between items-center py-5" id="nav">
          <button
            onClick={() => handleNavClick("work")}
            className="text-lg font-bold tracking-tight text-foreground bg-transparent border-0 cursor-pointer"
          >
            Growaz.
          </button>
          <div className="flex gap-4 md:gap-8 flex-wrap justify-end">
            <button
              onClick={() => handleNavClick("about")}
              className={`text-xs md:text-sm font-medium uppercase tracking-widest relative pb-2 transition-colors cursor-pointer bg-transparent border-0 ${
                currentView === "about"
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-accent"
                  : "text-muted-foreground hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("work")}
              className={`text-xs md:text-sm font-medium uppercase tracking-widest relative pb-2 transition-colors cursor-pointer bg-transparent border-0 ${
                currentView === "work"
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-accent"
                  : "text-muted-foreground hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              }`}
            >
              Work
            </button>
            <button
              onClick={() => navigate("/case-studies")}
              className="text-xs md:text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full transition-colors cursor-pointer bg-transparent border-0"
            >
              Case Studies
            </button>
            <button
              onClick={() => {
                setSelectedService("General Inquiry")
                setIsDialogOpen(true)
              }}
              className="text-xs md:text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full transition-colors cursor-pointer bg-transparent border-0"
            >
              Contact
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="text-xs md:text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full transition-colors cursor-pointer bg-transparent border-0"
            >
              Admin
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-[var(--container-max)] mx-auto px-[var(--container-pad)] relative z-[1]">
        {currentView === "work" ? (
          /* ═══════════════════════════════════════════════════
               WORK / HOME VIEW
             ═══════════════════════════════════════════════════ */
          <>
            {/* HERO SECTION */}
            <section className="grid grid-cols-12 gap-[var(--grid-gap)] pt-6 pb-16 overflow-hidden" id="hero">
              <motion.p
                initial="hidden"
                animate="visible"
                variants={revealVariants(shouldReduceMotion)}
                className="col-span-12 md:col-span-6 text-sm font-bold uppercase tracking-wider text-muted-foreground self-end"
              >
                Digital Design Agency
              </motion.p>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={revealVariants(shouldReduceMotion)}
                className="col-span-12 md:col-span-3 md:col-start-10 text-sm font-bold uppercase tracking-wider text-faint text-left md:text-right self-end"
              >
                Est. 2024
              </motion.p>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
                className="col-span-12 md:col-span-8 text-5xl md:text-8xl font-bold leading-[0.88] tracking-[-0.045em] uppercase text-left mt-6 mb-10"
              >
                <motion.span className="block" variants={titleLineVariants(shouldReduceMotion)}>
                  Designing
                </motion.span>
                <motion.span className="block" variants={titleLineVariants(shouldReduceMotion)}>
                  Digital
                </motion.span>
                <motion.span className="block text-accent" variants={titleLineVariants(shouldReduceMotion)}>
                  Futures
                </motion.span>
              </motion.h1>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={revealVariants(shouldReduceMotion)}
                className="col-span-12 md:col-span-4 md:col-start-9 md:row-start-2 flex justify-end items-center mt-4 md:mt-0"
              >
                <motion.img
                  src={`${base}hero_illustration.png`}
                  alt="Design Systems Illustration"
                  animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                  transition={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                          default: customTransition
                        }
                  }
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2, boxShadow: "4px 4px 0px #0C0C0C" }}
                  className="w-full max-w-[320px] aspect-square object-cover border-2 border-foreground bg-white relative z-10 shadow-none select-none pointer-events-none"
                />
              </motion.div>

              <motion.p
                initial="hidden"
                animate="visible"
                variants={revealVariants(shouldReduceMotion)}
                className="col-span-12 md:col-span-5 text-lg font-normal leading-relaxed text-muted-foreground text-left self-start pt-1"
              >
                Transforming ideas into reality. Crafting the digital future, one design at a time with innovation and precision.
              </motion.p>

              {/* Floating Glyphs Block */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={revealVariants(shouldReduceMotion)}
                className="col-span-12 md:col-span-3 md:col-start-6 flex justify-around items-start mt-6 md:mt-0 px-2"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: 6, color: "var(--color-accent)", borderColor: "var(--color-accent)" }}
                  className="border border-border p-3 bg-transparent text-foreground flex items-center justify-center cursor-pointer transition-colors w-12 h-12"
                  title="Brand Strategy & Positioning"
                >
                  <Compass className="size-5 shrink-0" />
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: -6, color: "var(--color-accent)", borderColor: "var(--color-accent)" }}
                  className="border border-border p-3 bg-transparent text-foreground flex items-center justify-center cursor-pointer transition-colors w-12 h-12"
                  title="Design Architecture & Systems"
                >
                  <Layers className="size-5 shrink-0" />
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: 6, color: "var(--color-accent)", borderColor: "var(--color-accent)" }}
                  className="border border-border p-3 bg-transparent text-foreground flex items-center justify-center cursor-pointer transition-colors w-12 h-12"
                  title="Digital Performance & Scale"
                >
                  <Zap className="size-5 shrink-0" />
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={revealVariants(shouldReduceMotion)}
                className="col-span-12 md:col-span-3 md:col-start-10 flex md:justify-end md:items-start mt-6 md:mt-0"
              >
                <motion.div
                  className="w-full md:w-auto"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2, boxShadow: "3px 3px 0px #0C0C0C" }}
                  transition={customTransition}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto h-auto py-3 px-7 border-2 border-foreground bg-transparent text-sm font-semibold uppercase tracking-wider rounded-none hover:bg-foreground hover:text-background transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                    onClick={() => {
                      setSelectedService("General Inquiry")
                      setIsDialogOpen(true)
                    }}
                  >
                    Get Started&ensp;→
                  </Button>
                </motion.div>
              </motion.div>
            </section>

            <hr className="border-none h-[2px] bg-rule w-full" />

            {/* SERVICES SECTION */}
            <section className="py-12" id="services">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={revealVariants(shouldReduceMotion)}
                className="flex justify-between items-baseline pb-7"
              >
                <h2 className="text-4xl font-bold uppercase tracking-tight">Services</h2>
                <span className="text-4xl font-light text-faint">01</span>
              </motion.div>

              <hr className="border-none h-[1px] bg-rule-light w-full" />

              <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-9 gap-6 lg:gap-8"
              >
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={revealVariants(shouldReduceMotion)}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4, x: -2, boxShadow: "3px 3px 0px #0C0C0C" }}
                    transition={customTransition}
                    className="bg-white relative z-10 border border-rule-light rounded-none p-6 flex flex-col justify-between h-full group transition-all"
                  >
                    <div>
                      <span className="block text-sm font-normal text-faint tracking-widest mb-8">{service.number}</span>
                      <CardHeader className="p-0 mb-7">
                        <CardTitle className="text-2xl font-bold leading-tight tracking-tight uppercase text-left whitespace-pre-line">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="w-full">
                          {service.tags.map((tag, tagIndex) => (
                            <li
                              key={tagIndex}
                              className="text-sm font-normal text-muted-foreground py-2 border-b border-rule-light last:border-b-0"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                    <CardFooter className="p-0 pt-6 mt-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 text-xs font-bold uppercase tracking-widest text-foreground hover:text-accent hover:bg-transparent transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedService(service.title)
                          setIsDialogOpen(true)
                        }}
                      >
                        Inquire&ensp;→
                      </Button>
                    </CardFooter>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <hr className="border-none h-[2px] bg-rule w-full" />

            {/* STUDIO TABS SHOWCASE */}
            <section className="py-12" id="studio-hub">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={revealVariants(shouldReduceMotion)}
                className="flex justify-between items-baseline pb-7"
              >
                <h2 className="text-4xl font-bold uppercase tracking-tight">Studio Focus</h2>
                <span className="text-4xl font-light text-faint">02</span>
              </motion.div>

              <hr className="border-none h-[1px] bg-rule-light w-full" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={revealVariants(shouldReduceMotion)}
              >
                <Tabs defaultValue="process" className="w-full mt-9">
                  <TabsList variant="line" className="w-full justify-start border-b border-rule-light p-0 h-auto gap-8 mb-8">
                    <TabsTrigger
                      value="process"
                      className="pb-3 text-xs md:text-sm font-medium uppercase tracking-widest rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-foreground text-muted-foreground p-0 bg-transparent cursor-pointer"
                    >
                      01 / Our Process
                    </TabsTrigger>
                    <TabsTrigger
                      value="showcase"
                      className="pb-3 text-xs md:text-sm font-medium uppercase tracking-widest rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-foreground text-muted-foreground p-0 bg-transparent cursor-pointer"
                    >
                      02 / Featured Showcase
                    </TabsTrigger>
                    <TabsTrigger
                      value="philosophy"
                      className="pb-3 text-xs md:text-sm font-medium uppercase tracking-widest rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-foreground text-muted-foreground p-0 bg-transparent cursor-pointer"
                    >
                      03 / Core Philosophy
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="process">
                    <motion.div
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={customTransition}
                      className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]"
                    >
                      <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4, x: -2, boxShadow: "3px 3px 0px #0C0C0C" }} transition={customTransition} className="bg-white relative z-10 border border-rule-light p-6 transition-colors">
                        <span className="text-xs font-bold text-accent">STEP 01</span>
                        <h4 className="text-xl font-bold uppercase mt-2 mb-4">Discovery</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          We start by researching your brand space, interviewing key stakeholders, and analyzing competitors to form a stark, unique value proposition.
                        </p>
                      </motion.div>
                      <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4, x: -2, boxShadow: "3px 3px 0px #0C0C0C" }} transition={customTransition} className="bg-white relative z-10 border border-rule-light p-6 transition-colors">
                        <span className="text-xs font-bold text-accent">STEP 02</span>
                        <h4 className="text-xl font-bold uppercase mt-2 mb-4">Design</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          We lay structural grids, map typographic hierarchy, and engineer customized design tokens before composing single-source-of-truth components.
                        </p>
                      </motion.div>
                      <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4, x: -2, boxShadow: "3px 3px 0px #0C0C0C" }} transition={customTransition} className="bg-white relative z-10 border border-rule-light p-6 transition-colors">
                        <span className="text-xs font-bold text-accent">STEP 03</span>
                        <h4 className="text-xl font-bold uppercase mt-2 mb-4">Delivery</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          We construct high-quality accessible websites, verifying code build reliability and cross-device responsive rendering.
                        </p>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="showcase">
                    <motion.div
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={customTransition}
                      className="grid grid-cols-1 md:grid-cols-2 gap-[var(--grid-gap)]"
                    >
                      <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4, x: -2, boxShadow: "3px 3px 0px #0C0C0C" }} transition={customTransition} className="bg-white relative z-10 border border-rule-light p-6 flex flex-col justify-between transition-colors cursor-pointer">
                        <div>
                          <span className="text-xs font-medium text-faint">VERMILION CORE / 2025</span>
                          <h4 className="text-xl font-bold uppercase mt-2 mb-4">Next-Gen FinTech Portal</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          A high-contrast, typographically centered platform for a leading venture capital fund.
                        </p>
                      </motion.div>
                      <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4, x: -2, boxShadow: "3px 3px 0px #0C0C0C" }} transition={customTransition} className="bg-white relative z-10 border border-rule-light p-6 flex flex-col justify-between transition-colors cursor-pointer">
                        <div>
                          <span className="text-xs font-medium text-faint">KINETIC CORP / 2024</span>
                          <h4 className="text-xl font-bold uppercase mt-2 mb-4">Architecture Portfolio</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Minimalist website showcasing clean grids, brutalist layouts, and modular design.
                        </p>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="philosophy">
                    <motion.div
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={customTransition}
                      className="max-w-2xl"
                    >
                      <h4 className="text-2xl font-bold uppercase mb-4">Restraint is the Brief</h4>
                      <p className="text-base text-muted-foreground leading-relaxed mb-4">
                        We believe that decoration is noise. Great design doesn't shout; it communicates clearly through grid alignment, bold typographic hierarchy, and extreme discipline.
                      </p>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        By stripping away rounded corners, gradients, and soft drop shadows, we create websites that stand out through their confidence, structure, and readability.
                      </p>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </section>

            <hr className="border-none h-[2px] bg-rule w-full" />

            {/* ═══════════════════════════════════════════════════
                 GALLERY SECTION (New Showcase)
               ═══════════════════════════════════════════════════ */}
            <section className="py-12 scroll-mt-12" id="gallery">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={revealVariants(shouldReduceMotion)}
                className="flex justify-between items-baseline pb-7"
              >
                <h2 className="text-4xl font-bold uppercase tracking-tight">Showcase Gallery</h2>
                <span className="text-4xl font-light text-faint">03</span>
              </motion.div>

              <hr className="border-none h-[1px] bg-rule-light w-full" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={revealVariants(shouldReduceMotion)}
                className="pt-9 flex justify-center w-full overflow-hidden"
              >
                <CardStack
                  items={galleryItems}
                  initialIndex={0}
                  autoAdvance
                  intervalMs={3200}
                  pauseOnHover
                  showDots
                />
              </motion.div>
            </section>

            <hr className="border-none h-[2px] bg-rule w-full" />

            {/* TESTIMONY SECTION */}
            <TestimonialsSection />

            <hr className="border-none h-[2px] bg-rule w-full mb-16" />
          </>
        ) : (
          /* ═══════════════════════════════════════════════════
               ABOUT PAGE VIEW
             ═══════════════════════════════════════════════════ */
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants(shouldReduceMotion)}
            className="py-6"
          >
            {/* ABOUT TITLE SECTION */}
            <section className="grid grid-cols-12 gap-[var(--grid-gap)] pb-12 overflow-hidden">
              <p className="col-span-12 md:col-span-6 text-sm font-bold uppercase tracking-wider text-muted-foreground self-end">
                Who We Are
              </p>
              <p className="col-span-12 md:col-span-3 md:col-start-10 text-sm font-bold uppercase tracking-wider text-faint text-left md:text-right self-end">
                About us
              </p>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
                className="col-span-12 md:col-span-11 text-5xl md:text-8xl font-bold leading-[0.88] tracking-[-0.045em] uppercase text-left mt-6 mb-10"
              >
                <motion.span className="block" variants={titleLineVariants(shouldReduceMotion)}>
                  Building Digital
                </motion.span>
                <motion.span className="block" variants={titleLineVariants(shouldReduceMotion)}>
                  Experiences That
                </motion.span>
                <motion.span className="block text-accent" variants={titleLineVariants(shouldReduceMotion)}>
                  Drive Growth
                </motion.span>
              </motion.h1>

              <div className="col-span-12 md:col-span-6 text-lg font-normal leading-relaxed text-muted-foreground text-left self-start pt-1">
                <p className="mb-4">
                  At Growaz., we believe that a website should be more than just a digital business card—it should be a powerful engine for your brand. We specialize in merging intuitive web design with high-impact marketing strategies to create digital spaces that not only look beautiful but actually convert visitors into loyal customers.
                </p>
                <p>
                  We strip away the clutter and unnecessary complexity, focusing entirely on clean, user-centric designs that elevate your brand's message.
                </p>
              </div>

              <div className="col-span-12 md:col-span-3 md:col-start-10 flex md:justify-end md:items-start mt-6 md:mt-0">
                <motion.div
                  className="w-full md:w-auto"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2, boxShadow: "3px 3px 0px #0C0C0C" }}
                  transition={customTransition}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto h-auto py-3 px-7 border-2 border-foreground bg-transparent text-sm font-semibold uppercase tracking-wider rounded-none hover:bg-foreground hover:text-background transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                    onClick={() => {
                      setSelectedService("General Inquiry")
                      setIsDialogOpen(true)
                    }}
                  >
                    Start Project&ensp;🗲
                  </Button>
                </motion.div>
              </div>
            </section>

            <hr className="border-none h-[2px] bg-rule w-full" />

            {/* TEAM SECTION */}
            <section className="py-12">
              <div className="flex justify-between items-baseline pb-7">
                <h2 className="text-4xl font-bold uppercase tracking-tight">Meet the Team</h2>
                <span className="text-4xl font-light text-faint">01</span>
              </div>

              <hr className="border-none h-[1px] bg-rule-light w-full" />

              <div className="grid grid-cols-1 pt-9 gap-8">
                <div className="border border-border p-8 bg-white relative z-10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-accent">CEO & FOUNDER</span>
                    <h4 className="text-2xl font-bold uppercase mt-2 mb-4">Ahad</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      With over four years of hands-on experience bridging the gap between web design and digital marketing, AHAD founded Growaz. to help businesses thrive online. He understands that a successful digital presence requires a delicate balance: it must be visually striking, effortlessly simple to navigate, and strategically built to drive revenue.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Under his leadership, the agency champions a minimalist, highly functional design philosophy. By focusing on light, clean interfaces and intuitive user journeys, AHAD ensures that every project we deliver is both aesthetically refined and engineered for maximum market impact.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-none h-[2px] bg-rule w-full" />

            {/* STANDARDS SECTION */}
            <section className="py-12">
              <div className="flex justify-between items-baseline pb-7">
                <h2 className="text-4xl font-bold uppercase tracking-tight">Our Core Philosophy</h2>
                <span className="text-4xl font-light text-faint">02</span>
              </div>

              <hr className="border-none h-[1px] bg-rule-light w-full" />

              <p className="text-lg text-muted-foreground mt-9 mb-6 max-w-2xl">
                Every project we take on is guided by three foundational principles:
              </p>

              <div className="space-y-6">
                <div className="py-4 border-b border-rule-light">
                  <span className="text-xs font-bold text-accent mr-4 block md:inline-block mb-2 md:mb-0">01</span>
                  <span className="text-lg font-bold uppercase text-foreground block md:inline-block">Design with Purpose</span>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                    We favor clean, modern layouts that prioritize the user experience. By removing friction and visual noise, we let your brand's true value shine through.
                  </p>
                </div>
                <div className="py-4 border-b border-rule-light">
                  <span className="text-xs font-bold text-accent mr-4 block md:inline-block mb-2 md:mb-0">02</span>
                  <span className="text-lg font-bold uppercase text-foreground block md:inline-block">Marketing-First Architecture</span>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                    A beautiful site is useless if no one sees it. We build SEO and conversion optimization into the foundation of your website from day one.
                  </p>
                </div>
                <div className="py-4 border-b border-rule-light">
                  <span className="text-xs font-bold text-accent mr-4 block md:inline-block mb-2 md:mb-0">03</span>
                  <span className="text-lg font-bold uppercase text-foreground block md:inline-block">Agile Collaboration</span>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                    We work directly alongside our clients, maintaining clear communication and rapid iteration to ensure the final product aligns perfectly with your business goals.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-none h-[2px] bg-rule w-full" />

            {/* CTA SECTION */}
            <section className="py-12">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-foreground text-background p-8 md:p-12 border-2 border-foreground">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4 text-background">Ready to elevate your digital presence?</h2>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--color-rule-light)" }}>
                    Whether you are launching a new brand or revitalizing an existing one, we have the design expertise and marketing insight to help you scale.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full lg:w-auto h-auto py-4 px-8 border-2 border-background bg-transparent text-background hover:bg-background hover:text-foreground text-xs md:text-sm font-semibold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedService("General Inquiry")
                    setIsDialogOpen(true)
                  }}
                >
                  Let's Build Something Together&ensp;🗲
                </Button>
              </div>
            </section>

            <hr className="border-none h-[2px] bg-rule w-full mb-16" />
          </motion.div>
        )}
      </main>

      {/* ═══════════════════════════════════════════════════
           DIALOG / MODAL FOR PROJECT INQUIRIES
           ═══════════════════════════════════════════════════ */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-2 border-foreground bg-background rounded-none max-w-md p-8">
          <DialogHeader className="p-0">
            <DialogTitle className="text-2xl font-bold uppercase tracking-tight text-left">
              Project Inquiry
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2 text-left">
              Let's construct something premium. Specify your project requirements below.
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="py-8 text-left">
              <span className="text-xs font-bold text-success uppercase tracking-widest block mb-2">Success</span>
              <p className="text-base text-foreground font-semibold">Brief received successfully.</p>
              <p className="text-sm text-muted-foreground mt-1">We will review your design requirements and respond in 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 pt-4 text-left">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground block mb-2">
                  Service Selection
                </label>
                <Input
                  type="text"
                  disabled
                  value={selectedService}
                  className="bg-secondary/40 border border-border text-foreground font-semibold rounded-none focus-visible:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="name-input" className="text-xs font-bold uppercase tracking-widest text-foreground block mb-2">
                  Your Name
                </label>
                <Input
                  id="name-input"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="bg-transparent border border-border rounded-none focus-visible:ring-accent placeholder:text-faint"
                />
              </div>

              <div>
                <label htmlFor="email-input" className="text-xs font-bold uppercase tracking-widest text-foreground block mb-2">
                  Email Address
                </label>
                <Input
                  id="email-input"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                  className="bg-transparent border border-border rounded-none focus-visible:ring-accent placeholder:text-faint"
                />
              </div>

              <div>
                <label htmlFor="details-input" className="text-xs font-bold uppercase tracking-widest text-foreground block mb-2">
                  Project Brief / Details
                </label>
                <textarea
                  id="details-input"
                  name="details"
                  required
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Describe your design goals, timeline, and scope..."
                  rows={4}
                  className="w-full bg-transparent border border-border rounded-none p-3 text-sm focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-accent placeholder:text-faint resize-none"
                />
              </div>

              <div className="pt-2 flex justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="border border-border rounded-none uppercase text-xs tracking-widest font-semibold hover:bg-secondary transition-colors cursor-pointer"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-none bg-foreground text-background uppercase text-xs tracking-widest font-semibold hover:bg-accent hover:text-white transition-colors cursor-pointer"
                >
                  Submit Brief
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Home
