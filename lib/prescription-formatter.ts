/**
 * Helper function to safely parse and format medical prescriptions.
 * Converts raw JSON objects (or legacy JSON strings) into clean, human-readable medical text.
 */
export function formatPrescription(rawPrescription: string | null | undefined): string {
  if (!rawPrescription) return "-";

  const trimmed = rawPrescription.trim();
  if (!trimmed) return "-";

  const lines: string[] = [];

  // Check if it looks like JSON
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);

      if (typeof parsed === "object" && parsed !== null) {
        if (Array.isArray(parsed.items) && parsed.items.length > 0) {
          parsed.items.forEach((item: any) => {
            const name = item.name || item.item_name || "Obat";
            const qty = item.qty || item.quantity || 1;
            const unit = item.unit || "Pcs";
            const dosage = item.dosage || item.notes || "";

            let line = `• ${name} (${qty} ${unit})`;
            if (dosage) {
              line += ` — Aturan: ${dosage}`;
            }
            lines.push(line);
          });
        }

        if (parsed.manual && typeof parsed.manual === "string" && parsed.manual.trim()) {
          const manualText = parsed.manual.trim();
          if (!manualText.toLowerCase().includes("catatan/racikan") && !lines.some(l => l.includes(manualText))) {
            lines.push(`• Obat Racikan: ${manualText}`);
          }
        }
      }
    } catch (e) {
      // Fallback to plain text processing
    }
  }

  // If not JSON or empty parsed lines, process raw text line by line
  if (lines.length === 0) {
    const rawLines = trimmed.split("\n");
    rawLines.forEach((rawLine) => {
      const lineTrimmed = rawLine.trim();
      if (!lineTrimmed) return;

      // Filter out legacy non-drug notes starting with Catatan/Racikan
      if (lineTrimmed.toLowerCase().includes("catatan/racikan:")) return;

      // Clean up nested duplicate prefix if any (e.g. • Obat Racikan: • Decolgen ...)
      let cleanLine = lineTrimmed.replace(/^•\s*Obat Racikan:\s*•\s*/i, "• Obat Racikan: ");
      if (cleanLine.startsWith("• Obat Racikan: ")) {
        const itemContent = cleanLine.replace("• Obat Racikan: ", "").trim();
        if (lines.some(l => l.includes(itemContent))) return; // skip duplicate
      }

      if (!lines.includes(cleanLine)) {
        lines.push(cleanLine);
      }
    });
  }

  if (lines.length > 0) {
    return lines.join("\n");
  }

  return "-";
}
