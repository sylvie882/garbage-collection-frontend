import { permanentRedirect } from 'next/navigation';

// This URL used to duplicate /sanitary-bins, splitting SEO ranking signals
// between two near-identical pages. Consolidated permanently onto the
// canonical /sanitary-bins page (the one linked from the main nav).
export default function ServicesSanitaryBinsRedirect() {
  permanentRedirect('/sanitary-bins');
}
