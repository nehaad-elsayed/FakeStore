import { z } from "zod";

// Zod schema for product validation
export const ProductFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(999999.99, "Price must be less than 1,000,000"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters")
    .trim(),
  category: z
    .string()
    .min(1, "Category is required")
    .refine(
      (val) =>
        [
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ].includes(val),
      "Please select a valid category"
    ),
  image: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://"),
      "URL must start with http:// or https://"
    ),
});

// Type inference from Zod schema
export type ProductFormData = z.infer<typeof ProductFormSchema>;

// Validation helper functions
export const validateProductForm = (data: unknown): ProductFormData => {
  return ProductFormSchema.parse(data);
};

export const safeValidateProductForm = (data: unknown) => {
  return ProductFormSchema.safeParse(data);
};

// Schema for partial product (for updates)
export const PartialProductSchema = ProductFormSchema.partial();

// Schema with custom error messages
export const ProductFormSchemaWithCustomErrors = z.object({
  title: z
    .string()
    .min(3, "Product title is too short - please provide more details")
    .max(100, "Product title is too long - please keep it concise")
    .trim()
    .refine((val) => val.length > 0, "Product title cannot be empty"),
  price: z
    .number()
    .min(0.01, "Price must be at least $0.01")
    .max(999999.99, "Price cannot exceed $999,999.99")
    .refine((val) => val > 0, "Price must be a positive number"),
  description: z
    .string()
    .min(10, "Description needs more detail - at least 10 characters")
    .max(1000, "Description is too long - please keep it under 1000 characters")
    .trim()
    .refine((val) => val.length > 0, "Product description cannot be empty"),
  category: z
    .string()
    .min(1, "Please select a product category")
    .refine(
      (val) =>
        [
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ].includes(val),
      "Invalid category selected"
    ),
  image: z
    .string()
    .url("Please provide a valid image URL")
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://"),
      "Image URL must be secure (https://) or valid (http://)"
    )
    .refine((val) => val.length > 0, "Image URL cannot be empty"),
});

// Transform schema for data cleaning
export const ProductFormSchemaWithTransform = ProductFormSchema.transform(
  (data) => {
    return {
      ...data,
      title: data.title.trim(),
      description: data.description.trim(),
      price: Math.round(data.price * 100) / 100, // Round to 2 decimal places
      category: data.category.toLowerCase(),
      image: data.image.trim(),
    };
  }
);

// Schema for different product types
export const ProductTypeSchema = z.enum(["physical", "digital", "service"]);

export const ExtendedProductSchema = ProductFormSchema.extend({
  productType: ProductTypeSchema.optional().default("physical"),
  inStock: z.boolean().optional().default(true),
  tags: z.array(z.string()).optional().default([]),
}).transform((data) => {
  // Ensure tags are unique and lowercase
  const uniqueTags = [
    ...new Set(data.tags.map((tag) => tag.toLowerCase().trim())),
  ];
  return {
    ...data,
    tags: uniqueTags,
  };
});

export type ExtendedProductFormData = z.infer<typeof ExtendedProductSchema>;
