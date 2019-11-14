import styled from "styled-components";
import "./fonts.css";

export const ContainerInner = styled.div`
  margin: 30px 0;
`;

export const ButtonWrapper = styled.div`
  margin: 20px;
`;

export const LinkWrapper = styled.div`
  a {
    text-decoration: none;
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
  font-style: italic;
`;

// NAVBAR
export const NavBrandWrapper = styled.p`
  font-family: "Press Start 2P";
  text-align: left;
  font-size: 20px;
  @media (max-width: 768px) {
    text-align: center;
  }
  @media (max-width: 414px) {
    text-align: left;
  }
`;

export const NavButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
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
  }
`;
