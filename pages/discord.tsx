import { useRouter } from "next/router";
import { useEffect } from "react";

const DiscordPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('https://discord.com/invite/Byfrons-repair-shop-1017434357314617424');
  }, [router]);

  return null;
}

export default DiscordPage;