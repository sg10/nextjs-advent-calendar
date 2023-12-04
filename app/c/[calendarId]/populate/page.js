import { redirect } from "next/navigation";

export default async function Page({ params: { calendarId } }) {
  redirect(`/c/${calendarId}/populate/start`);
}
