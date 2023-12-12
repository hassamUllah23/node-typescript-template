import express, { urlencoded, json, Express } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { expressCspHeader, SELF, INLINE } from "express-csp-header";
import { Config } from ".";
import { AuthRoutes } from "../modules/auth";

const { port, host, allowedOrigins } = Config.serverConfig;

class ServerService {
  public static server: Express | undefined = undefined;
  authRoutes: AuthRoutes | undefined = undefined;

  constructor() {
    if (ServerService.server === undefined) {
      ServerService.server = express();
      ServerService.server.use(json());
      ServerService.server.use(urlencoded({ extended: true }));
      ServerService.server.use(morgan("dev", { immediate: false }));
      ServerService.server.use(
        helmet({
          crossOriginResourcePolicy: {
            policy: "cross-origin",
          },
          hidePoweredBy: true,
          xXssProtection: true,
          frameguard: {
            action: "sameorigin",
          },
          strictTransportSecurity: {
            includeSubDomains: true,
            preload: false,
            maxAge: 31536000,
          },
        })
      );
      ServerService.server.use(
        expressCspHeader({
          directives: {
            "script-src": [SELF, INLINE],
          },
        })
      );
      ServerService.server.use(
        cors({
          allowedHeaders: [],
          origin: allowedOrigins,
          methods: ["GET", "POST", "PATCH", "DELETE"],
          credentials: true,
          exposedHeaders: ["Content-Type", "Authorization"],
          preflightContinue: false,
          maxAge: 86400, //24 hours
        })
      );

      this.authRoutes = new AuthRoutes();

      this.setupRoutes();
      this.init();
    }
  }

  private init() {
    ServerService.server?.listen(port, host, () => {
      const tableDate = {
        host: Config.serverConfig.host,
        port: Config.serverConfig.port,
      };
      console.table([{ ...tableDate }], Array.from(Object.keys(tableDate)));
    });
  }

  private setupRoutes() {
    this.authRoutes?.setup();
  }

  public static getHttpServer(): Express {
    return ServerService.server as Express;
  }
}

export { ServerService };
