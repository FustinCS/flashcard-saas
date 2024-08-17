'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { Container, AppBar, Typography, Button, Toolbar, Box, Grid } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })
  
    const checkoutSessionJson = await checkoutSession.json();
  
    if (checkoutSessionJson.statusCode === 500) {
      console.error(checkoutSessionJson.message);
      return;
    }
  
    const stripe = await getStripe();
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.error(error.message);
    }

  }


  return (
    <Container maxWidth="xl">
      <Head>
        <title>Flashcard Saas</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>         
          <Typography variant="h6" style={{flexGrow: 1}}>Flashcard Saas</Typography>
          <SignedOut>
            <Link href="/sign-in">
              <Button sx={{color: "white"}}>Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button sx={{color: "white"}}>Sign Up</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign: "center", my: 4}}>
        <Typography variant="h2" gutterBottom>Welcome to flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>{' '}The easiest way to make flashcards from your text</Typography>
        <Button variant="contained" color="primary" sx={{mt: 2}}>Get Started</Button>
      </Box>
      <Box sx={{my:6}}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography gutterBottom>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography gutterBottom>Our AI intelligently breaks down your text into concise flashcards, perfect for studying</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography gutterBottom>Access your flashcards from any device, at any time. Study on the go with ease.</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textALign: "center"}}>
        <Typography variant="h4" gutterBottom textAlign="center">Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2, textAlign: "center"}}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5/month</Typography>
              <Typography gutterBottom>Access to basic flashcard features and limited storage.</Typography>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2, textAlign: "center"}}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10/month</Typography>
              <Typography gutterBottom>Unlimited flashcards and storage, with priority support.</Typography>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
