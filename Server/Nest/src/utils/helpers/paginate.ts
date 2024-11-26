import { FilterQuery, Model } from 'mongoose';

/**
 * Options for pagination configuration.
 */
interface PaginateOptions {
  /** The page number to retrieve (1-based index).*/
  page?: number;
  /** The number of items per page.*/
  limit?: number;
}

/**
 * The result returned by the paginate function.
 * @template T - The type of the documents being paginated.
 */
interface PaginateResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pageTotal: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Paginates a Mongoose model query based on the provided options.
 *
 * @template T - The type of the documents being paginated.
 * @param model - The Mongoose model to query.
 * @param filter - The filter query to apply to the model. Defaults to an empty filter.
 * @param options - The pagination options including page and limit. If `page` or `limit` is set to -1, all documents are retrieved.
 * @returns A promise that resolves to an object containing paginated results and metadata.
 *
 * @throws Will throw an error if either `page` or `limit` is less than 1 and both are not -1.
 */
export const paginate = async <T>(
  model: Model<T>,
  filter: FilterQuery<T> = {},
  options: PaginateOptions = { page: -1, limit: -1 },
): Promise<PaginateResult<T>> => {
  const { page, limit } = options;

  if (page !== -1 && limit !== -1 && (page < 1 || limit < 1)) {
    throw new Error('Page and limit must be greater than 0');
  }

  const skip = (page - 1) * limit;

  const total = await model.countDocuments(filter);
  const itemsQuery = model.find(filter);
  const items =
    page === -1 && limit === -1
      ? await itemsQuery
      : await itemsQuery.skip(skip).limit(limit);

  return {
    data: items,
    total,
    page,
    pageTotal: Math.ceil(total / limit) || 1,
    limit,
    hasNextPage: page * limit < total,
    hasPreviousPage: page > 1,
  };
};
