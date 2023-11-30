// MaPage.tsx

import React from 'react';
import DatePiker from '@/components/DatePiker';
import { getAuthSession } from '@/lib/auth';
import { useRouter } from 'next/navigation'; 

const Page = async () => {
  
  const session = await getAuthSession();

  // Vérifier si l'utilisateur est connecté avant d'afficher le DatePiker
  if (!session?.user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    // router.push('/');
    return (
      <div>
        <h1>
          Bienvenue veuillez-vous connecter pour avoir acces au calendrier

        </h1>
      </div>
    ); 
  }

  return (
    <div className='mt-20'>
      <h1>
        Hello, cest mon titre
      </h1>
      <DatePiker />
    </div>
  );
};

export default Page;
