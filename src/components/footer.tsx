import React from "react";
import { FooterContainer } from "../styles/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";

const Footer: React.FC = () => {
  return (
    <>
      <FooterContainer>
        <Link href="https://github.com/guanwill/ahb_react">
          <GitHubIcon />
        </Link>
      </FooterContainer>
    </>
  );
};

export default Footer;
