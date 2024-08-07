import { useRouter } from "next/router";
import { useEffect } from "react";

const DiscordPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('https://discord.gg/psmQQSr5fu');
  }, [router]);

  return null;
}

export default DiscordPage;
