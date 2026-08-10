"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import dynamic from "next/dynamic";

const LottieAvatar = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [animLoaded, setAnimLoaded] = useState(false);
  useEffect(() => {
    let anim: any = null;
    let cancelled = false;
    
    Promise.all([
      import("lottie-web").then(m => m.default || m),
      fetch('/husqy-avatar.json').then(res => res.json())
    ])
      .then(([lottieInstance, data]) => {
        if (cancelled || !containerRef.current || !data?.v) return;
        anim = lottieInstance.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: data,
        });
        setAnimLoaded(true);
      })
      .catch(() => {});
      
    return () => {
      cancelled = true;
      if (anim) anim.destroy();
    };
  }, []);

  return (
    <>
      {!animLoaded && <MessageCircle size={16} />}
      <div ref={containerRef} className={`w-full h-full scale-125 ${!animLoaded ? 'hidden' : ''}`} />
    </>
  );
};

const Chatbot = dynamic(() => import("./chatbot/Chatbot"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0171c1] border-t-transparent"></div>
    </div>
  ),
});

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chatbot", handleOpen);
    return () => {
      window.removeEventListener("open-chatbot", handleOpen);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[96px] right-6 z-[9998] w-[350px] md:w-[380px] h-[750px] max-h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl flex flex-col"
          >
            <div className="relative flex justify-between items-center bg-gradient-to-r from-blue-50 via-white to-orange-50 border-b border-gray-100 p-4 pt-5 text-[#001A3D] z-[9999]">
              
              {/* Mobile Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-gray-200/50 rounded-b-xl flex items-center justify-center border-x border-b border-gray-300/30 shadow-sm backdrop-blur-sm">
                <span className="text-[9px] font-bold text-gray-500 tracking-wider">AI⚡Hutech</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full shadow-sm bg-[#0171c1] text-white overflow-hidden">
                  <LottieAvatar />
                </div>
                <div>
                  <h4 className="text-sm leading-none font-bold text-[#001A3D]">HusQy</h4>
                  <span className="text-[11px] font-bold text-[#0171c1]">Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-black/5 p-1.5 text-gray-500 transition-colors hover:bg-black/10 hover:text-gray-800"
              >
                <X size={18} />
              </button>
            </div>
            <div id="chatbot-widget-root" className="flex-grow overflow-auto relative chatbot-widget-container bg-white">
              <Chatbot />
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <Motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed right-6 bottom-6 z-[9999]"
        >
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/10 bg-[#001A3D] text-white shadow-2xl shadow-[#001A3D]/30"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <Motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <X size={28} />
                </Motion.div>
              ) : (
                <Motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <MessageCircle size={28} fill="currentColor" />
                </Motion.div>
              )}
            </AnimatePresence>
            {!isOpen && (
              <span className="absolute top-0 right-0 h-4 w-4 animate-pulse rounded-full border-2 border-[#001A3D] bg-green-500"></span>
            )}
          </Motion.button>
        </Motion.div>
      </AnimatePresence>
    </>
  );
}
