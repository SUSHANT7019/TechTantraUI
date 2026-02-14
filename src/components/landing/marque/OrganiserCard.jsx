import React from "react";
import styled, { keyframes } from "styled-components";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

/* Fallback Avatar */
const FALLBACK_AVATAR = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%231e293b" width="100" height="100"/><circle cx="50" cy="38" r="18" fill="%2394a3b8"/><ellipse cx="50" cy="85" rx="30" ry="22" fill="%2394a3b8"/></svg>'
)}`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Card = styled(motion.a)`
  width: 200px;
  min-width: 200px;
  padding: 1.5rem;
  border-radius: 14px;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.08);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow .3s ease, border-color .3s ease, background .3s ease;
  backdrop-filter: blur(4px);
  cursor: pointer;

  &:hover {
    box-shadow: 0 14px 30px rgba(0,0,0,.4);
    background: rgba(0,0,0,0.6);
    border-color: rgba(9, 146, 194, 0.3);
  }
`;

const ImageWrapper = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: .75rem;
  position: relative;
  background: #1e293b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);

  &.loading {
    background: linear-gradient(
      90deg,
      #1e293b 25%,
      #334155 50%,
      #1e293b 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.2s infinite linear;
  }
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.h3`
  color: #fff;
  font-size: 1rem;
  margin: .4rem 0 .2rem 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Role = styled.p`
  color: #cbd5e1;
  font-size: .8rem;
  margin: 0;
  text-align: center;
  opacity: 0.8;
`;

const IconOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.6);

  svg {
    color: #0A66C2;
  }
`;

const OrganiserCard = ({ organiser }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Card
      href={organiser.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${organiser.name}'s LinkedIn profile`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "50px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ImageWrapper className={!loaded ? "loading" : ""}>
        <Img
          src={(organiser.image || "").trim() || FALLBACK_AVATAR}
          alt={organiser.name}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            e.target.src = FALLBACK_AVATAR;
            setLoaded(true);
          }}
        />
        <IconOverlay
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Linkedin size={28} />
        </IconOverlay>
      </ImageWrapper>

      <Name>{organiser.name}</Name>
      <Role>{organiser.role}</Role>
    </Card>
  );
};

export default OrganiserCard;
