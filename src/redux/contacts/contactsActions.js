import { createAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
// import types from "./contactsTypes";

const contactsActions = {
  addContact: createAction("contacts/add", (name, number) => ({
    payload: {
      id: nanoid(),
      name,
      number,
    },
  })),
  deleteContact: createAction("contacts/delete"),
  changeFilter: createAction("contacts/changeFilter"),

  // addContact: (name, number) => ({
  //   type: types.ADD,
  //   payload: { id: nanoid(), name, number },
  // }),

  // deleteContact: (contactId) => ({
  //   type: types.DELETE,
  //   payload: contactId,
  // }),

  // changeFilter: (value) => ({
  //   type: types.CHANGE_FILTER,
  //   payload: value,
  // }),
};

export default contactsActions;
