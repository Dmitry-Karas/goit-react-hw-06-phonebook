// import PropTypes from "prop-types";
import { /*connect*/ useSelector, useDispatch } from "react-redux";
import contactsActions from "redux/contacts/contactsActions";
import { nanoid } from "nanoid";
import { AiOutlineFileSearch } from "react-icons/ai";
import { InputContainer, Input, Label } from "./Filter.styled";
import { getFilter } from "redux/contacts/contactsSelectors";

const Filter = (/*{ value, onChange }*/) => {
  const filterInputId = nanoid();
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <>
      <InputContainer>
        <Input
          id={filterInputId}
          type="text"
          value={value}
          onChange={(e) =>
            dispatch(contactsActions.changeFilter(e.target.value))
          }
          placeholder="Dmitry"
        />
        <Label htmlFor={filterInputId}>
          <AiOutlineFileSearch size="30" />
          Find contacts by name
        </Label>
      </InputContainer>
    </>
  );
};

// Filter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   value: state.contacts.filter,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onChange: (e) => dispatch(contactsActions.changeFilter(e.target.value)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Filter);
export default Filter;
