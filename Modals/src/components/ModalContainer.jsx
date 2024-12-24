import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${({ zIndex }) => zIndex};
`;

export default ModalContainer;
