import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLoomPage } from "@/lib/loom";
import {
  LoomHeader, LoomFooter, ThemSection, AccountsSection, FlowSection, StackSection, DashboardSection, AskSection,
} from "@/components/Loom";

export const revalidate = 60;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLoomPage(slug);
  if (!page) return { robots: { index: false, follow: false } };
  // Absolute title and explicit openGraph/twitter so the site-wide template and defaults are not inherited.
  const title = `${page.company.name}: a 60 second demo`;
  const description = page.company.one_liner;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/loom/${slug}` },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: `/loom/${slug}`, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function LoomPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLoomPage(slug);
  if (!page) notFound();

  return (
    <>
      {/* The site chrome is hidden on prospect pages so the only exits are the ask at the bottom. */}
      <style>{`#site-nav,#site-footer{display:none}`}</style>
      <LoomHeader name={page.company.name} />
      <ThemSection c={page} />
      <AccountsSection c={page} />
      <FlowSection c={page} />
      <StackSection c={page} />
      <DashboardSection c={page} />
      <AskSection c={page} />
      <LoomFooter />
    </>
  );
}
