/** Brand kit / guidelines page; partial CMS + static download CTA. */
import type { Metadata } from "next";
import { Download } from "lucide-react";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";

const fallbackMetadata: Metadata = {
  title: "Brand – Conalytic",
  description:
    "Conalytic brand assets, logo guidelines, color palette, and typography. Download our official brand kit for media and partner use.",
};

const colors = [
  { name:"Brand Purple", hex:"#6B5FF8", rgb:"107, 95, 248", usage:"Primary CTA, links, icons" },
  { name:"Light Purple", hex:"#a78bfa", rgb:"167, 139, 250", usage:"Accents, highlights" },
  { name:"Dark BG",      hex:"#08080E", rgb:"8, 8, 14",      usage:"Dark page background" },
  { name:"Surface Dark", hex:"#14141B", rgb:"20, 20, 27",    usage:"Dark section surfaces" },
  { name:"Pure White",   hex:"#FFFFFF", rgb:"255, 255, 255", usage:"Headings (dark mode)" },
  { name:"Light Gray",   hex:"#F6F7FE", rgb:"246, 247, 254", usage:"Light section backgrounds" },
];

const logoVariants = [
  { name:"Full Logo – Dark bg",   description:"Primary usage on dark backgrounds", file:"/logo-white.png", filename:"conalytic-logo-white.png" },
  { name:"Full Logo – Light bg",  description:"Use on white or light backgrounds", file:"/logo.png", filename:"conalytic-logo.png" },
  { name:"Icon only – Color",     description:"App icon, favicon, small spaces", file:"/logo-icon.png", filename:"conalytic-icon.png" },
  { name:"Wordmark – Light",      description:"Tagline logo for light backgrounds", file:"/logo-tagline-light.png", filename:"conalytic-wordmark-light.png" },
];

const typography = [
  { name:"Inter", weight:"700 Bold",     usage:"Headings (H1–H3)",          sample:"Conalytic",                   size:"2rem",   fw:700 },
  { name:"Inter", weight:"600 SemiBold", usage:"Subheadings, UI labels",    sample:"Analytics Platform",          size:"1.25rem", fw:600 },
  { name:"Inter", weight:"400 Regular",  usage:"Body text, descriptions",   sample:"Ask questions in plain English.", size:"1rem", fw:400 },
];

function BrandFallback() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C12] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">Brand Assets</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Conalytic <span style={{background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Brand</span>
          </h1>
          <p className="text-gray-500 dark:text-white/65 text-lg max-w-2xl leading-relaxed">Official brand assets, guidelines, and resources for media, partners, and press. Please follow these guidelines when representing Conalytic.</p>
        </div>

        {/* Logo */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Logo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {logoVariants.map(v=>(
              <div key={v.name} className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#14141B] overflow-hidden shadow-sm">
                <div className="h-36 flex items-center justify-center bg-[#F6F7FE] dark:bg-[#0C0C12]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
                      <span className="text-white font-black text-base">C</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold text-xl tracking-tight">Conalytic</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white text-sm font-semibold">{v.name}</p>
                    <p className="text-gray-400 dark:text-white/40 text-xs mt-0.5">{v.description}</p>
                  </div>
                  <a href={v.file} download={v.filename} className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 text-xs font-semibold hover:text-brand-700 dark:hover:text-brand-300 transition-colors" aria-label={`Download ${v.name}`}>
                    <Download className="w-3.5 h-3.5" aria-hidden/> PNG
                  </a>
                </div>
              </div>
            ))}
          </div>
          <a href="/contact?topic=brand" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 bg-white dark:bg-white/[0.04] hover:border-brand-400 dark:hover:border-brand-400/50 hover:bg-brand-50 dark:hover:bg-brand-600/5 transition-all" aria-label="Request full brand kit — contact us">
            <Download className="w-4 h-4" aria-hidden/> Request full brand kit
          </a>
        </section>

        {/* Colors */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map(color=>(
              <div key={color.name} className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#14141B] overflow-hidden shadow-sm">
                <div className="h-20 w-full" style={{background:color.hex}}/>
                <div className="p-4">
                  <p className="text-gray-900 dark:text-white font-semibold text-sm">{color.name}</p>
                  <p className="text-gray-500 dark:text-white/50 text-xs font-mono mt-1">{color.hex}</p>
                  <p className="text-gray-400 dark:text-white/35 text-xs mt-0.5">RGB: {color.rgb}</p>
                  <p className="text-gray-400 dark:text-white/45 text-xs mt-2">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Typography</h2>
          <div className="space-y-4">
            {typography.map((type,i)=>(
              <div key={i} className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#14141B] p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white mb-2" style={{fontWeight:type.fw, fontSize:type.size}}>{type.sample}</p>
                  <p className="text-gray-400 dark:text-white/40 text-xs">{type.name} · {type.weight}</p>
                </div>
                <div className="shrink-0">
                  <p className="text-gray-500 dark:text-white/55 text-sm">{type.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guidelines */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5 p-6">
              <h3 className="text-emerald-700 dark:text-emerald-300 font-bold mb-4">✓ Do</h3>
              <ul className="space-y-2 text-gray-600 dark:text-white/65 text-sm">
                <li>Use the logo with adequate clear space around it</li>
                <li>Use approved color variations on appropriate backgrounds</li>
                <li>Maintain the logo proportions when resizing</li>
                <li>Use the brand name &quot;Conalytic&quot; with a capital C</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 p-6">
              <h3 className="text-red-600 dark:text-red-400 font-bold mb-4">✗ Don&apos;t</h3>
              <ul className="space-y-2 text-gray-600 dark:text-white/65 text-sm">
                <li>Don&apos;t stretch or distort the logo</li>
                <li>Don&apos;t change the logo colors outside approved variants</li>
                <li>Don&apos;t place the logo on cluttered backgrounds</li>
                <li>Don&apos;t use the brand to imply endorsement without permission</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact strip */}
        <div className="rounded-2xl bg-brand-50 dark:bg-brand-600/10 border border-brand-100 dark:border-brand-500/20 p-8 text-center">
          <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-2">Need something specific?</h3>
          <p className="text-gray-500 dark:text-white/60 mb-6 leading-relaxed">For press inquiries, partnership assets, or custom brand requests, reach out to us directly.</p>
          <a href="mailto:admin@conalytic.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03]">
            Contact Brand Team
          </a>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/brand", fallbackMetadata);
}

export default async function BrandPage() {
  return <CmsPage slug="/brand" fallback={<BrandFallback />} />;
}
