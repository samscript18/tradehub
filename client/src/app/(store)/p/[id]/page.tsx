import { Metadata } from "next";
import { getProductById } from "@/lib/services/store.service";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/UI/Product";

interface Props {
  params: { id: string };
}

const Page = ({ params: { id } }: Props) => <ProductDetails id={id} />;

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  try {
    const product = await getProductById(id);

    return {
      title: product.name,
      description: product.description,
    };
  } catch (err: any) {
    return notFound();
  }
};

export default Page;
