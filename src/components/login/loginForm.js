import { getProviders, signIn } from "next-auth/react"

export const LoginForm = ({ providers }) => (
  <>
    <button onClick={() => signIn("google", { callbackUrl: `${window.location.origin}/home` })}>Sign in</button>
    <button onClick={() => signIn()}>Sign in without redirect</button>
  </>
);

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(),
      session
    },
  }
}
