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
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
