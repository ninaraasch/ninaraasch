import { Portfolio } from "@/components/Portfolio";
import { slides } from "@/data/projects";

export default function Home() {
  return <Portfolio slides={slides} />;
}
