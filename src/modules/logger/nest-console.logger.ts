import { ConsoleLogger, Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export default class NestConsoleLogger extends ConsoleLogger {}
