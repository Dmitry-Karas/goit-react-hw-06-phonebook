// import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { MdContactPhone } from "react-icons/md";
import { /*connect,*/ useSelector, useDispatch } from "react-redux";
import contactsActions from "redux/contacts/contactsActions";
import { getFilteredContacts } from "redux/contacts/contactsSelectors";
import { List, Item, Button } from "./ContactList.styled";

// const filterContacts = (contacts, filter) =>
//   contacts.filter(
//     (contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase()) ||
//       contact.number.includes(filter)
//   );

const ContactList = (/*{ contacts, onDeleteContact }*/) => {
  const contacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  return (
    <List>
      {contacts.map(({ id, name, number }) => {
        return (
          <Item key={id}>
            <span>
              <MdContactPhone size="20" />
              {name}:
            </span>

            <span>{number}</span>

            <Button onClick={() => dispatch(contactsActions.deleteContact(id))}>
              <BsTrash size="20" />
            </Button>
          </Item>
        );
      })}
    </List>
  );
};

// ContactList.propTypes = {
// contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
// onDeleteContact: PropTypes.func.isRequired,
// };

// Button.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };

// const mapStateToProps = ({ contacts: { items, filter } }) => ({
//   contacts: filterContacts(items, filter),
// });

// const mapDispatchToProps = (dispatch) => ({
//   onDeleteContact: (id) => dispatch(contactsActions.deleteContact(id)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
export default ContactList;
