"use client";

import { motion as Motion } from "motion/react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  Zap, 
  Target,
  BarChart3,
  ArrowUp,
  MapPin,
  Briefcase,
  Database,
  Cpu
} from "lucide-react";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { CaseStudy } from "@/lib/data/case-studies";
import { FAQAccordion } from "@/components/FAQAccordion";
import { renderTitle } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-6 h-6 text-[#F99D1C]" />,
  Smartphone: <Smartphone className="w-6 h-6 text-[#F99D1C]" />,
  Globe: <Globe className="w-6 h-6 text-[#F99D1C]" />,
  Zap: <Zap className="w-6 h-6 text-[#F99D1C]" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-[#F99D1C]" />,
  Database: <Database className="w-6 h-6 text-[#F99D1C]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#F99D1C]" />,
  BarChart3: <BarChart3 className="w-6 h-6 text-[#F99D1C]" />,
};

export default function CaseStudyDetailClient({ study }: { study: CaseStudy }) {
  return (
    <div className="flex flex-col bg-white min-h-screen overflow-hidden">
      <Meta 
        title={`${study.title} | Case Study | Hutech Solutions`} 
        description={study.shortDesc} 
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[570px] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={study.heroImage}
            alt={study.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-[#001A3D]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-[#F99D1C]"></span>
              <span className="text-[#F99D1C] font-bold uppercase tracking-[0.3em] text-[10px]">{study.category} Case Study</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight display-font mb-8">
              {renderTitle(study.impact || study.title, "text-inherit", "text-[#F99D1C]", "text-[#0171c1]")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-medium leading-relaxed mb-12">
              {study.shortDesc}
            </p>
            
            <div className="flex flex-wrap gap-8 py-8 border-t border-white/10">
              <div>
                <p className="text-[10px] font-bold text-[#F99D1C] uppercase tracking-widest mb-1">Client Domain</p>
                <p className="text-white font-semibold">{study.clientDomain}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#F99D1C] uppercase tracking-widest mb-1">Platform</p>
                <p className="text-white font-semibold">{study.platform}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#F99D1C] uppercase tracking-widest mb-1">Geography</p>
                <p className="text-white font-semibold">{study.geography}</p>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-8">
              <div className="w-20 h-1.5 bg-[#0171c1]"></div>
              <h2 className="text-4xl font-bold text-[#001A3D] display-font leading-tight">Project Overview</h2>
              <p className="text-lg text-gray-600 font-medium leading-relaxed italic border-l-4 border-[#F99D1C] pl-8">
                &quot;{study.overviewQuote}&quot;
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              {study.overviewText.map((text, i) => (
                <p key={i} className="text-gray-500 text-lg leading-relaxed font-medium">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[#0171c1] font-bold uppercase tracking-widest text-xs">Strategic Hurdles</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font">Critical Challenges</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {study.challenges.map((item, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="mb-8 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-[#0171c1] group-hover:text-white transition-colors">
                  {iconMap[item.icon] || <Target className="w-6 h-6" />}
                </div>
                <h3 className="text-2xl font-bold text-[#001A3D] mb-4">{renderTitle(item.title)}</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">
                  {item.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Provided Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-12 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
                <div className="space-y-4">
                  <span className="text-[#0171c1] font-bold uppercase tracking-widest text-xs">Our Intervention</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font">Solution Provided</h2>
                </div>
                <p className="text-gray-500 font-medium max-w-xl">
                  Our group collaborated closely with the client to provide the subsequent solutions, ensuring a robust and future-proof digital architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {study.solutions.map((sol, i) => (
                  <div key={i} className="space-y-4 group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#0171c1] group-hover:text-white transition-all duration-300">
                        {iconMap[sol.icon] || <Zap className="w-5 h-5" />}
                      </div>
                      <div className="w-8 h-1 bg-[#F99D1C] group-hover:w-16 transition-all duration-500"></div>
                    </div>
                    <h3 className="text-xl font-bold text-[#001A3D]">{renderTitle(sol.title)}</h3>
                    <p className="text-gray-500 leading-relaxed font-medium">
                      {sol.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <h2 className="text-4xl font-bold text-[#001A3D] display-font">Execution Strategy</h2>
                <p className="text-gray-500 font-medium leading-relaxed">
                  The project was carried out in organized stages to guarantee quality and conformity with brand standards.
                </p>
                <div className="p-8 bg-[#001A3D] text-white rounded-[2rem] space-y-4">
                  <Zap className="text-[#F99D1C]" />
                  <h4 className="font-bold text-xl">Agile Methodology</h4>
                  <p className="text-sm opacity-70 font-medium">Quickly evaluating plugins and third-party apps, adapting to evolving needs.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8 space-y-12">
              {study.process.map((step, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="text-5xl font-black text-gray-100 group-hover:text-[#F99D1C] transition-colors display-font shrink-0">
                    {step.number}
                  </div>
                  <div className="pt-2 space-y-4 border-b border-gray-100 pb-12 w-full">
                    <h3 className="text-2xl font-bold text-[#001A3D]">{renderTitle(step.title)}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed italic">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-[#0171c1] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <BarChart3 size={400} />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="max-w-3xl space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold display-font">Results & Outcomes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {study.results.map((res, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#F99D1C]" />
                    <h4 className="font-bold text-xl uppercase tracking-wider">{renderTitle(res.title)}</h4>
                  </div>
                  <p className="text-blue-100 font-medium leading-relaxed">
                    {res.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {study.faqs && study.faqs.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-20 space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font">
                {study.faqTitle ? renderTitle(study.faqTitle) : "Frequently Asked Questions"}
              </h2>
              <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
                {study.faqSubtitle ? renderTitle(study.faqSubtitle) : `Common questions about our ${study.category} case study.`}
              </p>
            </div>
            <FAQAccordion faqs={study.faqs} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 text-center">
          <div className="bg-gray-50 rounded-[3rem] p-12 lg:p-24 flex flex-col lg:flex-row justify-between items-center gap-12 border border-gray-100 mb-16">
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-[#001A3D] display-font leading-tight">Ready to Scale Your Digital Storefront?</h2>
              <p className="text-gray-500 font-medium text-lg">Let our engineering experts build your next-gen ecommerce ecosystem with brand precision.</p>
            </div>
            <Link href="/contact" className="bg-[#001A3D] text-white px-12 py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-[#0171c1] transition-all rounded-sm flex items-center gap-4">
              Discuss Your Project <ArrowRight size={16} />
            </Link>
          </div>

          <Motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-4 mx-auto"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#001A3D] group-hover:text-white transition-all duration-500">
              <ArrowUp size={20} className="text-[#0171c1] group-hover:text-[#F99D1C]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#001A3D] opacity-40 group-hover:opacity-100 transition-opacity">Back to top</span>
          </Motion.button>
        </div>
      </section>
    </div>
  );
}
