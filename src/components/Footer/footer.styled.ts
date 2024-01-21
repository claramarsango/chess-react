import styled from 'styled-components';

export const FooterStyled = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  box-shadow: 1px 1px 5px inset rgb(25, 25, 25);
  padding: 0.5rem;
  text-align: left;
  font-size: 2cqw;

  .footer__message {
    margin: auto 0;
  }

  .footer__link {
    width: 1rem;
  }

  .footer__link img {
    width: 100%;
    vertical-align: middle;
  }

  @media (min-width: 768px) {
    padding: 1rem;
    font-size: 1rem;

    .footer__link {
      width: 1.5rem;
    }
  }
`;
