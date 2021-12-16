

export const Index = ({ Props }) => ''

export async function getServerSideProps(context) {
  let session = await getSession(context)

  return {
    destination: session ? '/home' : '/login',
    permanent: false,
  }
}
export default Index;
