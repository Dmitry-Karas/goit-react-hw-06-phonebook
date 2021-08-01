import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import contactsActions from "./contactsActions";
// import types from "./contactsTypes";

// const initialState = JSON.parse(localStorage.getItem("contacts")) ?? [];
const initialState = [];

const checkContact = (contacts, name, number) => {
  const includedName = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  const includedNumber = contacts.find(
    (contact) =>
      contact.number.replace(/[^0-9]/g, "") === number.replace(/[^0-9]/g, "")
  );

  if (includedName) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `${name.toUpperCase()}\nis already in contacts!`,
      confirmButtonColor: "indianred",
    });

    return includedName;
  }

  if (includedNumber) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `This number is already in contacts as\n${includedNumber.name.toUpperCase()}`,
      confirmButtonColor: "indianred",
    });
    return includedNumber;
  }
};

const addContact = (state, { payload }) => {
  const includedContact = checkContact(state, payload.name, payload.number);

  if (includedContact) return state;

  // localStorage.setItem("contacts", JSON.stringify([...state, payload]));

  return [...state, payload];
};

const deleteContact = (state, { payload }) => {
  const contacts = state.filter(({ id }) => {
    return id !== payload;
  });

  // localStorage.setItem("contacts", JSON.stringify(contacts));

  return contacts;
};

const items = createReducer(initialState, {
  [contactsActions.addContact]: addContact,
  [contactsActions.deleteContact]: deleteContact,
});

const filter = createReducer("", {
  [contactsActions.changeFilter]: (_, { payload }) => payload,
});

// const items = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case types.ADD:
//       const includedContact = checkContact(state, payload.name, payload.number);

//       if (includedContact) return state;

//       localStorage.setItem("contacts", JSON.stringify([...state, payload]));

//       return [...state, payload];

//     case types.DELETE:
//       const contacts = state.filter(({ id }) => {
//         return id !== payload;
//       });

//       localStorage.setItem("contacts", JSON.stringify(contacts));

//       return contacts;

//     default:
//       return state;
//   }
// };

// const filter = (state = "", { type, payload }) => {
//   switch (type) {
//     case types.CHANGE_FILTER:
//       return payload;

//     default:
//       return state;
//   }
// };

export default combineReducers({ items, filter });
