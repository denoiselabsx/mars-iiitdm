"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Scene = "void" | "dusk" | "bright";

const sceneByPath: Record<string, Scene> = {
  "/": "void",
  "/rovers": "void",
  "/competitions": "void",
  "/team": "void",
  "/gallery": "dusk",
  "/credits": "dusk",
  "/sponsors": "dusk",
  "/join": "bright",
};

function pickScene(path: string): Scene {
  if (sceneByPath[path]) return sceneByPath[path];
  // Match by prefix for future dynamic routes
  const prefix = Object.keys(sceneByPath)
    .filter((p) => p !== "/" && path.startsWith(p))
    .sort((a, b) => b.length - a.length)[0];
  return prefix ? sceneByPath[prefix] : "void";
}

export function SceneController() {
  const pathname = usePathname();

  useEffect(() => {
    const scene = pickScene(pathname);
    document.body.setAttribute("data-scene", scene);
    // Theme-color meta also follows the scene for mobile browser chrome
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const colors: Record<Scene, string> = {
        void: "#08080c",
        dusk: "#110a08",
        bright: "#f5f2ee",
      };
      meta.setAttribute("content", colors[scene]);
    }
  }, [pathname]);

  return null;
}
