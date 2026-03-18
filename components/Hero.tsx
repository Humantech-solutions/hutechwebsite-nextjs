import { motion as Motion } from "framer-motion";
import { ArrowRight, MoveRight, Layers, Cpu, Globe, Rocket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const BRAND_BLUE = "#0171c1";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#001A3D]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1764534161906-f08540a2d333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc2t5c2NyYXBlciUyMG9mZmljZSUyMGNpdHl8ZW58MXx8fHwxNzczMDcyMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Future of Technology"
          className="h-full w-full scale-110 object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/40 via-[#001A3D]/80 to-[#001A3D]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#001A3D] via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements (Motion) */}
      <Motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/4 right-[15%] hidden h-64 w-64 rounded-full border border-white/5 lg:block"
      />
      <Motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-1/4 left-[10%] hidden h-48 w-48 rounded-full border border-white/10 lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-32 pb-20 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-8 flex items-center space-x-3">
                <span className="h-[1px] w-12 bg-[#0171c1]"></span>
                <span className="text-xs font-black tracking-[0.3em] text-[#0171c1] uppercase">
                  Engineering the Future
                </span>
              </div>

              <h1 className="mb-10 text-5xl leading-[1.05] font-black tracking-tighter text-white md:text-7xl xl:text-8xl">
                Transforming <br />
                <span className="relative">
                  Enterprises
                  <Motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute -bottom-2 left-0 h-4 w-full text-[#0171c1]/30"
                    viewBox="0 0 400 20"
                  >
                    <path
                      d="M5 15 Q 100 5 200 15 T 395 15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </Motion.svg>
                </span>{" "}
                <br />
                with Intelligence.
              </h1>

              <p className="mb-12 max-w-xl text-xl leading-relaxed font-medium text-gray-400">
                Hutech Solutions provides next-gen digital engineering, cloud-native platforms, and
                AI-driven insights for global leaders.
              </p>

              <div className="flex flex-wrap gap-6">
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center rounded-sm bg-[#0171c1] px-10 py-5 text-sm font-black tracking-[0.2em] text-white uppercase shadow-2xl shadow-[#0171c1]/20 transition-all hover:bg-[#015a9a]"
                >
                  Explore Offerings
                  <MoveRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Motion.button>
                <Motion.button
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  className="rounded-sm border border-white/10 bg-white/5 px-10 py-5 text-sm font-black tracking-[0.2em] text-white uppercase backdrop-blur-sm transition-all"
                >
                  Global Presence
                </Motion.button>
              </div>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-20 grid max-w-md grid-cols-3 gap-8 border-t border-white/10 pt-10"
            >
              <div>
                <div className="text-3xl font-black text-[#0171c1]">200+</div>
                <div className="mt-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Enterprises
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#0171c1]">15+</div>
                <div className="mt-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Countries
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#0171c1]">98%</div>
                <div className="mt-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Retention
                </div>
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
                  <div className="group rounded-2xl border border-white/5 bg-[#002B66] p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#0171c1]/50">
                    <Cpu className="mb-6 h-10 w-10 text-[#0171c1]" />
                    <h3 className="mb-3 text-xl leading-tight font-black tracking-tight text-white uppercase">
                      Artificial Intelligence
                    </h3>
                    <p className="text-sm text-gray-400">
                      Empowering decision-making with predictive analytics and cognitive tech.
                    </p>
                  </div>
                  <div className="group rounded-2xl border border-white/5 bg-[#002B66] p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#0171c1]/50">
                    <Globe className="mb-6 h-10 w-10 text-[#0171c1]" />
                    <h3 className="mb-3 text-xl leading-tight font-black tracking-tight text-white uppercase">
                      Cloud Native
                    </h3>
                    <p className="text-sm text-gray-400">
                      Scaling infrastructure with hybrid cloud strategies and DevOps excellence.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="group rounded-2xl border border-white/5 bg-[#002B66] p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#0171c1]/50">
                    <Layers className="mb-6 h-10 w-10 text-[#0171c1]" />
                    <h3 className="mb-3 text-xl leading-tight font-black tracking-tight text-white uppercase">
                      Digital Platforms
                    </h3>
                    <p className="text-sm text-gray-400">
                      Building modular, secure, and scalable architectures for the future.
                    </p>
                  </div>
                  <div className="group rounded-2xl border border-white/5 bg-[#002B66] p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#0171c1]/50">
                    <Rocket className="mb-6 h-10 w-10 text-[#0171c1]" />
                    <h3 className="mb-3 text-xl leading-tight font-black tracking-tight text-white uppercase">
                      Hyper Scale
                    </h3>
                    <p className="text-sm text-gray-400">
                      Accelerating growth with edge computing and high-performance networks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Accent Glow */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0171c1]/5 blur-[120px]"></div>
            </Motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <Motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center space-y-3"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-[#0171c1] to-transparent"></div>
        <span className="vertical-text text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">
          Scroll
        </span>
      </Motion.div>
    </section>
  );
}
