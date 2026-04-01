"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { CTA } from "@/components/sections/CTA";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.65, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

const contactInfo = [
  { icon:Mail,   title:"Email",    subtitle:"Our friendly team is here to help.", value:"hello@conalytic.com",    href:"mailto:hello@conalytic.com", color:"from-brand-500/15 to-violet-500/10", border:"border-brand-500/20", iconColor:"text-brand-600 dark:text-brand-400" },
  { icon:MapPin, title:"Location", subtitle:"Let's catch up for a coffee.",        value:"Pune, Maharashtra, India", href:null,                        color:"from-emerald-500/15 to-teal-500/10", border:"border-emerald-500/20",iconColor:"text-emerald-600 dark:text-emerald-400" },
  { icon:Phone,  title:"Phone",    subtitle:"Let's get on a call to schedule trial.",value:"+91-7900615417",       href:"tel:+917900615417",          color:"from-blue-500/15 to-cyan-500/10",    border:"border-blue-500/20",   iconColor:"text-blue-600 dark:text-blue-400"   },
];

const inputBase = "w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-500/20 transition-all text-sm";

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(()=>{ setLoading(false); setSubmitted(true); }, 1400);
  }

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Mail className="w-3 h-3"/> Get in Touch
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            We&apos;re Here to <span style={GRAD}>Help!</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 max-w-xl mx-auto leading-relaxed">
            Have questions, feedback, or just want to say hi? Let&apos;s connect!
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ──────────────────────── */}
      <section className="py-16 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactInfo.map(info=>(
              <motion.div key={info.title} variants={fadeUp}
                className="relative overflow-hidden rounded-2xl p-6 text-center bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-300">
                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${info.color} blur-xl opacity-50 pointer-events-none`}/>
                <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} border ${info.border} flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`w-7 h-7 ${info.iconColor}`}/>
                </div>
                <h3 className="relative z-10 text-gray-900 dark:text-white font-semibold text-lg mb-1">{info.title}</h3>
                <p className="relative z-10 text-gray-400 dark:text-white/45 text-sm mb-3">{info.subtitle}</p>
                {info.href ? (
                  <a href={info.href} className="relative z-10 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors font-semibold text-sm">{info.value}</a>
                ) : (
                  <p className="relative z-10 text-gray-700 dark:text-white/75 font-semibold text-sm">{info.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 60% 50% at 50% 0%, rgba(107,95,248,0.08) 0%, transparent 70%)"}}/>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
            <div className="rounded-2xl bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-lg p-8 sm:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message sent!</h3>
                  <p className="text-gray-500 dark:text-white/60 text-sm">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={()=>setSubmitted(false)} className="mt-6 text-brand-600 dark:text-brand-400 text-sm font-semibold hover:underline">Send another message</button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send us a message</h2>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">First Name</label>
                        <input type="text" placeholder="John" className={inputBase} required/>
                      </div>
                      <div>
                        <label className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">Last Name</label>
                        <input type="text" placeholder="Doe" className={inputBase} required/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">Email</label>
                      <input type="email" placeholder="john@company.com" className={inputBase} required/>
                    </div>
                    <div>
                      <label className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" className={inputBase}/>
                    </div>
                    <div>
                      <label className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">Message</label>
                      <textarea rows={5} placeholder="How can we help you?" className={`${inputBase} resize-none`} required/>
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? (
                        <><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"/><span>Sending…</span></>
                      ) : (
                        <><Send className="w-4 h-4"/><span>Send message</span></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.2,ease:EASE}}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{title:"Book a Demo",desc:"See Conalytic in action with a live walkthrough.",href:"https://app.conalytic.com/demo",ext:true},{title:"Start Free Trial",desc:"Try Conalytic free — no credit card required.",href:"https://app.conalytic.com/signup",ext:true}].map(l=>(
              <a key={l.title} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined}
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#F6F7FE] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07] hover:border-brand-300 dark:hover:border-brand-500/40 hover:bg-brand-50/50 dark:hover:bg-brand-600/5 transition-all duration-200">
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold text-sm">{l.title}</p>
                  <p className="text-gray-400 dark:text-white/45 text-xs mt-0.5">{l.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-white/30 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all duration-200"/>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <CTA
        title="Ready to Transform Your Analytics?"
        subtitle="Join 2,000+ teams already using Conalytic to turn data into decisions"
        primaryCta={{label:"Book a demo", href:"https://app.conalytic.com/demo"}}
        secondaryCta={{label:"Start free trial", href:"https://app.conalytic.com/signup"}}
      />
    </>
  );
}
