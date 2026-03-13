export function formatDate(d: string): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const toApiDate = (date: string) => {
  if (!date) return null;
  if (date.includes('T')) return date;
  return `${date}T00:00:00Z`;
};

export const parseResponse = async (res: Response, errorMsg: string) => {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const detail =
      body && typeof body.detail === "string" ? body.detail : null;
    const message = detail ?? errorMsg;

    console.log(message);
    throw new Error(message);
  }
  return res.json();
};