import styled from 'styled-components'
import './fonts.css'

export const ButtonWrapper = styled.div`
  margin: 20px;
`;

export const NavBrandWrapper = styled.p`
  font-family: 'Press Start 2P';
  text-align: left;
  font-size: 16px;
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

