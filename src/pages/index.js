import { getServerSession } from "next-auth";
import { nextOptions } from "./api/auth/[...nextauth]";

export const Index = ({ Props }) => ''

export async function getServerSideProps(context) {
  let session = await getServerSession(context, nextOptions)

  return {
    redirect: {
      destination: session ? '/home' : '/login',
      permanent: false,
    }
  }
}
export default Index;
