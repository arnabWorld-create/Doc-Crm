import { redirect } from 'next/navigation';

export default function HomePage() {
  // This is a CRM application, so the root page is not meant to be visited directly.
  // We redirect users to the main patient list for a better user experience.
  redirect('/patients');
}
