import { getSession } from "next-auth/react";

export const Index = ({ Props }) => ''

export async function getServerSideProps(context) {
  let session = await getSession(context)

  return {
    redirect: {
      destination: session ? '/home' : '/login',
      permanent: false,
    }
  }
}
export default Index;
