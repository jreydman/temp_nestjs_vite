import { Test } from "@nestjs/testing";

import AppController from "./app.controller";
import AppService from "./app.service";

describe("AppModule volume", function () {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const appModuleReference = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = appModuleReference.get<AppController>(AppController);
    appService = appModuleReference.get<AppService>(AppService);
  });

  it("AppController character | GET hello ", () => {});
});
