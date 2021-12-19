import LoadingSkeleton from 'components/LoadingSkeleton';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export const Index = () => {
  const { status } = useSession({required: true, onUnauthenticated: signIn})
  const router = useRouter();

  if (status === 'authenticated')
    router.push('./home')

  return <LoadingSkeleton />
}

export default Index;
