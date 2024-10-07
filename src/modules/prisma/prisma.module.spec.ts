import { Test, TestingModule } from "@nestjs/testing";

import defineTestingPoint from "src/shared/utils/common/define-testing-point";

import ConfigModule from "../config/config.module";
import PrismaModule from "./prisma.module";
import PrismaService from "./services/prisma.service";

describe(defineTestingPoint({ volume: PrismaModule.name, point: PrismaModule.name }), function () {
  it("definition", async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, PrismaModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(PrismaService)).toBeInstanceOf(PrismaService);
  });
});

describe(defineTestingPoint({ volume: PrismaModule.name, point: PrismaService.name }), function () {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, PrismaModule],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("definition", () => {
    expect(prismaService).toBeDefined();
    expect(prismaService).instanceOf(PrismaService);
  });
});
