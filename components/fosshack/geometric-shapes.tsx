"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ShapeProps {
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  width: number | undefined;
  scrollMultiplier?: number;
  blur?: boolean;
  scrollYProgress: MotionValue<number>;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const Shape = ({
  color,
  size,
  initialX,
  initialY,
  scrollMultiplier = 1,
  blur = false,
  width,
  scrollYProgress,
}: ShapeProps) => {
  const ref = useRef(null);

  const y = useTransform(scrollYProgress, [0, 1], [0, 300 * scrollMultiplier]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 150 * scrollMultiplier]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 180 * scrollMultiplier],
  );

  const responsiveSize = width ? (width / 1920) * size : size;
  const showBlur = blur && (width ?? 1920) >= 768;

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        x,
        y,
        rotate,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.32, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div
        className={`${color} ${showBlur ? "backdrop-blur-md" : ""}`}
        style={{
          width: responsiveSize,
          height: responsiveSize,
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
          filter: showBlur ? "blur(6px)" : "none",
        }}
      />
    </motion.div>
  );
};

export const GeometricShapes = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { width } = useWindowSize();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(() => setIsMounted(true), {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(handle);
    }

    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <Shape
        width={width}
        scrollYProgress={scrollYProgress}
        color="bg-[#4AE54A]/55"
        size={80}
        initialX={10}
        initialY={15}
        scrollMultiplier={1.2}
        blur
      />
      <Shape
        width={width}
        scrollYProgress={scrollYProgress}
        color="bg-[#3B82F6]/55"
        size={60}
        initialX={85}
        initialY={25}
        scrollMultiplier={-0.8}
      />
      <Shape
        width={width}
        scrollYProgress={scrollYProgress}
        color="bg-[#4AE54A]/55"
        size={70}
        initialX={75}
        initialY={45}
        scrollMultiplier={1.5}
        blur
      />
      <Shape
        width={width}
        scrollYProgress={scrollYProgress}
        color="bg-[#3B82F6]/55"
        size={65}
        initialX={15}
        initialY={55}
        scrollMultiplier={-1.2}
      />
      <Shape
        width={width}
        scrollYProgress={scrollYProgress}
        color="bg-[#4AE54A]/55"
        size={55}
        initialX={45}
        initialY={75}
        scrollMultiplier={0.9}
        blur
      />
      <Shape
        width={width}
        scrollYProgress={scrollYProgress}
        color="bg-[#3B82F6]/55"
        size={75}
        initialX={65}
        initialY={85}
        scrollMultiplier={-1}
      />
      <Shape
        width={width}
        scrollYProgress={scrollYProgress}
        color="bg-[#4AE54A]/55"
        size={45}
        initialX={25}
        initialY={35}
        scrollMultiplier={-0.7}
      />
      <Shape
        width={width}
        scrollYProgress={scrollYProgress}
        color="bg-[#3B82F6]/55"
        size={50}
        initialX={92}
        initialY={65}
        scrollMultiplier={1.1}
        blur
      />
    </div>
  );
};
