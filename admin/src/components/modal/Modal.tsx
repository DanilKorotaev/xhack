import React, {useEffect} from 'react';
import styled from "styled-components";
import CloseIcon from './CloseIcon';

const ModalWrapper = styled.div`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);

  & > svg {
    position: fixed;
    top: 60px;
    right: 60px;

    width: 50px;
    height: 50px;
  }
`

const Container = styled.div`
  padding: 60px;
`;

export interface IModalProps {
    showModal: boolean;

    onHide(): void;
}

export const Modal: React.FC<IModalProps> = (props) => {
    const [show, setShow] = React.useState(props.showModal);

    useEffect(() => {
        setShow(props.showModal);
    }, [props.showModal])

    function hideModal() {
        setShow(() => false);
        props.onHide();
    }

    return (
        !show ? null :
            <ModalWrapper>
                <CloseIcon onClick={hideModal}/>
                <Container>
                    {props.children}
                </Container>
            </ModalWrapper>);
}

export default Modal;