import { generateClient } from "aws-amplify/data";
import { headers } from "next/headers";
import styles from "./page.module.css";
import type { Schema } from "@/amplify/data/resource";

export const dynamic = "force-dynamic";

const client = generateClient<Schema>();

type HeaderList = ReturnType<typeof headers>;

function extractClientIp(headerList: HeaderList): string {
  const headerCandidates = [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
    "true-client-ip",
    "fastly-client-ip",
  ];

  for (const name of headerCandidates) {
    const value = headerList.get(name);
    if (value) {
      const candidate = value.split(",")[0]?.trim();
      if (candidate) {
        return candidate;
      }
    }
  }

  const remoteAddress = headerList.get("remote-addr");
  if (remoteAddress) {
    return remoteAddress;
  }

  return "unknown";
}

export default async function Home() {
  const headerList = headers();
  const ipAddress = extractClientIp(headerList);
  let visitCount = 0;

  try {
    await client.models.VisitorLog.create({
      ipAddress,
      visitedAt: new Date().toISOString(),
    });

    const { data: visits } = await client.models.VisitorLog.list();
    visitCount = visits?.length ?? 0;
  } catch (error) {
    console.error("Failed to record visit", error);
  }

  return (
    <main className={styles.page}>
      <p className={styles.counter}>
        <span className={styles.label}>Anzahl Besucher:</span>{" "}
        <span className={styles.value}>{visitCount}</span>
      </p>
    </main>
  );
}
