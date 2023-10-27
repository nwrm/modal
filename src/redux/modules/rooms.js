import { v4 as uuid } from "uuid";

export const initialState = {
  items: [
    {
      id: uuid(),
      name: "안녕",
      boolean: true,
      selectTimes: [],
    },
    {
      id: uuid(),
      name: "표선",
      boolean: true,
      selectTimes: [],
    },
    {
      id: uuid(),
      name: "Nabox",
      boolean: true,
      selectTimes: [],
    },
  ],
  modalOpen: false,
  selectedButtons: [],
};

// Action types
const OPEN_MODAL = "rooms/OPEN_MODAL";
const CLOSE_MODAL = "rooms/CLOSE_MODAL";
const SELECT_BUTTON = "rooms/SELECT_BUTTON";
const UPDATE_SELECT_TIMES = "rooms/UPDATE_SELECT_TIMES";

// Action creators for modal

export const openModal = () => {
  return { type: OPEN_MODAL };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

export const selectButton = (button) => ({
  type: SELECT_BUTTON,
  payload: button,
});

export const updateSelectTimes = (roomname, selectTimes) => ({
  type: UPDATE_SELECT_TIMES,
  payload: { roomname, selectTimes },
});

// Reducer
const rooms = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalOpen: true }; // 모달 열기 처리

    case CLOSE_MODAL:
      return { ...state, modalOpen: false }; // 모달 닫기 처리

    case SELECT_BUTTON:
      const { payload: button } = action;
      return {
        ...state,
        selectedButtons: handleSelectedTimes(state.selectedButtons, button),
      };

    case UPDATE_SELECT_TIMES:
      const { roomname, selectTimes } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.name === roomname
            ? { ...item, selectedButtons: selectTimes }
            : item
        ),
      };

    default:
      return state;
  }
};

const handleSelectedTimes = (selectedButtons, button) => {
  if (selectedButtons.includes(button)) {
    // 이미 선택된 버튼인 경우, 해당 버튼을 선택 해제합니다.
    return selectedButtons.filter(
      (selectedButton) => selectedButton !== button
    );
  } else if (selectedButtons.length < 2) {
    // 선택된 버튼이 2개 미만인 경우,
    return [...selectedButtons, button];
  } else {
    // 선택된 버튼이 이미 2개인 경우, 기존 선택된 버튼들을 모두 제거하고 현재 버튼만 선택합니다.
    return [button];
  }
};
export default rooms;
