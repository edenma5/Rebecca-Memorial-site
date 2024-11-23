import path from "path";
import { fileURLToPath } from "url";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};