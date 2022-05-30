import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import clsx from "clsx";

import styles from "./styles.module.scss";

export default function ItemBoard({ position }: any) {
  const itemRef = useRef<any>(null);

  useEffect(() => {
    // const block = itemRef?.current?.clientWidth;
    if (itemRef?.current) {
      console.log(position);
      gsap.to(itemRef?.current, {
        x: position?.x,
        y: position?.y,
        duration: 0,
      });
    }
  }, [itemRef, position]);

  return <div ref={itemRef} className={styles.itemBoard} />;
}
