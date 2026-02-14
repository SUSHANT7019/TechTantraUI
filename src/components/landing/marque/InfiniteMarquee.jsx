import React from "react";
import styled, { keyframes } from "styled-components";

/* ───────── Keyframes ───────── */
const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

/* ───────── Styled Components ───────── */
const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;

  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} ${({ duration }) => duration}s linear infinite;
  will-change: transform;

  ${Wrapper}:hover & {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Set = styled.div`
  display: flex;
  gap: ${({ gap }) => gap}px;
  padding-right: ${({ gap }) => gap}px;
`;

/* ───────── Component ───────── */
const InfiniteMarquee = ({
    children,
    duration = 60,
    gap = 24
}) => {
    return (
        <Wrapper>
            <Track duration={duration}>
                <Set gap={gap}>{children}</Set>
                <Set gap={gap}>{children}</Set>
            </Track>
        </Wrapper>
    );
};

export default InfiniteMarquee;
