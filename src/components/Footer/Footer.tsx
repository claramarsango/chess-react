import { FooterStyled } from './footer.styled';

const Footer = () => {
  return (
    <FooterStyled>
      <p className="footer__message">
        🚧 Currently under construction - Thanks for stopping by! 🦦
      </p>
      <a
        className="footer__link"
        href="https://github.com/claramarsango"
        target="_blank"
      >
        <img src="./assets/github-mark-white.svg" alt="Github white logo"></img>
      </a>
    </FooterStyled>
  );
};

export default Footer;
