import type { PresetName, ThemePreset } from "../tokens";
import { darkroom } from "./darkroom";
import { marquee } from "./marquee";
import { screenTest } from "./screen-test";
import { greenRoom } from "./green-room";

export const PRESETS: Record<PresetName, ThemePreset> = {
  darkroom,
  marquee,
  "screen-test": screenTest,
  "green-room": greenRoom,
};

export { darkroom, marquee, screenTest, greenRoom };
