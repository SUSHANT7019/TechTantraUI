import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import InfiniteMarquee from "./InfiniteMarquee";
import OrganiserCard from "./OrganiserCard";

/* ───────── Sample Data ───────── */
const organisersData = [
    {
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039060/rk_ydzeie.png",
        name: "Reshma Malgonde",
        role: "Event Head",
        linkedin: "https://www.linkedin.com/in/reshma-malgonde-33796131a/"
    },
    {
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039085/td_c5kvi7.jpg",
        name: "Tejal Abhivant",
        role: "Co-Event Head",
        linkedin: "https://www.linkedin.com/in/tejal-abhivant/"
    },
    {
        image: "https://i.ibb.co/v4FWrkZB/IMG-20260215-123301.jpg",
        name: "Kazi Ziyan",
        role: "Lead Organiser",
        linkedin: "https://www.linkedin.com/in/ziyan-kazi-72831235a/"
    },
    {
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039062/sayalimore_ix0ynk.png",
        name: "More Sayali",
        role: "Co-Lead Organiser",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0/"
    },
    {
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039061/ArundhatiPatil_iu6g6o.png",
        name: "Patil Arundati",
        role: "Technical Head",
        linkedin: "https://www.linkedin.com/in/arundati-patil-93110837a/"
    },
    {
        // Photo missing
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039085/sy_jij4u6.png",
        name: "Yadav Sanskruti",
        role: "Co-Technical Head",
        linkedin: "https://www.linkedin.com/in/sanskruti-yadav-498333356/"
    },
    {
        // linked in 
        image: "https://i.ibb.co/rKnK06mG/IMG-20260215-122822.jpg",
        name: "Girish Pawar",
        role: "Management Head",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039055/ArpitaKulkarni_apdbgp.png",
        name: "Kulkarni Arpita",
        role: "Co-Management Head",
        linkedin: "https://www.linkedin.com/in/arpita-kulkarni-03a143388/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771141106/rj_zhoiyl.jpg",
        name: "Jagdale Rohit",
        role: "Design Head",
        linkedin: "https://www.linkedin.com/in/rohit-jagdale-44132836b/"
    },
    {
        // Photo missing
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039057/pk_fjwzm3.png",
        name: "Khendkar Pranita",
        role: "Co-Design Head",
        linkedin: "https://www.linkedin.com/in/pranita-khendkar-562540357/"
    },
    {
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039055/parth_b7c6dg.jpg",
        name: "Bagale Parth",
        role: "Decoration Head",
        linkedin: "https://www.linkedin.com/in/parth-bagale-62368438b/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039059/pp_b9ince.png",
        name: "Phadtare Priyanka",
        role: "Co-Decoration Head",
        linkedin: "https://www.linkedin.com/in/arundati-patil-93110837a/"
    },
    {
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039059/ra_fv4o7r.png",
        name: "Ambure Rajnandani",
        role: "Anchoring Head",
        linkedin: "https://www.linkedin.com/in/rajnandini-ambure-5bbb543a6/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039086/vs_v874m2.png",
        name: "Shete Vaishnavi",
        role: "Co-Anchoring Head",
        linkedin: "https://www.linkedin.com/in/arundati-patil-93110837a/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039054/Akshay_qqml4b.png",
        name: "Ronge Pruthviraj",
        role: "Food Head",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039059/PragatiGore_tbxoqg.png",
        name: "Gore Pragati",
        role: "Co-Food Head",
        linkedin: "https://www.linkedin.com/in/arundati-patil-93110837a/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039050/dhiraj_kbc75a.png",
        name: "Kajale Dhiraj",
        role: "Hospitality Head",
        linkedin: "https://www.linkedin.com/in/dhiraj-kajale-7735b3377/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039085/TanviShinde__wt8yqp.png",
        name: "Shinde Tanvi",
        role: "Co-Hospitality Head",
        linkedin: "https://www.linkedin.com/in/arundati-patil-93110837a/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039053/Harsh_yijugh.png",
        name: "Ghadage Harshad",
        role: "Writing Head",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039086/Tanishkaphand_wjo3hq.png",
        name: "Phand Tanishka",
        role: "Co-Writing Head",
        linkedin: "https://www.linkedin.com/in/tanishka-phand-b98b363a3/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039057/piyush_jvkrqs.png",
        name: "Revande Piyush",
        role: "Social Media Head",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039060/rohan_qmoo5k.png",
        name: "Bandal Rohan",
        role: "Co-Social Media Head",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },

     {
        // linked in 
        image: "https://i.ibb.co/qYQtwsj3/IMG-20260215-WA0014.jpg",
        name: "Chavare Yashraj",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/arundati-patil-93110837a/"
    },
    
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039062/ShiddhiPatil_emxx0u.png",
        name: "Patil Siddhi",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/arundati-patil-93110837a/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039058/pm_xys7ur.png",
        name: "Patil Manasi",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/manasi-patil-0854a63a5/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039058/PoojaDolle_khc2zk.png",
        name: "Dolle Pooja",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/pooja-dolle-686a013a1/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039074/BhumiRaut_h9gram.png",
        name: "Raut Bhumi",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/bhumi-raut-579461374/"
    },
   
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039064/SupriyaAwtade_gfzpcr.png",
        name: "Awatade Supriya",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039051/GayatriYelpale_q4rn1g.png",
        name: "Yelpale Gayatri",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039059/PreranaNalwade_kg31rp.png",
        name: "Nalawade Prerna",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/prerana-nalawade-511437390/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039064/st_f0qvqj.png",
        name: "Tonape Shreya",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039058/chaitanyaBhosale_yk59ai.png",
        name: "Bhosale Chaitanya",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/chaitanya-bhosale-0ab3b6349/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039062/ShravaniDevkar_ttnsij.png",
        name: "Devkar Shravani",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039061/SamruddhiAandhalkar_izh0mu.png",
        name: "Andalkar Samruddhi",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/samruddhi-andhalkar-698b593a1/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039054/AnkitaKamble_p7yhge.png",
        name: "Kamble Ankita",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/ankita-kamble-9a1991357/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039062/sanchit_ctpjen.png",
        name: "Kale Sanchit",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039086/vaibhav_fvn1nl.png",
        name: "Davale Vaibhav",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039056/pd_uzg1pa.png",
        name: "Dikole Priti",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039053/kartik_w2gclf.png",
        name: "Gade Kartik",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039061/SamikshaBhujbal_hjr1vp.png",
        name: "Bhujbal Samiksha",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/samiksha-bhujabal-851876328/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039060/rushi_osimsd.png",
        name: "Lokhande Rushikesh",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039056/as_u5z6qp.png",
        name: "Shaikh Afrin",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039053/amitabh_hkaypr.png",
        name: "Shinde Amithabh",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039065/sw_utrlhg.png",
        name: "Wagh Sukanya",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039086/um_junf6o.png",
        name: "Manedeshmukh Unnati",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked in 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039063/ShreyaGhemad_gbnuej.png",
        name: "Ghemad Shreya",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/shreya-ghemad-65487536a/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039061/samarth_kyvsrj.png",
        name: "Thite Samarth",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/samarth-thite-33212a37b/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039059/ranajit_lbxw4n.png",
        name: "Dhumal Ranjit",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039051/Ajit_jfrm9t.png",
        name: "Wagh Ajit",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039055/ms_da4qhf.png",
        name: "Surve Mayuri",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039056/badave_yu1uh5.png",
        name: "Badave Ajankya",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039064/sm_vtaaik.png",
        name: "More Samruddhi",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039067/sk_c0kqge.png",
        name: "Khandagale Sakshi",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039063/ShrutikaDubal_aigzai.png",
        name: "Dubal Shrutika",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/shrutika-dubal-9026b4363/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039054/AnujaJadhav_oxcclf.png",
        name: "Jadhav Anuja",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039085/TruptiMisal_gxvccl.png",
        name: "Misal Trupti",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039053/kp_aighrb.png",
        name: "Kavade Pranali",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039054/mali_vtrw8k.png",
        name: "Mali Ajay",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039055/ArpitaPatil_lic7gf.png",
        name: "Patil Arpita",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/arpita-patil-443227397/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039051/aditya_wtcybc.png",
        name: "Jadhav Aditya",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sushantthadge/"
    },
    {
        // linked in
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039052/gp_sdmel6.png",
        name: "Godase Pooja",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/sayali-more-2867883b0"
    },
    {
        // linked 
        image: "https://res.cloudinary.com/dgx4bwlbo/image/upload/v1771039052/gr_iqj8cl.png",
        name: "Godase Rutuja",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/rutuja-godase-04b4573a5/"
    },
];

/* ───────── Styles ───────── */
const Section = styled.section`
  padding: 5rem 0;
  text-align: center;
  overflow: hidden;
  position: relative;
  
  /* Background accent for visual interest */
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%);
    top: 20%;
    left: -100px;
    z-index: 0;
    pointer-events: none;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.3rem;
  margin-bottom: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #0992C2, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const MarqueeCardObj = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(9, 146, 194, 0.15);
    border-color: rgba(56, 189, 248, 0.3);
  }
`;

const CardLabel = styled.div`
  text-align: left;
  padding: 0 2rem 1rem 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #38bdf8;
    border-radius: 50%;
  }
`;

/* ───────── Helper Functions ───────── */
// Function to split array into chunks
const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};


/* ───────── Custom Hook ───────── */
// Custom hook to detect visibility using IntersectionObserver
const useVisibility = (options) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            setIsVisible(true); // Fallback: always visible
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            // setIsVisible(entry.isIntersecting); // Basic toggle

            // OPTIONAL: Using intersectionRatio if strictly > 0.5 is needed, but 'threshold: 0.5' in options handles it.
            // entry.isIntersecting is sufficient when threshold is set.
            setIsVisible(entry.isIntersecting);

        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]); // Re-run if options change

    return [ref, isVisible];
};

/* ───────── CardWithMarquee Component ───────── */
const CardWithMarquee = ({ data, label }) => {
    // Use the custom hook with 0.5 threshold (50% visibility)
    // useMemo to keep options stable across renders
    const options = React.useMemo(() => ({
        threshold: 0.5,
        rootMargin: "0px" // Exact viewport
    }), []);

    const [cardRef, isVisible] = useVisibility(options);

    return (
        <MarqueeCardObj ref={cardRef}>
            {label && <CardLabel>{label}</CardLabel>}
            {/* 
        Marquee passes 'isPaused' based on !isVisible.
        It runs only when visible (isVisible === true).
      */}
            <InfiniteMarquee duration={50} gap={24} isPaused={!isVisible}>
                {data.map((organiser, index) => (
                    <OrganiserCard key={`${organiser.name}-${index}`} organiser={organiser} />
                ))}
            </InfiniteMarquee>
        </MarqueeCardObj>
    );
};

/* ───────── Main Component ───────── */
const Organisers = () => {
    const leadsAndOrganizers = organisersData.slice(0, 22);
    const members = organisersData.slice(22);

    return (
        <Section id="organisers">
            <Title
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Meet The Team
            </Title>

            <CardContainer>
                <CardWithMarquee
                    data={leadsAndOrganizers}
                    label="Leads and Organizers"
                />
                <CardWithMarquee
                    data={members}
                    label="Members"
                />
            </CardContainer>
        </Section>
    );
};

export default Organisers;
