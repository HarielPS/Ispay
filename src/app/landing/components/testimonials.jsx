import * as React from 'react';
import { Box, Grid, Typography, Card, CardContent, Avatar, Button } from '@mui/material';
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';

const testimonials = [
  {
    name: "Edward Montanez",
    text: "Morbi et nisl a sapien malesuada scelerisque. Suspendisse tempor turpis mattis nibh posuere.",
    avatar: "/avatars/avatar1.png"
  },
  {
    name: "Lisa Haley",
    text: "Ut sapien urna, sagittis a magna in, malesuada ornare massa. Pellentesque id ligula est.",
    avatar: "/avatars/avatar2.png"
  },
  {
    name: "Tierra F. Lane",
    text: "Morbi et nisl a sapien malesuada scelerisque. Suspendisse tempor turpis mattis nibh posuere.",
    avatar: "/avatars/avatar3.png"
  },
  {
    name: "Anna Huynh",
    text: "Sed elementum sollicitudin euismod. Phasellus elementum nunc ac quam gravida interdum.",
    avatar: "/avatars/avatar4.png"
  },
  {
    name: "Anita Matthews",
    text: "Suspendisse tempor turpis mattis nibh posuere, in iaculis sem efficitur. Ut sapien urna.",
    avatar: "/avatars/avatar5.png"
  },
  {
    name: "Levi Masters",
    text: "Phasellus in iaculis ante. Fusce odio justo, pulvinar sit amet nisl sed, lacinia laoreet augue.",
    avatar: "/avatars/avatar6.png"
  },
  {
    name: "Harold Williamson",
    text: "Fusce tincidunt turpis a dui pulvinar venenatis. Sed elementum sollicitudin euismod.",
    avatar: "/avatars/avatar7.png"
  },
  {
    name: "Billy Ware",
    text: "Phasellus in iaculis ante. Fusce odio justo, pulvinar sit amet nisl sed, lacinia laoreet augue.",
    avatar: "/avatars/avatar8.png"
  }
];

export default function UserStories() {
    const theme = useTheme();

  return (
    <Box sx={{ width: '100%', paddingY: 8,  paddingX: 8, backgroundColor: getColor(theme,'background') }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
        User Stories
      </Typography>

      {/* Grid de testimonios */}
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card elevation={3} sx={{ borderRadius: '10px', padding: 2,backgroundColor: getColor(theme,'text') }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, color: getColor(theme,'background')}}>
                <Avatar alt={testimonial.name} src={testimonial.avatar} sx={{ marginRight: 2 }} />
                <Typography variant="h6" component="h3">
                  {testimonial.name}
                </Typography>
              </Box>
              <CardContent sx={{color: getColor(theme,'background')}}>
                <Typography variant="body2" >
                  {testimonial.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botón de "Show More" */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button variant="outlined">Show More</Button>
      </Box> */}
    </Box>
  );
}
