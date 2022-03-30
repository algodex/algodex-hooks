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
`;

/**
 * Error Message
 *
 * @param {object} props Component Properties
 * @param {number} props.size <AlertIcon> Size
 * @param {string} props.color Component Color
 * @param {boolean} props.flex Enable Flex
 * @param {string} props.message Display Message
 * @param {JSX.Element} props.Icon Icon Component to Render
 * @return {JSX.Element}
 * @constructor
 */
export function ServiceError({size, color, flex, message, Icon}) {
  const showMsg = message?.length > 0;

  return flex ? (
    <FlexContainer>
      <Icon size={size} color={color} />
      {showMsg && (
        <Message color={color} flex={flex}>
          {message}
        </Message>
      )}
    </FlexContainer>
  ) : (
    <Message color={color} flex={flex}>
      <Icon size={size} color={color} />
      {message}
    </Message>
  );
}

ServiceError.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  message: PropTypes.string,
  flex: PropTypes.bool,
  Icon: PropTypes.element.isRequired,
};

ServiceError.defaultProps = {
  size: 1.5,
  color: 'gray.600',
  flex: false,
  message: 'Something went wrong!',
};

export default ServiceError;
