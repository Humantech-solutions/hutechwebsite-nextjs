import { motion as Motion } from "framer-motion";
import { ArrowRight, MoveRight, Layers, Cpu, Globe, Rocket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const BRAND_BLUE = "#0171c1";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#001A3D]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1764534161906-f08540a2d333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc2t5c2NyYXBlciUyMG9mZmljZSUyMGNpdHl8ZW58MXx8fHwxNzczMDcyMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Future of Technology"
          className="w-full h-full object-cover opacity-60 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/40 via-[#001A3D]/80 to-[#001A3D]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements (Motion) */}
      <Motion.div 
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 right-[15%] w-64 h-64 border border-white/5 rounded-full pointer-events-none hidden lg:block"
      />
      <Motion.div 
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[10%] w-48 h-48 border border-white/10 rounded-full pointer-events-none hidden lg:block"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20 pt-32 pb-20 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <span className="w-12 h-[1px] bg-[#0171c1]"></span>
                <span className="text-[#0171c1] font-black uppercase tracking-[0.3em] text-xs">
                  Engineering the Future
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-10">
                Transforming <br /> 
                <span className="relative">
                  Enterprises
                  <Motion.svg 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute -bottom-2 left-0 w-full h-4 text-[#0171c1]/30" viewBox="0 0 400 20">
                    <path d="M5 15 Q 100 5 200 15 T 395 15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  </Motion.svg>
                </span> <br />
                with Intelligence.
              </h1>

              <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-xl font-medium">
                Hutech Solutions provides next-gen digital engineering, cloud-native platforms, and AI-driven insights for global leaders.
              </p>

              <div className="flex flex-wrap gap-6">
                <Motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0171c1] hover:bg-[#015a9a] text-white font-black py-5 px-10 rounded-sm flex items-center transition-all shadow-2xl shadow-[#0171c1]/20 uppercase tracking-[0.2em] text-sm group"
                >
                  Explore Offerings
                  <MoveRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Motion.button>
                <Motion.button 
                   whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                   className="bg-white/5 backdrop-blur-sm border border-white/10 text-white font-black py-5 px-10 rounded-sm transition-all uppercase tracking-[0.2em] text-sm"
                >
                  Global Presence
                </Motion.button>
              </div>
            </Motion.div>

            <Motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.8 }}
               className="mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 max-w-md"
            >
               <div>
                 <div className="text-[#0171c1] font-black text-3xl">200+</div>
                 <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Enterprises</div>
               </div>
               <div>
                 <div className="text-[#0171c1] font-black text-3xl">15+</div>
                 <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Countries</div>
               </div>
               <div>
                 <div className="text-[#0171c1] font-black text-3xl">98%</div>
                 <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Retention</div>
               </div>
            </Motion.div>
          </div>

          <div className="relative hidden lg:block">
            <Motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10"
            >
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                     <div className="bg-[#002B66] p-8 rounded-2xl border border-white/5 backdrop-blur-xl group hover:border-[#0171c1]/50 transition-all duration-500">
                        <Cpu className="text-[#0171c1] mb-6 w-10 h-10" />
                        <h3 className="text-white font-black text-xl mb-3 uppercase tracking-tight leading-tight">Artificial Intelligence</h3>
                        <p className="text-gray-400 text-sm">Empowering decision-making with predictive analytics and cognitive tech.</p>
                     </div>
                     <div className="bg-[#002B66] p-8 rounded-2xl border border-white/5 backdrop-blur-xl group hover:border-[#0171c1]/50 transition-all duration-500">
                        <Globe className="text-[#0171c1] mb-6 w-10 h-10" />
                        <h3 className="text-white font-black text-xl mb-3 uppercase tracking-tight leading-tight">Cloud Native</h3>
                        <p className="text-gray-400 text-sm">Scaling infrastructure with hybrid cloud strategies and DevOps excellence.</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="bg-[#002B66] p-8 rounded-2xl border border-white/5 backdrop-blur-xl group hover:border-[#0171c1]/50 transition-all duration-500">
                        <Layers className="text-[#0171c1] mb-6 w-10 h-10" />
                        <h3 className="text-white font-black text-xl mb-3 uppercase tracking-tight leading-tight">Digital Platforms</h3>
                        <p className="text-gray-400 text-sm">Building modular, secure, and scalable architectures for the future.</p>
                     </div>
                     <div className="bg-[#002B66] p-8 rounded-2xl border border-white/5 backdrop-blur-xl group hover:border-[#0171c1]/50 transition-all duration-500">
                        <Rocket className="text-[#0171c1] mb-6 w-10 h-10" />
                        <h3 className="text-white font-black text-xl mb-3 uppercase tracking-tight leading-tight">Hyper Scale</h3>
                        <p className="text-gray-400 text-sm">Accelerating growth with edge computing and high-performance networks.</p>
                     </div>
                  </div>
               </div>
               
               {/* Accent Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#0171c1]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
            </Motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <Motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 z-10"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#0171c1] to-transparent"></div>
        <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] vertical-text">Scroll</span>
      </Motion.div>
    </section>
  );
}

