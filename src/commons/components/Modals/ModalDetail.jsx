import React, { useState } from "react";
import Modal from "./Modal";

function ModalDetail() {
  const initialState = [
    {
      id: 1,
      name: "안녕",
      boolean: true,
      selectTimes: [],
    },
    {
      id: 2,
      name: "표선",
      boolean: true,
      selectTimes: [],
    },
    {
      id: 3,
      name: "Nabox",
      boolean: true,
      selectTimes: [],
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [items, setItems] = useState(initialState); //items = initialState(배열값)
  const [roomname, setRoomname] = useState(""); //roomname = items.name

  //모달열기: 여기서 item은 클릭되는 버튼의 값을 받아옴
  const handleOpenModal = (item) => {
    setModalOpen(true); //setModalOpen 상태가 true로 되면서 열림
    setRoomname(item.name); //setRoomnam가 item.name의 값을 받아옴
    console.log("room name:", item.name);
  };

  //모달닫기
  const handleCloseModal = () => {
    setModalOpen(false); //setModalOpen 상태가 false로 되면서 닫힘
    setSelectedButtons([]); //선택된버튼들이 초기화됌
  };

  //버튼선택
  const handleButtonClick = (hour) => {
    if (selectedButtons.includes(hour)) {
      setSelectedButtons(selectedButtons.filter((button) => button !== hour));
      //1. selectedButtons에 hour 값이 이미 포함되어 있다면,해당 hour 값을 제외한 새로운 selectedButtons 배열을 설정
    } else if (selectedButtons.length < 2) {
      setSelectedButtons([...selectedButtons, hour]);
      //selectedButtons의 길이가 2보다 작다면, selectedButtons에 hour 값을 추가
    } else {
      setSelectedButtons([hour]);
    }
    console.log("Selected button value:", hour, roomname);
  };

  //선택 시간 업데이트 버튼 - 특정 방의 선택된 시간(selectTimes)값을 업데이트
  const handleSelectedTimes = (roomname, updatedRoomTimes) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.name === roomname
          ? { ...item, selectTimes: updatedRoomTimes }
          : item
      )
    );
  };

  const timeSlots = Array.from({ length: 12 }, (_, index) => {
    const hour = index + 9;
    return {
      label: `${hour < 10 ? "0" + hour : hour}:00`,
      value: index,
    };
  });

  return (
    <>
      {items.map((item) => (
        <button key={item.id} onClick={() => handleOpenModal(item)}>
          {item.name}
        </button>
      ))}

      <Modal
        open={modalOpen}
        close={handleCloseModal}
        roomname={roomname}
        selectedButtons={selectedButtons}
        updateSelectTimes={handleSelectedTimes}
      >
        {timeSlots.map((timeSlot) => (
          <button
            key={timeSlot.value}
            className={`button timeslot ${
              selectedButtons && selectedButtons.includes(timeSlot.value)
                ? "selected"
                : ""
            }`}
            onClick={() => handleButtonClick(timeSlot.value)}
          >
            {timeSlot.label}
          </button>
        ))}
      </Modal>
    </>
  );
}

export default ModalDetail;
