"use client";
import React, { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';


const faqData = [
  {
    question: "Can I pay off my loan early?",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.",
  },
  {
    question: "How much can I Banca?",
    answer: "The amount you can Banca depends on several factors such as your credit history and income.",
  },
  {
    question: "Do you offer refinancing?",
    answer: "Yes, we do offer refinancing options with competitive interest rates and flexible terms.",
  },
  {
    question: "Can I do all of my banking with you?",
    answer: "Yes, we offer a full suite of banking services including savings, loans, and investments.",
  },
];

export default function FQA() {
    const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px",
        backgroundColor: getColor(theme,'background2'), color: getColor(theme,'text')
      }}
    >
      {/* Sección de Imagen */}
      <Box sx={{ flex: 1, marginBottom: { xs: "20px", md: "0" } }}>
        <Image
          alt="Customer Support"
          src="/landing/FQA.jpeg"
          width={600}
          height={400}
          style={{ borderRadius: "20px", maxWidth: "100%" }}
        />
      </Box>

      {/* Sección de FAQ */}
      <Box sx={{ flex: 1, marginLeft: { md: "40px" } }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Frequently asked general questions
        </Typography>

        {/* Preguntas con Acordeón */}
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              backgroundColor: "#222",
              color: "#fff",
              marginBottom: "10px",
              border: "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              sx={{
                "& .MuiAccordionSummary-content": {
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              }}
            >
              <Typography sx={{ fontWeight: expanded === `panel${index}` ? "bold" : "normal" }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="body1">
            Have more questions? <Button variant="text" sx={{ color: getColor(theme,'both'), textTransform: "none" }}>Contact Us</Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
