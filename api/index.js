export default function handler(req, res) {
  res.status(200).json({
    message: "Quipedia Backend API is running",
    endpoints: [
      "/api/login",
      "/api/userProfile",
      "/api/postSession",
      "/api/uploadCertificate"
    ]
  });
}
