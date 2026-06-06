type JsonLdData = Record<string, unknown>;

/**
 * Renders one or more JSON-LD structured-data blocks for SEO / rich results.
 * Data is our own server-side content, serialized safely as a script payload.
 */
export default function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
