import { css, keyframes } from "styled-components";

export const loadEventAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  50% {
    opacity: 25%;
    transform: translateY(-2px);
  }

  100% {
    opacity: 100%;
    transform: translateY(0px);
  }
`;

export const loadEventStyles = css`
  animation: ${loadEventAnimation} 0.4s ease-in-out;
`;

export const fadeinAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 25%;
  }

  100% {
    opacity: 100%;
  }
`;

export const fadeInAnimationStyles = css`
  animation: ${fadeinAnimation} 0.4s ease-in-out;
`;
