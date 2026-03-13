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
    const detail = await res.json().catch(() => null);

    console.error(errorMsg, detail);
    throw new Error(errorMsg);
  }
  return res.json();
};