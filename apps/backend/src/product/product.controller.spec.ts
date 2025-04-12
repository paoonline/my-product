import { Test, TestingModule } from '@nestjs/testing';
import { productController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: productController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [productController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            // mock methods if needed later
            create: jest.fn(),
            findByNameAndLang: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<productController>(productController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
