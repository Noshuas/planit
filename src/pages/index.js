import { getServerSession } from "next-auth";

export const Index = ({ Props }) => ''

export async function getServerSideProps(context) {
  let session = await getServerSession(context)

  return {
    redirect: {
      destination: session ? '/home' : '/login',
      permanent: false,
    }
  }
}
export default Index;
