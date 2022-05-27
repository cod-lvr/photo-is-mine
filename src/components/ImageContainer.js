// import animation lib
import { motion } from "framer-motion";

// declare animation list style
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function ImageContainer(props) {
  // turning data array to single image display
  const singleImageItem = props.data.map((image) => {
    return (
      <motion.li key={image.id} className="bg-orange rounded" variants={item}>
        <figure className="p-6  my-2">
          <img src={image.download_url} alt="search input" />
          <figcaption className="text-center mt-2">
            author: <span className="text-yellow">{image.author}</span>
          </figcaption>
        </figure>
      </motion.li>
    );
  });

  return (
    <section className="">
      <motion.ul
        className="md:grid-cols-3 md:grid md:gap-2"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {singleImageItem}
      </motion.ul>
      <button
        className="my-7 ml-52 uppercase p-2 bg-yellow w-2/5 rounded lg:mt-0 lg:w-5/12 lg:ml-32 hover:bg-amber-900 hover:text-yellow"
        onClick={props.changepage}
      >
        fetch more..
      </button>
    </section>
  );
}

export default ImageContainer;
