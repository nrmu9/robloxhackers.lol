import { useRouter } from 'next/router';

const CatchAllPage = () => {
  const router = useRouter();

  // This component will not be rendered because we are performing a server-side redirect
  return null;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const path = params.slug ? params.slug.join('/') : '';

  // Define redirection paths
  const redirectMap = {
    'exploits': '/c/roblox',
    'minecraft': '/c/minecraft',
    'Minecraft': '/c/minecraft',
    'cs2': '/c/cs2',
    'robux': '/c/robux',
    'rbx': '/c/robux',
  };

  // Check if the current path matches any of the redirect paths
  if (redirectMap[path]) {
    return {
      redirect: {
        destination: redirectMap[path],
        permanent: false, // Set to true for a permanent redirect (301)
      },
    };
  }

  // If no redirect is needed, return a not found status
  return {
    notFound: true,
  };
}

export default CatchAllPage;
