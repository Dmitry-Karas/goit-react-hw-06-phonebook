// import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useState } from "react";
import { /*connect,*/ useDispatch } from "react-redux";
import {
  StyledForm,
  InputContainer,
  Input,
  Label,
  Button,
} from "./ContactForm.styled";
import { FiUser, FiPhone, FiUserPlus } from "react-icons/fi";
import contactsActions from "redux/contacts/contactsActions";

const ContactForm = (/*{ onSubmit }*/) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const dispatch = useDispatch();

  const nameInputId = nanoid();
  const telInputId = nanoid();

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // onSubmit({ name, number });
    dispatch(contactsActions.addContact(name, number));

    setName("");
    setNumber("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          id={nameInputId}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          autoComplete="off"
          placeholder="Dmitry Karas"
          maxLength="40"
          required
        />

        <Label htmlFor={nameInputId}>
          <FiUser size="22" />
          Name
        </Label>
      </InputContainer>

      <InputContainer>
        <Input
          id={telInputId}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          autoComplete="off"
          placeholder="444-55-66"
          maxLength="17"
          required
        />
        <Label htmlFor={telInputId}>
          <FiPhone size="22" />
          Number
        </Label>
      </InputContainer>

      <Button type="submit">
        <FiUserPlus size="30" />
        add
      </Button>
    </StyledForm>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: ({ name, number }) =>
//     dispatch(contactsActions.addContact(name, number)),
// });

// ContactForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default connect(null, mapDispatchToProps)(ContactForm);
export default ContactForm;
