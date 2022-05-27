import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import styles from "./styles.module.scss";
import gsap from "gsap";
import clsx from "clsx";

const durationAnimation = 500;
// in ms

function App() {
  const unitRef = useRef<any>(null);
  const [intervalDice, setIntervalDice] = useState<any>(null);
  const [counterInterval, setCounterInterval] = useState<number>(0);
  const [dice, setDice] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<any>(null);
  const dataBoard = useMemo(
    () => [
      { id: 1, color: "#DBDAD7" },
      { id: 2, color: "#B1B196" },
      { id: 3, color: "#D5C6B9" },
      { id: 4, color: "#CCC0B1" },
      { id: 5, color: "#D2AB7B" },
      { id: 6, color: "#B7977F" },
      { id: 7, color: "#50707A" },
    ],
    []
  );

  const rollDice = () => {
    if (intervalDice) {
      return;
    }
    setDice(0);
    setIsPlaying(true);
    const randDice = Math.floor(6 * Math.random()) + 1;
    setDice(randDice);
    let interval = setInterval(
      () => setCounterInterval((counterInterval) => counterInterval + 1),
      durationAnimation + durationAnimation / 2
    );
    setIntervalDice(interval);
  };

  const animate = () => {
    if (isMoving) {
      return;
    }
    setIsMoving(true);
    const block = unitRef?.current?.clientWidth;
    gsap.fromTo(
      unitRef?.current,
      { x: (currentState?.position || 0) * block },
      {
        x: (currentState?.position || 0) * block + block,
        duration: durationAnimation / 1000,
      }
    );
    setCurrentState({ position: (currentState?.position || 0) + 1 });
    setTimeout(() => setIsMoving(false), durationAnimation);
  };

  useEffect(() => {
    if (isPlaying) {
      animate();
    }
    if (counterInterval + 1 >= dice) {
      clearInterval(intervalDice);
      setIntervalDice(null);
      setIsPlaying(false);
      setCounterInterval(0);
    }
  }, [counterInterval, dice, isPlaying]);

  useEffect(() => {
    if (currentState?.position >= 6) {
      setCurrentState({ position: 0 });
    }
  }, [currentState]);

  return (
    <div className={styles.container}>
      <div className={styles.containerBoard}>
        {dataBoard?.map((item: any, index: number) => (
          <div
            key={index}
            className={styles.itemBoard}
            style={{ background: item?.color }}
          ></div>
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
            disabled={isPlaying || isMoving}
          >
            Roll Dice!
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
