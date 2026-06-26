import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { SpotlightDotBackground } from "@/components/ui/spotlight-dot-background"

export default function CaseStudiesPublic() {
  const [caseStudies, setCaseStudies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("growaz_cases")
    if (saved) {
      setCaseStudies(JSON.parse(saved))
    }
  }, [])

  return (
    <>
      <SpotlightDotBackground />
      
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-rule mb-16">
        <nav className="max-w-[var(--container-max)] mx-auto px-[var(--container-pad)] flex justify-between items-center py-5">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-bold tracking-tight text-foreground bg-transparent border-0 cursor-pointer"
          >
            Growaz.
          </button>
          <div className="flex gap-4 md:gap-8 flex-wrap justify-end">
            <button
              onClick={() => navigate("/")}
              className="text-xs md:text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-0"
            >
              Back to Home
            </button>
          </div>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="max-w-[var(--container-max)] mx-auto px-[var(--container-pad)] relative z-[1] pb-24">
        <div className="flex justify-between items-baseline pb-7">
          <h1 className="text-5xl font-bold uppercase tracking-tight">Case Studies</h1>
          <span className="text-4xl font-light text-faint">05</span>
        </div>

        <hr className="border-none h-[1px] bg-rule-light w-full mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--grid-gap)]">
          {caseStudies.length === 0 ? (
            <p className="text-muted-foreground">No case studies published yet.</p>
          ) : (
            caseStudies.map((study) => {
              const hasUrl = Boolean(study.websiteUrl)
              const CardComponent = hasUrl ? motion.a : motion.div
              const linkProps = hasUrl ? { href: study.websiteUrl, target: "_blank", rel: "noopener noreferrer" } : {}

              return (
                <CardComponent 
                  key={study.id}
                  {...linkProps}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -4, x: -2, boxShadow: "3px 3px 0px #0C0C0C" }}
                  className="bg-white relative z-10 border border-rule-light p-6 flex flex-col justify-between transition-all cursor-pointer no-underline text-foreground"
                >
                  {study.image && (
                    <div className="w-full aspect-video bg-secondary mb-6 border border-rule-light overflow-hidden">
                      <img src={study.image} alt={study.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-accent uppercase tracking-widest">{study.client} / {study.year}</span>
                    <h2 className="text-2xl font-bold uppercase mt-2 mb-4 leading-tight">{study.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {study.description}
                    </p>
                  </div>
                </CardComponent>
              )
            })
          )}
        </div>
      </main>
    </>
  )
}
