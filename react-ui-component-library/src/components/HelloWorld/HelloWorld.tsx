import * as React from 'react';
import styled, { BackgroundColorValues, sdkTheme, ThemeProvider } from '../../theme';

export type AttributeProps = {
  message?: string;
};

export type StyledProps = {
  /**
   * ```
   * BackgroundColorValues {
   *    primaryColor = 'black',
   *    alternativeColor = 'grey',
   * }
   * ```
   */
  background?: BackgroundColorValues;
};

const StyledHelloWorld = styled.div<StyledProps>`
  background-color: ${(props) => props.background};
  padding: 20px;
  color: ${(props) =>
    props.background === props.theme.backgroundColor.alternativeColor
      ? props.theme.color.primaryColor
      : props.theme.color.alternativeColor};
`;

type Props = AttributeProps & StyledProps;

/**
 * This component allows to display a greeting.
 */
const HelloWorld: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <ThemeProvider theme={sdkTheme}>
      <StyledHelloWorld background={props.background}>Hello {props.message}!</StyledHelloWorld>
    </ThemeProvider>
  );
};

HelloWorld.defaultProps = {
  message: 'World',
  background: sdkTheme.backgroundColor.primaryColor,
};

export default HelloWorld;
