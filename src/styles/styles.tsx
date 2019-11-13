import styled from 'styled-components'
import './fonts.css'

export const ButtonWrapper = styled.div`
  margin: 20px;
`;

// NAVBAR
export const NavBrandWrapper = styled.p`
  font-family: 'Press Start 2P';
  text-align: left;
  font-size: 20px;
  @media (max-width: 768px) {
    text-align: center;
  }
  @media (max-width: 414px) {
    text-align: left;
  }
`;

export const NavButtonWrapper = styled.div `
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
`

// FORMS
export const InputField = styled.input.attrs(props => ({
  type: props.type,
  placeholder: props.placeholder,
  className: props.className,
  name: props.name,
  onChange: props.onChange,
  value: props.value,
}))`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  width: 200px;
  margin: 5px;
`

export const PageTitle = styled.h2`
  margin: 40px 0 20px 0;
  font-style: italic;
`

