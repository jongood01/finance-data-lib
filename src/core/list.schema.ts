import { z } from "../deps.ts";

export const ListRequestSchema = z.object({
  filter: z
    .string({
      invalid_type_error: "filter must be a string",
    })
    .nullable(),
  filterValue: z
    .string({
      invalid_type_error: "filter value must be a string",
    })
    .nullable(),
  page: z
    .number({
      required_error: "page is required",
      invalid_type_error: "page must be a number",
    })
    .min(1)
    .max(999),
  perPage: z
    .number({
      required_error: "perPage is required",
      invalid_type_error: "perPage must be a number",
    })
    .min(1)
    .max(100),
  search: z
    .string({
      invalid_type_error: "search must be a string",
    })
    .nullable(),
  sort: z.string(),
  sortDirection: z.enum(["ASC", "DESC"]),
});

export type ListRequest = z.infer<typeof ListRequestSchema>;

export type ListResponse<T> = {
  page: number;
  totalPages: number;
  result: T[];
};
