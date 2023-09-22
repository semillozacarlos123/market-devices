import React from "react";
import styles from "./button.module.css";

import Link from "next/link";

const Button = ({ children, slug, company }) => {
  return (
    <button className={styles.button}>
      <Link className={styles.link} href={company + "/products/" + slug}>
        {children}
      </Link>
    </button>
  );
};

export default Button;
