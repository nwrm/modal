import React from "react";
import "../../../assets/css/modal.css";
import { fetchReservationHistory, bookRoom } from "../../../service/api";
import { selectButton } from "../../../redux/modules/rooms";
import { useDispatch } from "react-redux";

const Modal = (props) => {
  const { open, close, roomname, selectedButtons, updateSelectTimes } = props;

  const dispatch = useDispatch(); // (수정) dispatch 함수 정의

  const handleBookingAndFinalBooking = async () => {
    if (selectedButtons.length === 0) {
      alert("시간을 선택해주세요!");
    } else {
      try {
        dispatch(selectButton([]));
        updateSelectTimes(roomname, selectedButtons);
        console.log("예약완료:", roomname, selectedButtons);
        const response = await bookRoom(roomname, true);
        alert(response.msg);
        alert("예약이 완료되었습니다!");
      } catch (error) {
        console.error("Error during booking:", error);
        alert("예약 중 오류가 발생했습니다.");
      }
    }
  };

  // 예약 내역 조회 버튼 클릭 핸들러
  const handleReservationHistory = async (roomId) => {
    try {
      const history = await fetchReservationHistory(roomId);
      // history를 상태에 저장하거나 화면에 출력
    } catch (error) {
      console.error("Error fetching reservation history:", error);
      alert("예약 내역 조회 중 오류가 발생했습니다.");
    }
  };

  // 최종 예약하기 버튼 클릭
  const handleFinalBookingClick = () => {
    handleBookingAndFinalBooking(roomname);
  };

  // 예약 내역 조회 버튼 클릭 핸들러
  const handleReservationHistoryClick = () => {
    handleReservationHistory(roomname);
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
            <button className="booking" onClick={handleFinalBookingClick}>
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
