import styled, { css } from "styled-components";

const buttonVariants = {
  primary: css`
    color: blue;
    &:hover {
      background: blue;
      background-opacity: 0.5;
      color: white;
    }
  `,
  outline: css`
    color: blue;
    background: #fff;
    border: 1px solid blue;
    &:hover {
      background: blue;
      color: white;
    }
  `,
  contained: css`
    color: #fff;
    background: blue;
    &:hover: {
      background-opacity: 0.5;
    }
  `,
};
type ButtonVariants = keyof typeof buttonVariants;

const Button = styled.button<{ $variant: ButtonVariants }>`
  text-transform: uppercase;
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  background: none;
  ${({ $variant = "primary" }) => buttonVariants[$variant]};
`;

const ReusableUi = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        marginTop: "80px",
      }}
    >
      <Button $variant="primary">Primary</Button>
      <Button $variant="outline">Outline</Button>
      <Button $variant="contained">Contained</Button>
    </div>
  );
};

export default ReusableUi;
