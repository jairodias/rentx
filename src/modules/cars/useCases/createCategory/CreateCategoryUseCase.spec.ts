import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "valid_category",
      description: "description_valid",
    };

    await createCategoryUseCase.execute({
      name: "valid_category",
      description: "description_valid",
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "valid_category",
        description: "description_valid",
      };

      await createCategoryUseCase.execute({
        name: "valid_category",
        description: "description_valid",
      });

      await createCategoryUseCase.execute({
        name: "valid_category",
        description: "description_valid",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});