import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const Reveal = ({ children, width = "fit-content", delay = 0.25, center = false }) => {
    return (
        <div
            style={{
                position: "relative",
                width: center ? "100%" : width,
                overflow: "hidden",
                margin: center ? "0 auto" : "0",
                display: center ? "flex" : "block",
                justifyContent: center ? "center" : "flex-start"
            }}
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, delay }}
            >
                {children}
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    hidden: { left: 0 },
                    visible: { left: "100%" },
                }}
                transition={{ duration: 0.8, ease: "easeIn", delay }}
                style={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    background: "#035c3e",
                    zIndex: 20,
                }}
            />
        </div>
    );
};

export default Reveal;
