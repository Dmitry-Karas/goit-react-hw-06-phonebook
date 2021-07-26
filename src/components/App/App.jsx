import Swal from "sweetalert2";
import { useState } from "react";
import { RiContactsBook2Fill, RiContactsFill } from "react-icons/ri";
import { nanoid } from "nanoid";
import { Section } from "../Section/Section";
import { Container } from "../Container/Container";
import { ContactForm } from "../ContactForm/ContactForm";
import { ContactList } from "../ContactList/ContactList";
import { Filter } from "../Filter/Filter";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const App = () => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filter, setFilter] = useState(null);

  const checkContact = (name, number) => {
    const includedName = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    const includedNumber = contacts.find(
      (contact) =>
        contact.number.replace(/[^0-9]/g, "") === number.replace(/[^0-9]/g, "")
    );

    if (includedName) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `${name.toUpperCase()}\nis already in contacts!`,
        confirmButtonColor: "indianred",
      });
    }

    if (includedNumber) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `This number is already in contacts as\n${includedNumber.name.toUpperCase()}`,
        confirmButtonColor: "indianred",
      });
    }
  };

  const addContact = (name, number) => {
    const id = nanoid();

    setContacts((contacts) => [...contacts, { id, name, number }]);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const filterContacts = () =>
    contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter) ||
        contact.number.includes(filter)
    );

  const handleFilterInputChange = (value) => {
    setFilter(value.toLowerCase());
  };

  const handleFormSubmit = ({ name, number }) => {
    const includedContact = checkContact(name, number);

    if (includedContact) {
      return;
    }

    addContact(name, number);
  };

  return (
    <>
      <Section>
        <Container>
          <h1>
            <RiContactsBook2Fill />
            Phonebook
          </h1>
          <ContactForm onSubmit={handleFormSubmit} />
          {contacts.length > 0 && (
            <>
              <h2>
                <RiContactsFill />
                Contacts
              </h2>
              <Filter onChange={handleFilterInputChange} />
              <ContactList
                contacts={filter ? filterContacts() : contacts}
                onDeleteContact={deleteContact}
              />
            </>
          )}
        </Container>
      </Section>
    </>
  );
};

// export default class App extends Component {
//   state = {
//     contacts: [],
//     filter: "",
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem("contacts"));

//     if (contacts) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const prevContacts = prevState.contacts;
//     const nextContacts = this.state.contacts;

//     if (prevContacts !== nextContacts) {
//       localStorage.setItem("contacts", JSON.stringify(nextContacts));
//     }
//   }

// checkContact = (name, number) => {
//   const { contacts } = this.state

//   const includedName = contacts.find(
//     (contact) => contact.name.toLowerCase() === name.toLowerCase(),
//   )

//   const includedNumber = contacts.find(
//     (contact) =>
//       contact.number.replace(/[^0-9]/g, '') === number.replace(/[^0-9]/g, ''),
//   )

//   if (includedName) {
//     return Swal.fire({
//       position: 'center',
//       icon: 'error',
//       title: `${name.toUpperCase()}\nis already in contacts!`,
//       confirmButtonColor: 'indianred',
//     })
//   }

//   if (includedNumber) {
//     return Swal.fire({
//       position: 'center',
//       icon: 'error',
//       title: `This number is already in contacts as\n${includedNumber.name.toUpperCase()}`,
//       confirmButtonColor: 'indianred',
//     })
//   }
// }

// addContact = (name, number) => {
//   const id = nanoid()

//   this.setState((prevState) => ({
//     contacts: [...prevState.contacts, { id, name, number }],
//   }))
// }

// deleteContact = (contactId) => {
//   this.setState(({ contacts }) => ({
//     contacts: contacts.filter((contact) => contact.id !== contactId),
//   }))
// }

// handleFilterInputChange = (value) => {
//   this.setState({ filter: value.toLowerCase() })
// }

// handleFormSubmit = ({ name, number }) => {
//   const includedContact = this.checkContact(name, number)

//   if (includedContact) {
//     return
//   }

//   this.addContact(name, number)
// }

//   render() {
//     const { contacts, filter } = this.state;
// const filteredContacts = contacts.filter(
//   (contact) =>
//     contact.name.toLowerCase().includes(filter) ||
//     contact.number.includes(filter)
// );

//     return (
//       <>
//         <Section>
//           <Container>
//             <h1>
//               <RiContactsBook2Fill />
//               Phonebook
//             </h1>
//             <ContactForm onSubmit={this.handleFormSubmit} />
//             {contacts.length > 0 && (
//               <>
//                 <h2>
//                   <RiContactsFill />
//                   Contacts
//                 </h2>
//                 <Filter onChange={this.handleFilterInputChange} />
//                 <ContactList
//                   contacts={filteredContacts}
//                   onDeleteContact={this.deleteContact}
//                 />
//               </>
//             )}
//           </Container>
//         </Section>
//       </>
//     );
//   }
// }
export default App;
