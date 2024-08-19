"use client";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

interface Flashcard {
  name: string;
}

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id: any) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ padding: 2 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            AI Flashcard Generator
          </Typography>
          <SignedOut>
            <Link href="/sign-in">
              <Button sx={{ color: "black" }}>Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button sx={{ color: "black" }}>Sign Up</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex gap-8">
              <Button variant="contained">
                <Link href="/flashcards" sx={{ color: "black" }}>
                  Saved Flashcards
                </Link>
              </Button>
              <UserButton />
            </div>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={3}
        sx={{
          mt: 4,
        }}
      >
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h6">{flashcard.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
