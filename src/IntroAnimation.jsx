import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./IntroAnimation.css";

export default function IntroAnimation({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="intro-overlay"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="intro-name">
            {"Baran".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.55,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="intro-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          />

          <motion.p
            className="intro-tagline"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ delay: 1.15, duration: 0.7 }}
          >
            Computer Engineer · AI Developer
          </motion.p>

          <motion.div
            className="intro-progress"
            initial={{ width: 0 }}
            animate={{ width: "110px" }}
            transition={{ delay: 1.7, duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
