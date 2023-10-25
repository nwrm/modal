import React from "react";
import "../../../assets/css/modal.css";

const Modal = (props) => {
  const { open, close, roomname, selectedButtons } = props;

  const handleBooking = () => {
    if (selectedButtons.length === 0) {
      alert("시간을 선택해주세요!");
    } else {
      // 예약 완료 후 closedTimes를 업데이트
      props.updateSelectTimes(roomname, selectedButtons);
      alert("예약이 완료되었습니다!");
    }
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {roomname}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="booking" onClick={handleBooking}>
              예약
            </button>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
