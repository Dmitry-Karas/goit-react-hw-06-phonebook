export const getFilter = (state) => state.contacts.filter;

export const getContacts = (state) => state.contacts.items;

export const getFilteredContacts = (state) => {
  const contacts = getContacts(state);
  const filter = getFilter(state);

  return contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );
};
