import { Test, TestingModule } from "@nestjs/testing";

import defineTestingPoint from "src/shared/utils/common/define-testing-point";

import ConfigModule from "../config/config.module";
import PrismaModule from "../prisma/prisma.module";
import AuthEmailController from "./auth-email.controller";
import AuthModule from "./auth.module";

describe(
  defineTestingPoint({ volume: AuthModule.name, point: AuthModule.name }),
  function () {
    it("definition", async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule, PrismaModule, AuthModule],
      }).compile();

      expect(module).toBeDefined();
      expect(module.get(AuthEmailController)).toBeInstanceOf(
        AuthEmailController,
      );
    });
  },
);

describe(
  defineTestingPoint({
    volume: AuthModule.name,
    point: AuthEmailController.name,
  }),
  function () {
    let authEmailController: AuthEmailController;
    // let app: INestApplication;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule, PrismaModule, AuthModule],
      }).compile();

      authEmailController =
        module.get<AuthEmailController>(AuthEmailController);

      // const app = await NestFactory.create<NestFastifyApplication>(
      //   module,
      //   new FastifyAdapter(),
      // );
    });

    // afterAll(async () => {
    //   await app.close();
    // });

    it("definition", async () => {
      expect(authEmailController).toBeDefined();
      expect(authEmailController).instanceOf(AuthEmailController);
    });

    // it("registerUserByEmail | request validation (e2e)", async () => {
    //   const configService = app.get<ConfigService>(ConfigService);

    //   const appApiPrefix = configService.get<string>(
    //     ProcessEnvKeys.BACKEND_API_PREFIX,
    //   );
    //   const appApiVersion = configService.get<string>(
    //     ProcessEnvKeys.BACKEND_API_VERSION,
    //   );

    //   const truthInputData = genRegisterUserByEmailRequestData();

    //   const registerUserByEmailRoutePath = `${appApiVersion}/${appApiPrefix}/${AuthEmailControllerRoutePath}/${AuthEmailControllerPaths.registerUserByEmail}`;
    //   console.log(registerUserByEmailRoutePath);
    //   const response = await supertest(app.getHttpServer()).post(
    //     registerUserByEmailRoutePath,
    //   );
    // });
  },
);
