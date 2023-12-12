import { Logger, createLogger, format, transports } from "winston";

const formatParams = (info: any) => {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace("T", " ");

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args) : ""
  }`;
};
const Format = format.combine(
  format.colorize({
    all: true,
    level: true,
    message: true,
    colors: {
      info: "blue",
      error: "red",
      warn: "orange",
      debug: "purple",
    },
  }),
  format.timestamp(),
  // format.label({ message: false, label: "EXAMPLE-LABEL" }),
  format.align(),
  format.printf(formatParams),
);

const logger: Logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.File({
      filename: "logs.txt",
      level: "info",
      format: format.combine(
        // format.timestamp({ alias: "TIMESTAMP" }),
        format.timestamp(),
        format.simple(),
        // format.label({ message: false, label: "EXAMPLE-LABEL", }),
      ),
    }),
    new transports.Console({
      format: Format,
    }),
  ],
});

function log(
  level: "info" | "warn" | "error" | "http" | "verbose" | "debug" | "silly",
  message: string,
  // label?: string,
) {
  logger
    // .info({ label: label })
    .log(level, message, (_error, _level, _message, _meta) => {});
}

function json(obj: any) {
  console.log(obj);
}
const LogService = {
  log,
  json,
};

export { LogService };
