import { ILike, Repository } from "typeorm";
import { ProductTranslation } from "./product-translation.entity";
import { Product } from "./product.entity";
import { CreateProductDto } from "./product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductTranslation)
    private readonly translationRepo: Repository<ProductTranslation>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productRepo.create();
    await this.productRepo.save(product);

    const translation = this.translationRepo.create({
      product,
      name: dto.name,
      description: dto.description,
      lang: dto.lang,
    });

    return this.translationRepo.save(translation);
  }

  async findByNameAndLang(name: string, lang: string, page: number, limit: number) {
    // ILike = case-insensitive partial matching (PostgreSQL only).
    // skip and take = pagination helpers from TypeORM.
    const [data, total] = await this.translationRepo.findAndCount({
      where: {
        name: ILike(`%${name}%`),
        lang,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return {
      productList: data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}