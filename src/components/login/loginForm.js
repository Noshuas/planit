import { useRouter } from 'next/router';
import { getProviders, signIn, getSession, useSession } from "next-auth/react"

export const LoginForm = ({ providers }) => {
  const { status } = useSession();

  console.log(status)
  if (status === 'authenticated')
    useRouter().push('/home');

  return (
    <>
      <button onClick={() => signIn("google", { callbackUrl: `${window.location.origin}/home` })}>Sign in</button>
      <button onClick={() => signIn()}>Sign in without redirect</button>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(),
      sessions: await getSession()
    },
  }
}
