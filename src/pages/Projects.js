import React, { useState, useRef } from "react";
import Header from "../components/Header";
import data from "../projects";
import "../style/projects.css";
import ScrollContainer from "react-indiana-drag-scroll";

export default function Works() {
  const visible = true;
  const [hover, setHover] = useState(false);
  const [selected, set_selected] = useState("all");
  const [arr, set_arr] = useState(data);
  const items = [...new Set(data.map((val) => val.c))];
  const sliderRef = useRef();

  function filterItem(curcat) {
    const newItem = data.filter((newVal) => {
      return newVal.c === curcat;
    });
    set_arr(newItem);
    set_selected(curcat);
  }

  const [leftElement, setLeftElement] = useState(false);
  const [rightElement, setRightElement] = useState(false);

  function handleMouseMove(event) {
    const { clientX } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    if (clientX >= rect.left && clientX <= rect.left + halfWidth) {
      setLeftElement(true);
      setRightElement(false);
    } else if (clientX > rect.left + halfWidth && clientX <= rect.right) {
      setLeftElement(false);
      setRightElement(true);
    } else {
      setLeftElement(false);
      setRightElement(false);
    }
  }

  function handleMouseLeave() {
    setLeftElement(false);
    setRightElement(false);
  }

  return (
    <div className={`works ${visible && "visible"}`}>
      <Header />
      <div className="works_header">
        <button
          onClick={() => {
            set_arr(data);
            set_selected("all");
          }}
          className={selected === "all" ? "active" : ""}
        >
          All
        </button>
        {items.map((val, id) => {
          return (
            <button
              key={id}
              className={selected === val ? "active" : ""}
              onClick={() => {
                filterItem(val);
              }}
            >
              {val}
            </button>
          );
        })}
      </div>

      <div className={`works_slider ${leftElement && "leftBtn"} ${rightElement && "rightBtn"}`} ref={sliderRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {/* <div
          style={{
            display: "none",
            width: "50%",
            backgroundColor: leftElement ? "red" : "blue",
          }}
        ></div>
        <div
          style={{
            display: "none",
            width: "50%",
            backgroundColor: rightElement ? "red" : "blue",
          }}
        ></div> */}

        <ScrollContainer className="slider_inner">
          {arr.map((item, index) => {
            return (
              <div key={index} className={`w_item ${hover && "imghover"}`}>
                <div
                  onMouseEnter={() => setHover(false)}
                  onDoubleClick={() => {
                    if (item.g !== null) {
                      window.open(item.g);
                    } else window.alert("Github page not found! \nPrivate Project");
                  }}
                  className={`w_image`}
                  style={{ backgroundImage: `url(${item.i})` }}
                />
                <button
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => {
                    if (item.l !== null) {
                      window.open(item.l);
                    } else window.alert("Live version not found!");
                  }}
                  className="w_btns"
                >
                  <h2>{item.a}</h2>
                  <p>→</p>
                </button>
              </div>
            );
          })}
        </ScrollContainer>
      </div>
    </div>
  );
}

// const [globalMousePos, setGlobalMousePos] = useState({});
// const [localMousePos, setLocalMousePos] = useState({});

// function handleMouseMove(e) {
//   const localX = e.clientX - e.target.offsetLeft;
//   const localY = e.clientY - e.target.offsetTop;
//   setLocalMousePos({ x: localX, y: localY });
// }

// useEffect(() => {
//   function handleMouseMove(e) {
//     setGlobalMousePos({
//       x: e.clientX,
//       y: e.clientY,
//     });
//   }
//   window.addEventListener("mousemove", handleMouseMove);
//   return () => {
//     window.removeEventListener("mousemove", handleMouseMove);
//   };
// }, []);

// console.log("LOCAL:", localMousePos);
// console.log("GLOBAL:", globalMousePos);
