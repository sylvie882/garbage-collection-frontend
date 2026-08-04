import { permanentRedirect } from 'next/navigation';

// Consolidates duplicate county pages onto the canonical /sanitary-bins/[county]
// route to stop keyword cannibalization between the two URL structures.
export default async function ServicesSanitaryBinsCountyRedirect({
  params,
}: {
  params: Promise<{ county: string }>;
}) {
  const { county } = await params;
  permanentRedirect(`/sanitary-bins/${county}`);
}
