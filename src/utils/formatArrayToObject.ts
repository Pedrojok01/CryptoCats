export const mapArrayToCatObject = (array: bigint[]): Cat => ({
  generation: array[0],
  indexId: array[1],
  dadId: array[2],
  mumId: array[3],
  birthTime: array[4],
  genes: array[5],
});

export const mapArrayToOfferObject = (array: OfferAbi): Offer => ({
  seller: array[0],
  price: array[1],
  index: array[2],
  tokenId: array[3],
});
