import { AnimatePresence, motion } from "motion/react";
import { FC, JSX, useEffect, useRef, useState } from "react";

type CarouselProps = {
  items: JSX.Element[];
  timeout?: number;
};
const Carousel: FC<CarouselProps> = ({ items, timeout = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentTimeout = useRef<NodeJS.Timeout>();
  useEffect(() => {
    currentTimeout.current = setInterval(() => {
      setCurrentIndex(x => (x + 1) % items.length)
    }, timeout);
    return () => {
      clearInterval(currentTimeout.current)
    }
  }, [items.length, timeout]);

  function slideBtnClick(i: number): void {
    clearInterval(currentTimeout.current)
    setCurrentIndex(i)
    currentTimeout.current = setInterval(() => {
      setCurrentIndex(x => (x + 1) % items.length)
    }, timeout);
    }

  return (
    <div className="w-full h-96 relative overflow-hidden">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, when: "beforeChildren" }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            className="w-full h-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            exit={{ scale: 0 }}
            key={currentIndex}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
        {/* <AnimatePresence>{items[currentIndex]}</AnimatePresence> */}
      </motion.div>
      <div className="flex gap-3 absolute bottom-5 w-full justify-center">
        {items.map((_, i) => (
          <button
            key={i}
            className={`${
              currentIndex === i ? "bg-white" : "bg-white/25"
            } border border-black size-4 rounded-full block`}
            onClick={() => slideBtnClick(i)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
