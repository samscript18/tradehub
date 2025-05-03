import Store from "@/components/UI/Store";
import { getStoreInfo } from "@/lib/services/store.service";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  return <Store slug={slug} />;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const store = await getStoreInfo(slug);

    return {
      title: store.name,
      description: store.slogan,
    };
  } catch (err: any) {
    return {
      title: "Not Found",
      description: "Store not found",
    };
  }
}

export default Page;
