import { QueryClientProvider } from "@tanstack/react-query";
import { Variants } from "motion/react";
import { BrowserRouter } from "react-router";
import FormBasic from "./components/form/FormBasic";
import Header from "./components/header/Header";
import OTPForm from "./components/otp-form/OTPForm";
import TableBasic from "./components/table/TableBasic";
import { queryClient } from "./utils";
import TableRouter from "./components/table/TableRouter";
import CustomTableSection from "./components/custom-table/CustomTableSection";
import Pagination from "./components/pagination-table/PaginationControls";
import MenuClickOutside from "./components/menu-click-outside/MenuClickOutside";
const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, duration: 1, when: "beforeChildren" },
  },
};
const h1Variants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};
const textVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1 },
  },
};
// const carouselData = [
//   <motion.div
//     className="bg-red-800 w-full h-full text-white space-y-4 p-4"
//     variants={variants}
//     initial="hidden"
//     animate="visible"
//   >
//     <motion.h1 className="text-4xl" variants={h1Variants}>
//       Hello World
//     </motion.h1>
//     <motion.p variants={textVariants}>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
//       explicabo est illo ea dicta veritatis rerum quidem soluta consectetur,
//       ullam labore molestias ut corporis nemo molestiae accusamus quisquam
//       excepturi. Sequi!
//     </motion.p>
//   </motion.div>,
//   <motion.div className="bg-blue-800 w-full h-full"></motion.div>,
//   <motion.div className="bg-green-800 w-full h-full"></motion.div>,
// ];
const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <main className="space-y-4">
          <Header />
          <FormBasic />
          {/* <h1 className="text-6xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae repellat, consequuntur mollitia molestias sed nemo deleniti accusamus corrupti velit similique voluptates eum nisi aut ut eligendi consequatur reprehenderit perferendis excepturi?</h1>
        <Carousel items={carouselData} /> */}
          <OTPForm />
          <CustomTableSection />
          <TableRouter />
          <Pagination />
          <MenuClickOutside />
        </main>
      </QueryClientProvider>
  );
};

export default App;
