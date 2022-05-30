import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import styles from "./styles.module.scss";
import gsap from "gsap";
import clsx from "clsx";

import { ItemBoard } from "./components";

const durationAnimation = 500;
// in ms

function App() {
  const unitRef = useRef<any>(null);
  const [dice, setDice] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<any>(null);
  const dataBoard = useMemo(
    () => [
      { id: 1, color: "#DBDAD7", coord: { x: 700, y: 600 } },
      { id: 2, color: "#B1B196", coord: { x: 500, y: 580 } },
      { id: 3, color: "#D5C6B9", coord: { x: 350, y: 400 } },
      { id: 4, color: "#CCC0B1", coord: { x: 500, y: 300 } },
      { id: 5, color: "#D2AB7B", coord: { x: 580, y: 270 } },
      { id: 6, color: "#B7977F", coord: { x: 675, y: 180 } },
      { id: 7, color: "#50707A", coord: { x: 525, y: 75 } },
      { id: 8, color: "#50707A", coord: { x: 390, y: 90 } },
      { id: 9, color: "#50707A", coord: { x: 210, y: 120 } },
      { id: 10, color: "#50707A", coord: { x: 0, y: 160 } },
    ],
    []
  );

  const rollDice = () => {
    const chances = 6;
    // dices;

    setDice(0);
    const randDice = Math.floor(chances * Math.random()) + 1;
    setDice(randDice);
    if (randDice > 3) {
      setIsPlaying(true);
      animate();
    }
  };

  const animate = async () => {
    if (isMoving) {
      return;
    }
    setIsMoving(true);
    const next = await ((currentState?.position || 0) + 1);
    const destination = dataBoard?.[next];
    if (!destination) {
      return;
    }
    gsap.to(unitRef?.current, {
      x: destination?.coord?.x,
      y: destination?.coord?.y,
      duration: durationAnimation / 1000,
    });
    setCurrentState({ position: next });
    setTimeout(() => {
      setIsMoving(false);
      setIsPlaying(false);
    }, durationAnimation);
  };

  useEffect(() => {
    if (unitRef?.current) {
      gsap.to(unitRef?.current, {
        x: dataBoard?.[0]?.coord?.x,
        y: dataBoard?.[0]?.coord?.y,
        duration: 0,
      });
    }
  }, [unitRef, dataBoard]);

  // useEffect(() => {
  //   if (currentState?.position >= dataBoard?.length - 1) {
  //     setCurrentState({ position: 0 });
  //   }
  // }, [currentState]);

  return (
    <div className={styles.container}>
      <div className={styles.containerBoard}>
        {dataBoard?.map((item: any, index: number) => (
          <ItemBoard key={index} position={item?.coord} />
        ))}
        <div ref={unitRef} className={styles.containerUnit}>
          <div
            className={clsx(styles.unit, {
              [styles.jumpAction]: isMoving,
            })}
          ></div>
        </div>
        <div className={styles.btnContainer}>
          {dice}
          <button
            className={styles.btnAction}
            onClick={rollDice}
            // onClick={actionHandler}
            disabled={isPlaying || isMoving}
          >
            {currentState?.position >= dataBoard?.length - 1
              ? "Restart"
              : "Roll Dice!"}
          </button>
          <p className={styles.info}>{"*You will move when dice is > 3"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
