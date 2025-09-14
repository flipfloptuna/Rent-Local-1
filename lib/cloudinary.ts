// lib/cloudinary.ts
// Upload a File to Cloudinary using your unsigned preset.
// Returns a public URL to the uploaded image.

export async function uploadToCloudinary(file: File): Promise<string> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET!;
  if (!cloud || !preset) {
    throw new Error("Cloudinary env vars missing");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloud}/upload`;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset);

  const res = await fetch(url, { method: "POST", body: data });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error("Upload failed: " + txt);
  }
  const json = await res.json();
  // json.secure_url is the HTTPS image URL you can store/display
  return json.secure_url as string;
}
