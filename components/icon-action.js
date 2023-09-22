"use client";
import styles from "./icon-action.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { motion } from "framer-motion";

export default function IconAction({
  children,
  content: { summary, company },
}) {
  const [isInfoClicked, setInfo] = useState(null);

  const animationShow = (
    <motion.div
      className={styles.flash}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.1,
        delay: 0.1,
        ease: "easeOut",
      }}
    >
      <h3>{company}</h3>
      <p>{summary}</p>
    </motion.div>
  );

  const animationHide = (
    <motion.div
      className={styles.flash}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.1,
        delay: 0.1,
        ease: "easeIn",
      }}
    >
      <h3>{company}</h3>
      <p>{summary}</p>
    </motion.div>
  );

  return (
    <>
      <div>
        <div className={styles.backCircle} />
        <i className={styles.icon} onClick={() => setInfo(!isInfoClicked)}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </i>
      </div>
      {children}

      {/* Only render the animation components if isInfoClicked is not null */}
      {isInfoClicked !== null &&
        (isInfoClicked ? animationShow : animationHide)}
    </>
  );
}
