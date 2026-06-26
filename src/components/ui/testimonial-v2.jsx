"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

const testimonials = [
  {
    text: "Growaz completely transformed our online presence. Our new website is sleek, fast, and has tripled our lead generation in just three months.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Founder, Luxe Interiors",
  },
  {
    text: "Their web design process was seamless. They listened to our vision, nailed the brand identity, and delivered a site that truly represents who we are.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "CEO, TechVentures",
  },
  {
    text: "The SEO and digital marketing strategy they built alongside our website redesign boosted our organic traffic by 280%. Absolutely worth every penny.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Marketing Director, FreshBrew Co.",
  },
  {
    text: "We needed a website that could handle high traffic and convert visitors into customers. Growaz delivered exactly that with a stunning, conversion-focused design.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "Co-Founder, UrbanScale",
  },
  {
    text: "Their UI/UX expertise is top-notch. The user experience on our new platform is so intuitive that our customer support tickets dropped by 60%.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Product Manager, FinEdge",
  },
  {
    text: "From branding to a fully responsive website, Growaz handled everything. The minimal, clean design perfectly captures our brand's premium feel.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Creative Director, Veil Studio",
  },
  {
    text: "Our e-commerce site went from outdated to outstanding. Sales jumped 45% in the first month after launch thanks to their strategic design approach.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Owner, CraftMarket",
  },
  {
    text: "The team at Growaz genuinely cares about results. They didn't just build us a beautiful website — they built us a growth engine.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Head of Growth, NovaBrand",
  },
  {
    text: "Their social media and PPC campaigns paired with a stunning landing page redesign doubled our conversion rate within weeks. Incredible work.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "Founder, Atlas Digital",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

function TestimonialsColumn({ className, testimonials, duration = 12 }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className}>
      <motion.ul
        animate={reduceMotion ? { translateY: 0 } : { translateY: "-50%" }}
        transition={
          reduceMotion
            ? {}
            : {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }
        }
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        scale: 1.02,
                        y: -4,
                        x: -2,
                        boxShadow: "3px 3px 0px #0C0C0C",
                      }
                }
                whileFocus={
                  reduceMotion
                    ? {}
                    : {
                        scale: 1.02,
                        y: -4,
                        x: -2,
                        boxShadow: "3px 3px 0px #0C0C0C",
                      }
                }
                className="p-8 rounded-none border border-border shadow-none max-w-xs w-full bg-white relative z-10 transition-all duration-300 cursor-default select-none focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <blockquote className="m-0 p-0 text-left">
                  <p className="text-muted-foreground leading-relaxed font-normal m-0 text-sm">
                    "{text}"
                  </p>
                  <footer className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="h-10 w-10 rounded-none object-cover border border-rule-light"
                    />
                    <div className="flex flex-col">
                      <cite className="font-bold not-italic tracking-tight leading-5 text-foreground text-sm uppercase">
                        {name}
                      </cite>
                      <span className="text-xs leading-5 tracking-wider text-muted-foreground mt-0.5 uppercase">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-12 relative overflow-hidden"
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        {/* Header matching Services layout */}
        <div className="flex justify-between items-baseline pb-7">
          <h2 id="testimonials-heading" className="text-4xl font-bold uppercase tracking-tight">
            Client Feedback
          </h2>
          <span className="text-4xl font-light text-faint">04</span>
        </div>

        <hr className="border-none h-[1px] bg-rule-light w-full mb-8" />

        <div className="flex flex-col items-start max-w-md mb-12 text-left">
          <p className="text-base leading-relaxed text-muted-foreground">
            Discover how thousands of modern teams leverage our structural layouts and design grid alignments to maximize their conversions and speed.
          </p>
        </div>

        {/* Testimonials Wall */}
        <div
          className="flex justify-center md:justify-between gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[640px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={24} className="w-full md:w-1/3 flex justify-center" />
          <TestimonialsColumn testimonials={secondColumn} duration={30} className="hidden md:flex md:w-1/3 justify-center" />
          <TestimonialsColumn testimonials={thirdColumn} duration={27} className="hidden lg:flex lg:w-1/3 justify-center" />
        </div>
      </div>
    </section>
  );
}
