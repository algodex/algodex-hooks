import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
export const FlexContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Message = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  margin: ${({flex}) => (flex ? '0.375rem 0' : '0 0 1rem 0')};
  color: ${({color})=>`${color}`};
`;

/**
 * Error Message
 *
 * @param {object} props Component Properties
 * @param {number} props.size <AlertIcon> Size
 * @param {string} props.color Component Color
 * @param {boolean} props.flex Enable Flex
 * @param {string} props.message Display Message
 * @param {JSXElement} props.Icon Icon Component to Render
 * @return {JSX.Element}
 * @constructor
 */
export function ServiceError({size, color, flex, message, Icon}) {
  const showMsg = message?.length > 0;
  if (flex) {
    return (
      <FlexContainer data-testid="flex-service">
        <Icon size={size} color={color} />
        {showMsg && (
          <Message color={color} flex={flex}>
            {message}
          </Message>
        )}
      </FlexContainer>
    );
  } else {
    return (
      <Message data-testid="mssg-service" color={color} flex={flex}>
        <Icon size={size} color={color} />
        {message}
      </Message>
    );
  }
}

ServiceError.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  message: PropTypes.string,
  flex: PropTypes.bool,
  Icon: PropTypes.element,
};

ServiceError.defaultProps = {
  size: 1.5,
  color: 'gray.600',
  flex: false,
  message: 'Something went wrong!',
  Icon: (props)=>(<div {...props}>Missing Icon!</div>),
};

export default ServiceError;
