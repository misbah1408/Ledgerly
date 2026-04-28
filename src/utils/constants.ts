export const bgGrad = {
  background: `
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='3' stitchTiles='stitch'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='table' tableValues='0 0'/%3E%3CfeFuncG type='table' tableValues='0 0'/%3E%3CfeFuncB type='table' tableValues='0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E"),
                radial-gradient(circle at 84.593% 18.1395%, #6299f2 0%, transparent 80%),
                #000 radial-gradient(circle at 100% 96.7442%, #5746d9 0%, transparent 80%)
              `,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export const taxesRate = [
  { id: "none", label: "None", value: "none" },

  { id: "igst0", label: "IGST 0%", value: "igst-0" },
  { id: "gst0", label: "GST 0%", value: "gst-0" },

  { id: "igst025", label: "IGST 0.25%", value: "igst-0.25" },
  { id: "gst025", label: "GST 0.25%", value: "gst-0.25" },

  { id: "igst3", label: "IGST 3%", value: "igst-3" },
  { id: "gst3", label: "GST 3%", value: "gst-3" },

  { id: "igst5", label: "IGST 5%", value: "igst-5" },
  { id: "gst5", label: "GST 5%", value: "gst-5" },

  { id: "igst12", label: "IGST 12%", value: "igst-12" },
  { id: "gst12", label: "GST 12%", value: "gst-12" },

  { id: "igst18", label: "IGST 18%", value: "igst-18" },
  { id: "gst18", label: "GST 18%", value: "gst-18" },

  { id: "igst28", label: "IGST 28%", value: "igst-28" },
  { id: "gst28", label: "GST 28%", value: "gst-28" },

  { id: "igst40", label: "IGST 40%", value: "igst-40" },
  { id: "gst40", label: "GST 40%", value: "gst-40" },

  { id: "exempt", label: "Exempt", value: "exempt" },
];

export const units = [
  "None",
  "BAGS (Bag)",
  "BOTTLES (Btl)",
  "BOX (Box)",
  "BUNDLES (Bdl)",
  "CANS (Can)",
  "CARTONS (Ctn)",
  "DOZENS (Dzn)",
  "GRAMMES (Gm)",
  "KILOGRAMS (Kg)",
  "LITRE (Ltr)",
  "METERS (Mtr)",
  "MILILITRE (MI)",
  "NUMBERS (Nos)",
  "PACKS (Pac)",
  "PAIRS (Prs)",
  "PIECES (Pcs)",
  "QUINTAL (Qtl)",
  "ROLLS (Rol)",
  "SQUARE FEET (Sqf)",
  "SQUARE METERS (Sqm)",
  "TABLETS (Ths)",
];
