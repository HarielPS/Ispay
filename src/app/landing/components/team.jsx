import * as React from 'react';
import { Box, Grid, Typography, Card, CardContent, Avatar, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';

const teamMembers = [
  {
    name: "Hariel Padilla Sanchez",
    position: "Company CEO",
    avatar: "/landing/hariel.png", 
    desc: "Estudiante de Ingeniería en Inteligencia Artificial || Estudiante en Instituto Politécnico Nacional ||Full Stack",
    email: "mailto:harielpadillasanchez@gmail.com",
    twitter: "https://github.com/HarielPS",
    linkedin: "https://www.linkedin.com/in/hariel-padilla-sanchez-173989293/"
  },
  {
    name: "Marlon Francois Rodriguez Cejudo",
    position: "Company CEO",
    desc: "Computer Systems Engineer || Estudiante en Instituto Politécnico Nacional  || Full Stack",
    avatar: "/landing/marlon.jpg", 
    email: "mailto:mrodriguezc1701@alumno.ipn.mx",
    twitter: "https://github.com/Champagnepagcois",
    linkedin: "https://www.linkedin.com/in/marlon-rodr%C3%ADguez-b97b15217/"
  },
  {
    name: "Jan Acosta Becerril",
    position: "Head Of Marketing",
    desc: "Estudiante de Ingeniería Industrial | Presidente Capítulo Estudiantil Supply Chain Management Program UPIICSA | Socio IMEF Universitario UPIICSA",
    avatar: "/landing/jan.jpg", 
    email: "mailto:jan.acosta689@gmail.com",
    twitter: "https://github.com/janacostab",
    linkedin: "https://www.linkedin.com/in/jan-a-31862820b/"
  },
];

export default function OurTeam() {
    const theme = useTheme();
    return (
        <Box sx={{ width: '100%', paddingY: 8, backgroundColor: getColor(theme,'background')}}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
                Our Team
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card 
                            elevation={3} 
                            sx={{ 
                                height: '450px',
                                borderRadius: '10px',
                                background: getColor(theme, 'text'), 
                                textAlign: 'center',
                                color: getColor(theme, 'background'),
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-10px)',  // Mover hacia arriba al hacer hover
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',  // Sombra más visible
                                }
                            }}
                        >
                            <Avatar
                                alt={member.name}
                                src={member.avatar}
                                sx={{ width: 150, height: 150, margin: 'auto', marginTop: 2 }}
                            />
                            <CardContent>
                                <Typography variant="h6" component="h3">
                                    {member.name}
                                </Typography>
                                <Typography variant="body2">
                                    {member.position}
                                </Typography>
                                <Typography variant="body2" sx={{marginTop: 3}}>
                                    {member.desc}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                    <IconButton href={member.email} aria-label="email" sx={{color: getColor(theme,'background') }}>
                                        <EmailIcon />
                                    </IconButton>
                                    <IconButton href={member.twitter} aria-label="twitter" sx={{color: getColor(theme,'background') }}>
                                        <FacebookIcon />
                                    </IconButton>
                                    <IconButton href={member.linkedin} aria-label="linkedin" sx={{color: getColor(theme,'background') }}>
                                        <LinkedInIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
