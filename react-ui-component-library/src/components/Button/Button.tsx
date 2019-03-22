import * as React from 'react';
import styled, { sdkTheme, ThemeProvider } from '../../theme';

export type AttributeProps = {
  disabled?: boolean;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const StyledButton = styled.button`
  min-height: 50px;
  padding: ${(props) => `${props.theme.spacing.s}px ${props.theme.spacing.m}px`};
  margin: 0;
  font-family: inherit;
  overflow: visible;
  line-height: 1.15;
  border: 0;
  border-radius: ${(props) => `${props.theme.radius.m}px ${props.theme.radius.m}px 0 ${props.theme.radius.m}px`};

  :focus {
    outline: none;
    border: 1px doted ${(props) => props.theme.color.primaryColor};
    border-radius: ${(props) => `${props.theme.radius.m}px ${props.theme.radius.m}px 0 ${props.theme.radius.m}px`};
  }

  :hover {
    border: 0;
    outline: none;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

type Props = AttributeProps;

/**
 * This component allows to display a basic button.
 */
const Button: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <ThemeProvider theme={sdkTheme}>
      <StyledButton className={props.className} onClick={props.onClick} disabled={props.disabled} title={props.title}>
        {props.children}
      </StyledButton>
    </ThemeProvider>
  );
};

Button.defaultProps = {
  className: '',
  disabled: false,
  title: '',
  children: [],
};

export default Button;
