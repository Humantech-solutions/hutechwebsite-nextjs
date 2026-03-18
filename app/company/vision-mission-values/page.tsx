"use client";

import { motion as Motion } from "framer-motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eye, Target, ShieldCheck, Zap, Star, Users, Award } from "lucide-react";
import { Meta } from "@/components/Meta";

export default function VisionMissionValues() {
  const values = [
    { 
      icon: <ShieldCheck className="w-8 h-8" />, 
      title: "Integrity", 
      desc: "We uphold the highest standards of integrity in all our actions, ensuring transparency, honesty, and ethical conduct in every partnership." 
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: "Innovation", 
      desc: "We foster a culture of relentless innovation, constantly exploring new technologies and methodologies to solve complex business challenges." 
    },
    { 
      icon: <Star className="w-8 h-8" />, 
      title: "Excellence", 
      desc: "We are committed to delivering excellence in everything we do, from the code we write to the strategic advice we provide." 
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Customer Focus", 
      desc: "Our clients' success is our success. We prioritize understanding their unique needs and delivering solutions that drive measurable impact." 
    },
    { 
      icon: <Award className="w-8 h-8" />, 
      title: "Accountability", 
      desc: "We take full ownership of our commitments and results, ensuring that we deliver on our promises with precision and quality." 
    },
    { 
      icon: <Target className="w-8 h-8" />, 
      title: "Collaboration", 
      desc: "We believe in the power of synergy. By working closely with our clients and within our teams, we achieve extraordinary results." 
    }
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Meta 
        title="Vision, Mission & Values | Hutech Solutions"
        description="Discover the core principles, vision, and mission that drive Hutech Solutions toward excellence in the global technology landscape."
      />
      <Breadcrumbs variant="light" />
      
      {/* Hero Section */}
      <section className="bg-[#001A3D] text-white h-[450px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFAF2B]/20 blur-[120px] rounded-full -mr-96 -mt-96"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFAF2B]/10 blur-[100px] rounded-full -ml-48 -mb-48"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex items-center space-x-3">
              <span className="w-12 h-[1px] bg-[#FFAF2B]"></span>
              <span className="text-[#FFAF2B] font-semibold tracking-wide text-xs">Our Purpose</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight display-font">
              Our Vision, <br />
              Mission & <span className="text-[#FFAF2B]">Values.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
              At Hutech Solutions, we are driven by a singular purpose: to empower businesses through transformative technology and unwavering commitment to excellence.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            {/* Vision */}
            <Motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 md:p-16 rounded-[3rem] bg-gray-50 border border-gray-100 space-y-10 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[#001A3D] pointer-events-none">
                <Eye size={120} />
              </div>
              <div className="bg-white p-6 rounded-2xl w-fit shadow-sm text-[#FFAF2B] group-hover:bg-[#FFAF2B] group-hover:text-white transition-colors duration-500">
                <Eye size={36} />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-semibold text-[#001A3D] display-font tracking-tight">Our Vision</h2>
                <p className="text-xl text-gray-500 leading-relaxed font-medium">
                  To be a globally recognized leader in providing innovative technology solutions that empower businesses and individuals to achieve their full potential and transcend traditional boundaries.
                </p>
              </div>
            </Motion.div>

            {/* Mission */}
            <Motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 md:p-16 rounded-[3rem] bg-[#001A3D] text-white space-y-10 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-white pointer-events-none">
                <Target size={120} />
              </div>
              <div className="bg-[#FFAF2B] p-6 rounded-2xl w-fit shadow-sm text-[#001A3D]">
                <Target size={36} />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-semibold display-font tracking-tight text-[#FFAF2B]">Our Mission</h2>
                <p className="text-xl text-gray-300 leading-relaxed font-medium">
                  To deliver high-quality, cost-effective, and customized technology solutions that meet the unique needs of our clients while fostering a culture of continuous improvement, innovation, and employee growth.
                </p>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#001A3D]">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="text-center mb-24 space-y-6 max-w-3xl mx-auto">
            <span className="text-[#FFAF2B] font-bold tracking-widest text-xs uppercase">The Pillars of Hutech</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-[#001A3D] display-font tracking-tight">Our Core Values</h2>
            <p className="text-gray-500 font-medium text-lg">
              The fundamental beliefs that shape our culture and define how we work together to serve our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <Motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 md:p-12 rounded-[2.5rem] bg-white border border-gray-100 space-y-8 hover:shadow-2xl transition-all group hover:-translate-y-2 duration-300"
              >
                <div className="bg-gray-50 p-4 rounded-2xl w-fit text-[#FFAF2B] group-hover:bg-[#FFAF2B] group-hover:text-white transition-all duration-300">
                  {v.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#001A3D] display-font">{v.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="bg-[#001A3D] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFAF2B]/10 blur-[100px] rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-150 duration-700"></div>
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-6xl font-semibold display-font tracking-tight leading-tight max-w-4xl mx-auto">
                Join Us in Shaping the <span className="text-[#FFAF2B]">Future of Technology.</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
                Experience the Hutech difference where values meet innovation to deliver exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <button className="bg-[#FFAF2B] hover:bg-white text-[#001A3D] px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs shadow-xl shadow-[#FFAF2B]/20">
                   Partner With Us
                </button>
                <button className="bg-transparent border border-white/20 hover:border-[#FFAF2B] hover:text-[#FFAF2B] text-white px-12 py-5 rounded-sm font-bold transition-all tracking-wide text-xs">
                   View Careers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
