import { keyframes } from "styled-components";

export const fadeInAndFadeOut = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  10% {
    opacity: 25%;
    transform: translateY(-2px);
  }

  25% {
    opacity: 100%;
    transform: translateY(0px);
  }
  50% {}
  85% {
    opacity: 1;
  }
  90% {
    opacity: .35;
  }
  100% {
    opacity: 0;
  }
`;

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

export const loadEventAnimationReversed = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30px);
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

export const loadEventAnimationTrueReversed = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  50% {
    opacity: 25%;
    transform: translateY(2px);
  }

  100% {
    opacity: 0;
    transform: translateY(30px);
  }
`;

export const loadEventAnimationSmall = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5px);
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

export const loadEventAnimationFastOpacity = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  50% {
    opacity: 85%;
    transform: translateY(-2px);
  }

  100% {
    opacity: 100%;
    transform: translateY(0px);
  }
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
