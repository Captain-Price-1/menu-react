import { useState } from "react";
import menu from "./data";
import { motion, AnimateSharedLayout } from "framer-motion";
import {
  TransitionGroup,
  CSSTransition,
  Transition,
} from "react-transition-group";

function App() {
  const allCategories = ["all", ...new Set(menu.map((item) => item.category))];
  const [activeMenu, setactiveMenu] = useState(menu);
  const [button, setButton] = useState("all");

  const handleClick = (buttonActive) => {
    console.log(buttonActive);
    setButton(buttonActive);
    let latest = menu.filter((item) => item.category === buttonActive);
    console.log(latest);
    if (latest.length === 0) {
      latest = menu;
    }
    setactiveMenu(latest);
  };

  return (
    <div className="App">
      <article className="title-div">
        <img
          className="menu-image"
          src="./images/fast-food-menu-restaurant-the-chefs-house-the-elegant-restaurant-menu-pattern-vector-9987be605aa2ae76f95264cb3237e016.png"
          alt=""
        />
        <div className="underline"></div>
      </article>
      <motion.section className="buttons">
        {allCategories.map((item) => {
          return (
            <button
              className={`${
                item === button ? "filter-btn active" : "filter-btn"
              }`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          );
        })}
      </motion.section>
      <TransitionGroup className="section-center">
        {activeMenu.map((item) => {
          console.log(item.title);
          const { title, price, img, desc, category } = item;
          return (
            <CSSTransition key={title} timeout={500} classNames="alert">
              <AnimateSharedLayout>
                <motion.div className="individual-food" layout>
                  <img src={img} alt="" className="photo" />
                  <div className="item-info">
                    <header>
                      <h4>{title}</h4>
                      <h3>{price}</h3>
                    </header>
                    <p>{desc}</p>
                  </div>
                </motion.div>
              </AnimateSharedLayout>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}

export default App;
