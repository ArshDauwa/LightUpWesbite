import { Gauge, Plug, Zap, Volume2, ShieldCheck, MapPin, Award } from "lucide-react";
import type { GeneratorSpecs } from "../data/generators";

export const SPEC_ICONS: Record<keyof GeneratorSpecs, React.ReactNode> = {
  output: <Gauge className="w-4 h-4" />,
  voltage: <Plug className="w-4 h-4" />,
  fuel: <Zap className="w-4 h-4" />,
  sound: <Volume2 className="w-4 h-4" />,
  transferSwitch: <ShieldCheck className="w-4 h-4" />,
  coverage: <MapPin className="w-4 h-4" />,
  warranty: <Award className="w-4 h-4" />,
};
