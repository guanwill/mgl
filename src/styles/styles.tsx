import styled from "styled-components";
import "./fonts.css";

export const ContainerInner = styled.div`
  margin: 30px 0;
`;

export const ButtonWrapper = styled.div`
  margin: 20px;
  button {
    box-shadow: none;
  }  
`;

export const LinkWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

export const SubHeadingWrapper = styled.div`
  h1 {
    font-size: 15px;
    font-family: "Press Start 2P";
    padding: 10px;
    color: #3a3a3a;
  }
`;

export const BackLinkWrapper = styled.div`
  width: 100%;
  text-align: left;
  a {
    text-decoration: none;
  }
`;

export const PageTitle = styled.h2`
  margin: 20px 0 20px 0;
  font-size: 15px;
  padding: 10px;
  font-family: "Press Start 2P";
  color: #3a3a3a;
  font-weight: normal;
`;

// NAVBAR
export const NavBrandWrapper = styled.p`
  font-family: "Press Start 2P";
  text-align: left;
  font-size: 21px;
  @media (max-width: 768px) {
    text-align: center;
  }
  @media (max-width: 414px) {
    padding: 10px 0;
  }
`;

export const NavButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  @media (max-width: 414px) {
    justify-content: center;
  }
`;

// FORMS
export const InputField = styled.input.attrs(props => ({
  type: props.type,
  placeholder: props.placeholder,
  className: props.className,
  name: props.name,
  onChange: props.onChange,
  value: props.value
}))`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  width: 200px;
  margin: 5px;
`;

export const SelectField = styled.select.attrs(props => ({
  id: props.id,
  className: props.className,
  name: props.name,
  onChange: props.onChange
}))`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  width: 223px;
  margin: 5px;
  height: 38px;
  background-color: white;
`;

export const TextAreaField = styled.textarea.attrs(props => ({
  placeholder: props.placeholder,
  className: props.className,
  name: props.name,
  onChange: props.onChange,
  value: props.value
}))`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  width: 200px;
  margin: 5px;
  height: 100px;
`;

// TABLE
export const MuiTableWrapper = styled.div`
  border: 1px solid lightgrey;
  div {
    box-shadow: none;
  }
  th {
    font-weight: bold;
    font-style: italic;
    font-size: 15px;
    color: grey;
    padding: 10px 5px;
    @media (max-width: 414px) {
      justify-content: center;
    }
  }
  td {
    padding: 5px;
  }
  @media (max-width: 414px) {  
    td {
      font-size: 12px;
    }  
    // .MuiTableRow-head th:nth-child(3), 
    .MuiTableRow-head th:nth-child(4),
    .MuiTableRow-head th:nth-child(5)
    {
      display: none;
    }
    // .MuiTableRow-root td:nth-child(6),
    .MuiTableRow-root td:nth-child(8),
    .MuiTableRow-root td:nth-child(10)
    {
      display: none;
    }
  }
`;
