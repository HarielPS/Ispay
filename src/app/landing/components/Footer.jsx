"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

function Copyright() {
  const theme = useTheme();

  return (
    <Typography variant="body2" mt={1}>
      {'Copyright © '}
      <Link sx={{color: getColor(theme,'text')}} href="https://mui.com/">Sitemark&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const theme = useTheme();
  
  const logoSrc = theme.palette.mode === 'light'
    ? '/logo_largo_light.png' 
    : '/logo_largo_dark.png'; 

  return (
    <Container
      sx={{
        background: getColor(theme,'background'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-15px' }}>
              <Image
                src={logoSrc}
                width={500}
                height={300}
                style={logoStyle}
                alt="logo of sitemark"
                priority
              />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" mb={2}>
              Subscribe to our newsletter for weekly updates and promotions.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address',
                }}
              />
              <Button variant="contained" sx={{ flexShrink: 0 }}>
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Product
          </Typography>
          
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Features
          </Link>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Testimonials
          </Link>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Highlights
          </Link>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Pricing
          </Link>
          <Link  sx={{color: getColor(theme,'text')}}  href="#">
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Company
          </Typography>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            About us
          </Link>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Careers
          </Link>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Press
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Legal
          </Typography>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Terms
          </Link>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Privacy
          </Link>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{color: getColor(theme,'text')}}>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link sx={{color: getColor(theme,'text')}}  href="#">
            Terms of Service
          </Link>
          <Copyright />
        </Box>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
        >
          <IconButton
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://twitter.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}