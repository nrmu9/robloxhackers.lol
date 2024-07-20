import { useRouter } from 'next/router';

const CatchAllPage = () => {
  const router = useRouter();

  // This component will not be rendered because we are performing a server-side redirect
  return null;
};

export async function getServerSideProps(context) {
  // Extract the path parameters from the context
  const { params } = context;
  
  // Construct the redirection URL
  const redirectTo = '/t/china';
  
  // Perform the redirection
  return {
    redirect: {
      destination: redirectTo,
      permanent: false, // Set to true for a permanent redirect (301)
    },
  };
}

export default CatchAllPage;
