import * as log from "https://deno.land/x/std/log/mod.ts";
export { log };

let isDebug = false;

/** @ignore */
export function debug(fun: Function) {
  if (isDebug) {
    fun();
  }
}

/** @ignore */
export async function config(config: { debug: boolean; logFile: string }) {
  isDebug = config.debug;
  await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler(config.debug ? "DEBUG" : "INFO"),
      file: new log.handlers.FileHandler("WARNING", {
        filename: config.logFile,
        formatter: "{levelName} {msg}"
      })
    },

    loggers: {
      default: {
        level: "DEBUG",
        handlers: ["console", "file"]
      }
    }
  });
}
