import { RiContactsBook2Fill, RiContactsFill } from "react-icons/ri";
import Section from "./components/Section/Section";
import Container from "./components/Container/Container";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import { useSelector } from "react-redux";
import { getContacts } from "redux/contacts/contactsSelectors";

const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <>
      <Section>
        <Container>
          <h1>
            <RiContactsBook2Fill />
            Phonebook
          </h1>

          <ContactForm />

          {contacts.length > 0 && (
            <>
              <h2>
                <RiContactsFill />
                Contacts
              </h2>

              <Filter />

              <ContactList />
            </>
          )}
        </Container>
      </Section>
    </>
  );
};

export default App;
